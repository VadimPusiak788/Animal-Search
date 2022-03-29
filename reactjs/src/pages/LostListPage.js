import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import {List, ListItem, ListItemText, Typography, Paper, Box, Grid, Pagination, Container} from '@mui/material';
import axios from "axios";
import CardLost from "../components/Card/CardLost";


const LostListPage = () => {
  const [lost, setLostpets] = useState([])


  useEffect(() => {
        axios.get('http://djangoanimal-env.eba-emiqdphm.eu-central-1.elasticbeanstalk.com/api/main/lost_pet').then(response => setLostpets(response.data)).catch(err => console.log(err))
    }, [])

  return(
     <>
         <Container>
             <Grid container spacing={3}>
                 {lost.map(pet => (
                 <Grid item key={pet.id} xs={12} md={6} lg={4}>
                    <CardLost value={pet}/>
                 </Grid>
                 ))}

             </Grid>

         </Container>
     </>
  );
}

export default LostListPage;