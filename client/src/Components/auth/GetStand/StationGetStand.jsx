import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { IconButton, InputAdornment, ThemeProvider } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function StationGetStand() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    temppass: "",
    pass: "",
    confirmpass: "",
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#282835',
                borderRadius: 5,
                p:5
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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="temp"
                        label="Temp. Password"
                        type="text"
                        fullWidth
                        inputProps={{ minLength: 4 }}
                        required
                        autoComplete='off'
                    />		
                    <TextField
                        margin="normal"
                        type={values.showPass ? "text" : "password"}
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        id="newpassword"
                        inputProps={{ minLength: 8 }}
                        required
                        autoComplete='off'
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
                    <TextField
                        margin="normal"
                        type={values.showConfirmPass ? "text" : "password"}
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        id="confirmpassword"
                        inputProps={{ minLength: 8 }}
                        required
                        autoComplete='off'
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
                        sx={{ mt: 3, mb: 2, fontWeight: 700}}
                    >
                        Get Started
                    </Button>
                    <Typography sx={{ mt: 5 }} color="text.secondary" variant="subtitle2"  align="center">
                        Copyright © 2022 Fast Fueler
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider> 
    );
}