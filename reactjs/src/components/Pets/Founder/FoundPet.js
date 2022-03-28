import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axiosInstance from "../../../utils/axiosApi";

import {Typography, Grid, Box, Paper} from '@mui/material';
import MapDisplayFound from "../../map/MapDisplayFound";


const FoundPet = () => {
    const {id} = useParams();

    const [pet, setPet] = useState(null)

    useEffect(() => {
        axiosInstance.get(`/main/founder_pet/${id}/`)
            .then(response  => setPet(response.data))
            .catch(err => console.log(err))
    }, [id])

    console.log(pet)

    return (
        <>
             <Paper
                 sx={{
                    p: 2,
                    margin: 'auto',
                    width: 1300,
                    flexGrow: 1,
                    }}

             >
                 {pet && (
                     <Grid container>
                         <Grid container>
                             <Paper
                                sx={{
                                    width: 800
                                }}
                                elevation={0}
                             >
                                 <Grid item  sx={{m: 3}}>
                                     <Typography variant='h5'>
                                         Reported Found Pet
                                     </Typography>
                                 </Grid>

                             <Grid container>
                                 <Grid item xs={5}>

                                     <Grid item sx={{ml: 3}}>
                                        <Typography component='div'>
                                            <Box sx={{ fontWeight: 'bold', mb: 1 }}>Species of animals </Box>
                                        </Typography>
                                         <Typography>
                                             {pet.type}
                                         </Typography>
                                     </Grid>

                                     <Grid item sx={{m: 3}}>
                                        <Typography component='div'>
                                            <Box sx={{ fontWeight: 'bold', mb: 1 }}>Gender</Box>
                                        </Typography>
                                         <Typography>
                                             {pet.gender}
                                         </Typography>
                                     </Grid>

                                     <Grid item sx={{m: 3}}>
                                        <Typography component='div'>
                                            <Box sx={{ fontWeight: 'bold', mb: 1 }}>Age</Box>
                                        </Typography>
                                         <Typography>
                                             {pet.age} years old (Approx.)
                                         </Typography>
                                     </Grid>

                                 </Grid>

                                 <Grid item xs={5}>
                                     <Grid item>
                                        <Typography component='div'>
                                                <Box sx={{ fontWeight: 'bold', mb: 1 }}>Found Date</Box>
                                            </Typography>
                                         <Typography>
                                             {pet.date}
                                         </Typography>
                                     </Grid>

                                     <Grid item sx={{mt: 2}}>
                                        <Typography component='div'>
                                                <Box sx={{ fontWeight: 'bold', mb: 1 }}>Description</Box>
                                            </Typography>
                                         <Typography>
                                             {pet.description}
                                         </Typography>
                                     </Grid>

                                 </Grid>
                             </Grid>

                             </Paper>
                         <Grid item >
                             <Box
                                 component='img'
                                 sx={{
                                     height: 300,
                                     width: 400,
                                     p: 5
                             }}
                                 src={pet.image}
                             >
                             </Box>
                         </Grid>

                     </Grid>
                         <Grid item xs={12}>
                         <MapDisplayFound latitude={pet.latitude} longitude={pet.longitude}/>
                         </Grid>
                        </Grid>
                )}
             </Paper>
    </>
    )
}

export default FoundPet;

