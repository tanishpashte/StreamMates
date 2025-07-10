import React, { useContext, useState } from 'react'
import { Container, Box, Typography, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

const Login = () => {

  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log('Login data: ', formData);
    const userCredentials = {
      email,
      password
    }

    try {
      // alert('Login successful');
      const res = await axios.post('http://localhost:5000/api/auth/login', userCredentials);
      login(res.data.token);
      console.log('Login successful: ', res.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed: ', error.response.data);
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <Box component='form' onSubmit={onSubmit} sx={{mt:3}}>
          <TextField 
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{mt:3, mb:2}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid>
              <MuiLink component={Link} to='/register' variant='body2'>
                {"Don't have an account ? Sign Up"}
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login