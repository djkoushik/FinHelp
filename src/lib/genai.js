import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google GenAI client
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);

export const generateContent = async (prompt, modelName, useThinking = false) => {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      tools: [{ googleSearch: {} }],
      thinkingConfig: useThinking ? { enabled: true } : undefined,
    });

    return result.response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

export default genAI;
