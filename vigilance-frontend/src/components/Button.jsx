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
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "200px",
  },
};

