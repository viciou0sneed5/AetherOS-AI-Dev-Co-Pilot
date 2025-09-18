import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set. This is required for the application to function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateCode = async (language: string, prompt: string): Promise<string> => {
  try {
    const fullPrompt = `You are an expert ${language} programmer. 
    Generate a code snippet for the following task. 
    Only output the raw code, without any markdown formatting like \`\`\`${language.toLowerCase()}\`\`\` or explanation.
    Task: "${prompt}"`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating code:", error);
    return "Error: Could not generate code. Please check the console for details.";
  }
};

export const generateTests = async (language: string, code: string): Promise<string> => {
  try {
    const fullPrompt = `You are an expert Quality Assurance Engineer. 
    Write comprehensive unit tests for the following ${language} code snippet using a popular testing framework for that language (e.g., pytest for Python, Jest for JavaScript/TypeScript, Go's native testing package).
    Only output the raw test code, without any markdown formatting or explanation.
    Code to test:
    ---
    ${code}
    ---`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating tests:", error);
    return "Error: Could not generate tests. Please check the console for details.";
  }
};


export const analyzeCode = async (language: string, code: string): Promise<string> => {
  try {
    const fullPrompt = `You are an expert code reviewer and security analyst. 
    Analyze the following ${language} code snippet for potential bugs, security vulnerabilities, and performance bottlenecks.
    Provide a clear, concise summary of your findings. For each issue, describe the problem and suggest a specific code refactoring or fix.
    Format your response in markdown.
    Code to analyze:
    ---
    ${code}
    ---`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing code:", error);
    return "Error: Could not analyze code. Please check the console for details.";
  }
};
