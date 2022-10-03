import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function WeeklyQuota({ weeklyQuota }) {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={2}>
      <CardContent style={{ backgroundColor: "grey[500]" }}>
        <Typography gutterBottom variant="h4" component="div">
          Weekly Quota
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Petrol: {weeklyQuota.Petrol}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Deisel: {weeklyQuota.Diesel}
        </Typography>
      </CardContent>
    </Card>
  );
}
