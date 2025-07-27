import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [userId, setUserId] = useState(""); // 사용자 ID 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  // 로그인 핸들러
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8084/login", {
        userId,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("jwt", token); // JWT 토큰을 localStorage에 저장
      alert("로그인 성공!");
    } catch (error) {
      alert("로그인 실패! " + (error.response?.data?.message || ""));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

      {/* 아이디 입력창 */}
      <input
        className="w-full border p-2 mb-2"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      {/* 비밀번호 입력창 */}
      <input
        className="w-full border p-2 mb-4"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* 로그인 버튼 */}
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        로그인
      </button>
    </div>
  );
}
