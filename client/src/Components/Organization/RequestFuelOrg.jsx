import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})


//all station objects should be passed

export default function RequestFuelOrg() {

    const classes = useStyles();

    const [fuelType, setFuelType] = useState('Petrol');

    const handleChange = (e) => {
        setFuelType(e.target.value);
    };

    const handleSubmit = (e) => {}

    return (
        <Container>
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Request Fuel
            </Typography>
            
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                <FormControl  className={classes.field}>
                    <InputLabel id="demo-simple-select-helper-label">Fuel Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={fuelType}
                    label="Fuel Type:"
                    onChange={handleChange}
                    >
                        <MenuItem value={"Petrol"}>Petrol</MenuItem>
                        <MenuItem value={"Diesel"}>Diesel</MenuItem>
                    </Select>
                    <FormHelperText>Chaoose a type</FormHelperText>
                </FormControl>

                <Button
                type="submit" 
                color="secondary" 
                variant="contained">
                Request
                </Button>
            </form>
        </Container>
    )
}