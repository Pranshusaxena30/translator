import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { text, source, target } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({
      message: "Text is required."
    });
  }

  if (!target || typeof target !== "string") {
    return res.status(400).json({
      message: "Target language is required."
    });
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      message:
        "Google Translation API key is missing. Add GOOGLE_TRANSLATE_API_KEY to server/.env."
    });
  }

  const body = {
    q: text.trim(),
    target,
    format: "text"
  };

  if (source && source !== "auto") {
    body.source = source;
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Google Translation API error:", data.error || data);
      return res.status(response.status || 502).json({
        message:
          data?.error?.message ||
          "Google Translation API could not process the request."
      });
    }

    const translation = data?.data?.translations?.[0]?.translatedText;

    if (!translation) {
      return res.status(502).json({
        message: "No translated text was returned by the API."
      });
    }

    return res.json({
      translation,
      detectedSourceLanguage:
        data?.data?.translations?.[0]?.detectedSourceLanguage || null
    });
  } catch (error) {
    console.error("Translation request failed:", error);

    return res.status(502).json({
      message: "Could not connect to the translation service."
    });
  }
});

export default router;
