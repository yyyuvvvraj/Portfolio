export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const message = body?.message;

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

    console.log("GEMINI RAW RESPONSE:", JSON.stringify(data, null, 2));

    let text = "NO_RESPONSE_FROM_MODEL";

    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];

      if (candidate.content?.parts?.length > 0) {
        text = candidate.content.parts.map((p: any) => p.text).join("");
      } else if (candidate.output_text) {
        text = candidate.output_text;
      }
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ text: "INTERNAL_SERVER_ERROR" });
  }
}
