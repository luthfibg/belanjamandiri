// CustomAppBar.js
import * as React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Tooltip,
  Avatar, Menu, MenuItem, Box,
  Stack,
  Button
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';



export default function CustomAppBar2(props) {
    const { handleOpenUserMenu, anchorElUser, handleCloseUserMenu, settings, logout } = props;
    const { customer_id } = useParams(); // Mengambil customer_id dari URL
    const navigate = useNavigate();


  const handleNavToShop = () => {
    navigate(`/shop/${customer_id}`);
  };

  const handleNavToWishlist = () => {
    navigate(`/my_wishlist/${customer_id}`);
  };

  const handleNavToCart = () => {
    navigate(`/my_cart/${customer_id}`);
  }

  const handleNavToOrder = () => {
    navigate(`/my_order/${customer_id}`);
  }


  
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff', color: 'black' }} elevation={0}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Belanja Mandiri
        </Typography>
        <Stack direction="row" spacing={2}>
            <Button variant="text" color="primary" onClick={handleNavToShop} sx={{ textTransform: 'capitalize' }}>Belanja</Button>
            <Button variant="text" color="primary"  onClick={handleNavToWishlist} sx={{ textTransform: 'capitalize' }}>Wishlist</Button>
            <Button variant="text" color="primary" onClick={handleNavToCart} sx={{ textTransform: 'capitalize' }}>Keranjang</Button>
            <Button variant="text" color="primary" onClick={handleNavToOrder} sx={{ textTransform: 'capitalize' }}>Pesanan</Button>
        </Stack>
        <Box sx={{ display: 'flex', flexGrow: { xs: 0, md: 1 }, justifyContent: 'flex-end' }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="https://www.w3schools.com/w3images/avatar2.png" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={setting === 'Logout' ? logout : handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
