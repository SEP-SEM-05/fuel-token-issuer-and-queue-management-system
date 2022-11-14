import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { IconButton, InputAdornment, ThemeProvider, Snackbar, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { signInPersonal } from "../../../utils/api/personal";
import { signInOrg } from "../../../utils/api/organization";
import { signInAdmin } from "../../../utils/api/admin";
import useAuth from "../../../utils/providers/AuthProvider";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

    const [openSB, setOpenSB] = React.useState(false);
    const [isSbError, setIsSbError] = React.useState(false);
    const [sbMsg, setSbMsg] = React.useState("");

    const handleSBOpen = () => {
        setOpenSB(true);
    };

    const handleSBClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSB(false);
    };

    const onSubmit = async (data) => {

        let response;
        let type;
        let userID_arr = data.userid.split("-");

        if (userID_arr[0].trim().toLowerCase() === 'org') {

            type = 'organization';

            response = await signInOrg({
                registrationNo: userID_arr[1].trim(),
                password: data.password
            });
        }
        else if (userID_arr[0].trim().toLowerCase() === 'admin') {

            type = 'admin';

            response = await signInAdmin({
                username: userID_arr[1].trim(),
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

            if (type === 'personal') {
                navigate('/userp', { replace: true });
            }
            else if (type === 'admin') {
                navigate('/admin', { replace: true });
            }
            else {
                navigate('/usero', { replace: true });
            }
        }
        else {

            console.log(response.error);

            setIsSbError(true);
            setSbMsg(response.error);
            handleSBOpen();
        }
    }

    //Form validation regex
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const initialValues = {
        userid: "",
        password: ""
    }

    //Form validation schemas
    const validationSchema = Yup.object().shape({
        userid: Yup.string().min(4, "Minimum characters should be 4").required("Required"),
        password: Yup.string().min(8, "Minimum characters should be 8")
            .matches(passwordRegExp, "Password must have one upper, lower case, number").required('Required'),
    })

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
                <Box sx={{ mt: 1 }}>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {(props) => (
                            <Form noValidate>
                                <Field as={TextField}
                                    name='userid'
                                    margin="normal"
                                    variant="outlined"
                                    id="userid"
                                    label="User ID"
                                    type="text"
                                    fullWidth
                                    autoComplete="off"
                                    required
                                    error={props.errors.userid && props.touched.userid}
                                    helperText={<ErrorMessage name='userid' />}
                                />
                                <Field as={TextField}
                                    name='password'
                                    margin="normal"
                                    type={showPass ? "text" : "password"}
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    id="password"
                                    autoComplete="off"
                                    required
                                    error={props.errors.password && props.touched.password}
                                    helperText={<ErrorMessage name='password' />}
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
                                    login
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
                            </Form>
                        )}
                    </Formik>
                    <Typography
                        sx={{ mt: 5 }}
                        color="text.secondary"
                        variant="subtitle2"
                        align="center"
                    >
                        Copyright © 2022 Fast Fueler
                    </Typography>
                </Box>
                <Snackbar open={openSB} autoHideDuration={6000} onClose={handleSBClose}>
                    <Alert
                        onClose={handleSBClose}
                        severity={isSbError ? "error" : "success"}
                        sx={{ width: "100%" }}
                    >
                        {sbMsg}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}
