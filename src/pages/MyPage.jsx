import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    birth: "",
    height: null,
    weight: null,
  });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [invalid, setInvalid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/mypage/select")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("불러오기 실패", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩 중...</div>;

  const handleChangePassword = async () => {
    if (password !== newPassword) {
      setInvalid("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.put("/mypage/change/password", { password, newPassword });
      alert("비밀번호가 변경되었습니다.");
      setPassword("");
      setNewPassword("");
      setInvalid("");
    } catch (error) {
      console.error("변경 실패.", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.delete("/mypage/delete");
      alert("탈퇴가 완료되었습니다.");
      navigate("/login");
      window.localStorage.removeItem("jwt");
    } catch (error) {
      console.error("탈퇴 실패.", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <Layout>
      <h2 className="font-bold p-3">마이페이지</h2>
      <div className="bg-gray-200 min-h-screen flex justify-center p-6">
        <div className="w-full max-w-2xl space-y-1">
          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">아이디</h2>
            <div className="ml-32">{user.userId}</div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">비밀번호</h2>
            <div className="flex flex-col gap-2 ml-28">
              <input
                type="password"
                placeholder="새 비밀번호"
                className="p-1 border rounded-md border-gray-300 w-96 mb-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                className="p-1 border rounded-md border-gray-300 w-96"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {invalid && <p className="text-red-500 text-sm">{invalid}</p>}
            </div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">이메일(e-mail)</h2>
            <div className="ml-20">{user.email}</div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">생년월일(birth)</h2>
            <div className="ml-20">{user.birthDate}</div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">키(height)</h2>
            <div className="ml-28">{user.heightCm}</div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">몸무게(weight)</h2>
            <div className="ml-20">{user.weightKg}</div>
          </div>

          <div className="flex justify-between">
            <button
              className="border rounded bg-white text-gray-800 border-gray-800 px-8 py-2"
              onClick={() => setIsModalOpen(true)}
            >
              회원탈퇴
            </button>
            <button
              className="border rounded text-white bg-gray-800 px-11 py-2"
              onClick={handleChangePassword}
            >
              저장
            </button>
          </div>
        </div>
      </div>

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
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleWithdraw}
              >
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
