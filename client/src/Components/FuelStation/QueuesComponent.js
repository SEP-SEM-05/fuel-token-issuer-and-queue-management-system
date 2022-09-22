import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, DialogContentText, FormControl, Grid, Input, InputAdornment, InputLabel, OutlinedInput, Slider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import OpacityIcon from '@mui/icons-material/Opacity';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';

const fuel_types = [
  ["Auto Diesel", '19/09/2022', 503, 1000, 'success'],
  ["Super Diesel", '10/09/2022', 451, 100, 'success'],
  ["Petrol 92 Octane", '01/09/2022', 89, 1000, 'warning'],
  ["Petrol 95 Octane", '12/09/2022', 54, 150, 'warning']
]

const QueuesComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [fuelType, setFuelType] = React.useState(false);
  const [color, setColor] = React.useState(false);
  const [fuelAmount, setFuelAmount] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setFuelAmount(newValue);
  };

  const handleInputChange = (event) => {
    setFuelAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (fuelAmount < 0) {
      setFuelAmount(0);
    } else if (fuelAmount > 100) {
      setFuelAmount(100);
    }
  };

  const handleClickOpen = (ft, color) => {
    setOpen(true);
    setFuelType(ft);
    setColor(color);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>

        <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }} >Distribution Announcement</DialogTitle>

        <DialogContent sx={{}}>
          <Typography variant='button' sx={{ fontWeight: 'bold' }} ><Chip icon={<OpacityIcon />} label={fuelType} color={color} /></Typography>
          <form onSubmit={'#'}>
            <Grid container sx={{ pt: 2, pb: 2 }}>
              <Grid item xs={12} sx={{display:'flex', justifyContent:'space-around'}} >
                <Slider
                  value={typeof fuelAmount === 'number' ? fuelAmount : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
                <OutlinedInput
                  value={fuelAmount}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 5,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />

              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel>Fuel Amount</InputLabel>
                  <OutlinedInput
                    endAdornment={<InputAdornment position="end" >Liters</InputAdornment>}
                    label="Fuel Amount"
                  />
                </FormControl>

              </Grid>
              <Grid item >

              </Grid>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>


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
                <Button onClick={() => handleClickOpen(ft[0], ft[4])} color={ft[4]} variant="contained" ><Typography variant='h6' sx={{ fontWeight: 'bold' }}>Announce<br />Queue</Typography></Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default QueuesComponent