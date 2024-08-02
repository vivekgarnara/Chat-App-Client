import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box, Button, Container, CssBaseline, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';

const defaultTheme = createTheme();
const socket = io.connect("http://localhost:3001");

export function Profile() {
    const [user, setUser] = React.useState(null);
    // const [isFormUpdated, setIsFormUpdated] = React.useState(false);
    // const [initialUser, setInitialUser] = React.useState(user);
    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('token');
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    const handleBack = () => {
        navigate('/home');
    }

    const decodedToken = parseJwt(jwtToken);
    var userId = decodedToken.userId;

    React.useEffect(() => {
        // Fetch user profile initially
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/getUser/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3001/api/profileUpdate/${userId}`, user)
            .then(result => {
                console.log(result);
                toast.success('Profile updated successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                socket.emit("userUpdateNotify", user.email + " updates the profile");
                // setInitialUser(user);
            })
            .catch(error => {
                console.log(error);
                toast.error(`${error.response.data.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Button onClick={handleBack}>Back</Button>
            <Container component="main" maxWidth="xs">
                <ToastContainer />
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        My Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={user ? user.firstName : ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={user ? user.lastName : ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={user ? user.email : ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // disabled={!isFormUpdated}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}