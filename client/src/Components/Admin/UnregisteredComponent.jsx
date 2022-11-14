import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Divider, Grid, Typography, Snackbar, Alert } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { 
  getUnregisteredStation, 
  registerNewStation, 
  registerAllNewStation, 
} from "../../utils/api/admin";


//main function
const UnregisteredComponent = () => {

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [regNo, setRegNo] = useState(null);
  const [email, setEmail] = useState(null);
  const [contactNo, setContactNo] = useState(null);
  const [address, setAddress] = useState(null);
  const [openSB, setOpenSB] = React.useState(false);


  useEffect(() => {

    async function fetchData() {

        try {

            let response = await getUnregisteredStation();

            let stationDetails = response.station;

            if (response.status === 'ok') {
              console.log(stationDetails);
              setRows(
                stationDetails
              )
              
            }
            else {
                console.log(response.error);
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    fetchData();
    
  }, [open]);

  
  const handleClickOpen = (row) => {
    setOpen(true);
    setRegNo(row.registrationNo);
    setEmail(row.email);
    setContactNo(row.contactNo);
    setAddress(row.location);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const registerStation = async () => {

    let response = await registerNewStation({
      registrationNo: regNo
    });

    if (response.status === "ok") {
      console.log(response);
    } else {
      console.log("error");
    }

    handleClose();
    handleSBOpen();
  }

  const registerAllStation = async () => {

    let response = await registerAllNewStation();

    if (response.status === "ok") {
      console.log(response);
    } else {
      console.log("error");
    }

    //handleClose();  
    //handleSBOpen();
  }

  const handleSBOpen = () => {
    setOpenSB(true);
  };

  const handleSBClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSB(false);
  };

  return (
    <Container>
      <TableContainer>
        <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, mt: -3 }}>
          <h1>Unregistered Fuel station</h1>
        </Grid>

        <Grid
          sx={{
            borderRadius: 4,
            backgroundColor: "#282835",
            paddingBottom: "3px",
          }}
        >
          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    align="center"
                    style={{ color: "white", fontSize: "22px" }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => handleClickOpen(row)}
                      sx={{
                        borderRadius: 10,
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid display="flex" justifyContent="center" margin={3}>
            {rows.length > 0 && <Button
              onClick={registerAllStation}
              variant="contained"
              color="error"
              sx={{
                borderRadius: 3,
                paddingX: "30px",
              }}
            >
              Register All
            </Button>
            }
            {rows.length === 0 && <Typography
              sx={{
                borderRadius: 1,
                paddingX: "30px",
                color: "#ff9966",
              }}
            >
              Currently All Stations are Registered..!
            </Typography>
            }
          </Grid>
        </Grid>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            Station Details
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {/* field values will come from database */}
          <TextField
            label="Registration No"
            defaultValue={regNo}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            style={{ width: "450px" }}
          />
          <br />
          <TextField
            label="Email"
            defaultValue={email}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            style={{ width: "450px" }}
          />
          <br />
          <TextField
            label="Contact No"
            defaultValue={contactNo}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            style={{ width: "450px" }}
          />
          <br />
          <TextField
            label="Address"
            defaultValue={address}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            style={{ width: "450px" }}
          />
        </DialogContent>
        <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
          <Button onClick={registerStation} variant="outlined" color="info" sx={{ width: "100%" }}>
            REGISTER
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSB} autoHideDuration={4000} onClose={handleSBClose}>
        <Alert
          onClose={handleSBClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Station Successfully Registered!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UnregisteredComponent;
