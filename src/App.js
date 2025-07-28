import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import WorkoutList from "./pages/WorkoutList";
import WorkoutSave from "./pages/WorkoutSave";

// App.js
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/log/select/all" element={<WorkoutList />} />
        <Route path="/log/save" element={<WorkoutSave />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
