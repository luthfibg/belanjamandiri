import React from "react";
import PropTypes from 'prop-types';
import { Box, Paper, Typography, ButtonGroup, Button } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import axios from 'axios'; // Pastikan axios di-import

function DeleteCartConfirmDialogRaw(props) {
    const { cart_id, product_id, product_cat, onClose, open, ...other } = props;

    const handleCancel = () => {
        onClose();
    };
    
    const handleOk = async () => {
        try {
            console.log("Cart ID:", cart_id, "Product ID:", product_id, "Product Cat:", product_cat);
            // Mengirimkan request delete cart item ke backend
            await axios.delete(`http://localhost:2999/data/cart/remove/${cart_id}`, {
                params: {
                    cartId: cart_id,
                    productId: product_id,
                    productCat: product_cat
                }
            });
            

            // Memperbarui UI atau melakukan refresh halaman
            window.location.reload(); // Refresh halaman setelah penghapusan berhasil
        } catch (error) {
            console.error("Error menghapus produk dari keranjang:", error);
        }

        onClose(); // Menutup dialog setelah penghapusan
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>Konfirmasi Kembalikan Produk</DialogTitle>
            <DialogContent>
                <Typography variant="body2">
                    Apakah anda yakin ingin mengembalikan produk ini?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>Tidak</Button>
                <Button onClick={handleOk}>Ya</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteCartConfirmDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    cart_id: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired,
    product_cat: PropTypes.string.isRequired,
};

const CartComponent = ({ cart }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickDelete = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    if (!cart || !cart.product_image_1) {
        return null;
    }

    const cartButtons = [
        <Button key={1} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }}>Pesan</Button>,
        <Button key={2} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }}>Edit</Button>,
        <Button key={3} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }}>Wishlistkan</Button>,
        <Button key={4} variant="text" size="small" color="error" style={{ textTransform: "capitalize" }} onClick={handleClickDelete}>Hapus</Button>
    ];

    return (
        <>
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
                    <Typography fontSize={12}>Subtotal: {cart.subtotal_price}</Typography>
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
                    <DeleteCartConfirmDialogRaw
                        key={cart.cart_id}
                        cart_id={cart.cart_id}
                        product_id={cart.product_id}
                        product_cat={cart.product_cat}
                        open={open}
                        onClose={handleClose}
                    />
                </Box>
            </Box>
        </Paper>
        </>
    );
};

export default CartComponent;
