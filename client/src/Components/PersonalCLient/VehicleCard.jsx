import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { grey } from '@material-ui/core/colors';

const view = () => {
    console.log("view vehicle")
}
// add vehicle to onclick
export default function VehicleCard({registrationNo, fuelType}) {

    return (
        <Card sx={{ maxWidth: 345 }} elevation={2} >
            <CardActionArea onClick={view}>
                <CardContent style={{backgroundColor: "grey[500]"}}>
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
    )
}