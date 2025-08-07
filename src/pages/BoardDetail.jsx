import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";

export default function BoardDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios
      .get(`/board/select?id=${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => console.error("게시글 불러오기 실패", err));
  }, [id]);

  if (!board) {
    return (
      <Layout>
        <div className="p-8">로딩 중...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">{board.title}</h2>
        <p className="text-sm text-gray-600 mb-2">작성자: {board.userId}</p>
        <p className="text-sm text-gray-400 mb-4">
          작성일: {board.writeAt?.slice(0, 10)}
        </p>
        <hr className="mb-4" />
        <div className="text-lg">{board.content}</div>
      </div>
    </Layout>
  );
}
