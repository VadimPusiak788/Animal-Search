import React from 'react';
import {Card, CardHeader, CardContent, CardMedia, Typography, Button, CardActions, Stack} from '@mui/material';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

import axiosInstance from "../../utils/axiosApi";


const MyCardFound = (props) => {

    const deleteItem = (id) => {
        axiosInstance.delete(`http://djangoanimal-env.eba-emiqdphm.eu-central-1.elasticbeanstalk.com/api/main/request_user/found/${id}`)
            .then(() => props.getData())
            .catch(err => console.log(err.response))
    }

    return(
        <>
            <Card elevation={3} sx={{
                mt:3
            }}>
            <CardMedia
                component="img"
                height="194"
                image={props.value.image}
                alt="Paella dish"
            />
                <CardContent>
                    <Typography variant='body2' color='textSecondary'>
                        {props.value.type}
                    </Typography>
                    <Typography>
                         Date found: {props.value.date}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack spacing={3}  direction="row">

                        <Button component={Link} size="large"  to={`/edit_found/${props.value.id}`} startIcon={<EditIcon />}>
                            Edit
                        </Button>

                        <Button size="large" onClick={() => deleteItem(props.value.id)} startIcon={ <DeleteIcon sx={{ color: red[400] }}/>} sx={{ color: 'error.main' }}>
                           Delete
                        </Button>

                    </Stack>
              </CardActions>
            </Card>
        </>
    )
}

export default MyCardFound;