// Cart.jsx
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, CssBaseline, useMediaQuery
} from '@mui/material';
import CustomDrawer, { DrawerHeader } from '../components/CustomDrawer';
import CustomAppBar from '../components/CustomAppBar';  // import the CustomAppBar component
import { Grid, Stack, Button, Divider, Paper } from '@mui/material';
import CartComponent from '../components/CartComponent';
import axios from 'axios';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, isdesktop }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isdesktop ? (open ? `${drawerWidth}px` : 0) : 0,
    width: isdesktop ? (open ? `calc(100% - ${drawerWidth}px)` : '100%') : '100%',
  }),
);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:2999',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default function Cart() {
  const theme = useTheme();
  const isdesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const { customer_id } = useParams();
  const [cart, setCart] = React.useState([]);
  const [open, setOpen] = React.useState(isdesktop);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const token = localStorage.getItem('token');

  const settings = ['Account', 'Logout'];

  React.useEffect(() => {
    setOpen(isdesktop);
  }, [isdesktop]);

  // Navigate to shop page
  const navigateToShop = () => {
    navigate(`/shop/${customer_id}`);
    console.log('Navigate to shop with customer_id:', customer_id);
  };
  
  // Navigate to wishlist page
  const navigateToWishlist = () => {
    navigate(`/my_wishlist/${customer_id}`);
  };

  // open-closed drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  /**
   * Sets the anchor element for the user menu to the current target of the event.
   *
   * @param {Event} event - The event that triggered the function.
   * @return {void} This function does not return anything.
   */
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

  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(`/data/cart/${customer_id}`);
        setCart(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, [customer_id, token]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleOpenUserMenu={handleOpenUserMenu}
        anchorElUser={anchorElUser}
        handleCloseUserMenu={handleCloseUserMenu}
        settings={settings}
        logout={logout}
      />
      <CustomDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        isdesktop={isdesktop}
        navigateToShop={navigateToShop}
        navigateToWishlist={navigateToWishlist}/>
      <Main open={open} isdesktop={isdesktop}>
        <DrawerHeader />
        <Grid container spacing={2} height={'100%'}>
          <Grid item xs={12} md={9} sx={{ height: { xs:'auto', md: '60vh'}, paddingBottom: { xs: '10px', md: 0 }, paddingRight: { xs: 0, md: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Keranjangku</h2>
            </Box>
            <Divider sx={{ mb: 2 }} orientation='horizontal' />
            <Box>
              {
                cart.map((cart) => (
                  <CartComponent key={cart.cart_id} cart={cart} />
                ))
              }
            </Box>
          </Grid>
          <Grid item xs={12} md={3}
            sx={{
              position: { xs: 'relative', md: 'fixed' },
              bottom: { xs: 20, md: 'auto' },
              right: { xs: 0, md: 20 },
              width: { xs: '100%', md: 'calc(25% - 40px)' },
              zIndex: 1201,
              height: { xs: '120px', md: 'calc(100vh - 104px)' }
            }}>
            <Paper sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h2>Cart Summary</h2>
            </Paper>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
}
