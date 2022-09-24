import React, { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Chip, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const RequestFuelOrg = () => {
    const [dieselQuota] = useState([99, 99]);
    const [petrolQuota] = useState([89, 70]);
    const [lastDate] = useState("29/09/2022");
    const [vehicleCount] = useState(12);

    return (
        <Box>
            <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }} ><h1>Own Vehicles</h1></Grid>
            <Grid container spacing={8} justifyContent="center">
                <Grid item xs={12} md={9} sx={{ ml: 10 }}>
                    <form>
                        <Card variant="outlined" sx={{ p: 1, boxShadow: 3, borderRadius: 3, display: 'flex', width: '75%', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#282835', color: 'white', }}>
                            <CardActions sx={{ display: 'flex', alignItems: 'stretch', justifyContent: { xs: 'center', md: 'unset' }, }}>
                                <Button variant='contained' color='error'>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Fuel<br />Stations</Typography>
                                </Button>
                            </CardActions>
                            <CardContent sx={{ textAlign: { xs: 'center', md: 'center' } }}>
                                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                    Weekly Quota
                                </Typography>
                                <Grid item xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, }} >
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', pt: 1, pr: 1, pb: 1 }}>
                                        <Chip color='success' label={`DIESEL ${dieselQuota[0] === dieselQuota[1] ? '' : `${dieselQuota[1]} /`} ${dieselQuota[0]} L REMAINING`} />
                                    </Typography>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', pt: 1, pr: 1, pb: 1 }}>
                                        <Chip color='warning' label={`PETROL ${petrolQuota[0] === petrolQuota[1] ? '' : `${petrolQuota[1]} /`} ${petrolQuota[0]} L REMAINING`} />
                                    </Typography>
                                </Grid>
                                <Box sx={{ justifyContent:'center', alignItems: 'center', display: "flex", pb: 1 }}>
                                    <Typography variant="h6" component="div" sx={{ pt: 8 }}>
                                        <DirectionsCarIcon /> Number of vehicles : {vehicleCount}
                                    </Typography>
                                </Box>
                                <Box sx={{ justifyContent:'center', alignItems: 'center', display: "flex", pb: 1 }}>
                                    <Typography variant="h6" component="div" sx={{}}>
                                        <EventRepeatIcon /> Last Taken Date : {lastDate}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', alignItems: 'stretch', justifyContent: { xs: 'center', md: 'unset' } }}>
                                <Button variant='contained' color='success'>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Request<br />Fuel</Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RequestFuelOrg