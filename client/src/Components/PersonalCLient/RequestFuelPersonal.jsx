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


//vehicle object should be passed

export default function RequestFuelPersonal() {

    const classes = useStyles();

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

                <TextField className={classes.field}
                label="Registration No." 
                variant="outlined" 
                color="secondary" 
                value={'XX-XXX-XXXX'}
                fullWidth
                required
                disabled
                />

                <TextField className={classes.field}
                label="Fuel Type"
                variant="outlined"
                color="secondary"
                value={'Petrol'}
                fullWidth
                required
                disabled
                />

                <TextField className={classes.field}
                label="Quota"
                variant="outlined"
                color="secondary"
                value={'10'}
                fullWidth
                required
                disabled
                />

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