import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDashBoard, addVehicle } from "../../utils/api/personal";
import useAuth from "../../utils/providers/AuthProvider";


const AddVehicle = () => {

    const { user, signUser } = useAuth();

    const [openSB, setOpenSB] = useState(false);
    const [value, setValue] = useState([]);
    const [regNo, setRegNo] = useState("");
    const [engNo, setEngNo] = useState("");
    const [stationNameandCity, setStationNameandCity] = useState([]);
    const [isSbError, setIsSbError] = useState(false);
    const [sbMsg, setSbMsg] = useState("");

    useEffect(() => {

        async function fetchData() {

            let response = await getDashBoard(user.data.id);

            let status = response.status;

            if (status === 'ok') {
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
    }, []);

    const handleSBOpen = () => {
        setOpenSB(true);
    };

    const handleSBClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSB(false);
    };

    const submitAddVehicle = async (event) => {

        event.preventDefault();

        if (value.length > 0) {

            let data = {
                nic: user.data.nic,
                registrationNo: regNo,
                engineNo: engNo,
                stations: value
            }

            let response = await addVehicle(data);

            let status = response.status;

            if (status === 'ok') {

                setValue([]);
                setRegNo("");
                setEngNo("");
                
                setIsSbError(false);
                setSbMsg("New Vehicle Added Successfully!");
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
    }

    return (
        <Box>
            <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }}>
                <h1>Add a New Vehicle</h1>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={9} sx={{ ml: { xs: "unset", lg: 10 }, mt: 5 }}>
                    <form onSubmit={submitAddVehicle}>
                        <Card
                            variant="outlined"
                            sx={{
                                boxShadow: 3,
                                borderRadius: 3,
                                display: "flex",
                                justifyContent: "space-between",
                                width: { xs: "unset", md: "75%" },
                                flexDirection: { xs: "column", md: "row" },
                                backgroundColor: "#282835",
                                color: "white",
                            }}
                        >
                            <CardContent sx={{ textAlign: { xs: "center" } }}>
                                <Grid
                                    container
                                    sx={{
                                        pt: 2,
                                        pb: 2,
                                        display: "flex",
                                        justifyContent: "center",
                                        backgroundColor: "",
                                        borderRadius: 3,
                                    }}
                                >
                                    <Grid item xs={10}>
                                        <TextField
                                            variant="filled"
                                            required
                                            color="info"
                                            label="Vehicle Registration Number"
                                            value={regNo}
                                            onChange={(event) => setRegNo(event.target.value)}
                                            type="text"
                                            size="small"
                                            sx={{
                                                width: "100%",
                                                mb: 4,
                                                backgroundColor: "white",
                                                borderRadius: 2,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            required
                                            variant="filled"
                                            color="info"
                                            label="Vehicle Engine Number"
                                            value={engNo}
                                            onChange={(event) => setEngNo(event.target.value)}
                                            type="text"
                                            size="small"
                                            sx={{
                                                width: "100%",
                                                mb: 4,
                                                backgroundColor: "white",
                                                borderRadius: 2,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
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
                                            sx={{ width: "100%" }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Fuel Stations"
                                                    variant="filled"
                                                    color="info"
                                                    sx={{ backgroundColor: "white", borderRadius: 2 }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: "flex",
                                    alignItems: "stretch",
                                    justifyContent: { xs: "center", md: "unset" },
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="info"
                                    type="submit"
                                    sx={{ width: 150, mt: 3, mb: 3, mr: 3 }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        Add and Genarate QR code
                                    </Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
            </Grid>
            <Snackbar open={openSB} autoHideDuration={3000} onClose={handleSBClose}>
                <Alert
                    onClose={handleSBClose}
                    severity={isSbError ? "error" : "success"}
                    sx={{ width: "100%" }}
                >
                    {sbMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddVehicle;
