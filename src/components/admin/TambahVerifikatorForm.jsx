// components/admin/TambahVerifikatorForm.jsx
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useToast from "../../hooks/useToast";

export default function TambahVerifikatorForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/admin/verifikator", form);
      showSuccess("Berhasil menambahkan verifikator");
      setForm({ name: "", email: "", password: "" });
      onSuccess?.();
      navigate("/dashboard");
    } catch (err) {
      showError(err.response?.data?.message || "Gagal menambahkan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Tambah Verifikator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              name="name"
              placeholder="Nama"
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Tambah Verifikator"}
          </button>
        </form>
      </div>
    </div>
  );
}
