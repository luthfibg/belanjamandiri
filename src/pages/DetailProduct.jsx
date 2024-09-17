import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from "@mui/material";
import CustomAppBar2 from "../components/CustomAppBar2";
import lightTheme from "../styles/lightTheme";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import axiosInstance from "../axiosConfig";

const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  let promotion = null;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:2999/data/products-sale/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    fetchProductDetails();
  }, [productId]);
  
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Redirect the user to the login page
    window.location.href = '/login-customer';
  }


  return (
    <>
    <CustomAppBar2
     handleOpenUserMenu={handleOpenUserMenu}
     anchorElUser={anchorElUser}
     handleCloseUserMenu={handleCloseUserMenu}
     settings={settings}
     logout={logout}
     />
    <Container maxWidth="md" sx={{ mt: 10, backgroundColor: lightTheme.palette.background.paper, borderRadius: 3, p: 5 }}>
      <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
        <Grid item xs={4} md={5}>
          <img src={product.product_image_1} alt={product.product_type} width={"100%"} style={{ borderRadius: 10 }} />
        </Grid>
        <Grid item xs={4} md={7}>
          <Box display={"flex"} ml={{ xs: 0, md: 2 }}>
            {product.product_cat === 'corporate' ? (
              <Typography variant="body1" color={lightTheme.palette.text.disabled}>Korporat</Typography>
            ): (
              <Typography variant="body1" color={lightTheme.palette.text.disabled}>Komersial & Industri</Typography>
            )}
            <Typography variant="body1" color={lightTheme.palette.text.disabled}>&nbsp;-&nbsp;</Typography>
            {product.product_subcat === 'interactive flat panel' ? (
              <Typography variant="body1" color={lightTheme.palette.text.disabled}>Interaktif Flat Panel</Typography>
            ): product.product_subcat === 'videotron' ? (
              <Typography variant="body1" color={lightTheme.palette.text.disabled}>Videotron</Typography>
            ) : (
              <Typography variant="body1" color={lightTheme.palette.text.disabled}>Kamera & Video Konferensi</Typography>
            )}
          </Box>

          <Box my={2} display={"flex"} justifyContent={"space-between"} ml={{ xs: 0, md: 2 }}>
            <Typography variant="h5" paddingRight={2}>{product.product_type}</Typography>
            {promotion === null ? (
              <Typography variant="body1" color={lightTheme.palette.text.disabled}>Tidak ada promo</Typography>
            ) : (
              <Chip label={promotion} color="primary" />
            )}
          </Box>
      
          <Box mb={1} ml={{ xs: 0, md: 2 }}>
            <Typography variant="h6" color="primary.main" fontWeight={"bold"}>Rp {parseInt(product.product_price).toLocaleString('id-ID')}</Typography>
          </Box>
          <Box mb={2} ml={{ xs: 0, md: 2 }}>
            <Card variant="outlined" sx={{ p: 2 }} elevation={0}>
              <CardContent>
                <Typography variant="body1">Category: {product.product_cat}</Typography>
                <Typography variant="body1">Subcategory: {product.product_subcat}</Typography>
                <Typography variant="body1">{product.product_description}</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box ml={{ xs: 0, md: 2 }} display={"flex"} justifyContent={"space-between"}>
            <Button variant="contained" color="primary" sx={{ width: "50%", marginRight:"0.5rem", textTransform: "capitalize" }}>
              <ShoppingCart />
              &nbsp; Keranjang
            </Button>
            <Button variant="outlined" color="primary" sx={{ width: "50%", marginLeft:"0.5rem", textTransform: "capitalize"}} >
              Pesan
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4} md={12}>
          <Typography variant="body1">{product.product_spec}</Typography>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default DetailProduct;
