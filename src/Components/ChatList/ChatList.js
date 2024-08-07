import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import './ChatList.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export function ChatList() {
    const [chatUsers, setChatUsers] = useState([]);

    const jwtToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(jwtToken);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchChatUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/getChatUsers');
                setChatUsers(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchChatUsers();
    }, []);

    const handleUserChatClick = (receiver) => {
        navigate('/chat', { state: { receiver } });
    };

    return (
        <Container className="abcd">
            <Navbar />
            <Typography variant="h4" gutterBottom>
                Chat Users
            </Typography>
            <List>
                {chatUsers.map((user) => (
                    <div key={user._id}>
                        {user._id !== decodedToken.userId && (
                            <>
                                <ListItem button onClick={()=>handleUserChatClick(user)}>
                                    <ListItemText
                                        primary={`${user.firstName} ${user.lastName} (${user._id})`}
                                        secondary={user.email}
                                    />
                                </ListItem>
                                <Divider />
                            </>
                        )}
                    </div>
                ))}
            </List>
        </Container>
    );
}
