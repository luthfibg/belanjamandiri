import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, CssBaseline, Divider, Grid, Paper, Stack, useMediaQuery, Button,
  Checkbox, FormControlLabel
} from '@mui/material';
import CustomDrawer, { DrawerHeader } from '../components/CustomDrawer';
import CustomAppBar from '../components/CustomAppBar';
import WishlistCard from '../components/WishlistCard';
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

export default function Wishlist() {
  const theme = useTheme();
  const isdesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const { customer_id } = useParams();
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get(`/data/wishlist/${customer_id}`);
        setWishlist(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishlist();
  }, [customer_id]);

  const [open, setOpen] = React.useState(isdesktop);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = ['Account', 'Logout'];

  React.useEffect(() => {
    setOpen(isdesktop);
  }, [isdesktop]);

  const navigateToShop = () => {
    navigate(`/shop/${customer_id}`);
    console.log('Navigate to shop with customer_id:', customer_id);
  };

  const navigateToCart = () => {
    navigate(`/my_cart/${customer_id}`);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login-customer';
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
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
      navigateToCart={navigateToCart} />

      <Main open={open} isdesktop={isdesktop} sx={{ height: 'auto' }}>
        <DrawerHeader />
        <Grid container spacing={2} height={'100%'}>
          <Grid item xs={12} md={9} sx={{ height: { xs:'auto', md: '60vh'}, paddingBottom: { xs: '10px', md: 0 }, paddingRight: { xs: 0, md: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>My Wishlist</h2>
              <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
                <Button variant="contained" color="primary">Move to Cart</Button>
                <Button variant="outlined" color="primary">Remove</Button>
              </Stack>
            </Box>
            <Divider sx={{ mb: 2 }} orientation='horizontal' />
            <Box>
              <FormControlLabel control={<Checkbox />} label="Pilih Semua" />
              {
                wishlist.map((wish) => (
                  <WishlistCard key={wish.wishlist_id} wish={wish} />
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
              <h2>Wishlist Summary</h2>
            </Paper>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
}
