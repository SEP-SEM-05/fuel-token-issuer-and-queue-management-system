import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { IconButton, InputAdornment, ThemeProvider } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function StationGetStand() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => console.log(data);
    console.log(errors);

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
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="temp"
                        label="Temp. Password"
                        type="text"
                        fullWidth
                        autoComplete='off'
                        {...register("temp", 
                            { 
                                required: "Temp. Password is required.",
                            })
                        }
                        error={Boolean(errors.temp)}
                        helperText={errors.temp?.message}
                    />		
                    <TextField
                        margin="normal"
                        type={values.showPass ? "text" : "password"}
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        id="newpassword"
                        autoComplete='off'
                        {...register("newpassword", 
                            { 
                                required: "New Password is required.",
                                minLength:{
                                    value: 8,
                                    message: "New Password must be more than 7 characters"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "New Password cannot exceed more than 12 characters"
                                }
                            })
                        }
                        error={Boolean(errors.newpassword)}
                        helperText={errors.newpassword?.message}
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
                        autoComplete='off'
                        {...register("confirmpassword", 
                            { 
                                required: "Confirm Password is required.",
                                minLength:{
                                    value: 8,
                                    message: "Confirm Password must be more than 7 characters"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Confirm Password cannot exceed more than 12 characters"
                                }
                            })
                        }
                        error={Boolean(errors.confirmpassword)}
                        helperText={errors.confirmpassword?.message}
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