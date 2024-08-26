import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Badge, IconButton, Modal, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import LaunchIcon from '@mui/icons-material/Launch';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import { capitalize } from 'lodash';
import axios from 'axios';

const ProductCard = ({ product, customerId }) => {
  const [favorite, setFavorite] = useState(false);
  const { product_type, product_cat, product_subcat, product_subcat2, product_price, product_tkdn_percentage, product_stars, product_image_1, product_id } = product;
  const subCategory = product_cat === 'corporate' ? product_subcat : product_subcat2;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
  const totalPrice = product_price * quantity;

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        console.log('Checking favorite for customer:', customerId, 'and product:', product_id);
        const response = await axios.get(`http://localhost:2999/data/wishlist/${customerId}/${product_id}`);
        setFavorite(response.data.isFavorite);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };
  
    checkIfFavorite();
  }, [customerId, product_id]);

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
  
  const handleFavoriteClick = async () => {
    try {
      console.log('CustomerID: ', customerId, 'ProductID: ', product_id, 'ProductCat: ', product_cat);
      if (!favorite) {
        await axios.post('http://localhost:2999/data/wishlist', {
          customerId: customerId,
          productId: product_id,
          productCat: product_cat
        });
        
        setFavorite(true);
        console.log('Product added to wishlist');
      } else {
        await axios.delete(`http://localhost:2999/data/wishlist/${customerId}/${product_id}`);
        setFavorite(false);
        console.log('Product removed from wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  
  /**
   * Fungsi untuk menambahkan produk ke keranjang
   * Data yang dikirimkan ke backend:
   *  - customerId: ID pelanggan
   *  - productId: ID produk
   *  - productCat: kategori produk (corporate atau c&i)
   *  - productQty: kuantitas produk yang akan ditambahkan
   *  - productType: jenis produk (optional)
   * Jika berhasil, maka akan menampilkan snackbar dan menutup modal.
   * Jika gagal, maka akan menampilkan pesan error di console.
   */

  // Fungsi untuk menambahkan produk ke keranjang
  const handleAddToCart = async () => {
    console.log('Product added to cart:', product);
  
    try {
      // Langsung kirim data ke backend, backend akan menangani pembuatan cart_id dan penyimpanan produk
      await axios.post('http://localhost:2999/data/cart', {
        customerId: customerId,
        productId: product_id,
        productCat: product_cat,  // kategori produk: corporate atau c&i
        productQty: quantity,      // kuantitas produk
        productType: product_type  // jenis produk
      });
  
      console.log('Product added to cart successfully');
      handleOpenSnackbar();
      handleClose();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
      
  const handleOrderNow = () => {
    console.log('Product ordered:', product);
  }

  const handleOpenCompletely = () => {
    console.log('Product opened:', product);
  }
    
  // console.log('Product image URL:', product_image_1);
  return (
    <Card style={{ position: 'relative', width: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={product_image_1} // Use the image URL directly
          alt={product_type}
          onError={(e) => { e.target.onerror = null; e.target.src = "default-image.png"; }} // Replace with a default image if there's an error
        />
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontSize={14} height={60} overflow={'hidden'} display={'-webkit-box'} sx={{ WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product_type}</Typography>
            {product_tkdn_percentage > 0 && (
              <Badge badgeContent={product_tkdn_percentage + '%'} color="error">
                <Typography variant="body2" style={{ color: 'white' }}>
                  {product_tkdn_percentage}%
                </Typography>
              </Badge>
            )}
          </div>
          <Typography variant="body2" color={'text.disabled'} mt={1}>
            {subCategory === 'ifp' ? 'Interaktif Flat Panel' : subCategory === 'ppd' ? 'Panel Presentation Display' : subCategory === 'led aio' ? 'Led All In One' : capitalize(subCategory)}
          </Typography>
          <Typography fontSize={14} fontWeight={'bold'}>Rp {product_price}</Typography>
          <Rating value={product_stars} readOnly size="small" />
          <ButtonGroup variant="contained" aria-label="Basic button group" size='small'>
            <Button onClick={handleOpen}>
              <ShoppingCart fontSize='small'></ShoppingCart>&nbsp;
              <Typography fontSize={12} textTransform={'capitalize'}>Keranjang</Typography>
            </Button>
            {/* Snackbar untuk menampilkan pesan berhasil */}
              <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message="Produk berhasil disimpan di keranjang"
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box display={'flex'} alignItems={'start'} marginBottom={2}>
                  <img src={product_image_1} alt={product_type} style={{ width: 100, height: 100, margin: '0.5rem' }} />
                  <Box display="flex" flexDirection={'column'} ml={2} alignItems="start" sx={{ width: 'auto', height: 'auto' }}>
                    <Typography id="modal-modal-title" fontSize={14} margin={'0.5rem'}>
                      {product_type}
                    </Typography>
                    <Typography id="modal-modal-subtitle" fontSize={14} margin={'0.5rem'} fontWeight={'bold'}>
                      Rp &nbsp;{totalPrice}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button size='small' variant="contained" onClick={handleAddToCart}> <ShoppingCart fontSize='small'></ShoppingCart>&nbsp; <Typography fontSize={12} textTransform={'capitalize'}>Simpan</Typography> </Button>
                      <Button size='small' variant="contained" onClick={handleOpenCompletely}> <LaunchIcon fontSize='small'></LaunchIcon>&nbsp; <Typography fontSize={12} textTransform={'capitalize'}>Selengkapnya</Typography> </Button>
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
            <Button onClick={handleOrderNow}> <Typography fontSize={12} textTransform={'capitalize'}>Pesan</Typography> </Button>
          </ButtonGroup>
        </CardContent>
      </CardActionArea>

      <IconButton style={{ position: 'absolute', top: -3, right: 0 }} onClick={handleFavoriteClick} color={favorite ? 'error' : 'primary'}>
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default ProductCard;
