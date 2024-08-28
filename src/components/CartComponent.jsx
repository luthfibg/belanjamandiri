import React , { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box, Paper, Typography, ButtonGroup, Button, Modal, Snackbar, Stack, IconButton, TextField } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import SaveIcon from '@mui/icons-material/Save';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import axios from 'axios'; // Pastikan axios di-import

function DeleteCartConfirmDialogRaw(props) {
    const { cart_id, product_id, product_cat, onClose, open, ...other } = props;

    const handleCancel = () => {
        onClose();
    };
    
    const handleOk = async () => {
        try {
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
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [quantity, setQuantity] = useState(cart.product_qty);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const customerId = localStorage.getItem('customer_id');

    const handleClickDelete = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    // Function untuk membuka snackbar
    const handleOpenSnackbar = () => setOpenSnackbar(true);

    // Function untuk menutup snackbar
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    // menghitung total harga berdasarkan jumlah yang dipilih
    const totalPrice = cart.product_price * quantity;

    const handleSaveEditCart = async () => {
        try {
          // Langsung kirim data ke backend, backend akan menangani pembuatan cart_id dan penyimpanan produk
          await axios.put(`http://localhost:2999/data/cart/${cart.cat_cart_id}`, {
            customerId: customerId,
            productId: cart.product_id,
            productCat: cart.product_cat,  // kategori produk: corporate atau c&i
            productQty: quantity,      // kuantitas produk
            productType: cart.product_type  // jenis produk
          });
      
          console.log('Product added to cart successfully');
          handleOpenSnackbar();
          handleClose();
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
    };
    
    

    if (!cart || !cart.product_image_1) {
        return null;
    }

    const cartButtons = [
        <Button key={1} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }}>Pesan</Button>,
        <Button key={2} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }} onClick={handleOpenModal}>Ubah</Button>,
        <Button key={3} variant="text" size="small" color="primary" style={{ textTransform: "capitalize" }}>Wishlistkan</Button>,
        <Button key={4} variant="text" size="small" color="error" style={{ textTransform: "capitalize" }} onClick={handleClickDelete}>Kembalikan</Button>
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '0.5px solid #aaa',
        boxShadow: 24,
        borderRadius: '0.5rem',
        p: 4,
     };
    
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
                    {/* Snackbar untuk menampilkan pesan berhasil */}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        message="Produk berhasil disimpan di keranjang"
                    />
                    { cart ? (
                        <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Box display={'flex'} alignItems={'start'} marginBottom={2}>
                                <img src={cart.product_image_1} alt={cart.product_type} style={{ width: 100, height: 100, margin: '0.5rem' }} />
                                <Box display="flex" flexDirection={'column'} ml={2} alignItems="start" sx={{ width: 'auto', height: 'auto' }}>
                                    <Typography id="modal-modal-title" fontSize={14} margin={'0.5rem'}>
                                    {cart.product_type}
                                    </Typography>
                                    <Typography id="modal-modal-subtitle" fontSize={14} margin={'0.5rem'} fontWeight={'bold'}>
                                    Rp &nbsp;{totalPrice}
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                    <Button size='small' variant="contained" onClick={handleSaveEditCart}> <SaveIcon fontSize='small'></SaveIcon>&nbsp; <Typography fontSize={12} textTransform={'capitalize'}>Simpan</Typography> </Button>
                                    </Stack>
                                </Box>
                                </Box>
                                <Box display="flex" alignItems="center" sx={{ width: 'auto', height: 'auto' }}>
                                <IconButton
                                    size="small"
                                    onClick={handleDecrease}
                                    disabled={quantity === 0}
                                    sx={{ borderRadius: 1 }}
                                >
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <TextField
                                    value={quantity}
                                    size="small"
                                    inputProps={{
                                        style: { textAlign: 'center', width: 40, padding: '5px 0' }
                                    }}
                                    sx={{ mx: 1 }}
                                    onChange={(e) => setQuantity(e.target.value)} // Update quantity saat user mengubah input
                                />

                                <IconButton
                                    size="small"
                                    onClick={handleIncrease}
                                    sx={{ borderRadius: 1 }}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                                </Box>
                            </Box>
                        </Modal>
                                                       
                    ): 
                        <Typography>Memuat ...</Typography>
                    }
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
