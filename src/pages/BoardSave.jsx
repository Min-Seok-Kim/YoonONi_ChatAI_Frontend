import { useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export default function BoardSave() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const boardSave = async () => {
    try {
      await axios.post("/board/save", { title, content });
      alert("등록 완료");
      navigate("/board/select/all");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">✏️ 게시글 작성</h2>

        {/* 제목 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
          />
        </div>

        {/* 내용 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="내용을 입력하세요"
          />
        </div>

        {/* 버튼 */}
        <div className="text-right">
          <button
            onClick={boardSave}
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700 transition"
          >
            등록
          </button>
        </div>
      </div>
    </Layout>
  );
}
