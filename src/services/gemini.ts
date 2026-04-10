import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface LegalAnalysisResult {
  summary: string;
  keyRisks: { level: 'Low' | 'Medium' | 'High'; description: string }[];
  riskScore: number;
  importantClauses: { title: string; explanation: string }[];
  realWorldImpact: string;
}

export interface IngredientAnalysisResult {
  ingredients: { name: string; riskLevel: 'Safe' | 'Caution' | 'Hazardous'; sideEffects: string; explanation: string }[];
  safetyScore: number;
  generalAdvice: string;
}

export const analyzeLegalDocument = async (content: string | { data: string; mimeType: string }): Promise<LegalAnalysisResult> => {
  const prompt = `Analyze this legal document. Translate jargon into 5th-grade level English while maintaining legal accuracy.
  Return the analysis in JSON format with the following structure:
  {
    "summary": "Simple English summary",
    "keyRisks": [{ "level": "Low/Medium/High", "description": "Risk description" }],
    "riskScore": 0-100,
    "importantClauses": [{ "title": "Clause Title", "explanation": "Simple explanation" }],
    "realWorldImpact": "What this means for the user in real life"
  }`;

  const parts: any[] = [{ text: prompt }];
  if (typeof content === 'string') {
    parts.push({ text: content });
  } else {
    parts.push({ inlineData: content });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keyRisks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                level: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                description: { type: Type.STRING }
              },
              required: ["level", "description"]
            }
          },
          riskScore: { type: Type.NUMBER },
          importantClauses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["title", "explanation"]
            }
          },
          realWorldImpact: { type: Type.STRING }
        },
        required: ["summary", "keyRisks", "riskScore", "importantClauses", "realWorldImpact"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const analyzeIngredients = async (content: string | { data: string; mimeType: string }): Promise<IngredientAnalysisResult> => {
  const prompt = `Act as a health and cosmetic safety expert. Analyze these ingredients for transparency, potential allergens, or harmful chemicals.
  Return the analysis in JSON format with the following structure:
  {
    "ingredients": [{ "name": "Ingredient Name", "riskLevel": "Safe/Caution/Hazardous", "sideEffects": "Potential side effects", "explanation": "Simple explanation" }],
    "safetyScore": 0-100,
    "generalAdvice": "Overall health advice"
  }`;

  const parts: any[] = [{ text: prompt }];
  if (typeof content === 'string') {
    parts.push({ text: content });
  } else {
    parts.push({ inlineData: content });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                riskLevel: { type: Type.STRING, enum: ["Safe", "Caution", "Hazardous"] },
                sideEffects: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["name", "riskLevel", "sideEffects", "explanation"]
            }
          },
          safetyScore: { type: Type.NUMBER },
          generalAdvice: { type: Type.STRING }
        },
        required: ["ingredients", "safetyScore", "generalAdvice"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const chatWithAssistant = async (message: string, context?: string) => {
  const systemInstruction = `You are LegalizeAI Assistant. You help users understand legal documents and ingredient safety.
  ${context ? `Current context of analysis: ${context}` : ''}
  Keep your answers concise, professional, and easy to understand.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: message,
    config: {
      systemInstruction
    }
  });

  return response.text;
};
