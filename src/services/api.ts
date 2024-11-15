import toast from 'react-hot-toast';

const API_URL = 'https://api.openai.com/v1';

interface ApiConfig {
  apiKey: string | null;
}

class ApiService {
  private config: ApiConfig = {
    apiKey: null
  };

  setApiKey(key: string) {
    this.config.apiKey = key;
    localStorage.setItem('openai_key', key);
  }

  getApiKey(): string | null {
    if (!this.config.apiKey) {
      this.config.apiKey = localStorage.getItem('openai_key');
    }
    return this.config.apiKey;
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      const response = await this.fetchWithAuth('/images/generations', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          n: 1,
          size: '1024x1024',
        }),
      });
      return response.data[0].url;
    } catch (error) {
      console.error('Image generation error:', error);
      throw error;
    }
  }

  async chatCompletion(messages: Array<{ role: string; content: string }>) {
    try {
      const response = await this.fetchWithAuth('/chat/completions', {
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-4',
          messages,
          temperature: 0.7,
        }),
      });
      return response.choices[0].message;
    } catch (error) {
      console.error('Chat completion error:', error);
      throw error;
    }
  }

  async analyzeText(text: string) {
    try {
      const response = await this.fetchWithAuth('/chat/completions', {
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'Analyze the following text and provide sentiment, key phrases, and a brief summary. Return the response in JSON format with fields: sentiment (positive/negative/neutral), score (0-1), keywords (array), and summary (string).'
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.3,
        }),
      });
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Text analysis error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();