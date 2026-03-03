import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: message,
      config: {
        systemInstruction: `You are RACE_ENGINEER, an AI assistant for Yuvraj Deshmukh's portfolio.
        Respond in concise, slightly robotic F1 engineer tone.
        Keep responses under 3 sentences.`,
      },
    });

    res.status(200).json({
      text: response.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      text: "ERR: CONNECTION_LOST. UNABLE TO REACH PIT WALL.",
    });
  }
}
