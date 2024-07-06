import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerReg = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        customer_fname: "",
        customer_lname: "",
        customer_email: "",
        customer_password: "",
        customer_phone: "",
        customer_institution: "",
        customer_position: "",
        customer_address: "",
        customer_institution_address: "",
    });
    // const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnclickSave = async (e) => {
        e.preventDefault();
        console.log('Customer data being registered:', customer); // Logging customer data being sent
    
        try {
            // Mengirim data pelanggan ke server untuk pendaftaran
            const response = await axios.post("http://localhost:2999/register-customer", customer);
            console.log('Server response:', response.data); // Logging response data
    
            // Memeriksa apakah respons dari server valid
            if (response.data && response.data.token && response.data.customer_id && response.data.customer_fname) {
                // Menyimpan token, customer_id, dan customer_fname di localStorage
                localStorage.setItem('token', response.data.token); 
                localStorage.setItem('customer_id', response.data.customer_id); 
                localStorage.setItem('customer_fname', response.data.customer_fname); 
    
                console.log('Customer saved:', response.data.customer_fname); 
                
                // Mengarahkan pengguna ke halaman shop dengan customer_id
                navigate(`/shop/${response.data.customer_id}`); 
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Error during registration:', err.response?.data?.error || err.message);
        }
    };
        
    return (
        <Container maxWidth='lg' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1,'@media (min-width: 540px) and (max-width: 767.98px) and (orientation: portrait)': { width: 'calc(100%/2.15)'}, '@media (min-width: 768px)': { width: 'calc(100%/3.25)'}, width: '95%' } }}
                noValidate
                autoComplete="off"
            >
                <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }} variant="h5">Daftar</Typography>
                <Paper sx={{ height: '100vh', width:'90vw', '@media (min-width: 1200px)': { height: '60vh', width:'80vw'}, '@media (min-width: 768px) and (max-width: 1199px)': { height: '60vh', width:'90vw'}, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '0.4rem' }}>
                    <Box width={'95%'} sx={{ '@media (min-width: 768px) and (max-width: 1199px)': { width: '95%'} }} >
                        <TextField onChange={handleChange} name="customer_fname" id="outlined-customer-fname" label="Nama Depan" />
                        <TextField onChange={handleChange} name="customer_lname" id="outlined-customer-lname" label="Nama Belakang" />
                        <TextField onChange={handleChange} name="customer_email" id="outlined-customer-email" label="Alamat Email" type="email" />
                        <TextField onChange={handleChange} name="customer_password" id="outlined-customer-password" label="Buat Password" type="password" helperText="Minimal 8 karakter"/>
                        <TextField onChange={handleChange} name="customer_phone" id="outlined-customer-phone" label="Nomor Telepon" defaultValue={'08'} helperText="Nomor Telepon Whatsapp" />
                        <TextField onChange={handleChange} name="customer_institution" id="outlined-customer-institution" label="Institusi" helperText="Diisi jika ada"/>
                        <TextField onChange={handleChange} name="customer_position" id="outlined-customer-position" label="Posisi/Jabatan" helperText="Posisi/Jabatan di institusi" />
                        <TextField onChange={handleChange} name="customer_address" id="outlined-customer-address" label="Alamat" multiline rows={3}/>
                        <TextField onChange={handleChange} name="customer_institution_address" id="outlined-customer-institution-address" label="Alamat Institusi" multiline rows={3}/>
                    </Box>
                    <Box display={"flex"} width={"100%"} justifyContent={"center"}>
                        <Button onClick={handleOnclickSave} sx={{ width: '30%', mr: '1rem' }} variant="outlined">Simpan</Button>
                        <Button component={Link} to="/" sx={{ width: '30%', ml: '1rem' }} variant="outlined">Batal</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default CustomerReg;
