import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] =
    useState(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 1. LOAD USERS (inbox list)
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/all"); 
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 2. LOAD CHAT WHEN USER SELECTED
  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(
        `/chat/${selectedUser._id}`
      );

      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 3. SEND MESSAGE
  const sendMessage = async () => {
    if (!text || !selectedUser) return;

    try {
      await api.post("/chat", {
        receiver: selectedUser._id,
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
      <div style={styles.container}>
        {/* LEFT SIDEBAR (INBOX) */}
        <div style={styles.inbox}>
          <h3>Inbox</h3>

          {users.map((user) => (
            <div
              key={user._id}
              style={{
                ...styles.user,

                background:
                  selectedUser?._id === user._id
                    ? "#16437E"
                    : "#FFFFFF",

                color:
                  selectedUser?._id === user._id
                    ? "white"
                    : "black",
              }}
              onClick={() =>
                setSelectedUser(user)
              }
            >
              <p>
                {user.firstName} {user.lastName}
              </p>

              <small>{user.role}</small>
            </div>
          ))}
        </div>

        {/* RIGHT CHAT AREA */}
        <div style={styles.chatArea}>
          {!selectedUser ? (
            <h3>Select a user to chat</h3>
          ) : (
            <>
              <h3>
                Chat with {selectedUser.firstName}
              </h3>

              <div style={styles.chatBox}>
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    style={styles.message}
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
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px",
  },

  inbox: {
    width: "250px",
    background: "#FFFFFF",
    padding: "10px",
    borderRadius: "12px",
    height: "75vh",
    overflowY: "auto",
  },

  user: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  chatArea: {
    flex: 1,
    background: "#D2D7DF",
    padding: "10px",
    borderRadius: "12px",
  },

  chatBox: {
    height: "55vh",
    overflowY: "auto",
    padding: "10px",
  },

  message: {
    background: "#FFFFFF",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },

  inputArea: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
  },

  button: {
    background: "#4CA621",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
  },
};