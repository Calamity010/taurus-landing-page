import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export type AIProvider = 'gemini' | 'openai';

interface AIServiceConfig {
  provider: AIProvider;
  apiKey: string;
}

class AIService {
  private provider: AIProvider;
  private geminiClient: GoogleGenerativeAI | null = null;
  private openaiClient: OpenAI | null = null;

  constructor(config: AIServiceConfig) {
    this.provider = config.provider;
    
    if (config.provider === 'gemini') {
      this.geminiClient = new GoogleGenerativeAI(config.apiKey);
    } else {
      this.openaiClient = new OpenAI({
        apiKey: config.apiKey,
        dangerouslyAllowBrowser: true,
      });
    }
  }

  async chat(message: string, context?: string): Promise<string> {
    try {
      if (this.provider === 'gemini' && this.geminiClient) {
        const model = this.geminiClient.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = context 
          ? `Context: ${context}\n\nUser: ${message}`
          : message;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } else if (this.provider === 'openai' && this.openaiClient) {
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
        if (context) {
          messages.push({ role: 'system', content: context });
        }
        messages.push({ role: 'user', content: message });
        
        const response = await this.openaiClient.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 500,
        });
        return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      }
      throw new Error('AI client not initialized');
    } catch (error) {
      console.error('AI Service Error:', error);
      return 'Sorry, I am having trouble connecting right now. Please try again later.';
    }
  }

  async generateInterviewQuestions(role: string, experience: string): Promise<string[]> {
    const prompt = `Generate 5 technical interview questions for a ${role} position with ${experience} years of experience. Return only the questions as a numbered list.`;
    
    try {
      const response = await this.chat(prompt);
      return response.split('\n').filter(q => q.trim()).slice(0, 5);
    } catch (error) {
      console.error('Error generating questions:', error);
      return [
        'Tell me about your experience with this role.',
        'What are your strongest technical skills?',
        'Describe a challenging project you worked on.',
        'How do you handle tight deadlines?',
        'What are your career goals?',
      ];
    }
  }

  async analyzeResume(resumeText: string, jobDescription: string): Promise<{
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
  }> {
    const prompt = `Analyze this resume against the job description and provide:
1. A match score (0-100)
2. Key strengths (3 points)
3. Areas for improvement (3 points)
4. Hiring recommendation

Resume: ${resumeText}
Job Description: ${jobDescription}

Format your response as JSON with keys: score, strengths (array), weaknesses (array), recommendation`;

    try {
      const response = await this.chat(prompt);
      // Try to parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      console.error('Error analyzing resume:', error);
      return {
        score: 70,
        strengths: ['Relevant experience', 'Good education background', 'Technical skills match'],
        weaknesses: ['Could improve soft skills section', 'Add more quantifiable achievements'],
        recommendation: 'Consider for next round',
      };
    }
  }
}

// Create singleton instance
let aiService: AIService | null = null;

export function initAIService(config: AIServiceConfig) {
  aiService = new AIService(config);
  return aiService;
}

export function getAIService(): AIService | null {
  return aiService;
}

export function createAIServiceFromEnv(): AIService | null {
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (geminiKey) {
    return initAIService({ provider: 'gemini', apiKey: geminiKey });
  } else if (openaiKey) {
    return initAIService({ provider: 'openai', apiKey: openaiKey });
  }

  return null;
}

export default AIService;
