import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { IconButton, InputAdornment, ThemeProvider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { signInPersonal } from "../../../utils/api/personal";
import { signInOrg } from "../../../utils/api/organization";
import useAuth from "../../../utils/providers/AuthProvider";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});


export default function ClientLogin() {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, signUser } = useAuth();

    const onSubmit = async (data) => {

        let response;
        let type;
        let userID_arr = data.userid.split("-");

        // sessionStorage.clear();

        if (userID_arr[0].trim().toLowerCase() === 'org') {

            type = 'organization';

            response = await signInOrg({
                registrationNo: userID_arr[1].trim().toLowerCase(),
                password: data.password
            });
        }
        else {

            type = 'personal';

            response = await signInPersonal({
                nic: userID_arr[0].trim().toLowerCase(),
                password: data.password
            });
        }

        if (response.status === 'ok') {

            signUser(response);

            if(type === 'personal'){
                navigate('/userp', {replace: true});
            }
            else{
                navigate('/usero', {replace: true});
            }
        }
        else {
            //handle error
        }
    }

    const [showPass, setShowPass] = React.useState(false);

    const handlePassVisibilty = () => {
        setShowPass(!showPass);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    my: 6,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#282835",
                    borderRadius: 5,
                    p: 5,
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        marginBottom: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#ffffff",
                    }}
                >
                    CLIENT LOGIN
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="userid"
                        label="User ID"
                        type="text"
                        fullWidth
                        autoComplete="off"
                        {...register("userid", { required: "User ID is required." })}
                        error={Boolean(errors.userid)}
                        helperText={errors.userid?.message}
                    />
                    <TextField
                        margin="normal"
                        type={showPass ? "text" : "password"}
                        fullWidth
                        label="Password"
                        variant="outlined"
                        id="password"
                        autoComplete="off"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handlePassVisibilty}
                                        aria-label="toggle password"
                                        edge="end"
                                    >
                                        {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, fontWeight: 700 }}
                    >
                        SUBMIT
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link className="mylink" href="#" variant="body2">
                                <Typography color="primary">Forgot password?</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={"/signup"} className="mylink" href="#" variant="body2">
                                <Typography color="primary">
                                    Don't have an account? Sign Up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                    <Typography
                        sx={{ mt: 5 }}
                        color="text.secondary"
                        variant="subtitle2"
                        align="center"
                    >
                        Copyright © 2022 Fast Fueler
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
