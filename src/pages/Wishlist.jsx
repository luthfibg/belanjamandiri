// Shop.js
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, CssBaseline, useMediaQuery
} from '@mui/material';
import CustomDrawer, { DrawerHeader } from '../components/CustomDrawer';
import CustomAppBar from '../components/CustomAppBar';  // import the CustomAppBar component

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

export default function Wishlist() {
  const theme = useTheme();
  const isdesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const { customer_id } = useParams();

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
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} isdesktop={isdesktop} navigateToShop={navigateToShop} />
      <Main open={open} isdesktop={isdesktop}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
