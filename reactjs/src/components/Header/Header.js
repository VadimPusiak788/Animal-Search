import React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom'


import {Button, Stack, AppBar, Box, Toolbar, Typography }  from '@mui/material';


import {useDispatch, useSelector} from "react-redux";

export default function Layout() {

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const logout = (e) => {
      e.preventDefault()
      dispatch({type: "SET_LOGIN", payload: false});
      localStorage.clear();
      navigate("login/");
  }

  const auth = useSelector((state) => state.loginReducer)
  return (
      <>
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Animal Search
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button variant="outlined" style={{color: '#FFF'}}
                  component={Link} to='/'>
                <span>Home</span>
            </Button>

            <Button variant="outlined" style={{color: '#FFF'}}
                  component={Link} to='lost_pets'>
                <span>Lost Pet</span>
            </Button>

            <Button variant="outlined" style={{color: '#FFF'}}
                  component={Link} to='finder_pets'>
                <span>Found Pet</span>
            </Button>

          {auth.login ?

              <Stack direction="row" spacing={3}>
             <Button variant="outlined" style={{color: '#FFF'}}
                  component={Link} to='my_lost'>
                <span>My lost pet</span>
            </Button>

            <Button variant="outlined" style={{color: '#FFF'}}
                  component={Link} to='my_found'>
                <span>My found pet</span>
            </Button>

            <Button variant="outlined" style={{color: '#FFF'}}
                  onClick={logout}>
                <span>Logout</span>
            </Button>

              </Stack>
              :
              <div>
              </div>
          }
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
      <Outlet/>
  </>
  );
}
