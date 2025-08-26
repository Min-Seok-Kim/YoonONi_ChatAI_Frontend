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
      <h2 className="font-bold m-3"> 마이페이지 </h2>
      <section>
        <img src="..." alt="프로필 이미지" />
        <h3>손다니엘</h3>
      </section>
    </Layout>
  );
}
