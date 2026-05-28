import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ ...styles.toast, ...styles[type] }}>
      {message}
    </div>
  );
}

const styles = {
  toast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 16px",
    borderRadius: "8px",
    color: "white",
    zIndex: 9999,
  },

  success: {
    background: "#4CA621",
  },

  error: {
    background: "#B00020",
  },
};