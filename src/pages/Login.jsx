import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8084/login", {
        userId,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("jwt", token);
      alert("로그인 성공!");
    } catch (error) {
      alert("로그인 실패! " + (error.response?.data?.message || ""));
    }
  };

  return (
    // 전체 페이지를 감싸는 Flex Container
    <div className="flex flex-col min-h-screen">
      {/* 로그인 폼 콘텐츠 */}
      <main className="flex-grow max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

        <input
          className="w-full border p-2 mb-2"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          로그인
        </button>
      </main>

      {/* 푸터는 항상 하단에 위치 */}
      <Footer />
    </div>
  );
}
