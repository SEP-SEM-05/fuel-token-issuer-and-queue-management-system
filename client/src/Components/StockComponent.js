import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, LinearProgress } from '@mui/material';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column-reverse' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={(props.remainder / props.capacity) * 100} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.light" ><strong>{props.remainder}</strong> From {props.capacity} Leters Available</Typography>
      </Box>
    </Box>
  );
}

const fuel_types = [
  ["Auto Diesel", '19/09/2022', 500.545, 1000, 'success'],
  ["Super Diesel", '10/09/2022', 45.50, 100, 'success'],
  ["Petrol 92 Octane", '01/09/2022', 890.34, 1000, 'warning'],
  ["Petrol 95 Octane", '12/09/2022', 50, 150, 'warning']
]

const StockComponent = () => {
  return (
    <Box>
      <Grid item xs={12}><h1>Stocks</h1></Grid>
      <Grid container spacing={10} justifyContent="center">
        {fuel_types.map((ft)=>(
          <Grid key={ft[0]} item md={5} >
          <Card variant="outlined" sx={{ p: 1, boxShadow: 3, borderRadius: 3, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#282835', color: 'white', }}>
            <CardContent sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {ft[0]}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom sx={{ pb: 2 }}>
                Last Added Date {ft[1]}
              </Typography>
              <Typography variant='h5'>
                <LinearProgressWithLabel color='info' variant="determinate" remainder={ft[2].toFixed(2)} capacity={ft[3]} sx={{ height: 15, borderRadius: 3, }} />
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', alignItems: 'stretch', justifyContent: { xs: 'center', md: 'unset' } }}>
              <Button color={ft[4]} variant="contained" ><Typography variant='h6' sx={{ fontWeight: 'bold' }}>Add<br />Fuel</Typography></Button>
            </CardActions>
          </Card>
        </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default StockComponent