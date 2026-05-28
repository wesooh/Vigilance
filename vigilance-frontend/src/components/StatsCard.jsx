import { colors } from "../styles/colors";

export default function StatsCard({
  title,
  value,
}) {
  return (
    <div style={styles.card}>
      <p style={styles.title}>{title}</p>

      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: colors.white,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  title: {
    color: colors.muted,
    marginBottom: "10px",
  },

  value: {
    color: colors.primary,
    margin: 0,
  },
};