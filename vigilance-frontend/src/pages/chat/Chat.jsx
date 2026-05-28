import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // TEMP TEST USER
  // later comes from selected worker/client
  const receiverId =
    "PASTE_REAL_USER_ID_HERE";

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get(
        `/chat/${receiverId}`
      );

      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    try {
      await api.post("/chat", {
        receiver: receiverId,
        text,
      });

      setText("");

      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <h2>Messages</h2>

      <div style={styles.chatBox}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              ...styles.message,
            }}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) =>
            setText(e.target.value)
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
  },

  message: {
    background: "#FFFFFF",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  inputArea: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
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
  },
};