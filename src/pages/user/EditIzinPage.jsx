import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import moment from "moment";
import toast from "react-hot-toast";

export default function EditIzinPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [izin, setIzin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIzin = async () => {
    try {
      const res = await api.get("/izin");
      const found = res.data.find((i) => i._id === id);

      if (found) {
        setIzin({
          ...found,
          tanggalMulai: moment(found.tanggalMulai).format("YYYY-MM-DD"),
          tanggalSelesai: moment(found.tanggalSelesai).format("YYYY-MM-DD"),
        });
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIzin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!izin.jenis || !izin.tanggalMulai || !izin.tanggalSelesai) {
      return toast("Semua field wajib diisi");
    }

    if (moment(izin.tanggalMulai).isAfter(izin.tanggalSelesai)) {
      return toast(
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

      toast.success("Izin berhasil diperbarui");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message); // log detail
      toast.error(err.response?.data?.message || "Gagal mengupdate izin");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!izin) return <p className="p-6 text-red-500">Izin tidak ditemukan</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Izin</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Izin
            </label>
            <select
              value={izin.jenis}
              onChange={(e) => setIzin({ ...izin, jenis: e.target.value })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Jenis</option>
              <option value="cuti">Cuti</option>
              <option value="sakit">Sakit</option>
              <option value="libur">Izin Pribadi</option>
              <option value="Dinas Luar">Dinas Luar</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Mulai
              </label>
              <input
                type="date"
                value={izin.tanggalMulai}
                onChange={(e) =>
                  setIzin({ ...izin, tanggalMulai: e.target.value })
                }
                className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Selesai
              </label>
              <input
                type="date"
                value={izin.tanggalSelesai}
                onChange={(e) =>
                  setIzin({ ...izin, tanggalSelesai: e.target.value })
                }
                className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keterangan (opsional)
            </label>
            <textarea
              value={izin.keterangan}
              onChange={(e) => setIzin({ ...izin, keterangan: e.target.value })}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Tulis keterangan tambahan..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold shadow"
          >
            Update Izin
          </button>
        </form>
      </div>
    </div>
  );
}
