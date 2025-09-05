import React, { useState, useRef, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("/gpt/chat-bot", { content: input });
      const botMessage = {
        role: "assistant",
        content: res.data.choices[0].message.content,
      };
      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("ChatGPT 오류:", error);
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "오류가 발생했습니다." },
      ]);
    }
  };

  // 채팅 스크롤 자동 하단
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4 flex flex-col h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ChatGPT와 대화하기
        </h2>

        {/* 채팅 영역 */}
        <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-2">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[70%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="mt-4 flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="무엇이든 물어보세요"
            className="flex-1 border rounded-lg p-2 resize-none h-16"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            보내기
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ChatBot;
