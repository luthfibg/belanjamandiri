import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, Box, CardContent, CardMedia, Typography, Badge, IconButton, CardHeader } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';
import { capitalize } from 'lodash';
import axios from 'axios';

const ProductCard = ({ product, customerId }) => {
  const [favorite, setFavorite] = useState(false);
  const { product_type, product_cat, product_subcat, product_subcat2, product_price, product_tkdn_percentage, product_stars, product_image_1, product_id } = product;
  
  const subCategory = product_cat === 'corporate' ? product_subcat : product_subcat2;
  
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
  
  const handleFavoriteClick = async () => {
    try {
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
          <Rating value={product_stars} readOnly />
        </CardContent>
      </CardActionArea>

      <IconButton style={{ position: 'absolute', top: -3, right: 0 }} onClick={handleFavoriteClick} color={favorite ? 'error' : 'primary'}>
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default ProductCard;
