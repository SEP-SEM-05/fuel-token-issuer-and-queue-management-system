import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function createData(station) {
    return { station };
}
  
const rows = [
    createData('Unregistered station 01'),
    createData('Unregistered station 02'),
    createData('Unregistered station 03'),
    createData('Unregistered station 04'),
    createData('Unregistered station 05'),
];

const UnregisteredComponent = () => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container >
            <TableContainer>
                <Typography variant="h4" marginY={3}>
                    Unregistered Fuel station
                </Typography>

                <Grid sx={{ borderRadius: 4, backgroundColor:"black", paddingBottom: "3px"}}>
                    <Table aria-label="simple table">
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                >
                                    <TableCell align="center" style={{color:"white"}} component="th" scope="row">
                                        {row.station}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            onClick={handleClickOpen} 
                                            sx={{
                                                backgroundColor:"white",
                                                "&:hover": {backgroundColor: "#dadada"}, 
                                                color :"black", 
                                                borderRadius: 10
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Grid display="flex" justifyContent="center" margin={3} >
                        <Button 
                            sx={{
                                backgroundColor: "white",
                                "&:hover": {backgroundColor: "#dadada"}, 
                                color: "black", 
                                borderRadius: 3, 
                                paddingX: "30px"
                            }}
                        >
                            Register All
                        </Button>
                    </Grid>
                </Grid>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align='center'>
                    Station Details
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="filled-read-only-input"
                        label="Registration No"
                        defaultValue="xxxxxxxxxxxx"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        style={{width: "450px"}}   
                    />
                    <br/>
                    <TextField
                        id="filled-read-only-input"
                        label="Email"
                        defaultValue="xxxxxxxxxxxxxxxxx"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        style={{width: "450px"}}
                    />
                    <br/>
                    <TextField
                        id="filled-read-only-input"
                        label="Contact No"
                        defaultValue="xxxxxxxxxx"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        style={{width: "450px"}}
                    />
                    <br/>
                    <TextField
                        id="filled-read-only-input"
                        label="Address"
                        defaultValue="xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        style={{width: "450px"}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose}>
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default UnregisteredComponent