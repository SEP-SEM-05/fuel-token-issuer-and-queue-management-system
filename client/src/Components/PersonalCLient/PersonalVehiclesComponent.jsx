import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
    Autocomplete,
    Box,
    Button,
    CardActions,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Switch,
    TextField,
    Tooltip,
    Snackbar,
    Alert,
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QRCode from "react-qr-code";
import QRIMG from "../../assets/QR.svg";
import { getDashBoard, changeStations, requestFuel } from "../../utils/api/personal";
import useAuth from "../../utils/providers/AuthProvider";


export default function PersonalVehicles() {

    const { user, signUser } = useAuth();

    const [open, setOpen] = React.useState(false);
    const [openSt, setOpenSt] = React.useState(false);
    const [openQR, setOpenQR] = React.useState(false);
    const [openSB, setOpenSB] = React.useState(false);
    const [vehicle, setVehicle] = React.useState([]);
    const [value, setValue] = React.useState();
    const [stationNameandCity, setStationNameandCity] = React.useState([]);
    const [vehicles, setVehicles] = React.useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState({});
    const [changedStations, setChangedStations] = useState([]);
    const [qrValue, setQrValue] = useState("");
    const [selectedFuelType, setSelectedFuelType] = useState(false);
    const [isSbError, setIsSbError] = useState(false);
    const [sbMsg, setSbMsg] = useState("");

    useEffect(() => {

        async function fetchData() {

            let response = await getDashBoard(user.data.id);

            let status = response.status;

            if (status === 'ok') {

                setVehicles(response.vehicles);
                setStationNameandCity(response.stations);
            }
            else if (status === 'auth-error') {

                // sessionStorage.clear();
                // localStorage.clear();

                console.log(response.error);
                document.location = '/';
            }
            else {

                // sessionStorage.clear();
                // localStorage.clear();

                console.log(response.error);

                setIsSbError(true);
                setSbMsg(response.error);
                handleSBOpen();
            }
        }

        fetchData();
    }, [changedStations]);

    const handleClickOpen = (vehicle) => {
        setOpen(true);
        setVehicle(vehicle);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSt = (vehicle) => {
        setOpenSt(true);
        setValue(vehicle.stations);
        setSelectedVehicle(vehicle);
    };

    const handleCloseSt = () => {
        setOpenSt(false);
    };

    const handleClickOpenQR = (vehicle) => {

        let qrValue = "Registration No.: " + vehicle.registrationNo;
        setQrValue(qrValue);
        setOpenQR(true);
        setValue(vehicle.stations);
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
                nic: user.data.nic,
                registrationNo: selectedVehicle.registrationNo,
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

    const toggleSwitch = () => {
        setSelectedFuelType(!selectedFuelType);
    }

    const sendFuelRequest = async () => {

        if (vehicle.remainingQuota > 0) {

            let exactFuelType = vehicle.fuelType === "Petrol" ? (selectedFuelType ? "Petrol 95 Octane" : "Petrol 92 Octane") : (selectedFuelType ? "Super Diesel" : "Auto Diesel");

            let send_data = {};
            send_data['vehicle'] = vehicle;
            send_data['fuelType'] = exactFuelType;

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

    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PublishedWithChangesIcon sx={{ pr: 1 }} /> Request Fuel
                    </Box>
                </DialogTitle>
                <Divider />

                <DialogContent sx={{ pr: 8, pl: 4 }}>
                    <Typography variant="h6">
                        <strong>{vehicle.registrationNo}</strong>{" "}
                        <Typography variant="caption">{vehicle.type}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        <Chip
                            label={vehicle.fuelType}
                            color={vehicle.fuelType === "Diesel" ? "success" : "warning"}
                        />
                    </Typography>

                    <Typography variant="h6" sx={{ pt: 4 }}>
                        <strong>{vehicle.remainingQuota}</strong> liters remaining
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        pr: 3,
                        pl: 3,
                        pb: 3,
                        display: "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    <Typography variant="subtitle2">
                        {vehicle.fuelType === "Diesel" ? "Super Diesel" : "Petrol 95 Octane"}
                    </Typography>
                    <Switch color={vehicle.fuelType === "Diesel" ? "success" : "warning"} onChange={toggleSwitch} />
                </DialogActions>
                <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
                    <Button
                        variant="outlined"
                        color={vehicle.fuelType === "Diesel" ? "success" : "warning"}
                        sx={{ width: "100%" }}
                        onClick={sendFuelRequest}
                    >
                        Request
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
                <h1>Own Vehicles</h1>
            </Grid>
            <Grid container spacing={8} justifyContent="center">
                {vehicles.map((vehicle) => (
                    <Grid item md={5} key={vehicle.registrationNo}>
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
                                    {vehicle.registrationNo}
                                </Typography>
                                <Typography variant="button" display="block" gutterBottom>
                                    {vehicle.type}{" "}
                                    <Chip
                                        sx={{ fontWeight: "bold" }}
                                        label={vehicle.fuelType}
                                        color={vehicle.fuelType === "Diesel" ? "success" : "warning"}
                                    ></Chip>
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    sx={{ pb: 5 }}
                                >
                                    Last refilled date : {vehicle.lastFilledDate ? vehicle.lastFilledDate : "N/A"}
                                </Typography>
                                <CardActions></CardActions>
                                <Box sx={{ alignItems: "center", display: "flex", pb: 1 }}>
                                    <OpacityIcon sx={{ pr: "5px" }} />
                                    <Typography variant="h6" display="block">
                                        {vehicle.remainingQuota === vehicle.fullQuota ? (
                                            <strong>{vehicle.fullQuota}</strong>
                                        ) : (
                                            <>
                                                <strong>{vehicle.remainingQuota}</strong> of{" "}
                                                <strong>{vehicle.fullQuota}</strong>
                                            </>
                                        )}{" "}
                                        liters remaining
                                    </Typography>
                                </Box>
                                <Button
                                    onClick={() => handleClickOpenSt(vehicle)}
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Fuel Stations
                                </Button>
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
                                    <IconButton onClick={() => handleClickOpenQR(vehicle)}>
                                        <QrCode2Icon sx={{ color: "white" }} />
                                    </IconButton>
                                </Tooltip>
                                <Button
                                    sx={{ alignSelf: "stretch" }}
                                    onClick={() => handleClickOpen(vehicle)}
                                    variant="contained"
                                    color="info"
                                >
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        Request
                                        <br />
                                        Fuel
                                    </Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
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
}
