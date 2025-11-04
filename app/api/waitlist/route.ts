import { NextRequest, NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { checkRateLimit, getSecurityHeaders, isSuspiciousIP, getClientIP, logSecurityEvent } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  const endpoint = '/api/waitlist';
  const ip = getClientIP(request);
  const securityHeaders = getSecurityHeaders();
  
  // Check for suspicious IP
  if (isSuspiciousIP(ip)) {
    await logSecurityEvent({
      type: 'suspicious_activity',
      endpoint,
      ip: ip || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      details: { reason: 'suspicious_ip' },
      timestamp: new Date(),
    });
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers: securityHeaders }
    );
  }
  
  // Check rate limit
  const rateLimitResult = checkRateLimit(endpoint, request);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter,
      },
      { 
        status: 429,
        headers: {
          ...securityHeaders,
          'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
        },
      }
    );
  }
  
  try {
    const { email, captchaToken } = await request.json();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured. Please contact support.' },
        { status: 503, headers: securityHeaders }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400, headers: securityHeaders }
      );
    }

    // hCaptcha verification (best-effort, skipped if no secret)
    const hcaptchaSecretKey = process.env.HCAPTCHA_SECRET_KEY;
    if (hcaptchaSecretKey) {
      const captchaResponse = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: hcaptchaSecretKey, response: captchaToken }),
      });
      const captchaResult = await captchaResponse.json();
      if (!captchaResult.success) {
        console.error('hCaptcha verification failed:', captchaResult);
        await logSecurityEvent({
          type: 'failed_authentication',
          endpoint,
          ip: ip || undefined,
          userAgent: request.headers.get('user-agent') || undefined,
          details: { reason: 'captcha_failed' },
          timestamp: new Date(),
        });
        return NextResponse.json(
          { error: 'Captcha verification failed. Please try again.' },
          { status: 400, headers: securityHeaders }
        );
      }
    } else {
      console.warn('HCAPTCHA_SECRET_KEY not configured, skipping server-side verification');
    }

    // Insert into waitlist (dedupe handled by unique index)
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: String(email).toLowerCase().trim(), created_at: new Date().toISOString() }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      const pgErr = error as { code?: string };
      if (pgErr?.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409, headers: securityHeaders }
        );
      }
      return NextResponse.json(
        { error: 'Failed to add email to waitlist' },
        { status: 500, headers: securityHeaders }
      );
    }

    // Send confirmation email via SendGrid (best-effort)
    try {
      const sendgridApiKey = process.env.SENDGRID_API_KEY;
      const fromEmail = process.env.SENDGRID_FROM_EMAIL;
      if (sendgridApiKey && fromEmail) {
        const { default: sgMail } = await import('@sendgrid/mail');
        sgMail.setApiKey(sendgridApiKey);
        const msg = {
          to: email,
          from: fromEmail,
          subject: "You're on the Ettra pilot waitlist ✨",
          text: "Thanks for joining the Ettra pilot. We'll be in touch soon with early access.",
          html: '<p>Thanks for joining the Ettra pilot. We\'ll be in touch soon with early access.</p>',
          categories: ['waitlist', 'pilot'] as string[],
        };
        const res = await sgMail.send(msg);
        console.log('[SendGrid] Mail sent', {
          statusCode: res?.[0]?.statusCode,
          requestId: res?.[0]?.headers?.['x-message-id'] || res?.[0]?.headers?.['x-request-id'],
        });
      } else {
        console.warn('[SendGrid] Missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL; skipping email');
      }
    } catch (emailErr: unknown) {
      const e = emailErr as { message?: string; code?: string; response?: { body?: unknown } };
      console.warn('[SendGrid] Failed to send confirmation', {
        message: e?.message,
        code: e?.code,
        body: e?.response?.body,
      });
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist', data },
      { status: 201, headers: securityHeaders }
    );
  } catch (err: unknown) {
    console.error('API error:', err);
    await logSecurityEvent({
      type: 'invalid_request',
      endpoint,
      ip: ip || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      details: { error: err instanceof Error ? err.message : 'unknown' },
      timestamp: new Date(),
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    );
  }
}


