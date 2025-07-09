import VerifIzinList from "../../components/VerifIzinList";

export default function VerifikatorDashboard({ user }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Halo Verifikator {user.name}</h2>
      <VerifIzinList />
    </div>
  );
}
