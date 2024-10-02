import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { capitalize } from 'lodash';
import axiosInstance from '../axiosConfig';

const ProductsList = ({searchTerm}) => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const customerId = localStorage.getItem('customer_id'); // Assume you store customer ID in local storage

  useEffect(() => {
    const fetchProducts = async () => {
      // console.log('token: ', token);
      try {
        const response = await axiosInstance.get('/data/products_sale', {
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

  const filteredProducts = products.filter((product) =>
    product.product_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizeProducts = () => {
    const categories = {};

    filteredProducts.forEach((product) => {
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
          <Typography fontSize={14} fontWeight={'bold'} color={'primary'} mb={2}>
            {category === 'ifp' ? 'Interaktif Flat Panel' : category === 'ppd' ? 'Panel Presentation Display' : category === 'led aio' ? 'Led All In One' : capitalize(category)}
          </Typography>
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
                  <ProductCard product={product} customerId={customerId} />
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
