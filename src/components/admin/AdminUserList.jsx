import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import useToast from "../../hooks/useToast";

const ROLE_OPTIONS = ["all", "user", "verifikator", "admin"];

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [resetUserId, setResetUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { showSuccess, showError } = useToast();

  const fetchUsers = async () => {
    try {
      const query = selectedRole === "all" ? "" : `?role=${selectedRole}`;
      const res = await api.get(`/admin/users${query}`);
      setUsers(res.data);
    } catch (err) {
      showError("Gagal mengambil data user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedRole]);

  const handlePromote = async (id) => {
    if (!confirm("Yakin ingin promote user ini jadi verifikator?")) return;
    try {
      await api.patch(`/admin/users/${id}/role`, { role: "verifikator" });
      showSuccess("User berhasil dipromosikan");
      fetchUsers();
    } catch (err) {
      showError("Gagal promote user");
    }
  };

  const handleReset = async (id) => {
    const newPassword = prompt("Masukkan password baru:");
    if (!newPassword) return;
    try {
      await api.patch(`/admin/users/${id}/password`, { newPassword });
      showSuccess("Password berhasil di-reset");
    } catch (err) {
      showError("Gagal reset password");
    }
  };

  const openResetModal = (userId) => {
    setResetUserId(userId);
    setNewPassword("");
    setShowModal(true);
  };

  const handleResetSubmit = async () => {
    if (!newPassword.trim()) return showError("Password tidak boleh kosong");
    try {
      await api.patch(`/admin/users/${resetUserId}/password`, {
        newPassword,
      });
      showSuccess("Password berhasil di-reset");
      setShowModal(false);
    } catch (err) {
      showError("Gagal reset password");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Daftar Semua Pengguna</h2>

      {/* Filter Button Group */}
      <div className="mb-4 flex flex-wrap gap-2">
        {ROLE_OPTIONS.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-1 rounded-full border text-sm font-medium ${
              selectedRole === role
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {role === "all"
              ? "Semua Role"
              : role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* Tabel */}
      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center font-medium text-gray-700">
                Nama
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">
                Role
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">
                Verifikasi
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      user.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {user.isVerified ? "Terverifikasi" : "Belum terverifikasi"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-between items-center w-full">
                    {/* 🔄 PROMOTE (kiri) */}
                    {user.role === "user" ? (
                      <button
                        onClick={() => handlePromote(user._id)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-semibold"
                      >
                        🔄 Promote
                      </button>
                    ) : (
                      <span />
                    )}

                    {/* 🔒 RESET PASSWORD (kanan) */}
                    <button
                      onClick={() => openResetModal(user._id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded text-xs font-semibold"
                    >
                      🔒 Reset
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Tidak ada pengguna dengan filter ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 w-80">
              <h2 className="text-lg font-bold mb-1">Reset Password</h2>
              <p className="text-sm text-gray-600 mb-3">
                User:{" "}
                <span className="font-semibold text-gray-800">
                  {users.find((u) => u._id === resetUserId)?.name || "Pengguna"}
                </span>
              </p>

              <input
                type="text"
                placeholder="Password baru"
                className="w-full border px-3 py-2 rounded mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleResetSubmit}
                  className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
