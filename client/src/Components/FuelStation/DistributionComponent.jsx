import React from "react";
import {
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
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import MOBILEAPPIMG from "../../assets/mobileApp.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useAuth from "../../utils/providers/AuthProvider";
import { getAnnouncedQueues, updateQueue } from "../../utils/api/fuelStation";
import OpacityIcon from "@mui/icons-material/Opacity";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const Distribution = () => {
  const { user, signUser } = useAuth();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [fuelQueues, setfuelQueues] = React.useState([]);
  const [openEx, setOpenEx] = React.useState(false);
  const [today] = React.useState(new Date(new Date().getTime() + 1800000));
  const [newEndTime, setNewEndTime] = React.useState(null);
  const [qid, setQid] = React.useState("");
  const [updateDate, setUpdateData] = React.useState("");
  const [fuelType, setFuelType] = React.useState("");
  const [vehicleCount, setVehicleCount] = React.useState("");
  

  React.useEffect(() => {
    async function fetchData() {
      let response = await getAnnouncedQueues(user.data.registrationNo);
      //console.log(response.fuelQueues);

      let queues = []

      for (let i = 0; i < response.fuelQueues.length; i++) {
        let q = response.fuelQueues[i];
        
        let time = [];
        let now = new Date();
        let st = new Date(q.queueStartTime);
        let et = new Date(q.estimatedEndTime);

        if (q.state === "announced" && st.getTime() > now.getTime()) {
          time = [st.toString().split("GMT")[0], 0];
        } else if (q.state === "announced" && st.getTime() <= now.getTime() && et.getTime() > now.getTime()) {
          time = [et.toString().split("GMT")[0], 1];
          let updated = await updateQueue({id:q._id, state:"active", nf:"start"});
          setUpdateData(updated);
        } else if (q.state === "announced" && st.getTime() <= now.getTime() && et.getTime() <= now.getTime()) {       
          handleClickOpenEx(q._id, q.fuelType, q.vehicleCount);
          time = [et.toString().split("GMT")[0], 1];
        }else if (q.state === "active" && et.getTime() > now.getTime()) {
          time = [et.toString().split("GMT")[0], 1];
        } else if (q.state === "active" && et.getTime() <= now.getTime()) {
          handleClickOpenEx(q._id, q.fuelType, q.vehicleCount);
          time = [et.toString().split("GMT")[0], 1];
        }
        
        
        queues.push([
          q.fuelType,
          time[0],
          q.vehicleCount,
          q.fuelType.includes("Diesel") ? "success" : "warning",
          time[1]
        ]);
      };
      
      setfuelQueues(queues);
    }
    fetchData();
  }, [updateDate]);

  const handleClickOpenEx = (qid, ft, vc) => {
    setQid(qid);
    setFuelType(ft);
    setVehicleCount(vc);
    setOpenEx(true);
  };

  const handleCloseEx = () => {
    setOpenEx(false);
  };

  const handleEnd = async () => {
    let response = await updateQueue({ id: qid, state: "ended", nf: "end" });
    setUpdateData(response);
    handleCloseEx();
  };

  const handleExtend = async (event) => {
    event.preventDefault();
    let response = await updateQueue({
      id: qid,
      state: "active",
      estEndTime: new Date(newEndTime).toString().split("GMT")[0],
      nf:"extend"
    });
    setUpdateData(response); 
    handleCloseEx();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  }; 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterOngoing = (ft) => {
    return ft[4] === 1;
  };
  const filterScheduled = (ft) => {
    return ft[4] === 0;
  };

  return (
    <Box>
      <Dialog open={openEx} onClose={handleCloseEx}>
        <form onSubmit={handleExtend}>
          <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
            Extend or End Distribution?
          </DialogTitle>

          <DialogContent>
            <Typography
              variant="button"
              sx={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Chip
                icon={<OpacityIcon />}
                label={fuelType}
                color={fuelType.includes("Diesel") ? "success" : "warning"}
              />
              <Typography variant="body1" display="block" gutterBottom>
                <DepartureBoardIcon fontSize="small" />{" "}
                <strong>{vehicleCount}</strong> vehicles remaining
              </Typography>
            </Typography>
            <Divider sx={{ pt: 2 }} />
            <Typography variant="body1" sx={{ pb: 2, pt: 1 }}>
              Estimated end time of the queue is passed. Do you want to extend
              the queue?
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(params) => (
                  <TextField
                    required
                    focused
                    fullWidth
                    color="info"
                    helperText="Select a time only if you want to extend the queue time"
                    {...params}
                  />
                )}
                margin="dense"
                id="endtime"
                value={newEndTime}
                onChange={(newValue) => setNewEndTime(newValue)}
                label="Enter New End Time"
                minDateTime={dayjs(today)}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button color="success" type="submit">
              Extend Time
            </Button>
            <Button color="error" onClick={handleEnd}>
              End Distribution
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {" "}
          You Can distribute Fuel Using the Fast Fueler Mobile Application
        </DialogTitle>
        <DialogContent>
          <Box>
            <img width={"100%"} src={MOBILEAPPIMG} alt="mobile" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ mr: 2 }}>
          <Button
            color="info"
            size="large"
            onClick={handleClose}
            sx={{ fontWeight: "bold" }}
          >
            Download Fast Fueler
          </Button>
          <Button
            color="info"
            size="large"
            onClick={handleClose}
            sx={{ fontWeight: "bold" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Ongoing Queues" {...a11yProps(0)} />
          <Tab label="Scheduled Queues" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 } }}>
          <h2>Ongoing Queues</h2>
        </Grid>
        <Grid container spacing={8} justifyContent="center">
          {fuelQueues.filter(filterOngoing).map((ft) => (
            <Grid key={ft[0]} item md={5}>
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
                    {ft[0]}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ pb: 5 }}
                  >
                    Estimated End Time : {ft[1]}
                  </Typography>
                  <Typography variant="h6" display="block" gutterBottom>
                    <DepartureBoardIcon /> <strong>{ft[2]}</strong> vehicles
                    remaining
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
                    onClick={handleClickOpen}
                    color={ft[3]}
                    variant="contained"
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Distribute
                      <br />
                      Fuel
                    </Typography>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }}>
          <h2>Upcoming Queues</h2>
        </Grid>
        <Grid container spacing={8} justifyContent="center">
          {fuelQueues.filter(filterScheduled).map((ft) => (
            <Grid key={ft[0]} item md={5}>
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
                    {ft[0]}
                  </Typography>
                  <Typography
                    variant="button"
                    display="block"
                    gutterBottom
                    sx={{ pb: 5, pt: 1 }}
                  >
                    <Chip
                      sx={{ fontWeight: "bold" }}
                      icon={<AccessTimeIcon />}
                      label={`Start Time ${ft[1]}`}
                      color={ft[3]}
                    ></Chip>
                  </Typography>
                  <Typography variant="h6" display="block" gutterBottom>
                    <DepartureBoardIcon /> <strong>{ft[2]}</strong> vehicles
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: { xs: "center", md: "unset" },
                  }}
                >
                  <Button variant="contained" color="error">
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Cannot
                      <br /> Distribute
                      <br /> yet
                    </Typography>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Distribution;
