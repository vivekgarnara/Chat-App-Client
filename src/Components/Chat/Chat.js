import './Chat.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useNavigate } from 'react-router-dom';

const socket = io.connect("http://localhost:3001");

export function Chat() {

  const navigate = useNavigate();

  const [messageToSend, setMessageToSend] = useState("");
  const [storedMessages, setStoredMessages] = useState([]);

  const sendMessage = () => {
    if (messageToSend) {
      socket.emit("sendMessage", messageToSend);
      setMessageToSend("");
      setStoredMessages([...storedMessages, { type: "sent", content: messageToSend }]);
    }
  };

  useEffect(() => {
    socket.on("receivedMessage", (data) => {
      console.log(data);
      setStoredMessages((prevMessages) => [...prevMessages, { type: "received", content: data }]);
    });

    return () => {
      socket.off("receivedMessage");
    };
  }, [socket]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <div className="abc">
      <button onClick={handleLogout}>Logout</button>
      <div className='app-container'>
          <div className='upr-section'>
            <h2 className="section-title">Messages</h2>
            <ul className="message-list">
              {storedMessages.map((message, index) => (
                <li key={index} className={`message-item ${message.type === "sent" ? "sent" : "received"}`}>
                  <div className="message-content">{message.content}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className='bottom-section'>
            <input className="message-input" placeholder="Enter message" value={messageToSend} onChange={(event) => {
              setMessageToSend(event.target.value);
            }} />
            <button className="send-button" onClick={sendMessage}><SendRoundedIcon/></button>
          </div>
        </div>
    </div>
  );
}