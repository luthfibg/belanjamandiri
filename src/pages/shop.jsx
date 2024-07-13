import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import {
    Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
    Divider, IconButton, ListItem, ListItemText, ListItemButton,
    useMediaQuery, Autocomplete, TextField,
    Button, Tooltip, Avatar, Menu, MenuItem, Paper, InputBase
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ShopIcon from '@mui/icons-material/Shop';
import CallIcon from '@mui/icons-material/Call';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import StarRateIcon from '@mui/icons-material/StarRate';
import DirectionsIcon from '@mui/icons-material/Directions';
import SearchIcon from '@mui/icons-material/Search';
import MainHeader from '../components/MainHeader';
import ProductsList from '../components/ProductList';

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

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#fff',
  color: 'black',
  boxShadow: '0 0px 5px rgba(100, 100, 100, 0.2)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: '#fff',
    color: 'black',
    boxShadow: '0 0px 5px rgba(100, 100, 100, 0.2)',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function ResponsivePersistentDrawer(props) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [open, setOpen] = React.useState(isDesktop);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = ['Account', 'Logout'];

  React.useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

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

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {['Belanja', 'Kontak Kami', 'Tentang Kami'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <ShopIcon /> : index === 1 ? <CallIcon /> : <InfoIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Wishlist', 'Keranjang', 'Pesanan', 'Diberi Rating'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <FavoriteIcon /> : index === 1 ? <ShoppingCartIcon /> : index === 2 ? <ViewStreamIcon /> : <StarRateIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={filterOptions}
        getOptionLabel={(option) => option.title}
        defaultValue={[filterOptions[2], filterOptions[3], filterOptions[4]]}
        renderInput={(params) => (
            <TextField {...params} label="Filter Pencarian" placeholder="Filter" />
        )}
        sx={{ width: '85%', margin: '1rem' }}
        />
        <Button sx={{ width: '85%', margin: '0 1rem 1rem 1rem' }} variant="contained">Cari</Button>
    </div>
  );

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
      <CustomAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Belanja Mandiri
          </Typography>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: 400, flexGrow: 1 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Kata Kunci Produk..."
              inputProps={{ 'aria-label': 'kata kunci produk' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <DirectionsIcon />
            </IconButton>
          </Paper>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton size="small" aria-label="show 4 new mails" color="inherit"></IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 1, marginRight: 0, justifyContent: 'flex-end' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={() => setting === 'Logout' ? logout() : null}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </CustomAppBar>
      <Drawer
        variant={isDesktop ? "persistent" : "temporary"}
        open={open}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Main open={open} isDesktop={isDesktop} sx={{  width: '100%', height: '100vh', overflow: 'scroll' }}>
        <DrawerHeader />
        <MainHeader/>
        <ProductsList/>
      </Main>
    </Box>
  );
}

ResponsivePersistentDrawer.propTypes = {
  window: PropTypes.func,
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const filterOptions = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
];