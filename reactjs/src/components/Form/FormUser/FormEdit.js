import {Controller, FormProvider} from "react-hook-form";
import {Button, ButtonBase, FormControl, Grid, Paper, Typography} from "@mui/material";
import RadioGroup from "../RadioGroup";
import TextField from "../TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "@mui/lab/DatePicker";
import CreateMapFound from "../../map/CreateMapFound";
import React from "react";





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
                // justifyContent="center"
                // alignItems="center"
            >
                <Grid item>

                    <RadioGroup
                        row
                        name="type"
                        label="Animal special"
                        rules={{ required: "Required!" }}
                        items={[
                          { name: "Cat", value: "Cat" },
                          { name: "Dog", value: "Dog" },
                          { name: "Rabbit", value: "Rabbit" },
                          { name: "Bird", value: "Bird" },
                          { name: "Tortoise", value: "Tortoise" },
                          { name: "Other", value: "Other" },
                        ]}
                      />
                </Grid>

                <Grid item>
                    <RadioGroup
                        name="gender"
                        label="Gender"
                        rules={{ required: "Required!" }}
                        items={[
                          { name: "Female", value: "Female" },
                          { name: "Male", value: "Male" },
                          { name: "Unknown", value: "Unknown" }
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
                        onChange={(evt) => setCover(evt.target.files[0])}
                        />
                    </Button>
                    <ButtonBase>
                        <img alt='Pet' src={cover}  width='100'/>
                    </ButtonBase>
                    {/*<Typography sx={{mt: 2}}>*/}
                    {/*    {cover ? cover : ''}*/}
                    {/*</Typography>*/}

                    </FormControl>
                </Grid>

                <Grid item>
                    <Typography>
                        Where & when
                    </Typography>
                </Grid>

                <Grid item>
                    <Controller control={form.control}  name='date' render={(
                        {
                            field:{ name, value},
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

                <Grid item>
                    <CreateMapFound/>
                </Grid>

                <Grid item>
                    <Button type="submit">Submit</Button>
                </Grid>
            </Grid>
        </form>
       </FormProvider>
            </Paper>