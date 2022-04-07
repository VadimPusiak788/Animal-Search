import React, { useState, useEffect } from 'react';
import {Container, Grid} from '@mui/material';
import axiosInstance from "../utils/axiosApi";
import MyCardLost from "../components/Card/MyCardLost";



const MyLostRequestPage= () => {

    const [lostpets, setLostpets] = useState([])

    const getData = () => {
        axiosInstance.get('http://djangoanimal-env.eba-emiqdphm.eu-central-1.elasticbeanstalk.com/api/main/request_user/lots/')
          .then(response => setLostpets(response.data))
          .catch(err => console.log(err.response))
    }

    useEffect( () =>{
      axiosInstance.get('http://djangoanimal-env.eba-emiqdphm.eu-central-1.elasticbeanstalk.com/api/main/request_user/lots/')
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

export default MyLostRequestPage;
