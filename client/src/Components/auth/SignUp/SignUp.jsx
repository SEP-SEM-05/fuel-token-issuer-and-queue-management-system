import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import FUELIMG from '../../../assets/signIn.jpg'
import SignUpPer from './SignUpPer';
import SignUpOrg from './SignUpOrg';

const theme = createTheme();

export default function SignUp() {
  const [isOrg, setIsOrg] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${FUELIMG})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5}  elevation={6} square>
          <Typography
            sx={{ mx: 4, mt: 2}}
            variant="body1"
            component="div"
            align='right'
          >
            Are you {isOrg ? "a Personal User?" : "an Organization?"}
            <Link onClick={() => {setIsOrg(!isOrg)}} href="#" variant="body1">
              {"Signup Here"}
            </Link>
          </Typography>
          <Grid sx={{ display: 'flex', mx: 3, my: 1}}>
            <Box sx={{mr: 1}}>
              <LocalGasStationIcon fontSize='large' />
            </Box>
            <Typography
              variant="h4"
              component="div"
            >
              Fast Fueler
            </Typography>
          </Grid>
            {!isOrg && <SignUpPer/>}
            {isOrg && <SignUpOrg/>}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}