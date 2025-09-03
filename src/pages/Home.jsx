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
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const [sets, setSets] = useState([
    { exerciseName: "", targetMuscle: "", setNumber: "", reps: "", weight: "" },
  ]);

  // 랜덤 이미지 상태
  const images = [
    "/workout1.jpg",
    "/workout2.jpg",
    "/workout3.jpg",
    "/workout4.jpg",
    "/workout5.jpg",
    "/workout6.jpg",
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const motivation = [
    '"클럽은 헬스클럽이다".',
    '"꾸준함이 완벽함을 만든다."',
    '"작은 습관이 큰 변화를 만든다."',
    '"우리가 늙어서 운동을 그만두는 것이 아니라, 우리가 운동을 그만두기 때문에 늙는 것이다."',
    '"사람이 자신의 몸이 가질 수 있는 아름다움과 강함을 알지 못하고 늙어 버리는 것은 안타까운 일이다."',
    '"독서는 마음을 위한 것이고, 운동은 몸을 위한 것이다."',
    '"우리가 반복적으로 하는 것이 우리 자신을 만든다. 그러므로 우수하다는 것은 행동이 아닌 습관이다."',
    '"운동하라. 잘 먹어라. 인내하라. 당신의 몸은 보답할 것이다."',
    '"운동은 사람의 몸과 감정과 정신력의 창조적 변화를 위한 약이다."',
    '"오늘 당신이 느끼는 고통은 내일 당신이 느낄 힘이 될 것이다."',
    '"변명을 늘어 놓는 것은 한 시간에 0칼로리 밖에 소모하지 않는다."',
    '"당신의 몸은 해 낼 수 있다. 당신의 마음만 설득하면 된다."',
    '"정확하게 반복하고 허세 없이 운동해라."',
    '"나를 배부르게 하는 것들이 나를 파괴한다."',
    '"운동이 끝나고 먹는 거까지가 운동이다."',
  ];

  const [selectMotivation, setSelectMotivation] = useState(motivation[0]);

  useEffect(() => {
    // 페이지 로드 시 랜덤 이미지 선택
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
    const randomMoti = Math.floor(Math.random() * motivation.length);
    setSelectMotivation(motivation[randomMoti]);
  }, []);

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
  }, []);

  const saveGoal = async () => {
    await axios
      .post("/goal", { weeklyGoal: Number(goal) })
      .then(() => {
        alert("목표가 저장되었습니다!");
        closeModal();
      })
      .catch((err) => console.error("목표 저장 실패", err));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveLog = async () => {
    try {
      await axios.post("");
    } catch (error) {}
  };

  const handleDateChange = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    const formatted = localDate.toISOString().split("T")[0];
    setValue(localDate);
  };

  function updateSet(index, field, value) {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  }

  return (
    <Layout>
      <section className="text-center py-12 bg-gray-50">
        <p className="italic mb-6">{selectMotivation}</p>
        <img
          src={selectedImage}
          alt="Motivation"
          className="w-64 rounded-lg shadow-md mx-auto"
        />
      </section>

      <section className="flex justify-center items-start gap-8 max-w-6xl mx-auto py-12">
        <div className="flex flex-col gap-6 w-80">
          <div className="bg-white shadow-md rounded-2xl p-6 h-32 flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold mb-2">이번 달 운동 횟수</h2>
            <p className="text-3xl font-bold text-blue-500">{monthLog}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 h-40 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-2">이번 주 목표 달성률</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${goalRate}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{goalRate}% 달성</p>
            <button
              className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              onClick={openModal}
            >
              목표 설정
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">운동 일지</h3>
            <button
              onClick={() => {
                setSets([
                  {
                    exerciseName: "",
                    targetMuscle: "",
                    setNumber: "",
                    reps: "",
                    weight: "",
                  },
                ]); // 초기화
                setMemo(""); // 메모도 초기화
                setIsLogModalOpen(true);
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              +
            </button>
          </div>

          <Calendar
            value={value}
            onChange={handleDateChange}
            formatDay={(locale, date) => date.getDate()}
            formatMonth={(locale, date) => date.getMonth() + 1}
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
      </section>

      {isLogModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96 max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-xl font-bold mb-4">
              {value.toISOString().slice(0, 10)} 운동 일지 작성
            </h2>

            <textarea
              className="w-full border p-2 mb-2"
              placeholder="메모"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />

            {sets.map((set, index) => (
              <div key={index} className="border p-2 rounded mb-2 space-y-1">
                <input
                  className="w-full border p-1"
                  placeholder="운동 이름"
                  value={set.exerciseName}
                  onChange={(e) =>
                    updateSet(index, "exerciseName", e.target.value)
                  }
                />
                <input
                  className="w-full border p-1"
                  placeholder="타겟 부위"
                  value={set.targetMuscle}
                  onChange={(e) =>
                    updateSet(index, "targetMuscle", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="w-full border p-1"
                  placeholder="세트 수"
                  value={set.setNumber}
                  onChange={(e) =>
                    updateSet(index, "setNumber", e.target.value)
                  }
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
              className="w-full bg-green-500 text-white py-2 rounded mb-2"
              onClick={() =>
                setSets([
                  ...sets,
                  {
                    exerciseName: "",
                    targetMuscle: "",
                    setNumber: "",
                    reps: "",
                    weight: "",
                  },
                ])
              }
            >
              + 운동 세트 추가
            </button>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsLogModalOpen(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={async () => {
                  try {
                    await axios.post("/log/save", {
                      workoutDate: value.toISOString().slice(0, 10),
                      memo,
                      sets,
                    });
                    alert("운동 일지가 저장되었습니다!");
                    setMemo("");
                    setSets([
                      {
                        exerciseName: "",
                        targetMuscle: "",
                        setNumber: "",
                        reps: "",
                        weight: "",
                      },
                    ]);
                    setIsLogModalOpen(false);
                  } catch (err) {
                    console.error(err);
                    alert("등록 실패");
                  }
                }}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
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
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 mr-2"
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
    </Layout>
  );
}
