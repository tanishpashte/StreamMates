import React from 'react';
import { Container, Typography, Box, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom>
          Welcome to LDR Sync App!
        </Typography>
        <Typography variant="h6">
          Connect with your loved one, watch videos, listen to music, and share your screen in perfect sync.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/register"
            sx={{ mr: 2 }}
          >
            Get Started (Sign Up)
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/login"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;