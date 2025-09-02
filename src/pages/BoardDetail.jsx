import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export default function BoardDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
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

  const parseJwt = (token) => {
    try {
      const base64Payload = token.split(".")[1];
      const payload = atob(base64Payload);
      return JSON.parse(payload);
    } catch (error) {
      return null;
    }
  };

  const token = localStorage.getItem("jwt");
  const payload = parseJwt(token);
  const loginUserId = payload?.sub;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">{board.title}</h2>
        <p className="text-sm text-gray-600 mb-2">작성자: {board.userId}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400 mb-4">
            작성일: {board.writeAt?.slice(0, 10)}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (board.userId === loginUserId) {
                  navigate(`/board/edit?id=${id}`);
                } else {
                  alert("본인 게시글만 수정할 수 있습니다.");
                }
              }}
              className="border rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 mb-2"
            >
              수정
            </button>

            <button className="border rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 mb-2">
              삭제
            </button>
          </div>
        </div>

        <hr className="mb-4" />
        <div className="text-lg">{board.content}</div>
      </div>
    </Layout>
  );
}
