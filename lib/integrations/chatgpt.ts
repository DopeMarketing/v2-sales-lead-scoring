import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface CompletionRequest {
  messages: ChatMessage[];
  model?: string;
  maxTokens?: number;
}

export async function getChatCompletion(request: CompletionRequest) {
  try {
    const response = await openai.chat.completions.create({
      model: request.model || 'gpt-3.5-turbo',
      messages: request.messages,
      max_tokens: request.maxTokens || 1000
    });
    return response.choices[0].message;
  } catch (error) {
    throw new Error(`Failed to get chat completion: ${error}`);
  }
}

export async function generateText(prompt: string, maxTokens: number = 1000) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens
    });
    return response.choices[0].message.content;
  } catch (error) {
    throw new Error(`Failed to generate text: ${error}`);
  }
}