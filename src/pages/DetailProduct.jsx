import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, Typography } from "@mui/material";
import CustomAppBar2 from "../components/CustomAppBar2";

const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:2999/data/products/${productId}`);
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
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4">Product Details</Typography>
      <Typography variant="h5">{product.product_type}</Typography>
      <img src={product.product_image_1} alt={product.product_type} width={"30%"} />
      <Typography variant="body1">Price: Rp {product.product_price}</Typography>
      <Typography variant="body1">Category: {product.product_cat}</Typography>
      <Typography variant="body1">Subcategory: {product.product_subcat}</Typography>
      <Typography variant="body1">{product.product_description}</Typography>
    </Container>
    </>
  );
};

export default DetailProduct;
