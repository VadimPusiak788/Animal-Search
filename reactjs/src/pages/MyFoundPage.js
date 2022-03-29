import React, { useState, useEffect } from 'react';
import {Container, Grid} from '@mui/material';
import axiosInstance from "../utils/axiosApi";
import MyCardFound from "../components/Card/MyCardFound";



const MyFoundRequestPage = () => {

    const [founderpets, setFounderpets] = useState([])

    const getData = () => {
        axiosInstance.get('http://djangoanimal-env.eba-emiqdphm.eu-central-1.elasticbeanstalk.com/api/main/request_user/found/')
          .then(response => setFounderpets(response.data))
          .catch(err => console.log(err.response))
    }

    useEffect( () =>{
      axiosInstance.get('http://djangoanimal-env.eba-emiqdphm.eu-central-1.elasticbeanstalk.com/api/main/request_user/found/')
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

export default MyFoundRequestPage;