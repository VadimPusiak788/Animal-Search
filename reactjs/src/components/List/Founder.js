import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import {Container, Grid, Paper, Pagination} from '@mui/material';
import axios from "axios";
import CardFound from "../Card/CardFound";


const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,

};

const Founder = () => {
  const [founderpets, setFounderpets] = useState([])


  useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/main/founder_pet')
            .then(response => setFounderpets(response.data))
            .catch(err => console.log(err))
    }, [])



// found
  return(
     <>
         <Container>
             <Grid container spacing={3}>
                 {founderpets.map(pet => (
                 <Grid item key={pet.id} xs={12} md={6} lg={4}>
                    <CardFound value={pet}/>
                 </Grid>
                 ))}

             </Grid>

         </Container>
     </>
  );
}
//


export default Founder;