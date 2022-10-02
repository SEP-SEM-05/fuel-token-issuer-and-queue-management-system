import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{}}>
      <Paper sx={{ minHeight: "10vh" }} elevation={3}>
        <br></br>
        <Typography variant="subtitle1" align="center">
          Copyright © 2022 Fast Fueler
        </Typography>
      </Paper>
    </Box>
  );
}
