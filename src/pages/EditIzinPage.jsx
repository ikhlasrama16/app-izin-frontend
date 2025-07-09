import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import moment from "moment";

export default function EditIzinPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [izin, setIzin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIzin = async () => {
    const res = await api.get("/izin");
    const found = res.data.find((i) => i._id === id);
    setIzin(found);
    setLoading(false);
  };

  useEffect(() => {
    fetchIzin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moment(izin.tanggalMulai).isAfter(izin.tanggalSelesai)) {
      return alert(
        "Tanggal mulai tidak boleh lebih besar dari tanggal selesai"
      );
    }
    try {
      await api.patch(`/izin/${id}`, {
        jenis: izin.jenis,
        tanggalMulai: izin.tanggalMulai,
        tanggalSelesai: izin.tanggalSelesai,
        keterangan: izin.keterangan,
      });
      alert("Izin berhasil diperbarui");
      navigate("/dashboard");
    } catch (err) {
      alert("Gagal mengupdate izin");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!izin) return <p>Izin tidak ditemukan</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Izin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Jenis Izin</label>
          <select
            className="border w-full p-2"
            value={izin.jenis}
            onChange={(e) => setIzin({ ...izin, jenis: e.target.value })}
          >
            <option value="Cuti">Cuti</option>
            <option value="Sakit">Sakit</option>
            <option value="Izin Pribadi">Izin Pribadi</option>
            <option value="Dinas Luar">Dinas Luar</option>
          </select>
        </div>
        <div>
          <label>Tanggal Mulai</label>
          <input
            type="date"
            className="border w-full p-2"
            value={izin.tanggalMulai}
            onChange={(e) => setIzin({ ...izin, tanggalMulai: e.target.value })}
          />
        </div>
        <div>
          <label>Tanggal Selesai</label>
          <input
            type="date"
            className="border w-full p-2"
            value={izin.tanggalSelesai}
            onChange={(e) =>
              setIzin({ ...izin, tanggalSelesai: e.target.value })
            }
          />
        </div>
        <div>
          <label>Keterangan</label>
          <textarea
            className="border w-full p-2"
            value={izin.keterangan}
            onChange={(e) => setIzin({ ...izin, keterangan: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
