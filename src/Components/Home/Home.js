import * as React from 'react';
import { Grid, Link } from '@mui/material';
import Navbar from '../Navbar/Navbar';

export function Home() {
    return (
        <div>
            <Navbar />
            <Grid container>
                <Grid item>
                    <Link href="/profile" variant="h5">
                        Profile
                    </Link>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Link href="/chat" variant="h5">
                        Chat
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}