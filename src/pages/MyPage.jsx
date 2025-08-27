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
          <div className="bg-white p-4">
            <h2 className="text-sm font-bold">아이디</h2>
          </div>

          <div className="bg-white p-4 flex flex-col">
            <h2 className="text-sm font-bold mb-2">비밀번호</h2>
            <div className="flex flex-col ml-10 gap-2">
              <input
                placeholder="새 비밀번호"
                className="p-1 border rounded-md border-gray-300 w-64"
              />
              <input
                placeholder="새 비밀번호 확인"
                className="p-1 border rounded-md border-gray-300 w-64"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
