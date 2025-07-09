import { useEffect, useState } from "react";
import IzinTable from "../../components/IzinTable";
import api from "../../services/api";

export default function AdminDashboard({ user }) {
  const [izinList, setIzinlist] = useState([]);

  useEffect(() => {
    api.get("/admin/izin").then((res) => {
      setIzinlist(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Welcome, {user.name}</h2>
      <IzinTable izins={izinList} />
    </div>
  );
}
