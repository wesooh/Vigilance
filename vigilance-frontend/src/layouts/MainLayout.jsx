import { useState } from "react";
import { colors } from "../styles/colors";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

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
          <p style={styles.link}>Dashboard</p>
          <p style={styles.link}>Workers</p>
          <p style={styles.link}>Bookings</p>
          <p style={styles.link}>Messages</p>
          <p style={styles.link}>Settings</p>
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
    margin: "14px 0",
    cursor: "pointer",
  },
};