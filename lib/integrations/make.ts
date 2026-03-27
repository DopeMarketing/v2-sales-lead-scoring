import axios from 'axios';

const makeClient = axios.create({
  baseURL: 'https://hook.integromat.com/api/v1',
  headers: {
    'Authorization': `Token ${process.env.MAKE_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export interface WebhookData {
  [key: string]: any;
}

export interface ScenarioTrigger {
  scenarioId: string;
  data: WebhookData;
}

export async function triggerScenario(trigger: ScenarioTrigger) {
  try {
    const response = await makeClient.post(`/scenarios/${trigger.scenarioId}/run`, trigger.data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to trigger scenario: ${error}`);
  }
}

export async function sendWebhookData(webhookUrl: string, data: WebhookData) {
  try {
    const response = await axios.post(webhookUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send webhook data: ${error}`);
  }
}