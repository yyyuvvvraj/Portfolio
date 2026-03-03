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
    const provider = (process.env.AI_PROVIDER || "").toLowerCase();
    const ollamaModel = process.env.OLLAMA_MODEL || "llama3.2:3b";
    const ollamaHost = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";

    if (!openAiKey && !huggingFaceKey && !process.env.OLLAMA_MODEL) {
      return res.status(500).json({
        text: "MISSING_PROVIDER_CONFIG. Set OPENAI_API_KEY, HUGGINGFACE_API_KEY, or OLLAMA_MODEL.",
      });
    }

    const systemPrompt = `You are RACE_ENGINEER, an AI assistant for Yuvraj Deshmukh's portfolio.
Respond in a concise, slightly robotic, cyberpunk/F1 engineer persona.
Use terms like telemetry, encrypted, pit wall, sector clear.
Keep responses under 3 sentences`;

    if (openAiKey || huggingFaceKey) {
      const useOpenAI =
        provider === "openai" ? Boolean(openAiKey) : !huggingFaceKey && Boolean(openAiKey);
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
        : process.env.HUGGINGFACE_MODEL || "moonshotai/Kimi-K2-Instruct:novita";

      const completion = await client.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      const text =
        completion.choices?.[0]?.message?.content || "NO_RESPONSE_FROM_MODEL";
      return res.status(200).json({ text, provider: useOpenAI ? "openai" : "huggingface" });
    }

    const ollamaRes = await fetch(`${ollamaHost}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: ollamaModel,
        stream: false,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        options: { temperature: 0.7, num_predict: 150 },
      }),
    });

    if (!ollamaRes.ok) {
      const errText = await ollamaRes.text();
      return res
        .status(500)
        .json({ text: `OLLAMA_ERROR: ${errText || ollamaRes.statusText}` });
    }

    const ollamaData = (await ollamaRes.json()) as {
      message?: { content?: string };
    };
    const text = ollamaData?.message?.content || "NO_RESPONSE_FROM_MODEL";
    return res.status(200).json({ text, provider: "ollama" });
  } catch (error: any) {
    console.error("CHAT_PROVIDER_ERROR:", error);
    const details =
      error?.response?.data ||
      error?.error ||
      error?.message ||
      "INTERNAL_SERVER_ERROR";
    return res.status(500).json({
      text: `INTERNAL_SERVER_ERROR: ${typeof details === "string" ? details : JSON.stringify(details)}`,
    });
  }
}
