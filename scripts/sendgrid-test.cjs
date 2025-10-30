// Usage: SENDGRID_API_KEY=... node scripts/sendgrid-test.cjs
// Sends a single test email using Twilio SendGrid's v3 Node.js Library.

const sgMail = require('@sendgrid/mail');

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error('Missing SENDGRID_API_KEY in environment');
  process.exit(1);
}

sgMail.setApiKey(apiKey);

const msg = {
  to: 'josericardo.cm@icloud.com', // recipient
  from: 'hello@ettra.ai', // verified sender/domain
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail
  .send(msg)
  .then((res) => {
    const statusCode = res?.[0]?.statusCode;
    const requestId = res?.[0]?.headers?.['x-message-id'] || res?.[0]?.headers?.['x-request-id'];
    console.log('Email sent', { statusCode, requestId });
    process.exit(0);
  })
  .catch((error) => {
    console.error('SendGrid error', {
      message: error?.message,
      code: error?.code,
      body: error?.response?.body,
    });
    process.exit(1);
  });


