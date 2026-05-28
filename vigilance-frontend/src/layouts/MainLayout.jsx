import { useState } from "react";
import { colors } from "../styles/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  const location = useLocation();
const navigate = useNavigate();

const { logout } = useContext(AuthContext);

const menus = {
  client: [
    {
      name: "Dashboard",
      path: "/client",
    },
    {
      name: "Messages",
      path: "/client/messages",
    },
    {
      name: "Bookings",
      path: "/client/bookings",
    },
  ],

  worker: [
    {
      name: "Dashboard",
      path: "/worker",
    },
    {
      name: "Jobs",
      path: "/worker/jobs",
    },
    {
      name: "Earnings",
      path: "/worker/earnings",
    },
  ],

  admin: [
    {
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "Workers",
      path: "/admin/workers",
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
    },
  ],
};

const role = localStorage.getItem("role");

  return (
    <div style={styles.container}>
      {/* MOBILE TOP BAR */}
      <div style={styles.mobileHeader}>
        <button
          style={styles.menuButton}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <h2 style={{ color: colors.white }}>
          Vigilance
        </h2>
      </div>

      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,

          left: open ? 0 : "-250px",
        }}
      >
        <h2 style={{ color: colors.white }}>
          Vigilance
        </h2>

        <nav>
  {menus[role]?.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      style={{
        textDecoration: "none",
      }}
    >
      <p
        style={{
          ...styles.link,

          background:
            location.pathname === item.path
              ? "#16437E"
              : "transparent",
        }}
      >
        {item.name}
      </p>
    </Link>
  ))}

  <button
    style={styles.logoutButton}
    onClick={() => {
      logout();
      navigate("/");
    }}
  >
    Logout
  </button>
</nav>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#D2D7DF",
  },

  mobileHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#0B2C59",
    padding: "12px 16px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },

  menuButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
  },

  sidebar: {
    width: "220px",
    background: "#0B2C59",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    transition: "0.3s",
    zIndex: 999,
  },

  content: {
    flex: 1,
    padding: "90px 20px 20px 20px",
    width: "100%",
  },

  link: {
  color: "#FFFFFF",
  margin: "10px 0",
  cursor: "pointer",
  padding: "10px",
  borderRadius: "8px",
},
};