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
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import MOBILEAPPIMG from "../../assets/mobileApp.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useAuth from "../../utils/providers/AuthProvider";
import { getAnnouncedQueues } from "../../utils/api/fuelStation";

const fuel_types = [
  ["Auto Diesel", "19/09/2022 15:20", 123, 567.5, "success", 0],
  ["Super Diesel", "10/09/2022 10:20", 67, 113.75, "success", 1],
  ["Petrol 92 Octane", "01/09/2022 11:10", 280, 890.3, "warning", 0],
  ["Petrol 95 Octane", "12/09/2022 18:30", 29, 145.85, "warning", 1],
];

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

  React.useEffect(() => {
    async function fetchData() {
      let response = await getAnnouncedQueues(user.data.registrationNo);
      //console.log(response.fuelQueues);

      let queues = []

      for (let i = 0; i < response.fuelQueues.length; i++) {
        let q = response.fuelQueues[i];
        
        let time = (q.state === "announced") ? [new Date(q.queueStartTime).toString().split("GMT")[0], 0] : [new Date(q.estimatedEndTime).toString().split("GMT")[0], 1];
        
        
        
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
  }, []);

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
