import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const QueuesComponent = () => {
    return (
        <Box>
            <Grid container spacing={2} justifyContent='center'>
            <Grid item md={5} >
          <Card variant="outlined" sx={{ p: 1, boxShadow: 3, borderRadius: 3, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#282835', color: 'white', }}>
            <CardContent sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                Auto Diesel
              </Typography>
              <Typography variant="caption" display="block" gutterBottom sx={{ pb:2 }}>
                Last Added Date {'19/09/2022'}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', alignItems: 'stretch', justifyContent: { xs: 'center', md: 'unset' } }}>
              <Button color="success" variant="contained" ><Typography variant='h6' sx={{ fontWeight: 'bold' }}>Add<br/>Fuel</Typography></Button>
            </CardActions>
          </Card>
        </Grid>
            </Grid>
        </Box>
    )
}

export default QueuesComponent