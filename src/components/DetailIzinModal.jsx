import { useNavigate } from "react-router-dom";

export default function DetailIzinModal({ izin, onClose }) {
  const navigate = useNavigate();

  const bolehEdit = izin.status === "submitted" || izin.status === "revised";

  const handleEdit = () => {
    navigate(`/edit-izin/${izin._id}`);
    onClose();
  };

  const handleCancel = async () => {
    if (!confirm("Yakin ingin membatalkan izin ini?")) return;
    try {
      await fetch(`http://localhost:5000/api/izin/${izin._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Izin berhasil dibatalkan");
      onClose(true); // true = trigger refresh list
    } catch (err) {
      alert("Gagal membatalkan izin");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Detail Izin</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Jenis:</strong> {izin.jenis}
          </p>
          <p>
            <strong>Tanggal:</strong> {izin.tanggalMulai} →{" "}
            {izin.tanggalSelesai}
          </p>
          <p>
            <strong>Status:</strong> {izin.status}
          </p>
          {izin.komentarVerifikator && (
            <p>
              <strong>Komentar Verifikator:</strong> {izin.komentarVerifikator}
            </p>
          )}
          <p>
            <strong>Keterangan:</strong> {izin.keterangan || "-"}
          </p>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600"
          >
            Tutup
          </button>
          {bolehEdit && (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Batalkan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
