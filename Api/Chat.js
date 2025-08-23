import fetch from "node-fetch";

export default async function handler(req, res) {
  const { message } = req.body;
  const API_KEY = process.env.OPENROUTER_KEY; // safe environment variable

  if(!API_KEY){
    return res.status(500).json({ error: "API key missing. Set OPENROUTER_KEY in Vercel." });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
