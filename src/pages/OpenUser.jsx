import { Button, Container } from "@mui/material";
import React from "react";

export default function OpenPage() {
    return (
        <Container>
            <Button variant="contained" onClick={() => window.location.href = '/register-customer'}>Daftar</Button>
            <Button variant="contained" onClick={() => window.location.href = '/login-customer'}>Masuk</Button>
        </Container>
    );
}