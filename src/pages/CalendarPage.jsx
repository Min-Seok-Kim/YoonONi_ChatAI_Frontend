import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ko } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import axios from "../utils/axiosInstance";

const locales = {
    ko: ko
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

export default function CalendarPage() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        axios.get("/log/select/all")
            .then(res => {
                const data = res.data.map(log => ({
                    title: log.title,
                    start: new Date(log.workoutDate),
                    end: new Date(log.workoutDate)
                }));
                setEvents(data);
            });
    }, []);

    return (
    <div className="m-10">
      <h2 className="text-2xl font-bold mb-4">운동 캘린더</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={(event) => {
          alert(`운동: ${event.title}`);
          // 또는 해당 날짜 운동일지 상세 조회
        }}
      />
    </div>
  );
}


