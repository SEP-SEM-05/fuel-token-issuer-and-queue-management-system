import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';

const view = () => {
    console.log("view vehicle")
}


export default function PersonalVehicles({ registrationNo, fuelType }) {

    return (
        <Box>
            <Card sx={{ maxWidth: 345 }} elevation={2} >
                <CardActionArea onClick={view}>
                    <CardContent style={{ backgroundColor: "grey[500]" }}>
                        <Typography gutterBottom variant="h4" component="div">
                            {registrationNo}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Fuel Type:
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {fuelType}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}