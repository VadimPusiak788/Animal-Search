import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import {List, ListItem, ListItemText, Typography, Paper, Box, Container, Grid} from '@mui/material';
import axios from "axios";
import axiosInstance from "../../../../utils/axiosApi";
import CardFound from "../../../Card/CardFound";
import MyCardLost from "../../../Card/MyCardLost";



const MyLostRequest = () => {

    const [lostpets, setLostpets] = useState([])

    const getData = () => {
        axiosInstance.get('http://127.0.0.1:8000/api/main/request_user/lots/')
          .then(response => setLostpets(response.data))
          .catch(err => console.log(err.response))
    }

    useEffect( () =>{
      axiosInstance.get('http://127.0.0.1:8000/api/main/request_user/lots/')
          .then(response => setLostpets(response.data))
          .catch(err => console.log(err.response))
    }, [])


    return(
     <>
         <Container>

              <Grid container spacing={3}>
                 {lostpets.map(pet => (
                 <Grid item key={pet.id} xs={12} md={6} lg={4}>
                    <MyCardLost value={pet}  getData={getData}/>
                 </Grid>
                 ))}

             </Grid>
         </Container>
     </>
  );
}

export default MyLostRequest;