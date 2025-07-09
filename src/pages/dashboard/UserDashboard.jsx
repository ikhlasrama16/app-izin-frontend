import { useState, useEffect } from "react";
import moment from "moment";
import { HiCalendar, HiLocationMarker } from "react-icons/hi";
import api from "../../services/api";
import { statusColor, formatStatus } from "../../utils/status";
import DetailIzinModal from "../../components/DetailIzinModal";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard({ user }) {
  const [izinList, setIzinList] = useState([]);
  const [selectedIzin, setSelectedIzin] = useState(null);

  const fetchIzin = async () => {
    const res = await api.get("/izin");
    setIzinList(res.data);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token
    navigate("/login"); // kembali ke halaman login
  };

  useEffect(() => {
    fetchIzin();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Hi, {user.name}</h2>

          {/* Tombol Profil & Logout */}
          <div className="space-x-2">
            <button
              onClick={() => navigate("/profil")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
            >
              Profil
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Tombol Ajukan */}
        <div className="flex justify-end">
          <Link
            to="/ajukan-izin"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md shadow"
          >
            + Ajukan Izin
          </Link>
        </div>

        {/* Riwayat */}
        <div>
          <h2 className="font-semibold text-lg text-gray-700 mb-3">
            Riwayat Izin
          </h2>

          {izinList.length === 0 ? (
            <p className="text-gray-500 text-sm py-5">
              Belum ada pengajuan izin
            </p>
          ) : (
            <div className="space-y-3">
              {izinList.map((izin) => (
                <div
                  key={izin._id}
                  onClick={() => setSelectedIzin(izin)}
                  className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-2 text-blue-600 text-sm">
                    <HiCalendar className="text-lg" />
                    {moment(izin.tanggalMulai).format(
                      "dddd, DD MMM YYYY"
                    )} → {moment(izin.tanggalSelesai).format("DD MMM")}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
                    <HiChatBubbleLeft className="text-lg" />
                    {izin.keterangan || "Tidak ada keterangan"}
                  </div>
                  <div
                    className={`mt-2 font-semibold text-sm ${statusColor(
                      izin.status
                    )}`}
                  >
                    Status: {formatStatus(izin.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal detail */}
      {selectedIzin && (
        <DetailIzinModal
          izin={selectedIzin}
          onClose={(refresh) => {
            setSelectedIzin(null);
            if (refresh) fetchIzin();
          }}
        />
      )}
    </div>
  );
}
