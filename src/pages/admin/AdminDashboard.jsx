import { useState } from "react";
import AdminUserList from "../../components/admin/AdminUserList";
import AdminIzinList from "../../components/admin/AdminIzinList";
import { Link, useNavigate } from "react-router-dom";
import HeaderUser from "../../components/common/HeaderUser";
import useFetch from "../../hooks/useFetch";

export default function AdminDashboard({ user }) {
  const { data: izinList, loading, error, refetch } = useFetch("/admin/izin");
  const [activeTab, setActiveTab] = useState("user");
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Gagal memuat data</p>;

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
    localStorage.removeItem("token"); // hapus token
    navigate("/login"); // kembali ke halaman login
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
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
            Manajemen User
          </button>
          <button
            onClick={() => setActiveTab("izin")}
            className={`flex-1 py-3 font-medium rounded-r-lg ${
              activeTab === "izin"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Data Izin
          </button>
        </div>
        <div className="flex justify-end items-center mt-2">
          <Link
            to="/tambah-verifikator"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-2 py-2 rounded-md shadow"
          >
            + Verifikator
          </Link>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "user" && <AdminUserList />}
          {activeTab === "izin" && <AdminIzinList izins={izinList} />}
        </div>
      </div>
    </div>
  );
}
