import { useState } from "react";
import axios from "../utils/axiosInstance";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("/login", { userId, password });
      localStorage.setItem("jwt", res.data.token);
      navigate("/");
    } catch (error) {
      alert("로그인 실패! " + (error.response?.data?.message || ""));
    }
  };

  const handleSignUp = async () => {
    try {
      axios.post("/signup");
    } catch (error) {}
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white px-5 py-4 flex justify-center items-center shadow-md">
        <h2 className="text-2xl font-bold">FitLog</h2>
      </header>
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
        <div className="flex justify-between">
          <button
            className="hover:underline"
            onClick={() => setIsModalOpen(true)}
          >
            회원가입
          </button>
          <button className="hover:underline">아이디•비밀번호 찾기</button>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">회원 탈퇴</h2>
            <p className="mb-4">정말 탈퇴하시겠습니까? 😢</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded">
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
