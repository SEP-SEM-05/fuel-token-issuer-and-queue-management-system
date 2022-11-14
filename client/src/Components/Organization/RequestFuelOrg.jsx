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
    Snackbar,
    Alert,
} from "@mui/material";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QRCode from "react-qr-code";
import QRIMG from "../../assets/QR.svg";
import { getDashBoard, changeStations, requestFuel } from "../../utils/api/organization";
import useAuth from "../../utils/providers/AuthProvider";


const RequestFuelOrg = () => {

    const { user, signUser } = useAuth();

    const [open, setOpen] = React.useState(false);
    const [openSt, setOpenSt] = React.useState(false);
    const [fuelType, setFuelType] = React.useState("");
    const [value, setValue] = React.useState();
    const [dieselQuota, setDieselQuota] = useState([]);
    const [petrolQuota, setPetrolQuota] = useState([]);
    const [lastDate, setLastDate] = useState("");
    const [vehicleCount, setVehicleCount] = useState();
    const [stations, setStations] = useState([]);
    const [openQR, setOpenQR] = React.useState(false);
    const [openSB, setOpenSB] = React.useState(false);
    const [stationNameandCity, setStationNameandCity] = useState([]);
    const [changedStations, setChangedStations] = useState([]);
    const [qrValue, setQrValue] = useState("");
    const [isSbError, setIsSbError] = useState(false);
    const [sbMsg, setSbMsg] = useState("");

    useEffect(() => {

        async function fetchData() {

            let response = await getDashBoard(user.data.id);

            let status = response.status;

            if (status === 'ok') {

                let qrValue = "Registration No.: " + user.data.registrationNo;
                setQrValue(qrValue);

                setStationNameandCity(response.stations);

                setDieselQuota([response.fullQuotas.fullDieselQuota, response.remainingQuotas[0]]);
                setPetrolQuota([response.fullQuotas.fullPetrolQuota, response.remainingQuotas[1]]);

                setLastDate(response.lastFilledDate);
                setVehicleCount(response.vehicleCount);
                setStations(response.orgStations);
            }
            else if (status === 'auth-error') {

                // sessionStorage.clear();
                // localStorage.clear();

                console.log(response.error);
                document.location = '/';
            }
            else {

                console.log(response.error);

                setIsSbError(true);
                setSbMsg(response.error);
                handleSBOpen();
            }
        }

        fetchData();
    }, [changedStations])

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

    const handleSBOpen = () => {
        setOpenSB(true);
    };

    const handleSBClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSB(false);
    };

    const saveChangedStations = async () => {

        if (value.length > 0) {

            let data = {
                registrationNo: user.data.registrationNo,
                stations: value
            }

            let response = await changeStations(data);

            let status = response.status;

            if (status === 'ok') {

                setChangedStations(value);

                handleCloseSt();
                setIsSbError(false);
                setSbMsg("Stations Changed Successfully!");
                handleSBOpen();
            }
            else if (status === 'auth-error') {

                // sessionStorage.clear();
                // localStorage.clear();

                console.log(response.error);
                document.location = '/';
            }
            else {

                console.log(response.error);

                setIsSbError(true);
                setSbMsg(response.error);
                handleSBOpen();
            }
        }
        else {

            setIsSbError(true);
            setSbMsg("Stations cannot be empty!");
            handleSBOpen();
        }
    };

    const sendFuelRequest = async () => {

        if (fuelType !== "") {

            let remainingQuota = petrolQuota[1];
            if (fuelType === "Super Diesel" || fuelType === "Auto Diesel") {
                remainingQuota = dieselQuota[1]
            }

            if (remainingQuota > 0) {

                let send_data = {};
                send_data['registrationNo'] = user.data.registrationNo;
                send_data['fuelType'] = fuelType;
                send_data['remainingQuota'] = remainingQuota;
                send_data['stations'] = stations;
                send_data['priority'] = user.data.priority;

                let response = await requestFuel(send_data);

                let status = response.status;

                if (status === 'ok') {

                    handleClose();

                    setIsSbError(false);
                    setSbMsg("Fuel request successfull");
                    handleSBOpen();
                }
                else if (status === 'auth-error') {

                    // sessionStorage.clear();
                    // localStorage.clear();

                    console.log(response.error);
                    document.location = '/';
                }
                else {

                    console.log(response.error);

                    setIsSbError(true);
                    setSbMsg(response.error);
                    handleSBOpen();
                }
            }
            else {

                setIsSbError(true);
                setSbMsg("Your quota for the week is finished!");
                handleSBOpen();
            }
        }
        else {

            setIsSbError(true);
            setSbMsg("Fuel type cannot be empty!");
            handleSBOpen();
        }
    }

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
                            <MenuItem value={"Auto Diesel"}>Auto Diesel</MenuItem>
                            <MenuItem value={"Super Diesel"}>Super Diesel</MenuItem>
                            <MenuItem value={"Petrol 92 Octane"}>Petrol 92 Octane</MenuItem>
                            <MenuItem value={"Petrol 95 Octane"}>Petrol 95 Octane</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
                    <Button variant="outlined" color={"info"} sx={{ width: "100%" }} onClick={sendFuelRequest}>
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
                    <Button variant="outlined" onClick={saveChangedStations} color={"success"} sx={{ width: "100%" }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openQR} onClose={handleCloseQR}>
                <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>QR Code</Box>
                </DialogTitle>
                <DialogContent>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={qrValue}
                        viewBox={`0 0 256 256`}
                    />
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
                                            label={`DIESEL ${dieselQuota[0] === dieselQuota[1]
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
                                            label={`PETROL ${petrolQuota[0] === petrolQuota[1]
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
                <Snackbar open={openSB} autoHideDuration={6000} onClose={handleSBClose}>
                    <Alert
                        onClose={handleSBClose}
                        severity={isSbError ? "error" : "success"}
                        sx={{ width: "100%" }}
                    >
                        {sbMsg}
                    </Alert>
                </Snackbar>
            </Grid>
        </Box>
    );
};

export default RequestFuelOrg;
