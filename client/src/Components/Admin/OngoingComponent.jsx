import React, { useState, useEffect } from 'react';
import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Chart from "react-apexcharts";

const axios = require('axios').default;

//main function
const OngoingComponent = () => {

  const [ceypetcCount, setCeypetcCount] = useState();
  const [iocCount, setIocCount] = useState();

  useEffect(() => {

    async function fetchData() {

        try {

            //const token = sessionStorage.getItem('admin_token');

            let ceypetcResponse = await axios.get(`http://localhost:5000/admin/count/ceypetc`, {
                headers: {
                    'Content-Type': 'application/json',
                    //token: token,
                    //state: props.state
                }
            });

            let ceypetcCount = ceypetcResponse.data.stationCount;

            if (ceypetcResponse.data.status === 'ok') {
              console.log(ceypetcCount);
              setCeypetcCount(ceypetcCount)
            }
            else {
                console.log(ceypetcResponse.data.error);
            }


            let iocResponse = await axios.get(`http://localhost:5000/admin/count/ioc`, {
                headers: {
                    'Content-Type': 'application/json',
                    //token: token,
                    //state: props.state
                }
            });

            let iocCount = iocResponse.data.stationCount;

            if (iocResponse.data.status === 'ok') {
              console.log(iocCount);
              setIocCount(iocCount)
            }
            else {
                console.log(iocResponse.data.error);
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    fetchData();
    
  }, []);


  //data for pie chart
  const options1 = {
    labels: ["CEYPETC", "IOC"],
    plotOptions: {
      pie: {
        donut: {
          size: "60px",
          labels: {
            show: true,
            total: {
              show: true,
              fontSize: "20px",
              color: "#000000",
            },
          },
        },
      },
    },
  };
  const series1 = [ceypetcCount, iocCount];

  return (
    <Container>
      <Grid
        marginY={2}
        container
        display="flex"
        alignItems={"center"}
        justifyContent="space-around"
      >
        <Grid
          item
          xs={12}
          sm={9}
          md={5}
          marginY={2}
          sx={{ backgroundColor: "#dadada", borderRadius: 8 }}
        >
          <Typography variant="h5" marginY={2} textAlign={"center"}>
            Station Details
          </Typography>
          <Grid marginY={0}>
            <Chart
              options={options1}
              series={series1}
              type="donut"
              width="100%"
              height={500}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OngoingComponent;
