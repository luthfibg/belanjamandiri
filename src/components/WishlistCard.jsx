import { Box, Checkbox, Paper, Typography } from "@mui/material";
import React from "react";

const WishlistCard = ({ wish }) => {
    const [checked, setChecked] = React.useState(false);  
    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

    if (!wish || !wish.product_image_1) {
        return null;
    }

    return (
        <Paper elevation={0} sx={{ width: "100%", display: "flex", justifyContent: "start", mb: 2 }}>
            <Box sx={{ m: 2, display: "flex" }}>
                <Checkbox
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <img
                    src={wish.product_image_1}
                    alt={wish.product_type}
                    style={{ width: "100px", height: "100px" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }} ml={2}>
                    <Typography fontSize={12}>{wish.product_type}</Typography>
                    <Typography fontSize={12}>TKDN: {wish.product_tkdn_percentage}</Typography>
                    <Typography fontSize={12}>Harga: {wish.product_price}</Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default WishlistCard;
