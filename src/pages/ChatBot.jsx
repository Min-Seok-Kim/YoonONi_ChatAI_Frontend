import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("/gpt/chat-bot", { content: input });

      const botMessage = {
        role: "assistant",
        content: res.data.choices[0].message.content,
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("ChatGPT: 오류:", error);
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "오류가 발생했습니다." },
      ]);

      setInput("");
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2>ChatGPT와 대화하기</h2>
        <div
          style={{
            border: "1px solid #ccc",
            padding: 10,
            height: 300,
            overflowY: "auto",
          }}
        >
          {chat.map((msg, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong>{msg.role === "user" ? "나" : "GPT"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 줄바꿈 방지
              handleSend(); // 전송
            }
          }}
          placeholder="무엇이든 물어보세요"
          style={{ width: "80%", resize: "none", padding: "8px" }}
        />

        <button onClick={handleSend}>보내기</button>
      </div>
    </Layout>
  );
};

export default ChatBot;
