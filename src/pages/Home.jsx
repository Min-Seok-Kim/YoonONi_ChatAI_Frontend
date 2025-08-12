import Layout from "./Layout";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/CustomCalendar.css";

export default function Home() {
  const [monthLog, setMonthLog] = useState(0);
  const [yearLog, setYearLog] = useState(0);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    axios
      .get("/log/count")
      .then((res) => setMonthLog(res.data))
      .catch((err) => console.error("불러오기 실패", err));
  }, []);

  useEffect(() => {
    axios
      .get("/log/count/year")
      .then((res) => setYearLog(res.data))
      .catch((err) => console.error("불러오기 실패", err));
  });

  const workoutDates = ["2025-08-05", "2025-08-22"];

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

          {/* 이번 년도 운동 횟수 */}
          <div className="bg-white shadow-md rounded-2xl p-6 h-32">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              이번 년도 운동 횟수
            </h2>
            <p className="text-3xl font-bold text-blue-500">{yearLog}</p>
          </div>

          {/* 이번 주 목표 달성률 */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex items-center h-40">
            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4">이번 주 목표 달성률</h2>
              <div className="w-full">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  70% 달성
                </p>
              </div>
            </div>

            <div className="w-px h-24 bg-gray-300 mx-6"></div>

            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4">이번 주 목표 설정하기</h2>
              <button>+</button>
            </div>
          </div>
        </div>

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
