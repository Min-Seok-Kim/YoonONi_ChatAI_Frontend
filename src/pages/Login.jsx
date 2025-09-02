import { useState } from "react";
import axios from "../utils/axiosInstance";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [signUpData, setSignUpData] = useState({
    userId: "",
    password: "",
    email: "",
    gender: "",
    birthDate: "",
    heightCm: "",
    weightKg: "",
  });

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
      await axios.post("/signup", signUpData);
      alert("회원가입이 완료되었습니다.");
      setIsModalOpen(false);
    } catch (error) {
      alert("회원가입 실패: " + (error.response?.data?.message || ""));
    }
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <input
          className="w-full border p-2 mb-4"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-max relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
              onClick={closeModal}
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4 flex justify-center">
              회원 가입
            </h2>
            <h2 className="ml-2">아이디</h2>
            <input
              className="border p-2 m-2 w-full rounded"
              name="userId"
              value={signUpData.userId}
              onChange={handleSignUpChange}
            />

            <h2 className="ml-2 mt-2">비밀번호</h2>
            <input
              type="password"
              className="border p-2 m-2 w-full rounded"
              name="password"
              value={signUpData.password}
              onChange={handleSignUpChange}
            />

            <h2 className="ml-2 mt-2">이메일</h2>
            <input
              className="border p-2 m-2 w-full rounded"
              name="email"
              value={signUpData.email}
              onChange={handleSignUpChange}
            />

            <h2 className="ml-2 mt-2">성별</h2>
            <div className="flex gap-4 ml-2">
              <label>
                <input
                  type="radio"
                  className="mr-1"
                  name="gender"
                  value="M"
                  checked={signUpData.gender === "M"}
                  onChange={handleSignUpChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-1"
                  value="F"
                  name="gender"
                  checked={signUpData.gender === "F"}
                  onChange={handleSignUpChange}
                />
                여성
              </label>
            </div>

            <h2 className="ml-2 mt-2">생년월일</h2>
            <input
              type="date"
              className="border p-2 m-2 w-full rounded"
              name="birthDate"
              value={signUpData.birthDate}
              onChange={handleSignUpChange}
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <h2 className="ml-2 mt-2">키</h2>
                <input
                  className="border p-2 m-2 rounded w-full"
                  name="heightCm"
                  value={signUpData.heightCm}
                  onChange={handleSignUpChange}
                />
              </div>

              <div className="flex-1">
                <h2 className="ml-2 mt-2">몸무게</h2>
                <input
                  className="border p-2 m-2 rounded w-full"
                  name="weightKg"
                  value={signUpData.weightKg}
                  onChange={handleSignUpChange}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="border rounded bg-blue-500 text-white w-full p-2 m-2"
                onClick={handleSignUp}
              >
                가입 완료
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
