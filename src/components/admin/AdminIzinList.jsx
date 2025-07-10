import { HiUser, HiCalendar } from "react-icons/hi";
import moment from "moment";

export default function AdminIzinList({ izins }) {
  return (
    <div className="space-y-4 mt-6">
      {izins.map((izin) => (
        <div
          key={izin._id}
          className="bg-white p-5 rounded-lg shadow-md border border-gray-100"
        >
          <div className="flex items-center gap-2 text-blue-700 text-sm mb-1">
            <HiUser />
            {izin.user?.name || "User tidak ditemukan"}
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <HiCalendar />
            {moment(izin.tanggalMulai).format("DD MMM")} →{" "}
            {moment(izin.tanggalSelesai).format("DD MMM")}
          </div>

          <div className="text-sm font-medium text-gray-800 mb-1">
            Jenis Izin: {izin.jenis}
          </div>

          {izin.keterangan && (
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Keterangan:</span>{" "}
              {izin.keterangan}
            </div>
          )}

          <div className="mb-1">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                izin.status === "accepted"
                  ? "bg-green-100 text-green-800"
                  : izin.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : izin.status === "revised"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {izin.status.toUpperCase()}
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Email:{" "}
            <span className="font-medium">{izin.user?.email || "-"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
