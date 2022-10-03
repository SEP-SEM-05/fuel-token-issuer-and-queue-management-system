import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import FUELIMG from "../../../assets/signIn.jpg";
import StationGetStand from "./StationGetStand";

const theme = createTheme();

export default function GetStand() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${FUELIMG})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} >
          <Grid sx={{ display: "flex", mx: 3, my: 1, mt: 3 }}>
            <Box sx={{ mr: 1 }}>
              <LocalGasStationIcon fontSize="large" />
            </Box>
            <Typography variant="h4" component="div">
              Fast Fueler
            </Typography>
          </Grid>
          {/* import the form from another file */}
          <StationGetStand />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
