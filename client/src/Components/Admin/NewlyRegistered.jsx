import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getNewlyregisteredStation, sendEmail, sendManyEmail } from "../../utils/api/admin";


//main function
const NewlyRegistered = () => {

  const [rows, setRows] = useState([]);
  const [sendList, setSendList] = useState([]);
  const [newId, setNewId] = React.useState();


  useEffect(() => {

    async function fetchData() {

        try {

            let response = await getNewlyregisteredStation();

            let stationDetails = response.station;

            if (response.status === 'ok') {
              console.log(stationDetails);
              setRows(
                stationDetails
              )
              
            }
            else {
                console.log(response.error);
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    fetchData();
    
  }, [newId]);

  const sendAnnouncement = async (row) => {

    let response = await sendEmail({
      email: row.email,
      regNo: row.registrationNo      
    });

    if (response.status == "ok") {
      setNewId(row.registrationNo);
      sendList.push(row.registrationNo);
      console.log(row.email);

    } else {
      console.log("error");
    }

    //handleClose();
    //handleSBOpen();
  }

  const sendAllAnnouncement = async (rows) => {

    let response = await sendManyEmail({
      rows: rows
    });

    if (response.status == "ok") {
      setNewId("all");
      console.log(rows);

    } else {
      console.log("error");
    }

    //handleClose();
    //handleSBOpen();
  }

  //function to send email
  const handleClick = (row) => {
    //setOpen(true);
    //setVehicleType(vehicleType);
    //let sendMail = sendMail();

    console.log("done")
  };

  // const showButton = (regNo) => {
  //   console.log(sendList.includes(regNo));
  //   if (sendList.includes(regNo)){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }


  return (
    <Grid
      sx={{ borderRadius: 4, backgroundColor: "#282835", paddingBottom: "3px" }}
    >
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell
                align="center"
                sx={{ color: "white", fontSize: "22px" }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell align="center">

                { !sendList.includes(row.registrationNo) &&
                newId !== "all" &&
                <Button
                  onClick={() => sendAnnouncement(row)}
                  variant="contained"
                  color="info"
                  sx={{
                    borderRadius: 10,
                    paddingX: "15px",
                  }}
                >
                  Send Announcement
                </Button>
                }
                { (sendList.includes(row.registrationNo) ||
                newId === "all") &&
                <Typography
                  sx={{
                    borderRadius: 3,
                    paddingX: "30px",
                    color: "#ff9966",
                  }}
                >
                  Announcement Sent!
                </Typography>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid display="flex" justifyContent="center" margin={3}>
        { newId !== "all" &&
          <Button
          onClick={() => sendAllAnnouncement(rows)}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 3,
            paddingX: "25px",
          }}
        >
          Send Announcement to all
        </Button>
        }
      </Grid>
    </Grid>
  );
};

export default NewlyRegistered;
