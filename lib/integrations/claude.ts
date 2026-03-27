import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface MessageRequest {
  messages: ClaudeMessage[];
  model?: string;
  maxTokens?: number;
}

export async function sendMessage(request: MessageRequest) {
  try {
    const response = await anthropic.messages.create({
      model: request.model || 'claude-3-sonnet-20240229',
      max_tokens: request.maxTokens || 1000,
      messages: request.messages
    });
    return response.content[0];
  } catch (error) {
    throw new Error(`Failed to send message: ${error}`);
  }
}

export async function generateResponse(prompt: string, maxTokens: number = 1000) {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }]
    });
    return response.content[0];
  } catch (error) {
    throw new Error(`Failed to generate response: ${error}`);
  }
}