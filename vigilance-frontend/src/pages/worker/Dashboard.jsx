import { useEffect, useState } from "react";
import api from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    fetchWorkerProfile();
    fetchBookings();
    fetchEarnings();
  }, []);

  const fetchWorkerProfile = async () => {
    try {
      const res = await api.get("/user/profile"); // Change this to your exact profile route
      setIsOnline(res.data.isOnline);
    } catch (err) {
      console.log("Error fetching profile status:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/worker");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEarnings = async () => {
    try {
      const res = await api.get("/payments/worker");
      setEarnings(res.data.totalEarnings);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleAvailability = async () => {
    try {
      const res = await api.put("/availability/toggle");
      setIsOnline(res.data.isOnline);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const acceptBooking = async (id) => {
    try {
      await api.put(`/bookings/accept/${id}`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const rejectBooking = async (id) => {
    try {
      await api.put(`/bookings/reject/${id}`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <MainLayout>
    <div style={{ padding: 20 }}>
      <h2>Worker Dashboard</h2>

      {/* STATUS PANEL */}
      <div style={{ marginBottom: 20 }}>
        <h3>
          Status: {isOnline ? "🟢 Online" : "🔴 Offline"}
        </h3>

        <button onClick={toggleAvailability}>
          Toggle On Duty
        </button>

        <h3>Total Earnings: KES {earnings}</h3>
      </div>

      {/* BOOKINGS */}
      <h3>Incoming Bookings</h3>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <Card key={b._id}>
  <p>Client: {b.client?.firstName}</p>

  <p>Amount: {b.amount}</p>

  <p>Status: {b.status}</p>

  <Button onClick={() => acceptBooking(b._id)}>
    Accept
  </Button>

  <span style={{ marginLeft: 10 }}>
    <Button
      onClick={() => rejectBooking(b._id)}
    >
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