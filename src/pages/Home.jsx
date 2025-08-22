import Layout from "./Layout";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/CustomCalendar.css";

export default function Home() {
  const [monthLog, setMonthLog] = useState(0);
  const [value, setValue] = useState(new Date());
  const [goal, setGoal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalRate, setGoalRate] = useState("0");

  useEffect(() => {
    axios
      .get("/log/count/month")
      .then((res) => setMonthLog(res.data))
      .catch((err) => console.error("불러오기 실패", err));
  }, []);

  useEffect(() => {
    axios
      .get("/log/count/week")
      .then((res) => setGoalRate(res.data))
      .catch((err) => console.error("불러오기 실패", err));
  }, [goalRate]);

  const saveGoal = async () => {
    await axios
      .post("/goal", { weeklyGoal: Number(goal) })
      .then(() => {
        alert("목표가 저장되었습니다!");
        closeModal();
      })
      .catch((err) => console.error("목표 저장 실패", err));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-center items-start gap-6 max-w-6xl mx-auto">
        {/* 왼쪽 카드들 세로 정렬 */}
        <div className="flex flex-col gap-6 w-80">
          {/* 이번 달 운동 횟수 */}
          <div className="bg-white shadow-md rounded-2xl p-6 h-32">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              이번 달 운동 횟수
            </h2>
            <p className="text-3xl font-bold text-blue-500">{monthLog}</p>
          </div>

          {/* 이번 주 목표 달성률 */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex items-center h-40">
            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-xl font-bold">이번 주 목표 달성률</h2>
              <div className="w-full">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className="mt-3 bg-blue-500 h-4 rounded-full"
                    style={{ width: `${goalRate}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  {goalRate}% 달성
                </p>
              </div>
            </div>

            <div className="w-px h-24 bg-gray-300 mx-6"></div>

            <div className="flex-1 flex flex-col items-center">
              <div className="text-xl font-bold mb-4">
                이번 주 목표 설정하기
              </div>
              <button
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md hover:bg-blue-600"
                onClick={openModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed bg-black inset-0 bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96 h-56 relative">
              <h2 className="text-xl font-bold mb-4">이번 주 목표 설정</h2>
              <label className="block mb-2 font-medium text-gray-700">
                이번 주 목표 운동 횟수
              </label>
              <input
                type="number"
                min="1"
                className="border rounded-lg p-2 w-full mb-4"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                onClick={saveGoal}
              >
                저장
              </button>
              <button
                className="absolute top-2 right-5 text-gray-500 hover:text-black text-lg"
                onClick={closeModal}
              >
                ✖
              </button>
            </div>
          </div>
        )}

        {/* 오른쪽: 캘린더 */}
        <div>
          <Calendar
            formatDay={(locale, date) => date.getDate()} // 날짜: 숫자만
            formatMonth={(locale, date) => date.getMonth() + 1} // 월: 숫자만
            formatShortWeekday={(locale, date) =>
              ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
            }
            formatMonthYear={(locale, date) => {
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              return (
                <span
                  style={{
                    whiteSpace: "pre-line",
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  {year}년{"\n"}
                  <strong>{month}월</strong>
                </span>
              );
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
