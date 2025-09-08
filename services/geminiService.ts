import { GoogleGenAI } from "@google/genai";

// Per guidelines, initialize directly with process.env.API_KEY and assume it is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const getReviewPrompt = (code: string, language: string): string => {
  return `Act as a world-class senior software engineer and expert code reviewer. Your task is to provide a comprehensive review of the following code written in ${language}.

Focus on the following areas:
1.  **Bugs and Errors:** Identify any potential bugs, logic errors, or edge cases that are not handled correctly.
2.  **Performance:** Suggest optimizations for performance bottlenecks, inefficient algorithms, or unnecessary computations.
3.  **Security:** Point out any security vulnerabilities such as injection flaws, data exposure, or improper handling of secrets.
4.  **Best Practices & Readability:** Recommend improvements based on established best practices, coding conventions, and principles like DRY (Don't Repeat Yourself). Suggest changes to improve code clarity and maintainability.
5.  **Clarity and Conciseness:** Your feedback must be clear, constructive, and actionable.

Provide the review in Markdown format. Start with a brief summary, then list each point with a clear heading (e.g., '🐛 Bugs', '⚡️ Performance', '🛡️ Security', '💡 Best Practices'). For each point, include the relevant code snippet and your detailed suggestion for improvement.

Here is the code:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`
`;
};

export const reviewCode = async (code: string, language: string): Promise<string> => {
  try {
    const prompt = getReviewPrompt(code, language);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from Gemini API.");
  }
};
