import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Divider, Grid } from '@mui/material';
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
                <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, mt: -3 }} >
                    <h1>Unregistered Fuel station</h1>
                </Grid>

                <Grid sx={{ borderRadius: 4, backgroundColor:"#282835", paddingBottom: "3px"}}>
                    <Table aria-label="simple table">
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                >
                                    <TableCell align="center" style={{color:"white", fontSize:"22px"}} component="th" scope="row">
                                        {row.station}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            variant='contained'
                                            color='info'
                                            onClick={handleClickOpen} 
                                            sx={{
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
                            variant='contained'
                            color='error'
                            sx={{
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
                <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>Station Details</Box>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
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
                        label="Address"
                        defaultValue="xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                        style={{width: "450px"}}
                    />
                </DialogContent>
                <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
                    <Button variant='outlined' color='info' sx={{ width: "100%" }} >REGISTER</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default UnregisteredComponent