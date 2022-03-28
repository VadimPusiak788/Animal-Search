import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './Login.css';
import axiosInstance from "../../utils/axiosApi";


export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit =  e => {
    e.preventDefault();
    axiosInstance.post('/auth/login/', {
      username: username,
      password: password
    }).then(response =>{
      // axiosInstance.defaults.headers['Authorization'] = "Token " + response.data.token;
      // localStorage.setItem('access_token', response.data.token);
      localStorage.setItem("isLogged", true)
    }).catch(err => {
      console.log(err.response)
      console.log(err.response.data.detail)
    })
  }

  return(

    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }