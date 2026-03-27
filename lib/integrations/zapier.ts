import axios from 'axios';

const zapierClient = axios.create({
  baseURL: 'https://hooks.zapier.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface ZapTriggerData {
  [key: string]: any;
}

export interface WebhookConfig {
  hookUrl: string;
  data: ZapTriggerData;
}

export async function triggerZap(config: WebhookConfig) {
  try {
    const response = await zapierClient.post(config.hookUrl, config.data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to trigger Zap: ${error}`);
  }
}

export async function sendWebhookData(webhookUrl: string, data: ZapTriggerData) {
  try {
    const response = await axios.post(webhookUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send webhook data: ${error}`);
  }
}