// CustomDrawer.js
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
    Drawer, List, Divider, IconButton, ListItem, ListItemText, ListItemButton,
    Autocomplete, TextField, Button
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShopIcon from '@mui/icons-material/Shop';
import CallIcon from '@mui/icons-material/Call';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import StarRateIcon from '@mui/icons-material/StarRate';
import ListItemIcon from '@mui/material/ListItemIcon';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

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

function CustomDrawer(props) {
    const { open, handleDrawerClose, isdesktop, navigateToShop, navigateToWishlist, navigateToCart, navigateToContact, navigateToAbout } = props;
    const theme = useTheme();

    // Menu drawer
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
                        <ListItemButton onClick={index === 0 ? navigateToShop : index === 1 ? navigateToContact : index === 2 ? navigateToAbout : null}>
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
                    <ListItemButton onClick={index === 0 ? navigateToWishlist : index === 1 ? navigateToCart : null}>
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

    return (
        <Drawer
            variant={isdesktop ? "persistent" : "temporary"}
            open={open}
            onClose={handleDrawerClose}
            sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
    );
}

export { CustomDrawer as default, DrawerHeader };
