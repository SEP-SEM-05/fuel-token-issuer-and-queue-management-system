import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { IconButton, InputAdornment, ThemeProvider, Snackbar, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getStand } from "../../../utils/api/fuelStation";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../utils/providers/AuthProvider";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function StationGetStand() {

  const regNo = window.location.pathname.slice(-10);
  const navigate = useNavigate();
  const { user, signUser } = useAuth();

  const [openSB, setOpenSB] = React.useState(false);
  const [isSbError, setIsSbError] = React.useState(false);
  const [sbMsg, setSbMsg] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);

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

    if (!isDone){

      let response = await getStand({
        regNo: regNo,
        tempPassword: data.temppass,
        password: data.newpassword
      });
  
      if (response.status === 'ok') {
  
        signUser(response);
        setIsDone(true);
        navigate('/fuelstation', { replace: true });
      }
      else {
        console.log(response.error);
  
        setIsSbError(true);
        setSbMsg(response.error);
        handleSBOpen();
      }
    };

    
  }

  //Form validation regex
  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const initialValues = {
    temppass: "",
    newpassword: "",
    confirmpassword: ""
  }

  //Form validation schemas
  const validationSchema = Yup.object().shape({
    temppass: Yup.string().min(4, "Minimum characters should be 4").required("Required"),
    newpassword: Yup.string().min(8, "Minimum characters should be 8")
      .matches(passwordRegExp, "Password must have one upper, lower case, number").required('Required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('newpassword')], "Password not matches").required('Required')
  })

  //variables and functions for show password and hide password
  const [values, setValues] = React.useState({
    showPass: false,
    showConfirmPass: false,
  });
  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };
  const handleConfirmPassVisibilty = () => {
    setValues({
      ...values,
      showConfirmPass: !values.showConfirmPass,
    });
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#ffffff'
          }}
        >
          WELCOME
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(props) => (
              <Form noValidate>
                <Field as={TextField}
                  name='temppass'
                  margin="normal"
                  variant="outlined"
                  id="temppass"
                  label="Temp. Password"
                  type="text"
                  fullWidth
                  autoComplete='off'
                  required
                  error={props.errors.temppass && props.touched.temppass}
                  helperText={<ErrorMessage name='temppass' />}
                />
                <Field as={TextField}
                  name='newpassword'
                  margin="normal"
                  type={values.showPass ? "text" : "password"}
                  fullWidth
                  label="New Password"
                  variant="outlined"
                  id="newpassword"
                  autoComplete='off'
                  required
                  error={props.errors.newpassword && props.touched.newpassword}
                  helperText={<ErrorMessage name='newpassword' />}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePassVisibilty}
                          aria-label="toggle password"
                          edge="end"
                        >
                          {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Field as={TextField}
                  name='confirmpassword'
                  margin="normal"
                  type={values.showConfirmPass ? "text" : "password"}
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  id="confirmpassword"
                  inputProps={{ minLength: 8 }}
                  autoComplete='off'
                  required
                  error={props.errors.confirmpassword && props.touched.confirmpassword}
                  helperText={<ErrorMessage name='confirmpassword' />}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleConfirmPassVisibilty}
                          aria-label="toggle password"
                          edge="end"
                        >
                          {values.showConfirmPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                >
                  Get Started
                </Button>
              </Form>
            )}
          </Formik>
          <Typography sx={{ mt: 5 }} color="text.secondary" variant="subtitle2" align="center">
            Copyright © 2022 Fast Fueler
          </Typography>
        </Box>
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
    </ThemeProvider>
  );
}
