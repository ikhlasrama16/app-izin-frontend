import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";

export default function ProfilePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const inisial = user?.name?.charAt(0)?.toUpperCase() || "?";
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useToast();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        User tidak ditemukan. Silakan login ulang.
      </div>
    );
  }

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      return showWarning("Semua field harus diisi");
    }

    try {
      await api.patch("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      showSuccess("Password berhasil diubah. Silakan login kembali.");
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }, 1500);

      return;
    } catch (err) {
      showError(err.response?.data?.message || "Gagal mengubah password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center justify-center">
          <div className="bg-blue-600 text-white text-4xl font-bold w-20 h-20 flex items-center justify-center rounded-full shadow">
            {inisial}
          </div>
        </div>

        {/* Info user */}
        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Tombol Reset Password */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
        >
          Ubah Password
        </button>
      </div>

      {/* Modal Reset Password */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm space-y-4">
            <h2 className="text-lg font-bold mb-2 text-center">
              Reset Password
            </h2>

            <input
              type="password"
              placeholder="Password Lama"
              className="w-full border rounded px-3 py-2"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password Baru"
              className="w-full border rounded px-3 py-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setOldPassword("");
                  setNewPassword("");
                }}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
