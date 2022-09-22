import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Divider, FormHelperText, Grid, InputAdornment, Slider, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import OpacityIcon from '@mui/icons-material/Opacity';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';

const fuel_types = [
  ["Auto Diesel", '19/09/2022', 503, 567.50, 'success'],
  ["Super Diesel", '10/09/2022', 451, 113.75, 'success'],
  ["Petrol 92 Octane", '01/09/2022', 89, 890.30, 'warning'],
  ["Petrol 95 Octane", '12/09/2022', 54, 145.85, 'warning']
]

const QueuesComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [fuelType, setFuelType] = React.useState([]);
  const [fuelAmount, setFuelAmount] = React.useState(0);
  const [vehicleCount, setVehicleCount] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setFuelAmount(newValue);
    //console.log(event.target.value);
  };

  const handleInputChange = (event) => {
    setFuelAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (fuelAmount < 0) {
      setFuelAmount(0);
    } else if (fuelAmount > fuelType[3]) {
      setFuelAmount(fuelType[3]);
    }
  };

  const handleClickOpen = (ft) => {
    setOpen(true);
    setFuelAmount(0);
    setFuelType(ft);
    setVehicleCount(99)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>

        <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }} >Distribution Announcement</DialogTitle>

        <DialogContent sx={{}}>
          <Typography variant='button' sx={{ fontWeight: 'bold' }} ><Chip icon={<OpacityIcon />} label={fuelType[0]} color={fuelType[4]} /></Typography>
          <Divider sx={{ pt: 2 }} />
          <form>
            <Grid container spacing={2} sx={{ pt: 2, pb: 2 }}>
              <Grid item xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: "space-between", alignItems: { xs: 'start', md: 'center' } }} >
                <Slider color='info' sx={{ maxWidth: {xs:'80%', md:'300px'}, height: '10px' }}
                  value={typeof fuelAmount === 'number' ? fuelAmount : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  max={fuelType[3]}
                />
                <Grid item >
                  <TextField
                    focused
                    required
                    color='info'
                    label='Amount'
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={fuelAmount ? fuelAmount : '' }
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          / {fuelType[3]}
                        </InputAdornment>
                      ),
                    }}
                    sx={{ maxWidth: '140px'}}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: 0 }}>
                <Box sx={{ alignItems: 'center', display: 'flex' }}><DirectionsBusFilledIcon sx={{ pr: '5px' }} />
                  <Typography variant='h6' ><strong >{vehicleCount}</strong> from {fuelType[2]}</Typography>
                </Box>
                <Divider sx={{ pt: 2 }} /><br />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  focused
                  required
                  color='info'
                  label='Start Date and Time'
                  type='datetime-local'
                  sx={{ width: '80%' }}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  focused
                  required
                  color='info'
                  label='Avg. time for a vehicle'
                  type='number'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        Minutes
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: '80%' }}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  disabled
                  label='Estimated End Date and Time'
                  sx={{ width: '80%' }}
                />
              </Grid>
              <Grid item >
                <Button size="large" variant="contained" color="info" type="submit">
                  Announce
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>


      </Dialog>


      <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }} ><h1>Fuel Waiting Queues</h1></Grid>
      <Grid container spacing={8} justifyContent="center">
        {fuel_types.map((ft) => (
          <Grid key={ft[0]} item md={5} >
            <Card variant="outlined" sx={{ p: 1, boxShadow: 3, borderRadius: 3, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#282835', color: 'white', }}>
              <CardContent sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  {ft[0]}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom sx={{ pb: 4 }}>
                  Last Announcement : {ft[1]}
                </Typography>
                <Typography variant="h6" display="block" gutterBottom>
                  <DepartureBoardIcon /> <strong>{ft[2]}</strong> vehicles
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', alignItems: 'stretch', justifyContent: { xs: 'center', md: 'unset' } }}>
                <Button onClick={() => handleClickOpen(ft)} color={ft[4]} variant="contained" ><Typography variant='h6' sx={{ fontWeight: 'bold' }}>Announce<br />Queue</Typography></Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default QueuesComponent