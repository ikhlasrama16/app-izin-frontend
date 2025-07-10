import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import moment from "moment";
import useToast from "../../hooks/useToast";

export default function AjukanIzinPage() {
  const [jenis, setJenis] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const { showSuccess, showError, showWarning } = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jenis || !tanggalMulai || !tanggalSelesai) {
      return showWarning("Semua field wajib diisi");
    }

    if (moment(tanggalMulai).isAfter(tanggalSelesai)) {
      return showWarning(
        "Tanggal mulai tidak boleh lebih besar dari tanggal selesai"
      );
    }

    try {
      await api.post("/izin", {
        jenis,
        tanggalMulai,
        tanggalSelesai,
        keterangan,
      });

      showSuccess("Izin berhasil diajukan");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data);
      showError(error.response?.data?.message || "Gagal mengajukan izin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajukan Izin</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Izin
            </label>
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Jenis</option>
              <option value="cuti">Cuti</option>
              <option value="sakit">Sakit</option>
              <option value="libur">Izin Pribadi</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Mulai
              </label>
              <input
                type="date"
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Selesai
              </label>
              <input
                type="date"
                value={tanggalSelesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
                className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keterangan (opsional)
            </label>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Tulis keterangan tambahan..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold shadow"
          >
            Kirim Izin
          </button>
        </form>
      </div>
    </div>
  );
}
