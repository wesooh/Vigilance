import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import socket from "../../sockets/socket";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!message) return;

    const msgData = {
      text: message,
      sender: localStorage.getItem("role"),
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", msgData);

    setMessages((prev) => [...prev, msgData]);

    setMessage("");
  };

  return (
    <MainLayout>
      <h2>Messages</h2>

      {/* CHAT AREA */}
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,

              alignSelf:
                msg.sender ===
                localStorage.getItem("role")
                  ? "flex-end"
                  : "flex-start",

              background:
                msg.sender ===
                localStorage.getItem("role")
                  ? "#4CA621"
                  : "#FFFFFF",

              color:
                msg.sender ===
                localStorage.getItem("role")
                  ? "white"
                  : "black",
            }}
          >
            <p>{msg.text}</p>

            <small>{msg.time}</small>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Type message..."
        />

        <button
          style={styles.button}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </MainLayout>
  );
}

const styles = {
  chatBox: {
    background: "#D2D7DF",
    height: "65vh",
    padding: "20px",
    borderRadius: "12px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },

  message: {
    maxWidth: "70%",
    padding: "10px",
    borderRadius: "12px",
    marginBottom: "10px",
  },

  inputArea: {
    display: "flex",
    marginTop: "10px",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    background: "#4CA621",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};