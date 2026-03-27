import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GMAIL_API_KEY || '{}'),
  scopes: ['https://www.googleapis.com/auth/gmail.send']
});

const gmail = google.gmail({ version: 'v1', auth });

export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

export interface EmailFilter {
  query: string;
  maxResults?: number;
}

export async function sendEmail(message: EmailMessage) {
  try {
    const emailContent = `To: ${message.to}\nSubject: ${message.subject}\n\n${message.body}`;
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(emailContent).toString('base64')
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}

export async function searchEmails(filter: EmailFilter) {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: filter.query,
      maxResults: filter.maxResults || 10
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search emails: ${error}`);
  }
}