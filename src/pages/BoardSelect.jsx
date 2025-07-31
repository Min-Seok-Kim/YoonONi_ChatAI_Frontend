import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";
import { useEffect, useState } from "react";

export default function BoardSelect() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    axios
      .get("/board/select/all")
      .then((res) => {
        setBoard(res.data);
      })
      .catch((err) => console.error("불러오기 실패", err));
  }, []);
  const navigate = useNavigate();

  const boardSelectEvent = (id) => {
    navigate(`/board/select?id=${id}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">📌 게시판 목록</h2>
        <div className="grid grid-cols-3 font-semibold border-b border-gray-300 pb-2 mb-4">
          <div>제목</div>
          <div>작성자</div>
          <div>작성일</div>
        </div>

        {board.length === 0 ? (
          <p className="text-gray-500">게시글이 없습니다.</p>
        ) : (
          board.map((item) => (
            <div
              key={item.id}
              onClick={() => boardSelectEvent(item.id)}
              className="grid grid-cols-3 py-2 border-b border-gray-100 hover:bg-gray-100 transition"
            >
              <div className="truncate">{item.title}</div>
              <div>{item.userId}</div>
              <div>{item.writeAt?.slice(0, 10)}</div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
