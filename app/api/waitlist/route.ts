import { NextRequest, NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    const { email, captchaToken } = await request.json();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured. Please contact support.' },
        { status: 503 }
      );
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
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
        return NextResponse.json(
          { error: 'Captcha verification failed. Please try again.' },
          { status: 400 }
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
      if ((error as any).code === '23505') {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }
      return NextResponse.json({ error: 'Failed to add email to waitlist' }, { status: 500 });
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
          categories: ['waitlist', 'pilot'],
        } as const;
        const res = await sgMail.send(msg);
        console.log('[SendGrid] Mail sent', {
          statusCode: res?.[0]?.statusCode,
          requestId: res?.[0]?.headers?.['x-message-id'] || res?.[0]?.headers?.['x-request-id'],
        });
      } else {
        console.warn('[SendGrid] Missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL; skipping email');
      }
    } catch (emailErr: any) {
      console.warn('[SendGrid] Failed to send confirmation', {
        message: emailErr?.message,
        code: emailErr?.code,
        body: emailErr?.response?.body,
      });
    }

    return NextResponse.json({ message: 'Successfully added to waitlist', data }, { status: 201 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


