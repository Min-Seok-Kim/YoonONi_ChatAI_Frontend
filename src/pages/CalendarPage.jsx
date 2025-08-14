import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ko } from "date-fns/locale";
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Layout from "./Layout";
const locales = {
  ko: ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get("/log/select/all").then((res) => {
      const data = res.data.map((log) => ({
        title: log.memo,
        start: new Date(log.workoutDate),
        end: new Date(log.workoutDate),
        ...log,
      }));
      setEvents(data);
    });
  }, []);

  const handleSelectEvent = (event) => {
    console.log(event);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Layout>
      <div className="m-10">
        <h2 className="text-2xl font-bold mb-4">운동 캘린더</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          views={["month"]}
          defaultView="month"
        />
        {/* 모달 */}
        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 relative">
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
                onClick={closeModal}
              >
                ✖
              </button>
              <h3 className="text-xl font-semibold mb-2">운동 상세</h3>
              <p>
                <strong>날짜:</strong> {selectedEvent.workoutDate}
              </p>
              <p>
                <strong>메모:</strong> {selectedEvent.memo}
              </p>
              <div className="mt-4">
                {selectedEvent.sets.map((set, idx) => (
                  <div key={idx} className="mb-2 border-b pb-2">
                    <p>
                      <strong>운동명:</strong> {set.exerciseName}
                    </p>
                    <p>
                      <strong>타겟 부위:</strong> {set.targetMuscle}
                    </p>
                    <p>
                      <strong>무게:</strong> {set.weight}kg
                    </p>
                    <p>
                      <strong>횟수:</strong> {set.reps}회
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
