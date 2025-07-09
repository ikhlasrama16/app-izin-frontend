import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import moment from "moment";

export default function AjukanIzinPage() {
  const [jenis, setJenis] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jenis || !tanggalMulai || !tanggalSelesai) {
      return alert("Semua field wajib diisi");
    }

    if (moment(tanggalMulai).isAfter(tanggalSelesai)) {
      return alert(
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

      alert("Izin berhasil diajukan");
      navigate("/dashboard"); // atau sesuai route dashboard-mu
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Gagal mengajukan izin");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-xl font-bold mb-4">Ajukan Izin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Jenis Izin</label>
          <select
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className="border w-full p-2 rounded"
          >
            <option value="">Pilih Jenis</option>
            <option value="cuti">Cuti</option>
            <option value="sakit">Sakit</option>
            <option value="libur">Izin Pribadi</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Tanggal Mulai</label>
          <input
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tanggal Selesai</label>
          <input
            type="date"
            value={tanggalSelesai}
            onChange={(e) => setTanggalSelesai(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Keterangan (opsional)
          </label>
          <textarea
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            className="border w-full p-2 rounded"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded font-semibold"
        >
          Kirim Izin
        </button>
      </form>
    </div>
  );
}
