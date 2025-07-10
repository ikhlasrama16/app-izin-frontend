import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaCheckCircle, FaUserAlt } from "react-icons/fa";
import FilterTabs from "../../components/common/FilterTabs";
import useToast from "../../hooks/useToast";

const STATUS_OPTIONS = [
  { label: "Semua status", value: "all" },
  { label: "Verified", value: "verified" },
  { label: "Unverified", value: "unverified" },
];
export default function VerifUserList() {
  const [userList, setUserList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { showError } = useToast();

  const fetchUsers = async () => {
    try {
      const query =
        selectedStatus === "all"
          ? ""
          : `?verified=${selectedStatus === "verified"}`;
      const res = await api.get(`/verif/users${query}`);
      setUserList(res.data);
    } catch (err) {
      showError("Gagal mengambil data user");
    }
  };

  const handleVerify = async (id) => {
    try {
      await api.patch(`/verif/users/${id}/verify`, {
        status: true,
      });
      fetchUsers();
    } catch (err) {
      showError("Gagal memverifikasi user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedStatus]);

  return (
    <div className="min-h-screen py-8 px-4">
      <h2 className="text-xl font-bold mb-4">Daftar Pengguna</h2>

      <FilterTabs
        options={STATUS_OPTIONS}
        selected={selectedStatus}
        onChange={setSelectedStatus}
      />

      {/* List User */}
      <div className="space-y-4">
        {userList.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <FaUserAlt className="text-orange-500" />
              </div>
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>

            {user.isVerified ? (
              <FaCheckCircle className="text-green-500 text-xl" />
            ) : (
              <button
                onClick={() => handleVerify(user._id)}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Verifikasi
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
