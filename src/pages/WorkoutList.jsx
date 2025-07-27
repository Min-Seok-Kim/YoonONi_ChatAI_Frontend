import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios
      .get("/log/select/all")
      .then((res) => {
        setWorkouts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("불러오기 실패", err));
  }, []);

  return (
    <div className="max-w-x1 mx-auto mt-10">
      <h2 className="text-2xl font bold mb-4 text-cneter">운동 일지</h2>
      {workouts.length === 0 ? (
        <p className="text-center">운동 기록이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {workouts.map((w, idx) => (
            <li key={idx} className="border p-4 rounded">
              <p className="font-semibold text-lg">🗓️ {w.workoutDate}</p>
              <p className="mb-2 text-sm text-gray">매모: {w.memo}</p>
              <ul className="space-y-1">
                {w.sets.map((s, i) => (
                  <li key={i} className="pl-2 border-l-4 border-blue-300 m1-2">
                    <p>
                      <strong>{s.exericiseName}</strong> - {s.targetMuscle}
                    </p>
                    <p>
                      세트: {s.setNumber} / 반복: {s.reps} / 무게: {s.weight}kg
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
