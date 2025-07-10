import { useState } from "react";
import api from "../../services/api";
import moment from "moment";
import { HiCalendar, HiOutlineChat } from "react-icons/hi";
import FilterTabs from "../../components/common/FilterTabs";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const STATUS_OPTION = [
  { label: "Semua", value: "all" },
  { label: "Diterima", value: "accepted", color: "green" },
  { label: "Ditolak", value: "rejected", color: "red" },
  { label: "Revisi", value: "revised", color: "yellow" },
  { label: "Resubmitted", value: "resubmitted" },
];

export default function VerifIzinList() {
  const { data: izinList, loading, error, refetch } = useFetch("/verif/izin");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedIzinId, setSelectedIzinId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState();
  const [komentar, setKomentar] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Gagal memuat data</p>;

  const handleStatus = (id, status) => {
    setSelectedIzinId(id);
    setSelectedStatus(status);
    setKomentar("");
    setShowModal(true);
  };

  const submitStatus = async () => {
    if (!komentar.trim()) return toast("Komentar wajib diisi");
    try {
      await api.patch(`/verif/izin/${selectedIzinId}`, {
        status: selectedStatus,
        komentar,
      });
      setShowModal(false);
      fetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengubah status");
    }
  };

  const filteredList = izinList.filter((izin) =>
    filter === "all" ? true : izin.status === filter
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Filter */}
        <FilterTabs
          options={STATUS_OPTION}
          selected={filter}
          onChange={setFilter}
        />

        {/* List Izin */}
        <div className="space-y-4">
          {filteredList.map((izin) => (
            <div key={izin._id} className="bg-white p-4 rounded-md shadow-sm">
              <div className="text-sm text-blue-700 font-medium mb-1">
                {izin.user?.name}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <HiCalendar className="mr-1" />
                {moment(izin.tanggalMulai).format("dddd, DD MMM YYYY")} →{" "}
                {moment(izin.tanggalSelesai).format("DD MMM")}
              </div>
              <div className="text-sm text-gray-800 mb-1">
                <span className="font-semibold">Jenis Izin:</span> {izin.jenis}
              </div>
              {izin.keterangan && (
                <div className="text-sm text-gray-800 mb-1 flex items-start">
                  <HiOutlineChat className="mr-1 mt-0.5" />
                  {izin.keterangan}
                </div>
              )}
              {izin.komentarVerifikator && (
                <div className="text-sm italic text-gray-600 mb-1">
                  <span className="font-semibold">Komentar Verifikator:</span>{" "}
                  {izin.komentarVerifikator}
                </div>
              )}
              <div className="text-sm font-semibold mb-2">
                Status:{" "}
                <span
                  className={`${
                    izin.status === "accepted"
                      ? "text-green-600"
                      : izin.status === "rejected"
                      ? "text-red-600"
                      : izin.status === "revised"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {izin.status === "accepted"
                    ? "Diterima"
                    : izin.status === "rejected"
                    ? "Ditolak"
                    : izin.status === "revised"
                    ? "Revisi"
                    : izin.status}
                </span>
              </div>

              {/* Aksi */}
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTION.filter(
                  (s) => s.value !== "resubmitted" && s.value !== "all"
                ).map((s) => (
                  <button
                    key={s.value}
                    disabled={["accepted", "rejected"].includes(izin.status)}
                    onClick={() => handleStatus(izin._id, s.value)}
                    className={`text-white px-3 py-1 rounded text-sm ${
                      s.color === "green"
                        ? "bg-green-600 hover:bg-green-700"
                        : s.color === "red"
                        ? "bg-red-600 hover:bg-red-700"
                        : s.color === "yellow"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-gray-400"
                    } disabled:opacity-40`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Komentar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm space-y-4">
            <h2 className="text-lg font-bold text-center capitalize">
              Komentar untuk {selectedStatus}
            </h2>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="4"
              placeholder="Masukkan komentar..."
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={submitStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded"
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
