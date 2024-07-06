import { Container } from "@mui/material";
import React from "react";
import ProductsList from "../components/ProductList";
import AppBarStore from "../components/AppBarStore";

export default function Shop() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBarStore/>
            <Container sx={{ position: 'relative', flexGrow: 1, top: '84px' }}>
                <ProductsList/>
            </Container>
        </div>
    );
}