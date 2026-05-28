import { colors } from "../styles/colors";

export default function Button({ children, onClick }) {
  return (
    <button style={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

const styles = {
  button: {
    background: "#4CA621",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};