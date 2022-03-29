import React from 'react';
import {Card, CardHeader, CardContent, CardMedia, Typography, Button, CardActions} from '@mui/material';
import { Link } from "react-router-dom";


const CardFound = (props) => {

    return(
        <div>
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
                <Button component={Link} size="small"  to={`/found_pets/${props.value.id}`}>Detail</Button>
              </CardActions>
            </Card>
        </div>
    )
}

export default CardFound;