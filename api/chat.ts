import OpenAI from "openai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const message = body?.message;

    if (!message) {
      return res.status(400).json({ text: "NO_MESSAGE_RECEIVED" });
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    const huggingFaceKey = process.env.HUGGINGFACE_API_KEY;

    if (!openAiKey && !huggingFaceKey) {
      return res.status(500).json({
        text: "MISSING_PROVIDER_KEY. Set OPENAI_API_KEY or HUGGINGFACE_API_KEY.",
      });
    }

    const useOpenAI = Boolean(openAiKey);
    const client = new OpenAI(
      useOpenAI
        ? { apiKey: openAiKey }
        : {
            apiKey: huggingFaceKey,
            baseURL: "https://router.huggingface.co/v1",
          },
    );

    const model = useOpenAI
      ? process.env.OPENAI_MODEL || "gpt-4o-mini"
      : process.env.HUGGINGFACE_MODEL || "openai/gpt-oss-120b:cerebras";

    const completion = await client.chat.completions.create({
      model,
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

    return res.status(200).json({ text, provider: useOpenAI ? "openai" : "huggingface" });
  } catch (error) {
    console.error("OPENAI ERROR:", error);
    return res.status(500).json({
      text: "INTERNAL_SERVER_ERROR",
    });
  }
}
