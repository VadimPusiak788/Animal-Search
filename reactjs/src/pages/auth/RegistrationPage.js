import React, {useRef} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import axiosInstance from "../../utils/axiosApi";
import {useDispatch, useSelector} from "react-redux";
import {Paper, Grid, Avatar, Typography, Button, Container, Alert, Box} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import MuiPhoneNumber from 'material-ui-phone-number';

import {useForm, FormProvider, Controller, useFormState} from "react-hook-form";
import TextField from "../../components/Form/TextField";

import axios from "axios";


const RegistrationPage = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const password = useRef({});


    const form = useForm({
        defaultValues: {
          username: "",
          password1: "",
          password2: "",
          email: "",
          phone: ""
        },
      });

    password.current = form.watch("password1", "");


    console.log(password.current, 'f')
    const onSubmit = (data) => {

        axios.post('http://127.0.0.1:8000/api/auth/registration/', {
            username: data.username,
            password1: data.password1,
            password2: data.password2,
            email: data.email,
            phone_number: data.phone
        }).then(response => {
            console.log(response)
            axiosInstance.defaults.headers['Authorization'] = "Token " + response.data.token;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem("isLogged", true)
            dispatch({ type: "SET_LOGIN", payload: true })
            navigate("/");
        }).catch(err =>{
           console.log(err.response.data);
           //
        });
    }

    const onError = (error) => console.log(error);

    return(
    <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <FormProvider {... form}>
          <Box component="form"  onSubmit={form.handleSubmit(onSubmit, onError)} noValidate sx={{ mt: 1 }}>
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
              name="email"
              label="Email"
              type="Email"
              id="email"
              rules={{ required: "This field is required",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
              }}}
            />
              <Controller
                  name='phone'
                  control={form.control}
                  render={({
                             field:{ name, onChange, value},
                             fieldState: {invalid, error},
                                 formState,
                  }) => (
                      <MuiPhoneNumber
                          error={Boolean(formState.errors && formState.errors[name])}
                          name={name}
                          onChange={onChange}
                          value={value}
                          defaultCountry={'ua'}
                          regions={'europe'}
                          fullWidth
                          margin="normal"
                      />
                  )}
                  rules={{
                      required: "This field is required",
                      minLength: {
                        value: 15,
                        message: 'The password must contain at least 8 characters,\ ' +
                            'including uppercase, lowercase letters, numbers, and symbols.'
                    }
                  }}
                  />
              <TextField
              margin="normal"
              fullWidth
              name="password1"
              label="Password"
              type="password"
              id="password1"
              rules={{ required: "This field is required",
                    minLength: {
                        value: 8,
                        message: 'The password must contain at least 8 characters,\ ' +
                            'including uppercase, lowercase letters, numbers, and symbols.'
                    }
              }}
            />
              <TextField
              margin="normal"
              fullWidth
              name="password2"
              label="Confirm password"
              type="password"
              id="password2"
              rules={{ required: "This field is required",
                       validate: value => value === password.current || "The passwords do not match"
              }}
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
                <Link to='../login'>
                  {"Do you have an account? Sign in"}
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

export default RegistrationPage;

