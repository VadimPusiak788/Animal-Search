import * as React from 'react';
import {Box, Container, Typography, IconButton, Stack, Grid, Paper} from '@mui/material';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import PetsIcon from '@mui/icons-material/Pets';
import { styled } from '@mui/material/styles';

import './Dashboard.css'
import { Link } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

export default function RowAndColumnGap() {

  return (
        <Container component="main" maxWidth='xl'>
      <Box>
        <Box sx={{
          display: 'grid',
          columnGap: 2,
          gridTemplateColumns: 'repeat(2, 3fr)',
        }}>
            <Box>
            <Box
                sx={{
                    m:5
                }}
            >
                <Item elevation={0}>
            <Typography variant='h5'>
              We help reunite lost pets with their families.
            </Typography>
            <Typography>
                Enter a photo of your missing pet and search our national lost and found pet database to find them.
            </Typography>
                </Item>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={10}
            >
                <IconButton sx={{
                    height: 150,

                }}
                 component={Link} to='finder_pet' >
                    <div>
                      I Found a Pet <br/>
                        <PetsIcon/>
                    </div>
                </IconButton>
                <IconButton sx={{
                    height: 150,
                    width: 150
                }}

                  component={Link} to='lost_pet'>
                    <div>I Lost a Pet <br/>
                        <SavedSearchIcon/>
                    </div>
                </IconButton>
            </Stack>

            </Box>
        </Box>
            <Box
            component='img'
            sx={{
             p: 4,
             width: 600,
             height: 400,
            }}
            alignItems="center"
            alt='Image Pet'
            src="https://media.istockphoto.com/photos/high-five-picture-id1307235109?k=20&m=1307235109&s=612x612&w=0&h=whPyTvdUzOEls0yNCslUi_muq9zBDmQfGFBnVE71zt8="
        />
      </Box>

          <Box >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                    m:4,
                    mb: 6
                }}

              >
                  <Typography variant='h5'>Animal Search is the leading search service for missing pets in the UKRAINE.</Typography>
              </Box>
              <Box
                  sx={{
                      display: 'grid',
                      columnGap: 4,
                      gridTemplateColumns: 'repeat(3, 3fr)',
                  }}
              >
                <Grid item sx={{ borderRadius: '50%' }} >
                    <Item elevation={16}>
                    <Typography variant='h6' gutterBottom component='div'> Our website is completely free </Typography>
                    <Typography variant='body1'>The most advanced, free online missing pet matching service in the UA.</Typography>
                    </Item>
                </Grid>
                  <Grid>
                      <Item elevation={16}>
                          <Typography variant='h6' gutterBottom component='div'>We can help locate any kind of pet</Typography>
                          <Typography variant='body1'>From dogs and cats to ferrets and birds, whether they are lost or stolen.</Typography>
                      </Item>
                  </Grid>
                  <Grid>
                      <Item elevation={16}>
                          <Typography variant='h6' gutterBottom component='div'>We help reunite thousands of pets</Typography>
                          <Typography variant='body1'>Our website utilises a unique auto-match facility which helps to reunite thousands of pets each year.</Typography>
                      </Item>
                  </Grid>
              </Box>
          </Box>
      </Box>
    </Container>

  );
}
