import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 처음 마운트될 때 localStorage에서 상태 가져오기
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token); // token이 있으면 true
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // 로그아웃
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다.");
    } else {
      // 로그인 (예: 로그인 페이지로 이동 또는 테스트용 세팅)
      localStorage.setItem("jwt", "sampleToken"); // 임시로 넣어보기
      setIsLoggedIn(true);
      alert("로그인 되었습니다.");
    }
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">FitLog</h1>
      <nav className="space-x-6">
        <a href="#" className="hover:underline">
          운동기록
        </a>
        <a href="#" className="hover:underline">
          AI 챗봇
        </a>
        <button onClick={handleAuthClick} className="hover:underline">
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </nav>
    </header>
  );
}
