import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProfilePage from "./pages/user/ProfilPage";
import AjukanIzinPage from "./pages/user/AjukanIzinPage";
import EditIzinPage from "./pages/user/EditIzinPage";
import TambahVerifikatorForm from "./components/admin/TambahVerifikatorForm";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ajukan-izin" element={<AjukanIzinPage />} />
        <Route path="/tambah-verifikator" element={<TambahVerifikatorForm />} />
        <Route path="/edit-izin/:id" element={<EditIzinPage />} />
      </Routes>
    </>
  );
}

export default App;
