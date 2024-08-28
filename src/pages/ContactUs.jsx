import { Container, CssBaseline, Grid } from "@mui/material";
import React from "react";

const ContactUs = () => {
    return (
        <Container maxWidth="lg">
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>Contact Us</h1>
                </Grid>
                <Grid item xs={12}>
                    <p>Ini halaman Contact Us</p>
                </Grid>
            </Grid>
        </Container>
    )
};

export default ContactUs;