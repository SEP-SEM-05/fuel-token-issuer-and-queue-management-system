import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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

export default function SignUpOrg() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => console.log(data);
    console.log(errors);

  const [values, setValues] = React.useState({
    regNo: "",
    name: "",
    email: "",
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
                    align='center'
                    sx={{
                        marginBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: '#ffffff'
                    }}
                >
                    ORGANIZATION SIGNUP
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="regNo"
                        label="Registration No"
                        type="text"
                        fullWidth
                        autoComplete='off'
                        size="small"
                        {...register("regNo", 
                            { 
                                required: "Registration No is required.",
                                minLength:{
                                    value: 3,
                                    message: "Registration No must be more than 2 characters"
                                }
                            })
                        }
                        error={Boolean(errors.regNo)}
                        helperText={errors.regNo?.message}
                    />		
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        autoComplete='off'
                        size="small"
                        {...register("name", 
                            { 
                                required: "Name is required.",
                                minLength:{
                                    value: 8,
                                    message: "Name must be more than 2 characters"
                                }
                            })
                        }
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                    />		
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        autoComplete='off'
                        size="small"
                        {...register("email", 
                            { 
                                required: "Email is required.",
                                pattern:{
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "This is not a valid email"
                                }
                            })
                        }
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />		
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        autoComplete='off'
                        size="small"
                        {...register("address", 
                            { 
                                required: "Password is required.",
                                minLength:{
                                    value: 4,
                                    message: "Password must be more than 3 characters"
                                }
                            })
                        }
                        error={Boolean(errors.address)}
                        helperText={errors.address?.message}
                    />			
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="contactNo"
                        label="Contact Number"
                        type="text"
                        fullWidth
                        autoComplete='off'
                        size="small"
                        {...register("contactNo", 
                            { 
                                required: "Contact Number is required.",
                                minLength:{
                                    value: 10,
                                    message: "Contact Number must 10 characters"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Contact Number must 10 characters"
                                }
                            })
                        }
                        error={Boolean(errors.contactNo)}
                        helperText={errors.contactNo?.message}
                    />		
                    <TextField
                        margin="normal"
                        type={values.showPass ? "text" : "password"}
                        fullWidth
                        label="Password"
                        variant="outlined"
                        id="password"
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
                        size="small"
                        {...register("password", 
                            { 
                                required: "Password is required.",
                                minLength:{
                                    value: 8,
                                    message: "Password must be more than 7 characters"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Password cannot exceed more than 12 characters"
                                }
                            })
                        }
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        margin="normal"
                        type={values.showConfirmPass ? "text" : "password"}
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        id="confirmPassword"
                        inputProps={{ minLength: 8 }}
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
                        size="small"
                        {...register("confirmPassword", 
                            { 
                                required: "Confirm Password is required.",
                                minLength:{
                                    value: 8,
                                    message: "Confirm Password must be more than 8 characters"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Confirm Password cannot exceed more than 12 characters"
                                }
                            })
                        }
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword?.message}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, fontWeight: 700}}
                    >
                        SUBMIT
                    </Button>
                    <Grid >
                        <Grid item align='right'>
                            <Link href="#" variant="body2">
                                {"Already have an account? Log In"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Typography sx={{ mt: 5 }} color="text.secondary" variant="subtitle2"  align="center">
                        Copyright © 2022 Fast Fueler
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}