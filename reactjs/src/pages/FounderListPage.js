import React, { useState, useEffect } from 'react';
import {Container, Grid} from '@mui/material';
import axios from "axios";
import CardFound from "../components/Card/CardFound";


const FounderListPage = () => {
  const [founderpets, setFounderpets] = useState([])


  useEffect(() => {
        axios.get('http://djangoanimal-env.eba-emiqdphm.eu-central-1.elasticbeanstalk.com/api/main/founder_pet')
            .then(response => setFounderpets(response.data))
            .catch(err => console.log(err))
    }, [])



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


export default FounderListPage;