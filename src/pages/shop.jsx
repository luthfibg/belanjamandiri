// Shop.js
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box, CssBaseline, useMediaQuery
} from '@mui/material';
import MainHeader from '../components/MainHeader';
import ProductsList from '../components/ProductList';
import CustomDrawer, { DrawerHeader } from '../components/CustomDrawer';
import CustomAppBar from '../components/CustomAppBar';  // import the CustomAppBar component

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, isDesktop }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isDesktop ? (open ? `${drawerWidth}px` : 0) : 0,
    width: isDesktop ? (open ? `calc(100% - ${drawerWidth}px)` : '100%') : '100%',
  }),
);

export default function Shop() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [open, setOpen] = React.useState(isDesktop);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = ['Account', 'Logout'];

  React.useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

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
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} isDesktop={isDesktop} />
      <Main open={open} isDesktop={isDesktop}>
        <DrawerHeader />
        <MainHeader />
        <ProductsList />
      </Main>
    </Box>
  );
}

Shop.propTypes = {
  window: PropTypes.func,
};
