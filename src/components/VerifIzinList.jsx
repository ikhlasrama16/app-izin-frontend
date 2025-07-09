import { useEffect, useState } from "react";
import api from "../services/api";
import moment from "moment";
import { HiUser, HiCalendar } from "react-icons/hi";

export default function VerifIzinList() {
  const [izinList, setIzinList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedIzinId, setSelectedIzinId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [komentar, setKomentar] = useState("");

  const STATUS_UI = [
    { label: "Diterima", value: "accepted", color: "green" },
    { label: "Ditolak", value: "rejected", color: "red" },
    { label: "Revisi", value: "revised", color: "yellow" },
  ];

  const fetch = async () => {
    const res = await api.get("/verif/izin");
    setIzinList(res.data);
  };

  const handleStatus = (id, status) => {
    setSelectedIzinId(id);
    setSelectedStatus(status);
    setKomentar("");
    setShowModal(true);
  };

  const submitStatus = async () => {
    if (!komentar.trim()) return alert("Komentar wajib diisi");

    try {
      await api.patch(`/verif/izin/${selectedIzinId}`, {
        status: selectedStatus,
        komentar,
      });
      setShowModal(false);
      fetch(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengubah status");
    }
  };

  const filteredList = izinList.filter((izin) => {
    return filter === "all" || izin.status === filter;
  });

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Daftar Izin Masuk</h2>

      {/* Filter Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 border p-2 rounded w-full sm:w-60"
      >
        <option value="all">Semua</option>
        <option value="submitted">Belum diproses</option>
        {STATUS_UI.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {/* Card View */}
      <div className="space-y-3">
        {filteredList.map((izin) => (
          <div key={izin._id} className="bg-white shadow p-4 rounded-md border">
            <div className="flex items-center gap-2 text-blue-700 text-sm mb-1">
              <HiUser />
              {izin.user?.name}
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <HiCalendar />
              {moment(izin.tanggalMulai).format("DD MMM")} →{" "}
              {moment(izin.tanggalSelesai).format("DD MMM")}
            </div>
            <div className="text-sm font-medium mb-1 text-gray-800">
              Jenis Izin: {izin.jenis}
            </div>

            {/* Keterangan dari user */}
            {izin.keterangan && (
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Keterangan:</span>{" "}
                {izin.keterangan}
              </div>
            )}

            {/* Komentar dari verifikator */}
            {izin.komentarVerifikator && (
              <div className="text-sm text-gray-600 italic mb-1">
                <span className="font-semibold">Komentar Verifikator:</span>{" "}
                {izin.komentarVerifikator}
              </div>
            )}

            {/* Status */}
            <div
              className={`text-sm font-semibold mb-2 ${
                izin.status === "accepted"
                  ? "text-green-600"
                  : izin.status === "rejected"
                  ? "text-red-600"
                  : izin.status === "revised"
                  ? "text-yellow-600"
                  : "text-gray-600"
              }`}
            >
              Status: {izin.status}
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap gap-2">
              {STATUS_UI.map((s) => (
                <button
                  key={s.value}
                  disabled={["accepted", "rejected"].includes(izin.status)}
                  className={`text-white px-3 py-1 rounded text-sm ${
                    s.color === "green"
                      ? "bg-green-600"
                      : s.color === "red"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  } disabled:opacity-40`}
                  onClick={() => handleStatus(izin._id, s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Komentar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <h3 className="font-bold text-lg mb-3 capitalize">
              Komentar untuk {selectedStatus}
            </h3>
            <textarea
              className="w-full border p-2 rounded mb-4"
              placeholder="Masukkan komentar..."
              rows="4"
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Batal
              </button>
              <button
                onClick={submitStatus}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
