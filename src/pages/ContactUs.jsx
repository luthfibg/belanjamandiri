import { Container, CssBaseline, Grid, Paper } from "@mui/material";
import React from "react";
import CustomAppBar2 from "../components/CustomAppBar2";

const ContactUs = () => {
    return (
        <>
        <CustomAppBar2 />
        <Container maxWidth="lg">
            <Paper elevation={3}></Paper>
        </Container>
        </>
    )
};

export default ContactUs;