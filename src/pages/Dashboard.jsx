import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import VerifikatorDashboard from "./verifikator/VerifikatorDashboard";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/findUser");
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  switch (user.role) {
    case "admin":
      return <AdminDashboard user={user} />;
    case "verifikator":
      return <VerifikatorDashboard user={user} />;
    default:
      return <UserDashboard user={user} />;
  }
}
