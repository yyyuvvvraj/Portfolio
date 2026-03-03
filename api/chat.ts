import OpenAI from "openai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ text: "OPENAI_KEY_MISSING" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const message = body?.message;

    if (!message) {
      return res.status(400).json({ text: "NO_MESSAGE_RECEIVED" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are RACE_ENGINEER, an AI assistant for Yuvraj Deshmukh's portfolio.
Respond in a concise, slightly robotic, cyberpunk/F1 engineer persona.
Use terms like telemetry, encrypted, pit wall, sector clear.
Keep responses under 3 sentences`,
        },
        { role: "user", content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const text =
      completion.choices?.[0]?.message?.content || "NO_RESPONSE_FROM_MODEL";

    return res.status(200).json({ text });
  } catch (error) {
    console.error("OPENAI ERROR:", error);
    return res.status(500).json({
      text: "INTERNAL_SERVER_ERROR",
    });
  }
}
