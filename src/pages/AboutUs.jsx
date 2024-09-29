import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          Welcome to Our Online Store! We are dedicated to providing you with the best products and
          exceptional customer service.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '1.5rem', height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body2">
              Our mission is to deliver quality products at affordable prices, ensuring that our
              customers are satisfied with every purchase they make.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '1.5rem', height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body2">
              We aim to be the leading online store, offering a wide range of products and becoming
              a trusted name in the e-commerce industry.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '1.5rem', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Our Team
            </Typography>
            <Typography variant="body2">
              We are a group of passionate individuals who strive to offer you the best online
              shopping experience. We believe in hard work, dedication, and a customer-first
              approach.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: '3rem' }}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          Have questions? Feel free to <a href="/contact-us">reach out to us</a>.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
