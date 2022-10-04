import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function createData(vehicleType, liter) {
  return { vehicleType, liter };
}

//Petrol fuel quota details
const petrolRows = [
  createData("Motorcycles", "4.000L"),
  createData("Three-wheelers", "5.000L"),
  createData("Vans", "20.000L"),
  createData("Cars", "20.000L"),
  createData("Land vehicle", "15.000L"),
  createData("Lorries", "50.000L"),
];

//Diesel fuel quota details
const dieselRows = [
  createData("Buses", "40.000L"),
  createData("Three-wheelers", "5.000L"),
  createData("Vans", "20.000L"),
  createData("Cars", "20.000L"),
  createData("Land vehicle", "15.000L"),
  createData("Lorries", "50.000L"),
];

//main function
const QuotaComponent = () => {
  const [isPetrol, setIsPetrol] = React.useState(true);  // to assign fuel type
  const [rows, setRows] = React.useState(petrolRows);

  const [open, setOpen] = React.useState(false);    // to open the dialog box
  const [vehicleType, setVehicleType] = React.useState(null);

  //function to popup the dialog box
  const handleClickOpen = (vehicleType) => {
    setOpen(true);
    setVehicleType(vehicleType);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // functions to change fuel type
  const handlePetrol = () => {
    setIsPetrol(true);
    setRows(petrolRows);
  };
  const handleDiesel = () => {
    setIsPetrol(false);
    setRows(dieselRows);
  };

  return (
    <Container>
      <TableContainer>
        <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, mt: -3 }}>
          <h1>Current Fuel Quota</h1>
        </Grid>

        {isPetrol && (
          <Grid display="flex" justifyContent="center" marginBottom={3}>
            <Grid
              padding={1}
              sx={{ backgroundColor: "#282835", borderRadius: 4 }}
            >
              <Button
                variant="contained"
                color="warning"
                onClick={handlePetrol}
                sx={{
                  color: "white",
                  paddingX: "50px",
                  borderRadius: 10,
                  marginX: "5px",
                }}
              >
                Petrol
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleDiesel}
                sx={{
                  background: "#282835",
                  color: "white",
                  paddingX: "50px",
                  borderRadius: 10,
                  marginX: "5px",
                }}
              >
                Diesel
              </Button>
            </Grid>
          </Grid>
        )}

        {!isPetrol && (
          <Grid display="flex" justifyContent="center" marginBottom={3}>
            <Grid
              padding={1}
              sx={{ backgroundColor: "#282835", borderRadius: 4 }}
            >
              <Button
                variant="contained"
                color="warning"
                onClick={handlePetrol}
                sx={{
                  background: "#282835",
                  color: "white",
                  paddingX: "50px",
                  borderRadius: 10,
                  marginX: "5px",
                }}
              >
                Petrol
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleDiesel}
                sx={{
                  color: "white",
                  paddingX: "50px",
                  borderRadius: 10,
                  marginX: "5px",
                }}
              >
                Diesel
              </Button>
            </Grid>
          </Grid>
        )}

        <Table
          sx={{ borderRadius: 4 }}
          style={{ backgroundColor: "#282835" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ color: "white", fontSize: "24px" }}
              >
                Vehicle Type
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontSize: "24px" }}
              >
                Liter/week
              </TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  align="center"
                  style={{ color: "white" }}
                  component="th"
                  scope="row"
                >
                  {row.vehicleType}
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  {row.liter}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleClickOpen(row.vehicleType)}
                    sx={{
                      borderRadius: 10,
                      paddingX: 3,
                    }}
                  >
                    Change
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>Change Quota</Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="h6">
            <strong>{vehicleType}</strong>
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", my: 1 }}>
            <Chip
              label={isPetrol ? "Petrol" : "Diesel"}
              color={isPetrol ? "warning" : "success"}
            />
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Fuel value"
            type="number"
            fullWidth
            variant="outlined"
            color="info"
            focused
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
          <Button
            variant="outlined"
            color={isPetrol ? "warning" : "success"}
            sx={{ width: "100%" }}
          >
            CHANGE
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuotaComponent;
