import { generateContent as generateGeminiContent } from './genai';
import { generatePerplexityContent } from './perplexity';
import { models } from '../models';
import { getMetricsForSector, analyzeMetrics } from '../models/metrics/sectorMetrics';

// Enhanced prompt template for sector-specific analysis
const generateSectorSpecificPrompt = (basePrompt, sector) => {
  const sectorMetrics = getMetricsForSector(sector);
  if (!sectorMetrics) return basePrompt;

  return `
    Analyze the following company with specific focus on ${sector} sector metrics:
    ${basePrompt}
    
    Please provide analysis on:
    1. Key Ratios: ${Object.keys(sectorMetrics.primaryRatios).join(', ')}
    2. Essential Metrics: ${Object.keys(sectorMetrics.essentialMetrics).join(', ')}
    3. Compare with sector benchmarks where available
  `;
};

// Function to extract company metrics from API responses
const extractMetrics = (content) => {
  // Implementation to parse metrics from AI response
  // This would use regex or other parsing methods to extract numerical values
  return {
    metrics: {},
    sector: '',
    // Add other relevant fields
  };
};

export const generateFinancialContent = async (prompt, modelName, sector = '') => {
  try {
    const modelConfig = models[modelName];
    
    if (!modelConfig) {
      throw new Error(`Unknown model: ${modelName}`);
    }

    // Generate sector-specific prompt if sector is provided
    const enhancedPrompt = sector ? generateSectorSpecificPrompt(prompt, sector) : prompt;

    // Get AI response
    let response;
    switch (modelConfig.provider) {
      case 'gemini':
        response = await generateGeminiContent(enhancedPrompt, modelName, modelConfig.thinkingEnabled);
        break;
      case 'perplexity':
        response = await generatePerplexityContent(enhancedPrompt);
        break;
      default:
        throw new Error(`Unsupported provider: ${modelConfig.provider}`);
    }

    // Extract metrics from response
    const extractedData = extractMetrics(response);

    // If we have a sector, analyze the metrics
    if (sector && extractedData.metrics) {
      const analysis = analyzeMetrics(extractedData.metrics, sector);
      return {
        rawResponse: response,
        analysis: analysis,
        metrics: extractedData.metrics
      };
    }

    // Return raw response if no sector analysis is needed
    return {
      rawResponse: response,
      metrics: extractedData.metrics
    };

  } catch (error) {
    console.error('Error generating financial content:', error);
    throw error;
  }
};
