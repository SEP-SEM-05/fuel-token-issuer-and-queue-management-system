import React, { useEffect } from "react";
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
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QRIMG from "../../assets/QR.svg";
import { getDashBoard } from "../../utils/api/personal";
import useAuth from "../../utils/providers/AuthProvider";

const stationNameandCity = [
    "station 01",
    "station 02",
    "station 03",
    "station 04",
];

const vehicles = [
    [
        "ABC 1234",
        "Diesel",
        "19/09/2022",
        "Mortor Car",
        34,
        40,
        ["station 01", "station 02", "station 04"],
    ],
    ["ABD 4234", "Petrol", "17/08/2022", "Mortor Bike", 4, 5, ["station 01"]],
    [
        "ADT 4569",
        "Petrol",
        "12/07/2022",
        "Van",
        30,
        30,
        ["station 01", "station 02"],
    ],
];

export default function PersonalVehicles() {

    const { user, signUser } = useAuth();

    useEffect(() => {

        async function fetchData() {

            let response = await getDashBoard(user.data.id);

            let status = response.status;

            if (status === 'ok') {
                // setOwnVehicles(vehicles);
                // setUser(user_data);
                console.log(response);
            }
            else if (status === 'auth-error') {

                // sessionStorage.clear();
                // localStorage.clear();

                // document.location = '/';
                console.log(response.error);
            }
            else {

                console.log(response.error);
                document.location = '/';
            }
        }

        fetchData();
        // let status = response.data.status;
        // let user = response.data.user;
        // let vehicles = response.data.vehicles;
        // let stations = response.data.stations;

        // if (status === 'ok') {
        //     // setOwnVehicles(vehicles);
        //     // setUser(user_data);
        //     console.log(response.data);
        // }
        // else if (status === 'auth-error') {
        //     // sessionStorage.clear();
        //     // document.location = '/';
        // }
        // else {
        //     console.log(response.error);
        // }
    }, [])

    const [open, setOpen] = React.useState(false);
    const [openSt, setOpenSt] = React.useState(false);
    const [openQR, setOpenQR] = React.useState(false);
    const [vehicle, setVehicle] = React.useState([]);
    const [value, setValue] = React.useState();

    const handleClickOpen = (vehicle) => {
        setOpen(true);
        setVehicle(vehicle);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSt = (vehicle) => {
        setOpenSt(true);
        setValue(vehicle[6]);
    };

    const handleCloseSt = () => {
        setOpenSt(false);
    };

    const handleClickOpenQR = (vehicle) => {
        setOpenQR(true);
        setValue(vehicle[6]);
    };

    const handleCloseQR = () => {
        setOpenQR(false);
    };

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
                        <strong>{vehicle[0]}</strong>{" "}
                        <Typography variant="caption">{vehicle[3]}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        <Chip
                            label={vehicle[1]}
                            color={vehicle[1] === "Diesel" ? "success" : "warning"}
                        />
                    </Typography>

                    <Typography variant="h6" sx={{ pt: 4 }}>
                        <strong>{vehicle[4]}</strong> liters remaining
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
                        {vehicle[1] === "Diesel" ? "Super Diesel" : "Petrol 95 Octane"}
                    </Typography>
                    <Switch color={vehicle[1] === "Diesel" ? "success" : "warning"} />
                </DialogActions>
                <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
                    <Button
                        variant="outlined"
                        color={vehicle[1] === "Diesel" ? "success" : "warning"}
                        sx={{ width: "100%" }}
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
                <h1>Own Vehicles</h1>
            </Grid>
            <Grid container spacing={8} justifyContent="center">
                {vehicles.map((vehicle) => (
                    <Grid item md={5} key={vehicle[0]}>
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
                                    {vehicle[0]}
                                </Typography>
                                <Typography variant="button" display="block" gutterBottom>
                                    {vehicle[3]}{" "}
                                    <Chip
                                        sx={{ fontWeight: "bold" }}
                                        label={vehicle[1]}
                                        color={vehicle[1] === "Diesel" ? "success" : "warning"}
                                    ></Chip>
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    sx={{ pb: 5 }}
                                >
                                    Last refilled date : {vehicle[2]}
                                </Typography>
                                <CardActions></CardActions>
                                <Box sx={{ alignItems: "center", display: "flex", pb: 1 }}>
                                    <OpacityIcon sx={{ pr: "5px" }} />
                                    <Typography variant="h6" display="block">
                                        {vehicle[4] === vehicle[5] ? (
                                            <strong>{vehicle[5]}</strong>
                                        ) : (
                                            <>
                                                <strong>{vehicle[4]}</strong> of{" "}
                                                <strong>{vehicle[5]}</strong>
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
            </Grid>
        </Box>
    );
}
