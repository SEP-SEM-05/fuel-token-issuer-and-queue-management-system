import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Grid } from '@mui/material';

function createData(station) {
  return { station };
}
  
const rows = [
  createData('Station 01'),
  createData('Station 02'),
  createData('Station 03'),
  createData('Station 04'),
  createData('Station 05'),
];

const NewlyRegistered = () => {
  return (
    <Grid sx={{borderRadius: 4,backgroundColor:"#282835", paddingBottom: "3px"}} >
      <Table  aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell align="center" sx={{color:"white", fontSize:"22px"}} component="th" scope="row">
                {row.station}
              </TableCell>
              <TableCell align="center">
                <Button 
                  variant='contained'
                  color='info'
                  sx={{
                    borderRadius: 10, 
                    paddingX:"15px"
                  }}
                >
                  Send Announcement
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
            paddingX:"25px"
          }}
        >
          Send Announcement to all
        </Button>
      </Grid>
    </Grid>
  )
}

export default NewlyRegistered