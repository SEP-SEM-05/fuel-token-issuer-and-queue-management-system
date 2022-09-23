import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function createData(vehicleType, liter) {
    return { vehicleType, liter };
}
  
//Petrol fuel quota details
const petrolRows = [
    createData('Motorcycles', "4.000L"),
    createData('Three-wheelers', "5.000L"),
    createData('Vans', "20.000L"),
    createData('Cars', "20.000L"),
    createData('Land vehicle', "15.000L"),
    createData('Lorries', "50.000L"),
];

//Diesel fuel quota details
const dieselRows = [
    createData('Buses', "40.000L"),
    createData('Three-wheelers', "5.000L"),
    createData('Vans', "20.000L"),
    createData('Cars', "20.000L"),
    createData('Land vehicle', "15.000L"),
    createData('Lorries', "50.000L"),
];

const QuotaComponent = () => {

    const [isPetrol, setIsPetrol] = React.useState(true);
    const [rows, setRows] = React.useState(petrolRows);

    const [open, setOpen] = React.useState(false);
    const [vehicleType, setVehicleType] = React.useState(null);

    const handleClickOpen = (vehicleType) => {
        setOpen(true);
        setVehicleType(vehicleType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePetrol = () => {
        setIsPetrol(true);
        setRows(petrolRows);
    }

    const handleDiesel = () => {
        setIsPetrol(false);
        setRows(dieselRows);
    }


    return (
        <Container >
            <TableContainer >
                <Typography variant="h4" marginY={2} >
                Current Fuel Quota
                </Typography>

                {isPetrol && 
                    <Grid display="flex" justifyContent="center" marginBottom={3} >
                        <Grid padding={1} sx={{backgroundColor: "black", borderRadius: 4,}}>
                            <Button
                                onClick={handlePetrol}
                                sx={{
                                    backgroundColor: "white",
                                    "&:hover": {backgroundColor: "#dadada"}, 
                                    color: "black", 
                                    paddingX: "50px", 
                                    borderRadius: 10, 
                                    marginX: "5px"
                                }}
                            >
                                Petrol
                            </Button>
                            <Button 
                                onClick={handleDiesel} 
                                sx={{
                                    backgroundColor: "black", 
                                    "&:hover": {backgroundColor: "#dadada", color: "black"}, 
                                    color: "white", 
                                    paddingX: "50px", 
                                    borderRadius: 10, 
                                    marginX: "5px", 
                                }}
                            >
                                Diesel
                            </Button>
                        </Grid>
                    </Grid>
                }

                {!isPetrol && 
                    <Grid display="flex" justifyContent="center" marginBottom={3} >
                        <Grid padding={1} sx={{backgroundColor: "black", borderRadius: 4,}}> 
                            <Button 
                                onClick={handlePetrol}
                                sx={{
                                    backgroundColor: "black",
                                    "&:hover": {backgroundColor: "#dadada", color: "black"},
                                    color: "white", 
                                    paddingX: "50px", 
                                    borderRadius: 10, 
                                    marginX: "5px"
                                }}
                            >
                                Petrol
                            </Button>
                            <Button 
                                onClick={handleDiesel} 
                                sx={{
                                    backgroundColor: "white", 
                                    "&:hover": {backgroundColor: "#dadada", color: "black"}, 
                                    color: "black", 
                                    paddingX: "50px", 
                                    borderRadius: 10, 
                                    marginX: "5px", 
                                }}
                            >
                                Diesel
                            </Button>
                        </Grid>
                    </Grid>
                }
            
                <Table sx={{ borderRadius: 4, }} style={{backgroundColor:"black"}} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" sx={{color:"white", fontSize:"24px"}}>Vehicle Type</TableCell>
                            <TableCell align="center" sx={{color:"white", fontSize:"24px",}}>Liter/week</TableCell>
                            <TableCell align="center" > </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                            >
                                <TableCell align="center" style={{color:"white"}} component="th" scope="row">
                                    {row.vehicleType}
                                </TableCell>
                                <TableCell style={{color:"white"}} align="center">
                                    {row.liter}
                                </TableCell>
                                <TableCell align="center">
                                    <Button 
                                        onClick={() => handleClickOpen(row.vehicleType)} 
                                        sx={{
                                            backgroundColor:"white",
                                            "&:hover": {backgroundColor: "#dadada"}, 
                                            color :"black", 
                                            borderRadius: 10, 
                                            paddingX: 3,
                                        }}
                                    >
                                        Change
                                    </Button>
                                </TableCell>                        
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align='center'>
                    Change Quota
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="filled-read-only-input"
                        label="Vehicle Type"
                        defaultValue={vehicleType}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Fuel value"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Change</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default QuotaComponent;