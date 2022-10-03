import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

//progress bar styles
function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column-reverse",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={(props.remainder / props.capacity) * 100}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.light">
          <strong>{props.remainder}</strong> of {props.capacity} Liters
          Available
        </Typography>
      </Box>
    </Box>
  );
}

const fuel_types = [
  {
    type: "Auto Diesel",
    lastDate: "19/09/2022",
    left: 500.545,
    cap: 1000,
    col: "success",
  },
  {
    type: "Super Diesel",
    lastDate: "08/09/2022",
    left: 45.5,
    cap: 100,
    col: "success",
  },
  {
    type: "Petrol 92 Octane",
    lastDate: "12/09/2022",
    left: 890.45,
    cap: 1000,
    col: "success",
  },
  {
    type: "Petrol 95 Octane",
    lastDate: "20/09/2022",
    left: 69.5,
    cap: 150,
    col: "success",
  },
];

const StockComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [fuelType, setFuelType] = React.useState(false);

  const handleClickOpen = (ft) => {
    setOpen(true);
    setFuelType(ft);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold" }} textAlign={"center"}>
          {fuelType}
        </DialogTitle>
        <Box sx={{ display: "flex", pr: 2, pb: 2, pl: 2 }}>
          <DialogContent sx={{ pr: 1 }}>
            <TextField
              focused
              required
              color="info"
              label="Fuel Amount"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Liters</InputAdornment>
                ),
              }}
              sx={{ width: "80%" }}
            />
          </DialogContent>
          <DialogActions sx={{ mr: 2, display: "flex" }}>
            <Button
              size="large"
              variant="contained"
              color="info"
              onClick={handleClose}
              sx={{ pt: "13px", pb: "13px", fontWeight: "bold" }}
            >
              Add
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }}>
        <h1>Fuel Stocks</h1>
      </Grid>
      <Grid container spacing={8} justifyContent="center">
        {fuel_types.map((ft) => (
          <Grid key={ft.type} item md={5}>
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
              <CardContent sx={{ textAlign: { xs: "center", md: "unset" } }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {ft.type}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ pb: 2 }}
                >
                  Last Added Date {ft.lastDate}
                </Typography>
                <Typography variant="h5">
                  <LinearProgressWithLabel
                    color="info"
                    variant="determinate"
                    remainder={ft.left.toFixed(2)}
                    capacity={ft.cap}
                    sx={{ height: 15, borderRadius: 3 }}
                  />
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: { xs: "center", md: "unset" },
                }}
              >
                <Button
                  onClick={() => handleClickOpen(ft.type)}
                  color={ft.col}
                  variant="contained"
                  sx={{ minWidth: "120px" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Add
                    <br />
                    Fuel
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StockComponent;
