import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyIzinList() {
  const [izinList, setIzinlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIzin = async () => {
    const res = await api.get("/izin");
    setIzinlist(res.data);
    setLoading(false);
  };

  const handleCancel = async (id) => {
    if (!confirm("Yakin ingin membatalkan izin ini?")) return;
    await api.delete(`/izin/${id}`);
    fetchIzin();
  };

  useEffect(() => {
    fetchIzin();
  }, []);

  if (loading) return <p>Loading izin...</p>;

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-2">Daftar Izin Saya</h3>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Jenis</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {izinList.map((izin) => (
            <tr key={izin._id}>
              <td className="border p-2">{izin.jenis}</td>
              <td className="border p-2">
                {izin.tanggalMulai} → {izin.tanggalSelesai}
              </td>
              <td className="border p-2 capitalize">{izin.status}</td>
              <td className="border p-2 text-center space-x-2">
                {izin.status === "submitted" && (
                  <>
                    <button
                      className="text-blue-600 underline"
                      onClick={() => alert("Belum buat form update 🚧")}
                    >
                      Update
                    </button>
                    <button
                      className="text-red-600 underline"
                      onClick={() => handleCancel(izin._id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
