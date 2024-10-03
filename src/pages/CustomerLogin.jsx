import { Box, Button, Container, Paper, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerLogin = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({ customer_email: "", customer_password: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnclickSave = async (e) => {
        e.preventDefault();
        try {
            if (!customer.customer_email || !customer.customer_password) {
                throw new Error("Email dan Password wajib diisi.");
            }
            const response = await axios.post("https://crm-sales-backend-production.up.railway.app/login-customer", {
                customer_email: customer.customer_email,
                customer_password: customer.customer_password
            }, {
                withCredentials: true,
            });
            console.log('Response from backend:', response.data);

            if (response.data && response.data.token && response.data.customer_id && response.data.customer_fname) {
                localStorage.setItem('token', response.data.token); 
                localStorage.setItem('customer_id', response.data.customer_id); 
                localStorage.setItem('customer_fname', response.data.customer_fname); 
                console.log('Customer saved:', response.data.customer_fname); 
                navigate(`/shop/${response.data.customer_id}`); 
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Error during login:', err.response?.data?.error || err.message);
            setError(err.response?.data?.error || err.message);
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            {error && (
                <Snackbar
                    open={true}
                    autoHideDuration={3000}
                    onClose={handleCloseError}
                    message={error}
                />
            )}
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '31ch' } }}
                noValidate
                autoComplete="off"
            >
                <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }} variant="h5">Selamat Datang Kembali</Typography>
                <Paper sx={{ height: '60vh', width: '80vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '0.4rem' }}>
                    <>
                        <TextField onChange={handleChange} type="email" name="customer_email" id="outlined-email" label="Alamat Email" sx={{ maxWidth: '90%' }} />
                        <TextField onChange={handleChange} name="customer_password" id="outlined-password" label="Password" type="password" sx={{ maxWidth: '90%' }} />
                    </>
                    <Box display={"flex"} justifyContent={"center"} marginTop={"1rem"}>
                        <Button onClick={handleOnclickSave} sx={{ width: '100%', mr: '1rem' }} variant="outlined">Masuk</Button>
                        <Button component={Link} to="/register-customer" sx={{ width: '100%', ml: '1rem' }} variant="outlined">Daftar</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default CustomerLogin;

// import * as React from 'react';
// import { AppProvider, SignInPage } from '@toolpad/core';
// import { useTheme } from '@mui/material/styles';
// // preview-start
// const providers = [
//   { id: 'github', name: 'GitHub' },
//   { id: 'google', name: 'Google' },
//   { id: 'facebook', name: 'Facebook' },
// ];

// // preview-end

// const signIn = async (provider) => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Sign in with ${provider.id}`);
//       resolve();
//     }, 500);
//   });
//   return promise;
// };

// export default function OAuthSignInPage() {
//   const theme = useTheme();
//   return (
//     // preview-start
//     <AppProvider theme={theme}>
//       <SignInPage signIn={signIn} providers={providers} />
//     </AppProvider>
//     // preview-end
//   );
// }
