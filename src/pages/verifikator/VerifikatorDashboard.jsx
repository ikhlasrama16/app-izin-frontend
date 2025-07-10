import { useState } from "react";
import VerifIzinList from "../../components/verifikator/VerifIzinList";
import VerifUserList from "../../components/verifikator/VerifUserList";
import HeaderUser from "../../components/common/HeaderUser";
import { useNavigate } from "react-router-dom";

export default function VerifikatorDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("user");
  const navigate = useNavigate();

  const getRoleLabel = (role) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "verifikator":
        return "Verifikator";
      case "user":
        return "Pengguna Biasa";
      default:
        return "Pengguna";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Hi, {user?.name || "Pengguna"}
            <span className="ml-2 text-sm text-gray-500 font-normal">
              ({getRoleLabel(user?.role)})
            </span>
          </h1>
          <HeaderUser navigate={navigate} handleLogout={handleLogout} />
        </div>

        {/* Tab Menu */}
        <div className="bg-white rounded-lg shadow flex justify-between">
          <button
            onClick={() => setActiveTab("user")}
            className={`flex-1 py-3 font-medium rounded-l-lg ${
              activeTab === "user"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Verifikasi Pengguna
          </button>
          <button
            onClick={() => setActiveTab("izin")}
            className={`flex-1 py-3 font-medium rounded-r-lg ${
              activeTab === "izin"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Verifikasi Izin
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "user" && <VerifUserList />}
          {activeTab === "izin" && <VerifIzinList />}
        </div>
      </div>
    </div>
  );
}
