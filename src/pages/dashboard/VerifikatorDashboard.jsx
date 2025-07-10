import { useState } from "react";
import VerifIzinList from "../../components/VerifIzinList";
import VerifUserList from "../../components/VerifUserList";

export default function VerifikatorDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("user"); // 'user' | 'izin'

  const inisial = user?.name?.charAt(0).toUpperCase() || "V";

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-5 rounded-lg shadow flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Hi, {user?.name || "Verifikator"}
          </h1>
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold uppercase">
            {inisial}
          </div>
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
