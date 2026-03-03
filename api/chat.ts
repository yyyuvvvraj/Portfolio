export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.HF_API_KEY) {
      return res.status(500).json({ text: "HF_KEY_MISSING" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const message = body?.message;

    if (!message) {
      return res.status(400).json({ text: "NO_MESSAGE_RECEIVED" });
    }

    const prompt = `You are RACE_ENGINEER, an F1-style AI assistant.
Answer concisely in a cyberpunk race engineer tone.

User: ${message}`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 120,
            temperature: 0.7,
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("HF ERROR:", data);

      if (data?.error?.includes("loading")) {
        return res.status(200).json({
          text: "Model is warming up… retry in 5 seconds.",
        });
      }

      return res.status(500).json({
        text: data?.error || "HF_PROVIDER_ERROR",
      });
    }

    const text = data?.[0]?.generated_text || "NO_RESPONSE_FROM_MODEL";

    return res.status(200).json({ text });
  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      text: "Inference temporarily unavailable.",
    });
  }
}
