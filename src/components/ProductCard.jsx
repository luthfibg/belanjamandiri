import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Badge, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';

const ProductCard = ({ product }) => {
  const { product_type, product_cat, product_subcat, product_subcat2, product_price, product_tkdn_percentage, product_stars, product_image_1 } = product;

  const subCategory = product_cat === 'corporate' ? product_subcat : product_subcat2;

  console.log('Product image URL:', product_image_1);
  return (
    <Card style={{ position: 'relative', width: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={product_image_1} // Use the image URL directly
          alt={product_type}
          onError={(e) => { e.target.onerror = null; e.target.src = "default-image.png"; }} // Replace with a default image if there's an error
        />
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontSize={14}>{product_type}</Typography>
            {product_tkdn_percentage > 0 && (
              <Badge badgeContent="TKDN" color="error">
                <Typography variant="body2" style={{ color: 'white' }}>
                  {product_tkdn_percentage}%
                </Typography>
              </Badge>
            )}
          </div>
          <Typography variant="body2" color="textSecondary">{subCategory}</Typography>
          <Typography fontSize={14} fontWeight={'bold'}>Rp {product_price}</Typography>
          <Rating value={product_stars} readOnly />
        </CardContent>
      </CardActionArea>
      <IconButton style={{ position: 'absolute', top: -5, right: 5 }} color="secondary">
        <FavoriteIcon />
      </IconButton>
    </Card>
  );
};

export default ProductCard;
