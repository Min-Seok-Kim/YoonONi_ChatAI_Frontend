export default function Header() {
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
        <a href="#" className="hover:underline">
          로그인
        </a>
      </nav>
    </header>
  );
}
