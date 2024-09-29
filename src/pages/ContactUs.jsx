import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Box } from '@mui/material';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic untuk submit data form
    console.log('Form Data:', formData);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          Have questions? We'd love to hear from you! Fill out the form below.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              label="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ padding: '0.8rem' }}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactUs;
