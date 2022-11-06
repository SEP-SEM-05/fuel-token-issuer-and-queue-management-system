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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDashBoard, addVehicle } from "../../utils/api/personal";
import useAuth from "../../utils/providers/AuthProvider";


const AddVehicle = () => {

    const { user, signUser } = useAuth();

    const [value, setValue] = React.useState([]);
    const [stationNameandCity, setStationNameandCity] = React.useState([]);

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
                // document.location = '/';
            }
        }

        fetchData();
    }, []);

    return (
        <Box>
            <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }}>
                <h1>Add a New Vehicle</h1>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={9} sx={{ ml: { xs: "unset", lg: 10 }, mt: 5 }}>
                    <form>
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
        </Box>
    );
};

export default AddVehicle;
