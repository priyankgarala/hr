const fetch = require("node-fetch");

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "MODEL HERE", // 🔥 fast + free
        messages: [
          {
            role: "system",
            content: "You are an HR assistant helping employees with queries.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("Groq Response:", data); // debug

    const reply =
      data.choices?.[0]?.message?.content || "No response from AI";

    res.json({ reply });
  } catch (err) {
    console.log("Groq Error:", err);

    res.json({
      reply: "AI is temporarily unavailable.",
    });
  }
};