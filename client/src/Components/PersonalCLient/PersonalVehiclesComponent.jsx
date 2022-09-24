import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Autocomplete, Box, Button, CardActions, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputAdornment, TextField } from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const stations = [
    'a','b','f','k','ABC 1234', 'Diesel', '19/09/2022', 'Mortor Car', 'ABD 4234', 'Petrol', '17/08/2022', 'Mortor Bike'
];

const vehicles = [
    ['ABC 1234', 'Diesel', '19/09/2022', 'Mortor Car', 34, 40 , ['a','b']],
    ['ABD 4234', 'Petrol', '17/08/2022', 'Mortor Bike', 4, 5, ['a','b', 'f']],
    ['ADT 4569', 'Petrol', '12/07/2022', 'Van', 30, 30, ['a','b', 'k']]
]




export default function PersonalVehicles() {
    const [open, setOpen] = React.useState(false);
    const [openSt, setOpenSt] = React.useState(false);
    const [vehicle, setVehicle] = React.useState([]);
    const [selectedStation, setSelectedStation] = React.useState('');
    const [selectedStations, setSelectedStations] = React.useState([]);

    const handleClickOpen = (vehicle) => {
        setOpen(true);
        setVehicle(vehicle);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSt = (vehicle) => {
        setOpenSt(true);
        setVehicle(vehicle);
    };

    const handleCloseSt = () => {
        setOpenSt(false);
    };

    const addStation = (newValue) => {
        // if (newValue !== null && selectedStations.indexOf(newValue) === -1 && selectedStations.length < 3) {
        //     setSelectedStations(...selectedStations.concat([newValue]));
        // }
        setSelectedStations(newValue)
        console.log(selectedStation);
        
    }

    const removeSelectedStation = (st) => {
        selectedStations.splice(selectedStations.indexOf(st), 1);

        console.log(selectedStations);

    }


    return (
        <Box>
            <Dialog open={open} onClose={handleClose}  >

                <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}><PublishedWithChangesIcon sx={{ pr: 1 }} /> Request Fuel</Box>
                </DialogTitle>
                <Divider />

                <DialogContent sx={{ pr: 8, pl: 4 }}>
                    <Typography variant='h6'>
                        <strong>{vehicle[0]}</strong> <Typography variant='caption'>{vehicle[3]}</Typography>
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }} >
                        <Chip label={vehicle[1]} color={vehicle[1] === 'Diesel' ? 'success' : 'warning'} />
                    </Typography>


                    <Typography variant='h6' sx={{ pt: 4 }}>
                        <strong>{vehicle[4]}</strong> liters remaining
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
                    <Button variant='outlined' color={vehicle[1] === 'Diesel' ? 'success' : 'warning'} sx={{ width: "100%" }} >Request</Button>
                </DialogActions>


            </Dialog>

            <Dialog open={openSt} onClose={handleCloseSt}  >

                <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}><PublishedWithChangesIcon sx={{ pr: 1 }} /> Selected Fuel Stations</Box>
                </DialogTitle>
                <Divider />

                <DialogContent sx={{ pr: 8, pl: 4 }}>
                    <Autocomplete
                        multiple
                        autoSelect
                        id="tags-standard"
                        options={stations}
                        defaultValue={vehicle[6]}
                        onChange={(event, val)=>addStation(val)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Multiple values"
                                placeholder="Favorites"
                            />
                        )}
                    />


                    
                </DialogContent>
                <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
                    <Button variant='outlined' color={vehicle[1] === 'Diesel' ? 'success' : 'warning'} sx={{ width: "100%" }} >Change Stations</Button>
                </DialogActions>
            </Dialog>


            <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }} ><h1>Own Vehicles</h1></Grid>
            <Grid container spacing={8} justifyContent="center">
                {vehicles.map((vehicle) => (
                    <Grid item md={5} key={vehicle[0]}>
                        <Card variant="outlined" sx={{ p: 1, boxShadow: 3, borderRadius: 3, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#282835', color: 'white', }}>
                            <CardContent sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                    {vehicle[0]}
                                </Typography>
                                <Typography variant="button" display="block" gutterBottom >
                                    {vehicle[3]} <Chip sx={{ fontWeight: 'bold' }} label={vehicle[1]} color={vehicle[1] === 'Diesel' ? 'success' : 'warning'}></Chip>
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom sx={{ pb: 5 }}>
                                    Last refilled date : {vehicle[2]}
                                </Typography>
                                <Box sx={{ alignItems: 'center', display: "flex", pb: 1 }}>
                                    <OpacityIcon sx={{ pr: '5px' }} />
                                    <Typography variant="h6" display="block" >
                                        {vehicle[4] === vehicle[5] ? <strong>{vehicle[5]}</strong> : <><strong>{vehicle[4]}</strong> out of <strong>{vehicle[5]}</strong></>} liters remaining
                                    </Typography>
                                </Box>
                                <Button onClick={() => handleClickOpenSt(vehicle)} variant='contained' size='small' color='error' sx={{ fontWeight: 'bold' }}>Fuel Stations</Button>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', alignItems: 'stretch', justifyContent: { xs: 'center', md: 'unset' } }}>
                                <Button onClick={() => handleClickOpen(vehicle)} variant='contained' color='info'>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Request<br />Fuel</Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box >
    )
}