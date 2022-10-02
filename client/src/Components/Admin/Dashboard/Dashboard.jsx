import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import StickyFooter from "./Footer";
import DrawerAppBar from "./Navbar";

const PersonalDashboard = () => {
  return (
    <Box component={"main"}>
      <DrawerAppBar />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
      <StickyFooter />
    </Box>
  );
};

export default PersonalDashboard;
