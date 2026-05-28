import { useEffect, useState } from "react";
import api from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import StatsCard from "../../components/StatsCard";
import Button from "../../components/Button";

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
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  }}
>
  <StatsCard
    title="Clients"
    value={stats.users.clients}
  />

  <StatsCard
    title="Workers"
    value={stats.users.workers}
  />

  <StatsCard
    title="Pending Workers"
    value={stats.users.pendingWorkers}
  />

  <StatsCard
    title="Bookings"
    value={stats.bookings}
  />

  <StatsCard
    title="Contracts"
    value={stats.contracts}
  />

  <StatsCard
    title="Training"
    value={stats.training}
  />

  <StatsCard
    title="Total Revenue"
    value={`KES ${stats.revenue.totalRevenue}`}
  />

  <StatsCard
    title="Company Revenue"
    value={`KES ${stats.revenue.companyRevenue}`}
  />
</div>
      )}

      {/* WORKER APPROVAL */}
      <h3>Pending Worker Approvals</h3>

      {workers.length === 0 ? (
        <p>No pending workers</p>
      ) : (
        workers.map((w) => (
          <Card key={w._id}>
            <p>
              {w.firstName} {w.lastName}
            </p>

            <p>{w.email}</p>

            <Button onClick={() => approveWorker(w._id)}>
              Approve
            </Button>

            <span style={{ marginLeft: 10 }}>
              <Button onClick={() => rejectWorker(w._id)}>
                Reject
              </Button>
            </span>
          </Card>
        ))
      )}
    </div>
    </MainLayout>
  );
}