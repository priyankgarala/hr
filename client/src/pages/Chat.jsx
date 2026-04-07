import { useState } from "react";
import API from "../utils/axios";

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await API.post("/chat", { message });

      const botMsg = { role: "bot", text: res.data.reply };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen flex flex-col">
      <h1 className="text-2xl mb-4">HR Assistant 🤖</h1>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto mb-4 bg-gray-900 p-4 rounded">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`mb-2 ${
              c.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded ${
                c.role === "user"
                  ? "bg-white text-black"
                  : "bg-gray-700"
              }`}
            >
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 bg-gray-800"
          placeholder="Ask something..."
        />

        <button
          onClick={sendMessage}
          className="bg-white text-black px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;