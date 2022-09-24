import React from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';



export default function RequestFuelPersonal() {


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

                <TextField 
                label="Registration No." 
                variant="outlined" 
                color="secondary" 
                value={'XX-XXX-XXXX'}
                fullWidth
                required
                />

                <TextField 
                label="Fuel Type"
                variant="outlined"
                color="secondary"
                value={'Petrol'}
                fullWidth
                required
                />

                <TextField 
                label="Quota"
                variant="outlined"
                color="secondary"
                value={'10'}
                fullWidth
                required
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