import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Chip, Grid } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import { useState, useEffect } from "react";
import { getVehicles } from "../../utils/api/organization";
import useAuth from "../../utils/providers/AuthProvider";

const vehicles = [
    ["ABC 1234", "Diesel", "19/09/2022", "Mortor Car", 40],
    ["ABD 4234", "Petrol", "17/08/2022", "Mortor Bike", 5],
    ["ADT 4569", "Petrol", "17/08/2022", "Van", 30],
];

export default function OrgVehicles() {

    const { user, signUser } = useAuth();

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {

        async function fetchData() {

            let response = await getVehicles(user.data.id);

            let status = response.status;

            if (status === 'ok') {
                setVehicles(response.vehicles);
            }
            else if (status === 'auth-error') {

                // sessionStorage.clear();
                // localStorage.clear();

                console.log(response.error);
                document.location = '/';
            }
            else {

                console.log(response.error);
                // document.location = '/';
            }
        }

        fetchData();
    }, [])

    return (
        <Box>
            <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }}>
                <h1>Own Vehicles</h1>
            </Grid>
            <Grid container spacing={8} justifyContent="center">
                {vehicles.map((vehicle) => (
                    <Grid item md={3} key={vehicle.registrationNo}>
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
                                mb: 7
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
                                    Last refilled date : {vehicle.lastFilledDate}
                                </Typography>
                                <Box sx={{ alignItems: "center", display: "flex", pb: 1 }}>
                                    <OpacityIcon sx={{ pr: "5px" }} />
                                    <Typography variant="h6" display="block">
                                        Weekly quota : <strong>{vehicle.weeklyQuota}</strong> liters
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
