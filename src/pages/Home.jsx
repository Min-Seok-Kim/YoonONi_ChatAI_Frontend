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
      <div className="flex gap-4">
        <div className="bg-white shadow-md rounded-2xl p-6 w-64">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            이번 달 운동 횟수
          </h2>
          <p className="text-3xl font-bold text-blue-500">{monthLog}회</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 w-64">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            이번 년도 운동 횟수
          </h2>
          <p className="text-3xl font-bold text-blue-500">{yearLog}회</p>
        </div>

        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={({ date }) => {
            const dateStr = date.toISOString().split("T")[0];
            if (workoutDates.includes(dateStr)) {
              return "workout-day";
            }
            return null;
          }}
        />
      </div>
    </Layout>
  );
}
