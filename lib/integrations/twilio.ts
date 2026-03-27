import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export interface SMSMessage {
  to: string;
  from: string;
  body: string;
}

export interface CallOptions {
  to: string;
  from: string;
  url: string;
}

export async function sendSMS(message: SMSMessage) {
  try {
    const response = await client.messages.create({
      body: message.body,
      from: message.from,
      to: message.to
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to send SMS: ${error}`);
  }
}

export async function makeCall(options: CallOptions) {
  try {
    const response = await client.calls.create({
      url: options.url,
      to: options.to,
      from: options.from
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to make call: ${error}`);
  }
}