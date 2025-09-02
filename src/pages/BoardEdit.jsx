import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";

export default function BoardEdit() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", content: "" });

  // 기존 데이터 불러오기
  useEffect(() => {
    axios.get(`/board/select?id=${id}`).then((res) => {
      setForm({
        title: res.data.title,
        content: res.data.content,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/board/:${id}`, form);
      alert("게시글이 수정되었습니다.");
      navigate(`/board/select?id=${id}`); // 수정 후 상세 페이지로 이동
    } catch (err) {
      alert("수정 실패");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">게시글 수정</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          placeholder="제목"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded h-40"
          placeholder="내용"
        />
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          수정 완료
        </button>
      </div>
    </Layout>
  );
}
