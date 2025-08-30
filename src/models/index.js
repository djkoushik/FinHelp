// Available AI models and their configurations
export const models = {
  'gemini-2.5-flash': {
    name: 'Gemini 2.5 Flash',
    description: 'Fast, optimized for quick responses',
    provider: 'gemini',
    thinkingEnabled: false,
    temperature: 0.7
  },
  'gemini-2.5-pro': {
    name: 'Gemini 2.5 Pro',
    description: 'Enhanced accuracy with detailed analysis',
    provider: 'gemini',
    thinkingEnabled: true,
    temperature: 0.9
  },
  'pplx-70b-online': {
    name: 'Perplexity Finance',
    description: 'Real-time financial analysis with latest market data',
    provider: 'perplexity',
    temperature: 0.7
  },
  'pplx-7b-online': {
    name: 'Perplexity Fast',
    description: 'Quick financial insights and market updates',
    provider: 'perplexity',
    temperature: 0.5
  }
};

export const defaultModel = 'gemini-2.5-flash';
