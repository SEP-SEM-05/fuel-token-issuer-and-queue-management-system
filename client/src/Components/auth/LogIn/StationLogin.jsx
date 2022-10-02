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
import { useForm } from "react-hook-form";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function StationLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const [values, setValues] = React.useState({
    regNo: "",
    pass: "",
    showPass: false,
  });

  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#ffffff",
          }}
        >
          STATION LOGIN
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            variant="outlined"
            id="regNo"
            label="Registration No"
            type="text"
            fullWidth
            inputProps={{ minLength: 3 }}
            autoComplete='off'
            {...register("regNo", { required: "Registration No is required." })}
            error={Boolean(errors.regNo)}
            helperText={errors.regNo?.message}
          />		

          <TextField
            margin="normal"
            type={values.showPass ? "text" : "password"}
            fullWidth
            label="Password"
            variant="outlined"
            id="password"
            autoComplete='off'
            {...register("password", { required: "Password is required." })}
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
                    {values.showPass ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
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
