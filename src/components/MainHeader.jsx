import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import AppsIcon from '@mui/icons-material/Apps';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PrintIcon from '@mui/icons-material/Print';
import { blueGrey } from "@mui/material/colors";

const MainHeader = () => {
    const userinfo = localStorage.getItem('customer_fname');
    return (
        <Box className="main-header" mb={5} sx={{ display: "flex", flexDirection: "column" }}>
            <Box className="main-header__top" sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                <Typography variant="subtitle" mb={1}>{`Selamat Datang, ${userinfo}`}</Typography>
                <Typography fontSize={12} variant="body2" mb={1}>Mau belanja apa sekarang?</Typography>
            </Box>
            <Stack className="main-header__bottom scrollable-container" direction="row" spacing={1} maxWidth={"100vw"} sx={{ overflow: "scroll" }}>
                <Chip label="Semua Kategori" variant="outlined" icon={<AppsIcon />} color="default" sx={{ bgcolor: blueGrey[50], cursor: "pointer" }} />
                <Chip label="Corporate" variant="outlined" icon={<ApartmentIcon />} color="primary" sx={{ bgcolor: blueGrey[50], cursor: "pointer" }}/>
                <Chip label="C&I" variant="outlined" icon={<HomeWorkIcon />} color="secondary" sx={{ bgcolor: blueGrey[50], cursor: "pointer" }}/>
                <Chip label="Interactive Display" variant="outlined" icon={<TouchAppIcon />} color="success" sx={{ bgcolor: blueGrey[50], cursor: "pointer" }}/>
                <Chip label="Smartboard" variant="outlined" icon={<SmartDisplayIcon />} color="warning" sx={{ bgcolor: blueGrey[50], cursor: "pointer" }}/>
                <Chip label="Kamera Vcon" variant="outlined" icon={<VideoCameraFrontIcon />} color="error" sx={{ bgcolor: blueGrey[50], cursor: "pointer" }}/>
                <Chip label="Printer Sublimasi" variant="outlined" icon={<PrintIcon />} color="info" sx={{ bgcolor: blueGrey[50], cursor: "pointer" }}/>
                <Chip label="Printer Inkjet" variant="outlined" icon={<PrintIcon />} color="error" sx={{ bgcolor: blueGrey[50], cursor: "pointer" }}/>
            </Stack>
        </Box>
    );
};

export default MainHeader;