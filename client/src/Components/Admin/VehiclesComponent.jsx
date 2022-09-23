import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Chart from "react-apexcharts"

const VehiclesComponent = () => {

    // Personal vehicles details
    const options1 = {
        labels: ["Motorcycle","Three-wheeler","Vans", "Cars", "Land-vehicle", "Lorries", "Buses"],
        //colors: ["#287872","#409832","#849028"],
        plotOptions: {
          pie: {
            donut: {
              size:"60px",
              labels: {
                show: true,
                total: {
                    show:true,
                    fontSize: "20px",
                    color: "#000000"
                    // showAlways: true,
                }
                }
            } 
          }
        }
      }
    const series1 = [70109,15546,9658,23879,9237,13456,14789];

    //Organization vehicles details
    const options2 = {
        labels: ["Motorcycle","Three-wheeler","Vans", "Cars", "Land-vehicle", "Lorries", "Buses"],
        //colors: ["#287872","#409832","#849028"],
        plotOptions: {
          pie: {
            donut: {
              size:"60px",
              labels: {
                show: true,
                total: {
                    show:true,
                    fontSize: "20px",
                    color: "#000000"
                    // showAlways: true,
                }
                }
            } 
          }
        }
      }
    const series2 = [17109,13546,18658,24879,5237,9456,15789];

  return (
    <Container> 
        <Typography variant="h4" marginY={2}>
            Vehicle Details
        </Typography>
        <Grid 
            marginY={2} 
            paddingY={1} 
            sx={{backgroundColor:'#dadada', borderRadius: 3}} 
            display="flex" 
            alignItems={'center'} 
            justifyContent="center" 
            textAlign={'center'} 
            container
        >
            <Grid item xs={8} sm={6} md={4}>
                <Typography variant="h5" marginY={0}>
                    Total Registered Vehicle:
                </Typography>
            </Grid>
            <Grid item xs={3} md={3} sx={{backgroundColor:'#ffffff', borderRadius: 3}}>
                <Typography variant="h5" marginY={0} paddingY={1}>
                    261 348
                </Typography>
            </Grid>
        </Grid>
        <Grid marginY={2} container display="flex" alignItems={'center'} justifyContent="space-around">
            <Grid item xs={11} sm={9} md={5} marginY={2} sx={{backgroundColor:'#dadada', borderRadius: 8}}>
                <Typography variant="h5" marginY={2} textAlign={'center'}>
                    Personal Vehicles
                </Typography>
                <Grid marginY={2}>
                    <Chart
                        options={options1}
                        series={series1}
                        type="donut"
                        width="100%"
                        height={500}
                    >
                    </Chart>
                </Grid>
            </Grid>
            <Grid item xs={11} sm={9} md={5} marginY={2} sx={{backgroundColor:'#dadada', borderRadius: 8}}>
                <Typography variant="h5" marginY={2} textAlign={'center'}>
                    Organization Vehicles
                </Typography>
                <Grid marginY={2}>
                    <Chart
                        options={options2}
                        series={series2}
                        type="donut"
                        width="100%"
                        height={500}
                    >
                    </Chart>
                </Grid>
            </Grid>
        </Grid>
    </Container>
  )
}

export default VehiclesComponent