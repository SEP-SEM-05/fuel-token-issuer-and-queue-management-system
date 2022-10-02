import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { grey } from "@material-ui/core/colors";

export default function StationCard({ station }) {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={2}>
      <CardContent style={{ backgroundColor: "grey[500]" }}>
        <Typography gutterBottom variant="h4" component="div">
          {station.location}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {station.company}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Tel: {station.contactNo}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          email: {station.email}
        </Typography>
      </CardContent>
    </Card>
  );
}
