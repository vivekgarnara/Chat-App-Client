import './Chat.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { jwtDecode } from 'jwt-decode';

const socket = io.connect("http://localhost:3001");

export function Chat() {

  const [messageToSend, setMessageToSend] = useState("");
  const [storedMessages, setStoredMessages] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  const receiverId = location.state?.receiverId;

  const jwtToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(jwtToken);

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

  const handleBack = () => {
    navigate('/home');
  }

  return (
    <Container className="abc">
      <Navbar />
      <Container className='app-container'>
        <div className='upr-section'>
          <Button onClick={handleBack} sx={{ position: 'absolute', left: '0', top: '16px' }}>Back</Button>
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
          <button className="send-button" onClick={sendMessage}><SendRoundedIcon /></button>
        </div>
      </Container>
    </Container>
  );
}