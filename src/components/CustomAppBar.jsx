// CustomAppBar.js
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Tooltip, Modal,
  Avatar, Menu, MenuItem, Paper, InputBase, Divider, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const drawerWidth = 240;

const CustomAppBarStyled = styled(AppBar, {
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

const SearchModalStyle = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '70%', md: '50%' },
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };

export default function CustomAppBar(props) {
  const { open, handleDrawerOpen, handleOpenUserMenu, anchorElUser, handleCloseUserMenu, settings, logout } = props;
  const [openSearch, setOpenSearch] = React.useState(false);
  // open-closed search modal for mobile screen
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);
  
  return (
    <CustomAppBarStyled position="fixed" open={open}>
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
          sx={{
            display: { xs: 'none', md: 'flex' },
            p: '2px 4px', alignItems: 'center', width: { xs: 300, md: 400 }, boxShadow: 0, border: '1px solid #ccc', borderRadius: '5px', flexGrow: 1,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <DirectionsIcon />
          </IconButton>
        </Paper>
        <IconButton 
            size="small" 
            onClick={handleOpenSearch}
            color="inherit"
            sx={{ flexGrow: 0.5, display: { xs: 'flex', md: 'none' } }}>
            <SearchIcon/>
        </IconButton>
        <Modal
            keepMounted
            open={openSearch}
            onClose={handleCloseSearch}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
            <Box sx={SearchModalStyle}>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', flexGrow: 1 }}
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
            </Box>
        </Modal>
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
    </CustomAppBarStyled>
  );
}
