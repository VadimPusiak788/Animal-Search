import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

import {
    FormControl,
    Grid,
    Button,
    Paper,
    Typography,
    Box
} from '@mui/material';

import DateFnsUtils from '@date-io/date-fns';
import RadioGroup from "../../Form/RadioGroup";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from "../../Form/TextField";

import CreateMapLost from "../../map/CreateMapLost";
import axiosInstance from "../../../utils/axiosApi";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {useForm, FormProvider, Controller} from "react-hook-form";




const CreateFoundPet = () => {
    const coordinate = useSelector((state) => state.lost_coordinate.coordinates)

    const [valueDate, setValueDate] = useState(new Date());

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

    const [image, setImage] = useState()

    console.log(coordinate[0])
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    const onSubmit = (data) => {

        if (image != null){
            formData.append('image', image)
        }

        formData.append('name', data.name)
        formData.append('type', data.type)
        formData.append('gender', data.gender)
        formData.append('date', moment(valueDate).format('YYYY-MM-DD'))
        formData.append('latitude', coordinate[0])
        formData.append('longitude', coordinate[1])
        formData.append('age', data.age)
        formData.append('description', data.description)

        axiosInstance.post('http://127.0.0.1:8000/api/main/create_lost_pet/', formData, config)
            .then((res) => {
                console.log(res.data);
                navigate("/");

            })
            .catch((err) => {

                console.log(err.response.data)
            })
    }

    const onError = (error) => console.log(error);


    return(
        <>
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
                                        src={URL.createObjectURL(image)}
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
            <CreateMapLost/>
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

export default CreateFoundPet;

// import React, {useState, useEffect} from 'react';
// import {useSelector} from "react-redux";
//
// import {FormLabel, FormControl, FormControlLabel, RadioGroup, Radio, Grid, TextField, Button, Box } from '@mui/material';
// import CreateMapFound from "../../map/CreateMapFound";
// import axiosInstance from "../../../utils/axiosApi";
// import CreateMapLost from "../../map/CreateMapLost";
// import {useNavigate} from "react-router-dom";
//
// // const styles = {
// //     paperContainer: {
// //         backgroundImage: `http://127.0.0.1:8000/media/back.jpg`
// //     }
// // };
// // style={styles.paperContainer}
//
// const CreateFoundPet = () => {
//
//     let formData = new FormData()
//     let navigate = useNavigate();
//
//     const coordinate = useSelector((state) => state.found_coordinate.coordinates)
//     const config = {headers: {'Content-Type': 'multipart/form-data'}}
//     console.log(coordinate)
//
//     const [cover, setCover] = useState()
//     const onSubmit = (e) => {
//         e.preventDefault()
//         formData.append('image', cover)
//         formData.append('type', e.target.type.value)
//         formData.append('name', e.target.name.value)
//         formData.append('gender', e.target.gender.value)
//         formData.append('date', e.target.date.value)
//         formData.append('latitude', coordinate[0]['lat'])
//         formData.append('longitude', coordinate[0]['lng'])
//         formData.append('age', e.target.age.value)
//         formData.append('description',e.target.description.value)
//
//         axiosInstance.post('http://127.0.0.1:8000/api/main/create_lost_pet/', formData, config)
//             .then((res) => {
//                 console.log(res.data);
//                 navigate("/");
//             })
//             .catch((err) => {
//
//                 console.log(err.response.data)
//             })
//     }
//
//     return(
//         <div>
//         <form  onSubmit={onSubmit}>
//             <Grid container  spacing={5}>
//                 <Grid item direction="column" container alignItems="center">
//                     <TextField name='name' id="standard-basic" label="Name Pet" variant="standard" />
//                 </Grid>
//                 <Grid item direction="column" container alignItems="center">
//                     <FormControl>
//                   <FormLabel id="demo-radio-buttons-group-label">Animal species</FormLabel>
//                   <RadioGroup row
//                     aria-labelledby="demo-radio-buttons-group-label"
//                     defaultValue="CT"
//                     name="type"
//                   >
//                     <FormControlLabel value="CT" control={<Radio />} label="Cat" />
//                     <FormControlLabel value="DG" control={<Radio />} label="Dog" />
//                     <FormControlLabel value="RB" control={<Radio />} label="Rabbit" />
//                     <FormControlLabel value="BD" control={<Radio />} label="Bird" />
//                     <FormControlLabel value="TR" control={<Radio />} label="Tortoise" />
//                     <FormControlLabel value="OTH" control={<Radio />} label="Other" />
//                   </RadioGroup>
//                     </FormControl>
//
//                 </Grid>
//                 <Grid item direction="column" container alignItems="center">
//                     <FormControl>
//                   <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
//                   <RadioGroup row
//                     aria-labelledby="demo-radio-buttons-group-label"
//                     defaultValue="female"
//                     name="gender"
//                   >
//                     <FormControlLabel value="FM" control={<Radio />} label="Female" />
//                     <FormControlLabel value="ML" control={<Radio />} label="Male" />
//                     <FormControlLabel value="UNK" control={<Radio />} label="Unknown" />
//                   </RadioGroup>
//                     </FormControl>
//                     <FormControl sx={{ minWidth: 350 }}>
//                        <TextField
//                         type="number"
//                         InputProps={{
//                             inputProps: {
//                                 max: 30, min: 0
//                             }
//                         }}
//                         label="Age"
//                         name='age'
//                     />
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} direction="column" container alignItems="center">
//                     <FormControl sx={{ minWidth: 350 }}>
//                     <TextField
//                         id="standard-multiline-description"
//                         label="Description"
//                         multiline
//                         rows={5}
//                         name='description'
//                     />
//                     </FormControl>
//                     <FormControl sx={{ minWidth: 350 }}>
//                         <Button
//                         variant="contained"
//                         component="label">
//                               Upload File
//                             <input
//                             hidden
//                             type='file'
//                             onChange={(evt) => setCover(evt.target.files[0])}
//                             />
//                         </Button>
//                     </FormControl>
//                 </Grid>
//                 <Grid item direction="column" container alignItems="center">
//                     <div>
//                     <h4>Where & when</h4>
//                     </div>
//                     <Box>
//                     <TextField
//                     id="date"
//                     label="Date of found"
//                     type="date"
//                     name='date'
//                     // defaultValue= {Date().toLocaleString()}
//                     sx={{ width: 220 }}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     />
//                     </Box>
//                 </Grid>
//                 <Grid item xs={7} direction="column" container  >
//                     <CreateMapLost/>
//                 </Grid>
//                 <Grid direction="column" container alignItems="center">
//                     <Button type="submit">Submit</Button>
//                 </Grid>
//             </Grid>
//         </form>
//
//         </div>
//     )
// }
//
// export default CreateFoundPet;
