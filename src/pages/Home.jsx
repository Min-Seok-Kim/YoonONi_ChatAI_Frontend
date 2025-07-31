import Layout from "./Layout";

export default function Home() {
  return (
    <Layout>
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">헬스 챗봇에 오신 걸 환영합니다!</h1>
        <a href="/login" className="text-blue-500 underline mt-4 block">
          로그인하러 가기
        </a>
      </div>
    </Layout>
  );
}
