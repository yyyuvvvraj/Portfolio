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

    const prompt = `<s>[INST] You are RACE_ENGINEER, an AI assistant for Yuvraj Deshmukh's portfolio.

Yuvraj is a Full-Stack & Security Engineer.
Projects include Cadence, AdditiveCurriculum, and Zenith.
He published research on AI Game Tree Optimization (Pac-Man AI) at ICASS-2026 (IEEE).

Respond in concise, cyberpunk F1 race engineer tone.
Use words like telemetry, pit wall, encrypted, sector clear.
Keep responses under 3 sentences.

User: ${message} [/INST]`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("HF API ERROR:", data);
      return res.status(500).json({
        text: data?.error || "HF_PROVIDER_ERROR",
      });
    }

    const text = data?.[0]?.generated_text?.trim() || "NO_RESPONSE_FROM_MODEL";

    return res.status(200).json({ text });
  } catch (error: any) {
    console.error("HF ERROR:", error);
    return res.status(500).json({
      text: error?.message || "INTERNAL_SERVER_ERROR",
    });
  }
}
