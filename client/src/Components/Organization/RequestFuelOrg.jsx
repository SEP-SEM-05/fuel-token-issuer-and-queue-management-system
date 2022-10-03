import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QRIMG from "../../assets/QR.svg";

import axios from "axios";

const stationNameandCity = [
  "station 01",
  "station 02",
  "station 03",
  "station 04",
];

// It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

// useEffect(() => {
//   async function fetchData() {
//     // You can await here
//     const response = await MyAPI.getData(someId);
//     // ...
//   }
//   fetchData();
// }, [someId]); // Or [] if effect doesn't need props or state

const RequestFuelOrg = () => {

  // const token = sessionStorage.getItem('org_token');

  // if (!token) {
  //   sessionStorage.clear();
  //   document.location = '/';
  // }

  // const storageUserData = JSON.parse(sessionStorage.getItem("userData"));
  // const user_id = storageUserData.id;
  // // let storageUserData = JSON.parse(sessionStorage.getItem("userData"));
  // // storageUserData = {id: '8364834836843'};

  const [open, setOpen] = React.useState(false);
  const [openSt, setOpenSt] = React.useState(false);
  const [fuelType, setFuelType] = React.useState("");
  const [value, setValue] = React.useState();
  const [dieselQuota] = useState([99, 99]);
  const [petrolQuota] = useState([89, 70]);
  const [lastDate] = useState("29/09/2022");
  const [vehicleCount] = useState(12);
  const [stations] = useState(["station 01", "station 02", "station 03"]);
    const [openQR, setOpenQR] = React.useState(false);

  // useEffect(async () => {

  //   try {

  //     let response = await axios.get(`http://localhost:5000/org/dashboard/${user_id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         token: token,
  //       }
  //     })
  
  //     let status = response.data.status;
  //     let user = response.data.user;
  //     let vehicles = response.data.vehicles;
  //     let stations = response.data.stations;
  
  //     if (status === 'ok') {
  //       // setOwnVehicles(vehicles);
  //       // setUser(user_data);
  //       console.log(response.data);
  //     }
  //     else if (status === 'auth-error') {
  //       // sessionStorage.clear();
  //       // document.location = '/';
  //     }
  //     else {
  //       console.log(response.error);
  //     }
  //   } 
  //   catch (err) {
  //     console.log(err);
  //   }
  // }, [])

  const handleChange = (event) => {
    setFuelType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSt = () => {
    setOpenSt(true);
    setValue(stations);
  };

  const handleCloseSt = () => {
    setOpenSt(false);
  };

  const handleClickOpenQR = () => {
    setOpenQR(true);
  };

  const handleCloseQR = () => {
    setOpenQR(false);
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            Request Fuel
          </Box>
        </DialogTitle>
        <Divider />

        <DialogContent sx={{ pr: 8, pl: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fuel Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fuelType}
              label="FuelType"
              onChange={handleChange}
            >
              <MenuItem value={10}>Auto Diesel</MenuItem>
              <MenuItem value={20}>Super Diesel</MenuItem>
              <MenuItem value={30}>Petrol 92 Octane</MenuItem>
              <MenuItem value={40}>Petrol 95 Octane</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
          <Button variant="outlined" color={"info"} sx={{ width: "100%" }}>
            Confirm and Request
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSt} onClose={handleCloseSt}>
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            Selected Fuel Stations
          </Box>
        </DialogTitle>
        <Divider />

        <DialogContent sx={{ pr: 8, pl: 4, pt: 3 }}>
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={value}
            onChange={(event, newValue) => {
              newValue.length < 4 && setValue(newValue);
            }}
            options={stationNameandCity}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  sx={{ fontWeight: "bold" }}
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            sx={{ minWidth: { md: 500, xs: "unset" } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Fuel Stations"
                variant="outlined"
                color="info"
                focused
              />
            )}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button variant="outlined" color={"success"} sx={{ width: "100%" }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openQR} onClose={handleCloseQR}>
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>QR Code</Box>
        </DialogTitle>
        <DialogContent>
          <img alt="QR" src={QRIMG} />
        </DialogContent>
      </Dialog>

      <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }}>
        <h1>Home</h1>
      </Grid>
      <Grid container spacing={20} justifyContent="center">
        <Grid item xs={12} md={8} sx={{ ml: 10 }}>
          <form>
            <Card
              variant="outlined"
              sx={{
                p: 1,
                boxShadow: 3,
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
                backgroundColor: "#282835",
                color: "white",
              }}
            >
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: { xs: "center", lg: "unset" },
                }}
              >
                <Button
                  onClick={handleClickOpenSt}
                  variant="contained"
                  color="error"
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Fuel
                    <br />
                    Stations
                  </Typography>
                </Button>
              </CardActions>
              <CardContent sx={{ textAlign: { xs: "center", md: "center" } }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Weekly Quota
                </Typography>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", pt: 1, pr: 1, pb: 1 }}
                  >
                    <Chip
                      color="success"
                      label={`DIESEL ${
                        dieselQuota[0] === dieselQuota[1]
                          ? ""
                          : `${dieselQuota[1]} /`
                      } ${dieselQuota[0]} L REMAINING`}
                    />
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", pt: 1, pr: 1, pb: 1 }}
                  >
                    <Chip
                      color="warning"
                      label={`PETROL ${
                        petrolQuota[0] === petrolQuota[1]
                          ? ""
                          : `${petrolQuota[1]} /`
                      } ${petrolQuota[0]} L REMAINING`}
                    />
                  </Typography>
                </Grid>
                <Box
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    pb: 1,
                  }}
                >
                  <Typography variant="h6" component="div" sx={{ pt: 8 }}>
                    <DirectionsCarIcon /> Number of vehicles : {vehicleCount}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    pb: 1,
                  }}
                >
                  <Typography variant="h6" component="div" sx={{}}>
                    <EventRepeatIcon /> Last Taken Date : {lastDate}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "unset" },
                }}
              >
                <Tooltip placement="top" title={"QR code"}>
                  <IconButton onClick={handleClickOpenQR}>
                    <QrCode2Icon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  color="success"
                  sx={{ alignSelf: "stretch" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Request
                    <br />
                    Fuel
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestFuelOrg;
