import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import toast from "react-hot-toast";
moment.locale("id");

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
      toast.success("Izin berhasil dibatalkan");
      onClose(true); // trigger refresh
    } catch (err) {
      toast.error("Gagal membatalkan izin");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus izin ini secara permanen?")) return;
    try {
      await fetch(`http://localhost:5000/api/izin/${izin._id}/permanent`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Izin berhasil dihapus");
      onClose(true); // refresh list
    } catch (err) {
      toast.error("Gagal menghapus izin");
    }
  };

  // Menutup modal jika klik di luar konten modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id === "modal-overlay") {
        onClose();
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [onClose]);

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        {/* Tombol X kanan atas */}
        <button
          onClick={() => onClose()}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 text-center">
          Detail Izin
        </h3>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Jenis:</span> {izin.jenis}
          </p>
          <p>
            <span className="font-semibold">Tanggal:</span>{" "}
            {moment(izin.tanggalMulai).format("DD MMMM YYYY")} →{" "}
            {moment(izin.tanggalSelesai).format("DD MMMM YYYY")}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {izin.status}
          </p>
          {izin.komentarVerifikator && (
            <p>
              <span className="font-semibold">Komentar Verifikator:</span>{" "}
              {izin.komentarVerifikator}
            </p>
          )}
          <p>
            <span className="font-semibold">Keterangan:</span>{" "}
            {izin.keterangan || "-"}
          </p>
        </div>

        {bolehEdit && (
          <div className="flex justify-center mt-6 gap-3 flex-wrap">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
            >
              Batalkan
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
