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
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    if (!data.candidates || data.candidates.length === 0) {
      return res.status(200).json({
        text: "MODEL_RETURNED_NO_CANDIDATES",
      });
    }

    const text =
      data.candidates[0]?.content?.parts?.map((p: any) => p.text).join("") ||
      "EMPTY_MODEL_RESPONSE";

    return res.status(200).json({ text });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      text: "INTERNAL_SERVER_ERROR",
    });
  }
}
