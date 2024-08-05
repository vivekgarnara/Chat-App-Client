import * as React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import Navbar from '../Navbar/Navbar';

export function Home() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Our Platform
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 1, backgroundColor: '#f9f9f9', textAlign: 'center' }}>
                            <Link href="/profile" underline="none" color="inherit">
                                <Typography variant="h5" gutterBottom>
                                    Profile
                                </Typography>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 1, backgroundColor: '#f9f9f9', textAlign: 'center' }}>
                            <Link href="/chat-list" underline="none" color="inherit">
                                <Typography variant="h5" gutterBottom>
                                    Chats
                                </Typography>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
