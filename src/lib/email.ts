// Provider-neutral transactional email abstraction
// Can be implemented using Resend, SendGrid, SMTP, etc.

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  const provider = process.env.EMAIL_PROVIDER || 'console'; // Default to console in development
  
  try {
    if (provider === 'console') {
      console.log('--- EMAIL SENT ---');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content: ${html}`);
      console.log('------------------');
      return true;
    }
    
    if (provider === 'smtp') {
      // Future: Configure nodemailer here using EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
      console.log('SMTP provider not yet implemented, logging to console instead.');
      return true;
    }
    
    if (provider === 'resend') {
      // Future: Configure Resend using RESEND_API_KEY
      console.log('Resend provider not yet implemented, logging to console instead.');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export async function sendConfirmationEmail(contactEmail: string, contactName: string, referenceId: string, title: string) {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
      <h2 style="color: #121212; margin-bottom: 24px; font-weight: 600;">Procura Request Received</h2>
      <p style="color: #1c1c1c; font-size: 16px; line-height: 1.5;">Hello ${contactName},</p>
      <p style="color: #1c1c1c; font-size: 16px; line-height: 1.5;">We have successfully received your requirement submission.</p>
      
      <div style="background-color: #f4f4f5; padding: 16px; border-radius: 6px; margin: 24px 0;">
        <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Reference ID</p>
        <p style="margin: 0; font-weight: 600; font-size: 18px; color: #121212;">${referenceId}</p>
      </div>
      
      <p style="color: #1c1c1c; font-size: 16px; line-height: 1.5; margin-bottom: 8px;"><strong>Requirement:</strong> ${title}</p>
      
      <p style="color: #1c1c1c; font-size: 16px; line-height: 1.5; margin-top: 24px;">
        You can track the status of your request at any time using your Reference ID on our tracking page.
      </p>
      
      <div style="margin-top: 32px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/track?id=${referenceId}" style="background-color: #121212; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block;">
          Track Request
        </a>
      </div>
      
      <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 32px 0;" />
      
      <p style="color: #71717a; font-size: 14px;">
        Procura Team<br />
        Internal Research Procurement
      </p>
    </div>
  `;

  return sendEmail({
    to: contactEmail,
    subject: `Requirement Received: ${referenceId}`,
    html,
  });
}
