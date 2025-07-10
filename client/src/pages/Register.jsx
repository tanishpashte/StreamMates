import React, { use, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; 

const Register = () => {

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
            console.log('Registration data: ', formData);
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
                Sign In
            </Typography>
            <Box component='form' onSubmit={onSubmit} sx={{mt:3}}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label="Email Address"
                    name='email'
                    autoComplete='email'
                    autoFocus
                    value={email}
                    onChange={onChange}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    label="Password"
                    name='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={onChange}
                    type='password'
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid>
                        <MuiLink component={Link} to='/login' variant='body2'>
                            {"Already have an account? Sign In"}
                        </MuiLink>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  )
}

export default Register