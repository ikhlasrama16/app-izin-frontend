import { useState } from "react";
import api from "../../services/api";

export default function IzinForm({ onSuccess }) {
  const [jenis, setJenis] = useState("cuti");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [error, setError] = useState("");

  const submitIzin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/izin", {
        jenis,
        tanggalMulai,
        tanggalSelesai,
        keterangan,
      });
      setJenis("cuti");
      setTanggalMulai("");
      setTanggalSelesai("");
      setKeterangan("");
      setError("");
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengajukan izin");
    }
  };
  return (
    <form
      onSubmit={submitIzin}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <h3 className="text-lg font-semibold">Ajukan Izin</h3>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium">Jenis Izin</label>
        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="cuti">Cuti</option>
          <option value="sakit">Sakit</option>
          <option value="libur">Libur</option>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm">Tanggal Mulai</label>
          <input
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm">Tanggal Selesai</label>
          <input
            type="date"
            value={tanggalSelesai}
            onChange={(e) => setTanggalSelesai(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm">Keterangan</label>
        <textarea
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          className="border p-2 w-full rounded"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Kirim
      </button>
    </form>
  );
}
