import { useEffect, useState } from "react";
import api from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchWorkers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWorkers = async () => {
    try {
      const res = await api.get("/users/workers/pending");
      setWorkers(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const approveWorker = async (id) => {
    try {
      await api.put(`/users/approve/${id}`);
      fetchWorkers();
      fetchStats();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const rejectWorker = async (id) => {
    try {
      await api.put(`/users/reject/${id}`);
      fetchWorkers();
      fetchStats();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (loading) return <h2>Loading admin panel...</h2>;

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <h2>Admin Dashboard</h2>

      {/* STATS */}
      {stats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div>Clients: {stats.users.clients}</div>
          <div>Workers: {stats.users.workers}</div>
          <div>
            Pending Workers: {stats.users.pendingWorkers}
          </div>

          <div>Bookings: {stats.bookings}</div>
          <div>Contracts: {stats.contracts}</div>
          <div>Training: {stats.training}</div>

          <div>
            Total Revenue: {stats.revenue.totalRevenue}
          </div>

          <div>
            Company Revenue: {stats.revenue.companyRevenue}
          </div>
        </div>
      )}

      {/* WORKER APPROVAL */}
      <h3>Pending Worker Approvals</h3>

      {workers.length === 0 ? (
        <p>No pending workers</p>
      ) : (
        workers.map((w) => (
          <div
            key={w._id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <p>
              {w.firstName} {w.lastName}
            </p>

            <p>{w.email}</p>

            <button onClick={() => approveWorker(w._id)}>
              Approve
            </button>

            <button
              onClick={() => rejectWorker(w._id)}
              style={{ marginLeft: 10 }}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
    </MainLayout>
  );
}