import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { IconButton, InputAdornment, ThemeProvider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignUpPer() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    fname: "",
    lname: "",
    email: "",
    nic: "",
    address: "",
    contactNo: "",
    pass: "",
    confirmPass: "",
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
          align="center"
          sx={{
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#ffffff",
          }}
        >
          PERSONAL SIGNUP
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            variant="outlined"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            inputProps={{ minLength: 3 }}
            required
            autoComplete="off"
            size="small"
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="lname"
            label="Last Name"
            type="text"
            fullWidth
            inputProps={{ minLength: 3 }}
            required
            autoComplete="off"
            size="small"
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputProps={{ minLength: 5 }}
            required
            autoComplete="off"
            size="small"
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="nic"
            label="NIC"
            type="text"
            fullWidth
            inputProps={{ minLength: 10 }}
            required
            autoComplete="off"
            size="small"
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="address"
            label="Address"
            type="text"
            fullWidth
            inputProps={{ minLength: 3 }}
            required
            autoComplete="off"
            size="small"
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="contactNo"
            label="Contact Number"
            type="text"
            fullWidth
            inputProps={{ minLength: 9 }}
            required
            autoComplete="off"
            size="small"
          />
          <TextField
            margin="normal"
            type={values.showPass ? "text" : "password"}
            fullWidth
            label="Password"
            variant="outlined"
            id="password"
            inputProps={{ minLength: 8 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePassVisibilty}
                    aria-label="toggle password"
                    edge="end"
                  >
                    {values.showPass ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
          />
          <TextField
            margin="normal"
            type={values.showConfirmPass ? "text" : "password"}
            fullWidth
            label="Confirm Password"
            variant="outlined"
            id="confirmPassword"
            inputProps={{ minLength: 8 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleConfirmPassVisibilty}
                    aria-label="toggle password"
                    edge="end"
                  >
                    {values.showConfirmPass ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontWeight: 700 }}
          >
            SUBMIT
          </Button>
          <Grid>
            <Grid item align="right">
              <Link href="#" variant="body2">
                {"Already have an account? Log In"}
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
