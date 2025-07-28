import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function WorkoutSave() {
  const [workoutDate, setWorkoutDate] = useState("");
  const [memo, setMemo] = useState("");
  const [sets, setSets] = useState([
    { exerciseName: "", setNumber: 1, reps: 0, weight: 0 },
  ]);

  const handleSubmit = async () => {
    try {
      await axios.post("/log/save", {
        workoutDate,
        memo,
        sets,
      });
      alert("등록 완료");
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">운동 일지 등록</h2>

      <input
        type="date"
        className="w-full border p-2"
        value={workoutDate}
        onChange={(e) => setWorkoutDate(e.target.value)}
      />

      <textarea
        className="w-full border p-2"
        placeholder="메모"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      {sets.map((set, index) => (
        <div key={index} className="border p-2 rounded space-y-1">
          <input
            className="w-full border p-1"
            placeholder="운동 이름"
            value={set.exerciseName}
            onChange={(e) => updateSet(index, "exerciseName", e.target.value)}
          />

          <input
            type="number"
            className="w-full border p-1"
            placeholder="세트 수"
            value={set.setNumber}
            onChange={(e) => updateSet(index, "setNumber", e.target.value)}
          />

          <input
            type="number"
            className="w-full border p-1"
            placeholder="반복 수"
            value={set.reps}
            onChange={(e) => updateSet(index, "reps", e.target.value)}
          />
          <input
            type="number"
            className="w-full border p-1"
            placeholder="무게 (kg)"
            value={set.weight}
            onChange={(e) => updateSet(index, "weight", e.target.value)}
          />
        </div>
      ))}

      <button
        className="w-full bg-green-500 text-white py-2 rounded"
        onClick={() =>
          setSets(...sets, {
            exerciseName: "",
            setNumber: 1,
            reps: 0,
            weight: 0,
          })
        }
      >
        + 운동 세트 추가
      </button>

      <button
        className="w-full bg-blue-500 text-white py-2 rounded"
        onClick={handleSubmit}
      >
        등록
      </button>
    </div>
  );

  function updateSet(index, field, value) {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  }
}
