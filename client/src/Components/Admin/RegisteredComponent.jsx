import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import { Button, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import OngoingComponent from './OngoingComponent';
import NewlyRegistered from './NewlyRegistered';

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

const UnregisteredComponent = () => {

  const [isNewly, setIsNewly] = React.useState(true);

  return (
    <Container>
      <TableContainer >
        {isNewly && 
          <Grid display="flex" justifyContent="center" marginY={4}>
            <Grid padding={1} sx={{backgroundColor: "#282835", borderRadius: 4,}}>
              <Button 
                variant='contained'
                color='warning'
                onClick={() => {setIsNewly(true)}} 
                sx={{
                  paddingX: "50px", 
                  borderRadius: 10, 
                  marginX: "5px"
                }}
              >
                Newly Registered
              </Button>
              <Button 
                variant='contained'
                color='success'
                onClick={() => {setIsNewly(false)}} 
                sx={{
                  backgroundColor: "#282835", 
                  paddingX: "50px", 
                  borderRadius: 10, 
                  marginX: "5px",
                }}
              >
                Ongoing stations
              </Button>
            </Grid>
          </Grid>
        }

        {!isNewly && 
          <Grid display="flex" justifyContent="center" marginY={4}>
            <Grid padding={1} sx={{backgroundColor: "#282835", borderRadius: 4,}}>
              <Button 
                variant='contained'
                color='warning'
                onClick={() => {setIsNewly(true)}} 
                sx={{
                  backgroundColor: "#282835",
                  paddingX: "50px", 
                  borderRadius: 10, 
                  marginX: "5px"
                }}
              >
                Newly Registered
              </Button>
              <Button 
                variant='contained'
                color='success'
                onClick={() => {setIsNewly(false)}} 
                sx={{
                  paddingX: "50px", 
                  borderRadius: 10, 
                  marginX: "5px",
                }}
              >
                Ongoing stations
              </Button>
            </Grid>
          </Grid>
        }

        {isNewly && <NewlyRegistered/>}
        {!isNewly && <OngoingComponent/>}
      </TableContainer>
    </Container>
  )
}

export default UnregisteredComponent