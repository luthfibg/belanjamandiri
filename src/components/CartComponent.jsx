import React from "react";
import { Box, Paper, Typography, ButtonGroup, Button } from "@mui/material";

const cartButtons = [
    <Button key={1} variant="contained" color="primary">Pesan</Button>,
    <Button key={2} variant="contained" color="primary">Edit</Button>,
    <Button key={3} variant="contained" color="primary">Pindah ke Wishlist</Button>,
    <Button key={4} variant="outlined" color="danger">Hapus</Button>
]
const CartComponent = ({ cart }) => {

    if (!cart || !cart.product_image_1) {
        return null;
    }
    return (
        <Paper elevation={0} sx={{ width: "100%", display: "flex", justifyContent: "start", mb: 2 }}>
            <Box sx={{ m: 2, display: "flex" }}>
                <img
                    src={cart.product_image_1}
                    alt={cart.product_type}
                    style={{ width: "100px", height: "100px" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }} ml={2}>
                    <Typography fontSize={12}>{cart.product_type}</Typography>
                    <Typography fontSize={12}>TKDN: {cart.product_tkdn_percentage}</Typography>
                    <Typography fontSize={12}>Harga: {cart.product_price}</Typography>
                    <Typography fontSize={12}>Jumlah: {cart.product_qty}</Typography>
                    <Typography fontSize={12}>Harga: {cart.product_price}</Typography>
                </Box>
                <Box>
                <ButtonGroup
                    orientation="vertical"
                    aria-label="Vertical button group"
                    variant="contained"
                >
                    {cartButtons}
                </ButtonGroup>
                </Box>
            </Box>
        </Paper>
    );
};

export default CartComponent;