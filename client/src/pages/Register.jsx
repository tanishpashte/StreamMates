import React, { use, useContext, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {

    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '' //to confirm the password
    })

    const { username, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2){
            console.log('Passwords do not match');
        }else{
            // console.log('Registration data: ', formData);
            const newUser = {
                username,
                email,
                password
            };

            try {
                const res = await axios.post('http://localhost:5000/api/auth/register',  newUser);
                login(res.data.token);
                console.log('Registration successful: ', res.data);
                navigate('/');
            } catch (error) {
                console.error('Registration failed: ', error.response.data);
            }
        }
    }

  return (
    < Container component='main' maxWidth='xs'>
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography component='h1' variant='h5'>
                Sign Up
            </Typography>
            <Box component='form' onSubmit={onSubmit} sx={{mt:3, width: '100%'}}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            autoComplete="username"
                            name="username"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            autoFocus
                            value={username}
                            onChange={onChange}
                        />
                        </Grid>
                    <Grid size={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid size={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={onChange}
                    />
                    </Grid>
                    <Grid size={12}>
                    <TextField
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        autoComplete="new-password"
                        value={password2}
                        onChange={onChange}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="center">
                    <Grid>
                    <MuiLink component={Link} to="/login" variant="body2">
                        Already have an account? Sign in
                    </MuiLink>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  )
}

export default Register