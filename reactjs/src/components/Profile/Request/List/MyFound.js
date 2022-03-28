import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import {List, ListItem, ListItemText, Typography, Paper, Box, Container, Grid} from '@mui/material';
import axios from "axios";
import axiosInstance from "../../../../utils/axiosApi";
import CardFound from "../../../Card/CardFound";
import MyCardFound from "../../../Card/MyCardFound";



const MyFoundRequest = () => {

    const [founderpets, setFounderpets] = useState([])

    const getData = () => {
        axiosInstance.get('http://127.0.0.1:8000/api/main/request_user/found/')
          .then(response => setFounderpets(response.data))
          .catch(err => console.log(err.response))
    }

    useEffect( () =>{
      axiosInstance.get('http://127.0.0.1:8000/api/main/request_user/found/')
          .then(response => setFounderpets(response.data))
          .catch(err => console.log(err.response))
    }, [])


    return(
     <>
         <Container>

              <Grid container spacing={3}>
                 {founderpets.map(pet => (
                 <Grid item key={pet.id} xs={12} md={6} lg={4}>
                    <MyCardFound value={pet}  getData={getData}/>
                 </Grid>
                 ))}

             </Grid>
         </Container>
     </>
  );
}

export default MyFoundRequest;