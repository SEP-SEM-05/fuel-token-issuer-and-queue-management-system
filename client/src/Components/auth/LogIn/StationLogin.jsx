import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { IconButton, InputAdornment, ThemeProvider, Snackbar, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signIn } from "../../../utils/api/fuelStation";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from "../../../utils/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function StationLogin() {
  const { user, signUser } = useAuth();
  const navigate = useNavigate();

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

  //Form validation regex
  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const initialValues = {
    regNo: "",
    password: ""
  }

  //Form validation schemas
  const validationSchema = Yup.object().shape({
    regNo: Yup.string().min(4, "Minimum characters should be 4").required("Required"),
    password: Yup.string().min(8, "Minimum characters should be 8")
      .matches(passwordRegExp, "Password must have one upper, lower case, number").required('Required'),
  })

  const onSubmit = async (data) => {
    let response;

    response = await signIn({
      registrationNo: data.regNo.trim(),
      password: data.password,
    });

    if (response.status === "ok") {
      signUser(response);

      navigate("/fuelstation", { replace: true });

    } else {
      console.log(response.error);

      setIsSbError(true);
      setSbMsg(response.error);
      handleSBOpen();
    }

  };

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
          STATION LOGIN
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(props) => (
              <Form noValidate>
                <Field as={TextField}
                  name='regNo'
                  margin="normal"
                  variant="outlined"
                  id="regNo"
                  label="Registration No"
                  type="text"
                  fullWidth
                  autoComplete='off'
                  required
                  error={props.errors.regNo && props.touched.regNo}
                  helperText={<ErrorMessage name='regNo' />}
                />

                <Field as={TextField}
                  name='password'
                  margin="normal"
                  type={showPass ? "text" : "password"}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  id="password"
                  autoComplete='off'
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
                    <Link href="#" variant="body2">
                      Forgot password?
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
