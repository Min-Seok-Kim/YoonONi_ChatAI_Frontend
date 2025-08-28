import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";

export default function MyPage() {
  const [user, setUser] = useState({
    nickname: "헬창민석",
    profileImage: "/images/profile.png",
    goal: "주 3회 운동하기",
    achievement: 67,
    monthlyWorkout: 12,
  });

  useEffect(() => {
    // 나중에 API 붙일 자리
    // axios.get("/api/user/me").then(res => setUser(res.data));
  }, []);

  return (
    <Layout>
      <h2 className="font-bold p-3">마이페이지</h2>
      <div className="bg-gray-200 min-h-screen flex justify-center p-6">
        <div className="w-full max-w-2xl space-y-1">
          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">아이디</h2>
            <div className="ml-32">rladbsdnjs87</div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">비밀번호</h2>
            <div className="flex flex-col gap-2 ml-28">
              <input
                placeholder="새 비밀번호"
                className="p-1 border rounded-md border-gray-300 w-96 mb-2"
              />
              <input
                placeholder="새 비밀번호 확인"
                className="p-1 border rounded-md border-gray-300 w-96"
              />
            </div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">이메일(e-mail)</h2>
            <div className="ml-20">rladbsdnjs87@naver.com</div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">생년월일(birth)</h2>
            <div className="ml-20">1998-10-07</div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">키(height)</h2>
            <div className="ml-28">181.1</div>
          </div>

          <div className="bg-white p-4 flex items-center">
            <h2 className="text-sm font-bold">몸무게(weight)</h2>
            <div className="ml-20">78.2</div>
          </div>

          <div className="flex justify-between">
            <button className="border rounded bg-white text-gray-800 border-gray-800 px-8 py-2">
              회원탈퇴
            </button>
            <button className="border rounded text-white bg-gray-800 px-11 py-2">
              저장
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
