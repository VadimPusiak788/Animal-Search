import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";

import {
    FormControl,
    Grid,
    Button,
    Paper,
    Typography, Box,
} from '@mui/material';

import DateFnsUtils from '@date-io/date-fns';
import RadioGroup from "../../Form/RadioGroup";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from "../../Form/TextField";

import axiosInstance from "../../../utils/axiosApi";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {useForm, FormProvider, Controller, useFormState} from "react-hook-form";
import EditMapLost from "../../map/EditMapLost";
import CreateMapLost from "../../map/CreateMapLost";




const EditLostPet = () => {
    const coordinate = useSelector((state) => state.lost_coordinate.coordinates)

    const [valueDate, setValueDate] = useState('');
    const {id} = useParams();

    const [image, setImage] = useState('')

    const [coordinates, SetCoordinates] = useState(undefined)

    useEffect(() => {

        axiosInstance.get(`/main/lost_pet/${id}/`)

            .then(
                response => {form.reset(response.data)
                SetCoordinates({ 'lat': response.data.latitude, 'lng': response.data.longitude})
                setValueDate(response.data.date)
                setImage(response.data.image)
                console.log(response.data)}
            )

            .catch(err => console.log(err))
    }, [id])


    const form = useForm({
            defaultValues: {
              name: "",
              type: "",
              gender: "",
              age: "",
              description: "",
              date: valueDate,
            },
          });

    let navigate = useNavigate();

    let formData = new FormData()

    const config = {headers: {'Content-Type': 'multipart/form-data'}}

    const onSubmit = (data) => {

        checkString();
        formData.append('name', data.name)
        formData.append('type', data.type);
        formData.append('gender', data.gender);
        formData.append('date', moment(valueDate).format('YYYY-MM-DD'));
        formData.append('latitude', coordinate[0]);
        formData.append('longitude', coordinate[1]);
        formData.append('age', data.age);
        formData.append('description', data.description);

        axiosInstance.patch(`http://127.0.0.1:8000/api/main/request_user/lost/${id}/`, formData, config)
            .then((res) => {
                console.log(res.data);
                navigate("/");

            })
            .catch((err) => {

                console.log(err.response.data)
            })
    };

    const onError = (error) => console.log(error);

    const checkString = () => {
        typeof(image) === 'string' ? console.log(image) : formData.append('image', image)
    }

    return(
        <>
       {/*     <Paper*/}
       {/*      sx={{*/}
       {/*         p: 2,*/}
       {/*         margin: 'auto',*/}
       {/*         width: 1400,*/}
       {/*         flexGrow: 1,*/}
       {/*      }}*/}
       {/*      >*/}

       {/* <FormProvider {... form}>*/}

       {/* <form  onSubmit={form.handleSubmit(onSubmit, onError)}>*/}
       {/*     <Grid*/}
       {/*         container*/}
       {/*         spacing={5}*/}
       {/*         direction='column'*/}
       {/*         justifyContent="center"*/}
       {/*         alignItems="center"*/}
       {/*     >*/}
       {/*         <Grid item>*/}
       {/*                 <TextField*/}
       {/*                     name='name'*/}
       {/*                     label='Name pet'*/}
       {/*                     rules={{ required: "Required!" }}*/}
       {/*                     sx={{mb: 2}}*/}
       {/*                 />*/}
       {/*         <Grid item >*/}



       {/*             </Grid>*/}

       {/*             <Grid item>*/}

       {/*                 <RadioGroup*/}
       {/*                     row*/}
       {/*                     name="type"*/}
       {/*                     label="Animal special"*/}
       {/*                     rules={{ required: "Required!" }}*/}
       {/*                     items={[*/}
       {/*                       { name: "Cat", value: "CT" },*/}
       {/*                       { name: "Dog", value: "DG" },*/}
       {/*                       { name: "Rabbit", value: "RB" },*/}
       {/*                       { name: "Bird", value: "BD" },*/}
       {/*                       { name: "Tortoise", value: "TR" },*/}
       {/*                       { name: "Other", value: "OTH" },*/}
       {/*                     ]}*/}
       {/*                   />*/}
       {/*             </Grid>*/}

       {/*             <Grid item>*/}
       {/*                 <RadioGroup*/}
       {/*                     name="gender"*/}
       {/*                     label="Gender"*/}
       {/*                     rules={{ required: "Required!" }}*/}
       {/*                     items={[*/}
       {/*                       { name: "Female", value: "FM" },*/}
       {/*                       { name: "Male", value: "ML" },*/}
       {/*                       { name: "Unknown", value: "UNK" }*/}
       {/*                     ]}*/}
       {/*                   />*/}
       {/*             </Grid>*/}

       {/*         </Grid>*/}
       {/*         <Grid item>*/}
       {/*             <TextField*/}
       {/*                 name='age'*/}
       {/*                 type='number'*/}

       {/*                 rules={{ required: "Required!",*/}
       {/*                          min: {*/}
       {/*                             value: 0.1,*/}
       {/*                              message: 'Age must be more than 0'*/}
       {/*                         },*/}
       {/*                         max: {*/}
       {/*                             value: 30,*/}
       {/*                             message: 'Age must be less than 30'*/}
       {/*                         }*/}
       {/*                 }}*/}
       {/*                 label='Age approximate'*/}
       {/*             />*/}
       {/*         </Grid>*/}

       {/*         <Grid item>*/}
       {/*             <TextField*/}
       {/*             name='description'*/}
       {/*             rows={5}*/}
       {/*             multiline*/}
       {/*             label="Description"*/}
       {/*             sx={{ minWidth: 350 }}*/}
       {/*             rules={{ required: "Required!" }}*/}
       {/*             />*/}
       {/*         </Grid>*/}

       {/*         <Grid item>*/}
       {/*         <FormControl sx={{ minWidth: 350 }}>*/}
       {/*             <Button*/}
       {/*             variant="contained"*/}
       {/*             component="label">*/}
       {/*             Upload File*/}
       {/*                 <input*/}
       {/*                 hidden*/}
       {/*                 type='file'*/}
       {/*                 onChange={(evt) => setImage(evt.target.files[0])}*/}
       {/*                 />*/}
       {/*             </Button>*/}
       {/*             <Grid item>*/}
       {/*                         {image && (*/}
       {/*                                 <Box*/}
       {/*                                 component='img'*/}
       {/*                                 sx={{*/}
       {/*                                   height: 233,*/}
       {/*                                   width: 400,*/}
       {/*                                   maxHeight: { xs: 233, md: 167 },*/}
       {/*                                   maxWidth: { xs: 400, md: 350 },*/}
       {/*                                     marginTop: 4*/}
       {/*                                 }}*/}
       {/*                                 src={typeof(image) === 'string' ? image : URL.createObjectURL(image)}*/}

       {/*                                 >*/}
       {/*                                 </Box>*/}
       {/*                             )}*/}
       {/*             </Grid>*/}
       {/*             </FormControl>*/}
       {/*         </Grid>*/}

       {/*         <Grid item>*/}
       {/*             <Typography>*/}
       {/*                 Where & when*/}
       {/*             </Typography>*/}
       {/*         </Grid>*/}

       {/*         <Grid item sx={{mb: 3}} >*/}
       {/*             <Controller control={form.control}  name='date' render={(*/}
       {/*                 {*/}
       {/*                     field:{ name, onChange, value},*/}
       {/*                      fieldState: {invalid, error},*/}
       {/*                          formState,*/}
       {/*                 }) => (*/}
       {/*             <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils}>*/}
       {/*               <DatePicker*/}
       {/*                 error={Boolean(formState.errors && formState.errors[name])}*/}
       {/*                 name={name}*/}
       {/*                 value={valueDate}*/}
       {/*                 format='yyyy-MM-dd'*/}
       {/*                 label="Date found"*/}
       {/*                 onChange={(newDateValue) => {*/}
       {/*                   setValueDate(newDateValue);*/}
       {/*                 }}*/}
       {/*                 renderInput={(params) => <TextField {...params} />}*/}
       {/*                 maxDate={new Date()}*/}
       {/*               />*/}
       {/*             </LocalizationProvider>*/}
       {/*             )}*/}
       {/*             />*/}
       {/*         </Grid>*/}


       {/*     </Grid>*/}
       {/*             <EditMapLost coordinate={coordinates} />*/}
       {/*             <Box display='flex' sx={{ '& button': { m: 4 } }} alignItems="center" justifyContent='center'>*/}
       {/*                  <Button variant="outlined" size="large" sx={{m:3}} type='submit'>*/}
       {/*                   Submit*/}
       {/*                 </Button>*/}
       {/*             </Box>*/}
       {/* </form>*/}
       {/*</FormProvider>*/}
       {/*     </Paper>*/}


    <Paper
             sx={{
                p: 2,
                margin: 'auto',
                width: 1400,
                flexGrow: 1,
      }}
        >
        <FormProvider {... form}>

        <form  onSubmit={form.handleSubmit(onSubmit, onError)}>
            <Grid
                container
                spacing={5}
                direction='column'
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <TextField
                    name='name'
                    label='Name pet'
                    rules={{ required: "Required!" }}
                    />

                </Grid>
                <Grid item>

                    <RadioGroup
                        row
                        name="type"
                        label="Animal special"
                        rules={{ required: "Required!" }}
                        items={[
                          { name: "Cat", value: "CT" },
                          { name: "Dog", value: "DG" },
                          { name: "Rabbit", value: "RB" },
                          { name: "Bird", value: "BD" },
                          { name: "Tortoise", value: "TR" },
                          { name: "Other", value: "OTH" },
                        ]}
                      />
                </Grid>

                <Grid item>
                    <RadioGroup
                        name="gender"
                        label="Gender"
                        rules={{ required: "Required!" }}
                        items={[
                          { name: "Female", value: "FM" },
                          { name: "Male", value: "ML" },
                          { name: "Unknown", value: "UNK" }
                        ]}
                      />
                </Grid>

                <Grid item>
                    <TextField
                        name='age'
                        type='number'

                        rules={{ required: "Required!",
                                 min: {
                                    value: 0.1,
                                     message: 'Age must be more than 0'
                                },
                                max: {
                                    value: 30,
                                    message: 'Age must be less than 30'
                                }
                        }}
                        label='Age approximate'
                    />
                </Grid>

                <Grid item>
                    <TextField
                    name='description'
                    rows={5}
                    multiline
                    label="Description"
                    sx={{ minWidth: 350 }}
                    rules={{ required: "Required!" }}
                    />
                </Grid>

                <Grid item>
                <FormControl sx={{ minWidth: 350 }}>
                    <Button
                    variant="contained"
                    component="label">
                    Upload File
                        <input
                        hidden
                        type='file'
                        onChange={(evt) => setImage(evt.target.files[0])}
                        />
                    </Button>

                    <Grid item>
                                {image && (
                                        <Box
                                        component='img'
                                        sx={{
                                          height: 233,
                                          width: 400,
                                          maxHeight: { xs: 233, md: 167 },
                                          maxWidth: { xs: 400, md: 350 },
                                            marginTop: 4
                                        }}
                                        src={typeof(image) === 'string' ? image : URL.createObjectURL(image)}

                                        >
                                        </Box>
                                    )}
                    </Grid>


                    </FormControl>
                </Grid>

                <Grid item>
                    <Typography>
                        Where & when
                    </Typography>
                </Grid>

                <Grid item sx={{mb:3}}>
                    <Controller control={form.control}  name='date' render={(
                        {
                            field:{ name, onChange, value},
                             fieldState: {invalid, error},
                                 formState,
                        }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils}>
                      <DatePicker
                        error={Boolean(formState.errors && formState.errors[name])}
                        name={name}
                        value={valueDate}
                        format='yyyy-MM-dd'
                        label="Date found"
                        onChange={(newDateValue) => {
                          setValueDate(newDateValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        maxDate={new Date()}
                      />
                    </LocalizationProvider>
                    )}
                    />
                </Grid>
            </Grid>
            <EditMapLost coordinate={coordinates} />
            <Box display='flex' sx={{ '& button': { m: 4 } }} alignItems="center" justifyContent='center'>
                <Button variant="outlined" size="large" sx={{m:3}} type='submit'>
                  Submit
                </Button>
            </Box>
        </form>
       </FormProvider>
            </Paper>


        </>
    )
}

export default EditLostPet;
