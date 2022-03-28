import React, {useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import axiosInstance from "../../utils/axiosApi";
import {useDispatch, useSelector} from "react-redux";
import { Paper, Grid, Avatar, Typography, Button, Container, Alert, Box, FormControlLabel, Checkbox  } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import TextField from "../../components/Form/TextField";
import {useForm, FormProvider} from "react-hook-form";

import axios from "axios";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


const LoginPage = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [error, setError] = useState(false)
    const [errorContent, setErrorContent] = useState(null)

    const form = useForm({
        defaultValues: {
          username: "",
          password: "",
        },
      });

    const onSubmit = (data) => {
        // e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/auth/login/', {
            username: data.username,
            password: data.password
        }).then(response => {
            axiosInstance.defaults.headers['Authorization'] = "Token " + response.data.token;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem("isLogged", true)
            dispatch({ type: "SET_LOGIN", payload: true })
            dispatch({ type: 'USER', payload: response.data.user })
            localStorage.setItem('user', JSON.stringify({ ...response.data.user}));
            navigate("/");
        }).catch(err =>{
           console.log(err.response.data);
           form.reset();
           setError(true)
           setErrorContent(err.response.data.detail);
        });
    }

    const onError = (error) => console.log(error);

    return(

      <Container component="main" maxWidth="xs">
          {error ? <Alert severity='error'>{errorContent}</Alert> : <></> }
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <FormProvider {...form}>
          <Box component="form" onSubmit={form.handleSubmit(onSubmit, onError)}  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              rules={{ required: "This field is required"}}
            />

              <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              type='password'
              rules={{ required: "This field is required"}}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>

              <Grid item>
                <Link to='../registration'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
         </FormProvider>
        </Box>
        {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
      </Container>
    );
}

export default LoginPage;

