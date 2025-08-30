// Perplexity API configuration and client
const PERPLEXITY_API_ENDPOINT = 'https://api.perplexity.ai/chat/completions';

export const generatePerplexityContent = async (prompt) => {
  try {
    const response = await fetch(PERPLEXITY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'pplx-70b-online',  // Using online model for real-time financial data
        messages: [{
          role: 'system',
          content: 'You are a financial analyst assistant. Provide latest financial analysis and stock market updates.'
        }, {
          role: 'user',
          content: prompt
        }],
        max_tokens: 1024,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating Perplexity content:', error);
    throw error;
  }
};
