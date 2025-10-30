import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Email test endpoint ready. Use POST to send.' }, { status: 200 });
}

export async function POST() {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing SENDGRID_API_KEY' }, { status: 500 });
  }
  try {
    const { default: sgMail } = await import('@sendgrid/mail');
    sgMail.setApiKey(apiKey);
    const res = await sgMail.send({
      to: 'josericardo.cm@icloud.com',
      from: 'hello@ettra.ai',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    });
    return NextResponse.json({ ok: true, statusCode: res?.[0]?.statusCode }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message, body: error?.response?.body }, { status: 500 });
  }
}


