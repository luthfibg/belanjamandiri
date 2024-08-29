import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log('productId from useParams:', productId); // Tambahkan logging di sini
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:2999/data/products/${productId}`);
        console.log('Product data:', response.data); // Tambahkan logging di sini
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

  return (
    <>
    <Box>
        <Typography variant="h4">Product Details</Typography>
        <Typography variant="h5">{product.product_type}</Typography>
        <img src={product.product_image_1} alt={product.product_type} />
        <Typography variant="body1">Price: Rp {product.product_price}</Typography>
        <Typography variant="body1">Category: {product.product_cat}</Typography>
        <Typography variant="body1">Subcategory: {product.product_subcat}</Typography>
        <Typography variant="body1">{product.product_description}</Typography>
    </Box>
    </>
  );
};

export default DetailProduct;
