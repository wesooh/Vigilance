import { colors } from "../styles/colors";

export default function MainLayout({ children }) {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={{ color: colors.white }}>Vigilance</h2>

        <nav>
          <p style={styles.link}>Dashboard</p>
          <p style={styles.link}>Workers</p>
          <p style={styles.link}>Bookings</p>
          <p style={styles.link}>Messages</p>
          <p style={styles.link}>Settings</p>
        </nav>
      </div>

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

  sidebar: {
    width: "220px",
    background: "#0B2C59",
    padding: "20px",
  },

  content: {
    flex: 1,
    padding: "20px",
  },

  link: {
    color: "#FFFFFF",
    margin: "10px 0",
    cursor: "pointer",
  },
};