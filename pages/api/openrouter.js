export default async function handler(req, res) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL,
          "X-Title": process.env.NEXT_PUBLIC_SITE_NAME,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Error with OpenRouter API:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  