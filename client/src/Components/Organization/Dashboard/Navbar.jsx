import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import BellIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import FUELIMG from "../../../assets/station.gif";
import useAuth from "../../../utils/providers/AuthProvider";
import { getUnreadNotificationCount, getNotifications } from "../../../utils/api/organization";
import {
    Badge,
    Grid,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

const drawerWidth = 240;
const navItems = ["Home-home", "Vehicles-vehicles"]; //nav items list with corresponding navLinks

function DrawerAppBar() {

    const { user, signUser } = useAuth();

    const [openConfirmLogout, setOpenConfirmLogout] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNotf, setAnchorElNotf] = React.useState(null);
    const [notificationCount, setNotificationCount] = React.useState(0);
    const [notifications, setNotifications] = React.useState([]);

    React.useEffect(() => {

        async function fetchData() {

            let response = await getUnreadNotificationCount(user.data.id);

            let status = response.status;

            if (status === 'ok') {

                setNotificationCount(response.notifyCount);
            }
            else if (status === 'auth-error') {

                // sessionStorage.clear();
                // localStorage.clear();

                console.log(response.error);
                document.location = '/';
            }
            else {

                // sessionStorage.clear();
                // localStorage.clear();

                console.log(response.error);
                // document.location = '/';
            }
        }

        fetchData();
    }, []);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNotfMenu = async (event) => {

        setAnchorElNotf(event.currentTarget);

        let response = await getNotifications(user.data.id);

        let status = response.status;

        if (status === 'ok') {
            setNotifications(response.notifications);
            setNotificationCount(0);
        }
        else if (status === 'auth-error') {

            // sessionStorage.clear();
            // localStorage.clear();

            console.log(response.error);
            document.location = '/';
        }
        else {

            // sessionStorage.clear();
            // localStorage.clear();

            console.log(response.error);
            // document.location = '/';
        }
    };

    const handleCloseNotfMenu = () => {
        setAnchorElNotf(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClickOpenConfirmLogout = () => {
        setOpenConfirmLogout(true);
    };

    const handleCloseConfirmLogout = () => {
        setOpenConfirmLogout(false);
        handleCloseUserMenu();
    };

    const handleLogoutConfirm = () => {

        setOpenConfirmLogout(false);
        signUser({});
        sessionStorage.clear();
        localStorage.clear();
        document.location = '/';
    }

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{
                textAlign: "center",
                color: "white",
                backgroundColor: "#0f0f22",
                height: "100%",
            }}
        >
            <Typography variant="h6" sx={{ my: 2 }}>
                Fast Fueler
            </Typography>
            <Divider sx={{ backgroundColor: "white" }} />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton
                            className="nav-link"
                            component={NavLink}
                            to={item.split("-")[1]}
                            sx={{ textAlign: "center" }}
                        >
                            <ListItemText primary={item.split("-")[0]} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <AppBar component="nav" sx={{ backgroundColor: "#000000" }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: { xs: 1, sm: "unset" } }}>
                            <LocalGasStationIcon fontSize="large" sx={{ pr: 1 }} />
                        </Box>
                        <Typography
                            variant="h6"
                            component="div"
                            noWrap
                            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                        >
                            Fast Fueler
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                            {navItems.map((item) => (
                                <Button
                                    className="nav-link"
                                    component={NavLink}
                                    to={item.split("-")[1]}
                                    key={item}
                                    sx={{ color: "#fff" }}
                                >
                                    {item.split("-")[0]}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton sx={{ pr: 2 }} onClick={handleOpenNotfMenu}>
                                <Badge badgeContent={notificationCount} color="secondary">
                                    <BellIcon sx={{ color: "white" }} />
                                </Badge>
                            </IconButton>
                            <Menu
                                sx={{ mt: "40px", maxWidth: "400px" }}
                                id="menu-appbar"
                                anchorEl={anchorElNotf}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElNotf)}
                                onClose={handleCloseNotfMenu}
                            >
                                <MenuItem>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        Notifications
                                    </Typography>
                                </MenuItem>
                                <Divider />
                                {notifications.map((notification) => {
                                    return (
                                        <MenuItem
                                            key={notification._id}
                                            sx={{
                                                borderBottom: "1px solid #e8eaf6",
                                                backgroundColor: notification.isRead ? "" : "#e3f2fd",
                                            }}
                                        >
                                            <Grid
                                                container
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Grid item xs={10}>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        {notification.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="caption">
                                                        {notification.time}
                                                    </Typography>
                                                </Grid>
                                                <Grid item sx={{}} xs={12}>
                                                    <Typography noWrap variant="body1">
                                                        {notification.msg}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </MenuItem>
                                    );
                                })}
                            </Menu>

                            <Typography noWrap sx={{ pr: 1 }}>
                                {user.data.name}
                            </Typography>
                            <Tooltip title="Logout">
                                <IconButton onClick={handleOpenUserMenu}>
                                    <MoreVertIcon sx={{ color: "white" }} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "40px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem disabled>{user.data.registrationNo}</MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClickOpenConfirmLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>

                            <Dialog open={openConfirmLogout} onClose={handleCloseConfirmLogout}>
                                <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        Sure you want to logout?
                                    </Box>
                                </DialogTitle>
                                <Divider />
                                <DialogActions sx={{ p: 2 }}>
                                    <Button variant="outlined" onClick={handleLogoutConfirm} color={"error"} sx={{ width: "100%" }}>
                                        Confirm
                                    </Button>
                                </DialogActions>
                                <DialogActions sx={{ p: 3 }}>
                                    <Button variant="outlined" onClick={handleCloseConfirmLogout} color={"success"} sx={{ width: "100%" }}>
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
            <Toolbar />
            <Box sx={{ display: "flex" }}>
                <Grid
                    container
                    boxShadow={2}
                    sx={{
                        width: "100%",
                        minHeight: 150,
                        pl: 5,
                        pt: 2,
                        pr: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Grid item xs={12} md={7}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Fuel Distribution and Queue Management system
                        </Typography>
                        <Grid item>
                            <Typography variant="subtitle1" sx={{}}>
                                We will provide you with a optimal solution to get your fuel
                                needs. No waiting in queues.
                            </Typography>
                            <Typography variant="button" sx={{}}>
                                Come Refill Go.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <img width="310px" alt="station" src={FUELIMG} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default DrawerAppBar;
