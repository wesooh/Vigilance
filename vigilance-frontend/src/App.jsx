import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/client/Dashboard";
import WorkerDashboard from "./pages/worker/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/client" element={<ClientDashboard />} />
      <Route path="/worker" element={<WorkerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/client/messages" element={<Chat />} />
      <Route path="/worker/jobs" element={<Chat />} />
    </Routes>
  );
}

export default App;