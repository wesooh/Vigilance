import { useEffect, useState } from "react";
import api from "../../api/axios";

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
  if (!workers.length)
  return <h3>No workers available</h3>;

  return (
    <div style={{ padding: 20 }}>
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
          <div
            key={worker._id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <h4>
              {worker.firstName} {worker.lastName}
            </h4>

            <p>Category: {worker.category || "General"}</p>

            <p>
              Status:{" "}
              {worker.isOnline ? "🟢 Online" : "🔴 Offline"}
            </p>

            <button
              onClick={() => handleBook(worker._id)}
            >
              Hire Worker
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}