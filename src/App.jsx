import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AjukanIzinPage from "./pages/AjukanIzinPage";
import EditIzinPage from "./pages/EditIzinPage";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ajukan-izin" element={<AjukanIzinPage />} />
      <Route path="/edit-izin/:id" element={<EditIzinPage />} />
    </Routes>
  );
}

export default App;
