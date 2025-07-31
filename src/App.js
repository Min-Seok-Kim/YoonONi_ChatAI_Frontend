import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import WorkoutList from "./pages/WorkoutList";
import WorkoutSave from "./pages/WorkoutSave";
import CalendarPage from "./pages/CalendarPage";
import BoardSelect from "./pages/BoardSelect";
import BoardDetail from "./pages/BoardDetail";

// App.js
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/log/select/all" element={<CalendarPage />} />
        <Route path="/log/save" element={<WorkoutSave />} />
        <Route path="/board/select/all" element={<BoardSelect />} />
        <Route path="/board/select" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
