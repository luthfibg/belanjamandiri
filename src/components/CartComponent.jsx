import React from "react";
import { Box, Paper, Typography, ButtonGroup, Button } from "@mui/material";

const cartButtons = [
    <Button key={1} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }}>Pesan</Button>,
    <Button key={2} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }}>Edit</Button>,
    <Button key={3} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }}>Wishlistkan</Button>,
    <Button key={4} variant="text" size="small" color="error" style={{ textTransform: "capitalize" }}>Hapus</Button>
]
const CartComponent = ({ cart }) => {

    if (!cart || !cart.product_image_1) {
        return null;
    }
    return (
        <Paper elevation={0} sx={{ width: "100%", display: "flex", justifyContent: "start", mb: 2 }}>
            <Box sx={{ m: 2, display: "flex" }} width={"100%"}>
                <img
                    src={cart.product_image_1}
                    alt={cart.product_type}
                    style={{ width: "100px", height: "100px" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }} ml={2} width={"100%"}>
                    <Typography fontSize={12}>{cart.product_type}</Typography>
                    <Typography fontSize={12}>TKDN: {cart.product_tkdn_percentage}</Typography>
                    <Typography fontSize={12}>Harga: {cart.product_price}</Typography>
                    <Typography fontSize={12}>Jumlah: {cart.product_qty}</Typography>
                    <Typography fontSize={12}>Harga: {cart.product_price}</Typography>
                </Box>
                <Box justifyContent={"end"} alignItems={"flex-end"}>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="Vertical button group"
                        variant="contained"
                        sx={{ boxShadow: "none" }}
                    >
                        {cartButtons}
                    </ButtonGroup>
                </Box>
            </Box>
        </Paper>
    );
};

export default CartComponent;