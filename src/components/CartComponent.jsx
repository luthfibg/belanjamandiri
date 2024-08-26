import React from "react";
import { Box, Paper, Typography } from "@mui/material";

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
            </Box>
        </Paper>
    );
};

export default CartComponent;