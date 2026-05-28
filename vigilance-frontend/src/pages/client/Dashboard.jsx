import { useEffect, useState } from "react";
import api from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function Dashboard() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await api.get(
        "/availability/online-workers"
      );

      setWorkers(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleBook = async (workerId) => {
    try {
      await api.post("/bookings", {
        workerId,
        category: "General",
        bookingDate: new Date(),
        paymentMode: "daily",
        amount: 1000,
      });

      alert("Booking sent successfully");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (loading) return <h2>Loading workers...</h2>;
  if (!workers.length) return <h3>No workers available</h3>;

  return (
    <MainLayout>
      <h2>Client Dashboard</h2>

      <h3>Available Workers</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 10,
        }}
      >
        {workers.map((worker) => (
          <Card key={worker._id}>
            <h4>
              {worker.firstName} {worker.lastName}
            </h4>

            <p>Category: {worker.category || "General"}</p>

            <p>
              Status:{" "} 
              {worker.isOnline ? "🟢 Online" : "🔴 Offline"}
            </p>

            <Button onClick={() => handleBook(worker._id)}>
              Hire Worker
            </Button>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}