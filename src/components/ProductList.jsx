import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('token: ', token);
      try {
        const response = await axios.get('http://localhost:2999/data/products_sale', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
        console.log('Products fetched:', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [token]);

  const categorizeProducts = () => {
    const categories = {};

    products.forEach((product) => {
      let categoryKey;

      if (product.product_cat === 'corporate') {
        categoryKey = product.product_subcat;
      } else if (product.product_cat === 'c&i') {
        categoryKey = product.product_subcat2;
      }

      if (categoryKey) {
        if (!categories[categoryKey]) {
          categories[categoryKey] = [];
        }
        categories[categoryKey].push(product);
      }
    });

    return categories;
  };

  const categories = categorizeProducts();

  return (
    <Box>
      {Object.keys(categories).map((category) => (
        <Box key={category} mb={4}>
          <Typography variant="h6" mb={2}>{category}</Typography>
          <Box
            sx={{
              display: 'flex',
              overflowX: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            <Grid container spacing={2} wrap="nowrap">
              {categories[category].map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProductsList;
