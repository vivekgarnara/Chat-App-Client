import './Chat.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const socket = io.connect("http://localhost:3001");

export function Chat() {

  const [messageToSend, setMessageToSend] = useState("");
  const [storedMessages, setStoredMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const receiver = location.state?.receiver;
  const receiverId = receiver._id;

  const jwtToken = localStorage.getItem('token');
  const decodedToken = jwtDecode(jwtToken);

  const senderId = decodedToken.userId;

  const sendMessage = () => {
    if (messageToSend) {
      socket.emit("sendMessage", { messageToSend, receiverId, senderId });
      setMessageToSend("");
      setStoredMessages([...storedMessages, { sender: senderId, receiver: receiverId, message: messageToSend }]);
    }
  };

  useEffect(() => {
    socket.on("receivedMessage", (data) => {
      if (data.receiverId === senderId) {
        setStoredMessages((prevMessages) => [...prevMessages, { sender: data.senderId, receiver: data.receiverId, message: data.messageToSend }]);
      }
      else {
        return;
      }
    });

    return () => {
      socket.off("receivedMessage");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("setup", senderId);
    socket.on("connected", () => setSocketConnected(true));

    socket.emit("joinRoom", receiverId);

    axios.get('http://localhost:3001/api/getMessages', {
      params: {
        senderId: senderId,
        receiverId: receiverId
      }
    }).then((response) => {
      setStoredMessages(response.data);
    }).catch((error) => console.log(error));

  }, [])

  const handleBack = () => {
    navigate('/chat-list');
  }

  return (
    <Container className="abc">
      <Navbar />
      <Container className='app-container'>
        <div className='upr-section'>
          <Button onClick={handleBack} sx={{ position: 'absolute', left: '0', top: '16px' }}>Back</Button>
          <h2 className="section-title">{receiver.firstName} {receiver.lastName}</h2>
          <ul className="message-list">
            {storedMessages.map((message, index) => (
              <li key={index} className={`message-item ${message.sender === senderId ? "sent" : "received"}`}>
                <div className="message-content">{message.message}</div>
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