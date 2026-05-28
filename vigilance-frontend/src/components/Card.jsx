import { colors } from "../styles/colors";

export default function Card({ children }) {
  return <div style={styles.card}>{children}</div>;
}

const styles = {
  card: {
    background: colors.white,
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "16px",
  },
};