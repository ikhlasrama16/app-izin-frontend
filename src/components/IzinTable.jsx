export default function IzinTable({ izins }) {
  return (
    <table className="w-full table-auto border mt-6">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Nama</th>
          <th className="border p-2">Jenis</th>
          <th className="border p-2">Tanggal</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {izins.map((izin, i) => (
          <tr key={i} className="text-center">
            <td className="border p-2">{izin.user?.name || "-"}</td>
            <td className="border p-2">{izin.jenis}</td>
            <td className="border p-2">
              {izin.tanggalMulai} → {izin.tanggalSelesai}
            </td>
            <td className="border p-2 capitalize">{izin.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
