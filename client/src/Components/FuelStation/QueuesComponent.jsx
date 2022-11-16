import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuth from "../../utils/providers/AuthProvider";
import {
  Alert,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  Slider,
  Snackbar,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import OpacityIcon from "@mui/icons-material/Opacity";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import { announceFuelQueue, getWaitingQueues } from "../../utils/api/fuelStation";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const types = [
  "Auto Diesel",
  "Super Diesel",
  "Petrol 92 Octane",
  "Petrol 95 Octane",
];

function addMinutes(numOfMinutes, date) {
  date.setMinutes(parseInt(date.getMinutes()) + parseInt(numOfMinutes));
  return date;
}


const QueuesComponent = () => {
  const { user, signUser } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [openSB, setOpenSB] = React.useState(false);
  const [fuelType, setFuelType] = React.useState("");
  const [fuelAmount, setFuelAmount] = React.useState(0);
  const [lastDates] = React.useState({});
  const [availableAmounts, setAvailableAmounts] = React.useState({});
  const [queues, setQueues] = React.useState({});
  const [vehicleCounts, setVehicleCounts] = React.useState({});
  const [maxCount, setMaxCount] = React.useState(0);
  const [fuelQueueToGo, setFuelQueueToGo] = React.useState([]);
  const [startTime, setStartTime] = React.useState(null);
  const [avgTime, setAvgTime] = React.useState("");
  const [estEndTime, setEstEndTime] = React.useState("");
  const [reloadData, setReloadData] = React.useState();
  const [today] = React.useState(new Date().getTime());

  React.useEffect(() => {
    async function fetchData() {
      let response = await getWaitingQueues(user.data.registrationNo);
      //handle errors
  
      setAvailableAmounts(response.availableAmounts);
      setQueues(response.queues);
      setVehicleCounts(response.vehicleCounts);

      types.map((key) => {
        if (!response.lastDates[key]) {
          lastDates[key] = "N/A";
        } else {
          lastDates[key] = new Date(response.lastDates[key]).toString().split("GMT")[0];
        }
      });
    }
    fetchData();
  }, [reloadData]);

  const announceQueue = async (event) => {
    event.preventDefault()
    
    let response = await announceFuelQueue({
      regNo: user.data.registrationNo,
      fuelType: fuelType,
      vehicles: fuelQueueToGo,
      announcedTime: new Date().toString().split("GMT")[0],
      estQueueEndTime: estEndTime,
      startTime: new Date(startTime).toString().split("GMT")[0],
      fuelAmount: fuelAmount
    });

    if (response.status == "ok") {
      setReloadData(response.noti);
      setMaxCount(0);
      setFuelQueueToGo([]);
      setStartTime("");
      setAvgTime("");
      setEstEndTime("");
    } else {
      console.log("error");
    }

    handleClose();
    handleSBOpen();

  }

  const handleSliderChange = (event, newValue) => {
    setFuelAmount(newValue);
  };

  // calculate the optimal vehicle count recursively
  const getMaxVehicleCount = (vehicles, amount, count, sel_v) => {
    if (vehicles.length == 0 || amount == 0) {
      return [sel_v, count]
    }
    let cap = amount;
    let c = count;
    let sel = sel_v;
    for (let i = 0; i < vehicles.length; i++) {
      cap -= vehicles[i].quota;
      if (cap < 0) {
        return getMaxVehicleCount(vehicles.slice(i+1), cap + vehicles[i].quota, c, sel);
      }
      c++;
      sel.push(vehicles[i]);
    }
    return [sel, c]
  };

  const handleSliderChangeCommited = (event, newValue) => {
    let arr = getMaxVehicleCount(queues[fuelType], newValue, 0, []);
    setMaxCount(arr[1]);
    setFuelQueueToGo(arr[0]);
    setStateAndEstEndTime(arr[0]);
  };

  const handleInputChange = (event) => {
    setFuelAmount(event.target.value === "" ? "" : Number(event.target.value));
  };

  const calculateEstEnd = (fuelQueueToGo = [], startTime = "", avgTime = "") => {
    let st = new Date(startTime);
    let et = st;

    for (let i = 0; i < fuelQueueToGo.length; i++) {
      addMinutes(avgTime, et);
      fuelQueueToGo[i]["estTime"] = et.toString().split("GMT")[0];
      
    }
    setEstEndTime((et.toString()).split("GMT")[0]);
  };

  const setStateAndEstEndTime = (event) => {
    if (event.target) {
      setAvgTime(event.target.value);
      calculateEstEnd(fuelQueueToGo, startTime, event.target.value);
    } else {
      if (Array.isArray(event)) {
        setFuelQueueToGo(event);
        calculateEstEnd(event, startTime, avgTime);   
      }else{
        setStartTime(event);
        calculateEstEnd(fuelQueueToGo, event, avgTime);
      }
    }
    

  }

  const handleBlur = () => {
    if (fuelAmount < 0) {
      setFuelAmount(0);
    } else if (fuelAmount > availableAmounts[fuelType]) {
      setFuelAmount(availableAmounts[fuelType]);
    }
    handleSliderChangeCommited(0, fuelAmount);
  };

  const handleClickOpen = (ft) => {
    setOpen(true);
    setFuelAmount(0);
    setFuelType(ft);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
          Distribution Announcement
        </DialogTitle>

        <DialogContent sx={{}}>
          <Typography variant="button" sx={{ fontWeight: "bold" }}>
            <Chip
              icon={<OpacityIcon />}
              label={fuelType}
              color={fuelType.includes("Diesel") ? "success" : "warning"}
            />
          </Typography>
          <Divider sx={{ pt: 2 }} />
          <form onSubmit={announceQueue}>
            <Grid container spacing={2} sx={{ pt: 2, pb: 2 }}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "start", md: "center" },
                }}
              >
                <Slider
                  color="info"
                  id="slider"
                  sx={{ maxWidth: { xs: "80%", md: "300px" }, height: "10px" }}
                  value={typeof fuelAmount === "number" ? fuelAmount : 0}
                  onChange={handleSliderChange}
                  onChangeCommitted={handleSliderChangeCommited}
                  aria-labelledby="input-slider"
                  max={availableAmounts[fuelType]}
                />
                <Grid item>
                  <TextField
                    focused
                    required
                    id="fuelAmount"
                    color="info"
                    label="Amount"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={fuelAmount ? fuelAmount : ""}
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          / {availableAmounts[fuelType]}
                        </InputAdornment>
                      ),
                    }}
                    sx={{ maxWidth: "140px" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: 0 }}>
                <Box sx={{ alignItems: "center", display: "flex" }}>
                  <DirectionsBusFilledIcon sx={{ pr: "5px" }} />
                  <Typography variant="h6" sx={{ pr: "10px" }}>
                    <strong>{maxCount}</strong> from {vehicleCounts[fuelType]}
                  </Typography>
                </Box>
                <Divider sx={{ pt: 2 }} />
                <br />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={12}>
                  <DateTimePicker
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: "80%" }}
                        required
                        focused
                        color="info"
                        helperText="Select the estimated queue starting time"
                        {...params}
                      />
                    )}
                    id="startDateTime"
                    minDateTime={dayjs(today)}
                    value={startTime}
                    onChange={(event, id) => setStateAndEstEndTime(event)}
                    label="Start Date and Time"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    focused
                    required
                    id="avgTime"
                    color="info"
                    label="Avg. time for a vehicle"
                    value={avgTime}
                    onChange={(event) => setStateAndEstEndTime(event)}
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Minutes</InputAdornment>
                      ),
                    }}
                    sx={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Chip
                    id="estEndTime"
                    variant="outlined"
                    label={
                      estEndTime === "Invalid Date" || !estEndTime
                        ? "Estimated End Time"
                        : "Estimated End Time: " + estEndTime
                    }
                    color={fuelType.includes("Diesel") ? "success" : "warning"}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item>
                <Button
                  size="large"
                  variant="contained"
                  color="info"
                  type="submit"
                >
                  Announce
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }}>
        <h1>Fuel Waiting Queues</h1>
      </Grid>
      <Grid container spacing={8} justifyContent="center">
        {types.map((ft) => (
          <Grid key={ft} item md={5}>
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
                  {ft}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ pb: 4 }}
                >
                  Last Announcement : {lastDates[ft]}
                </Typography>
                <Typography variant="h6" display="block" gutterBottom>
                  <DepartureBoardIcon /> <strong>{vehicleCounts[ft]}</strong>{" "}
                  vehicles
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
                  onClick={() => handleClickOpen(ft)}
                  color={ft.includes("Diesel") ? "success" : "warning"}
                  variant="contained"
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Announce
                    <br />
                    Queue
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={openSB} autoHideDuration={6000} onClose={handleSBClose}>
        <Alert
          onClose={handleSBClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Queue successfully Announced!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QueuesComponent;
