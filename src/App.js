import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const response = await fetch("http://127.0.0.1:8083/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: message })
      });

      const data = await response.json();

      const botMsg = { sender: "bot", text: data.data };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setMessage("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>My AI Chatbot 🤖</h2>

      <div style={{
        border: "1px solid #ccc",
        height: "400px",
        overflowY: "scroll",
        padding: "10px",
        marginBottom: "10px"
      }}>
        {chat.map((msg, index) => (
          <div key={index} style={{
            textAlign: msg.sender === "user" ? "right" : "left"
          }}>
           <div>
              <b>{msg.sender}:</b>
              <div style={{ whiteSpace: "pre-wrap" }}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
</div>
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ width: "75%", padding: "10px" }}
      />

      <button onClick={sendMessage} style={{ padding: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default App;