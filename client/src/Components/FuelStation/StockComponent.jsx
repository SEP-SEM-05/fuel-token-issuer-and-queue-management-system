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
import { getDashBoard } from "../../utils/api/fuelStation";
import useAuth from "../../utils/providers/AuthProvider";

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


const StockComponent = () => {
  const { user, signUser } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [fuelType, setFuelType] = React.useState(false);
  const [fuel_types, setFuel_types] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      let response = await getDashBoard(user.data.id);
      //handle errors
      let userr = response.user;

      let capasities = userr.capasities;
      let volumes = userr.volumes;
      let lastFilled = userr.lastFilled;

      let fuel_typess = [];
      for(let key in capasities){
        let obj = {}
        obj['type'] = key;
        let d = new Date(lastFilled[key])
        obj["lastDate"] =
          d.getFullYear() +
          "/" +
          (d.getMonth() + 1).toString().padStart(2, "0") +
          "/" +
          d.getDate().toString().padStart(2, "0");
        obj['left'] = volumes[key];
        obj['cap'] = capasities[key];
        obj["col"] = key.includes("Diesel") ? 'success' : 'warning';

        fuel_typess.push(obj);
      }

      setFuel_types(fuel_typess);
    }

    fetchData();
  }, []);

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
