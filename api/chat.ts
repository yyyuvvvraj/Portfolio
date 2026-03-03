export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ text: "API_KEY_MISSING" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const message = body?.message;

    if (!message) {
      return res.status(400).json({ text: "NO_MESSAGE_RECEIVED" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "NO_RESPONSE_FROM_MODEL";

    return res.status(200).json({ text });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      text: "INTERNAL_SERVER_ERROR",
    });
  }
}
