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

import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

async function loginOrg(data) {
  try {
    let response = await axios.post(
      "http://localhost:5000/auth/loginOrg",
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function loginPersonal(data) {
  try {
    let response = await axios.post(
      "http://localhost:5000/auth/loginPersonal",
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default function ClientLogin() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    let type, response;

    let userID_arr = username.split("-");

    if (userID_arr[0].trim().toLowerCase() === "org") {
      //org login
      type = "organization";

      response = await loginOrg({
        registrationNo: userID_arr[1].trim().toLowerCase(),
        password: password,
      });
    } else {
      //personal login
      type = "personal";

      response = await loginPersonal({
        nic: userID_arr[0].trim().toLowerCase(),
        password: password,
      });
    }

    console.log(response);
  };

  const [showPass, setShowPass] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            variant="outlined"
            id="userid"
            label="User ID"
            type="text"
            fullWidth
            inputProps={{ minLength: 3 }}
            required
            autoComplete="off"
            onInput={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            type={showPass ? "text" : "password"}
            fullWidth
            label="Password"
            variant="outlined"
            id="password"
            inputProps={{ minLength: 8 }}
            required
            autoComplete="off"
            onInput={(e) => setPassword(e.target.value)}
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
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
