import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import BellIcon from '@mui/icons-material/Notifications';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import FUELIMG from '../../assets/station.gif'
import { Badge, Card, CardMedia, Grid, ImageListItem, ListItemIcon, Menu, MenuItem, Paper, Tooltip } from '@mui/material';

const drawerWidth = 240;
const navItems = ['Home-home', 'Queues-fuelqueues', 'Distribution-fueldistribution'];

function DrawerAppBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Fast Fueler
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton className='nav-link' component={NavLink} to={item.split('-')[1]} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.split('-')[0]} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );



    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <AppBar component="nav" sx={{ backgroundColor: '#000000' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: { xs: 1, sm: 'unset' } }}>
                            <LocalGasStationIcon fontSize='large' sx={{ pr: 1 }} />
                        </Box>
                        <Typography
                            variant="h6"
                            component="div"
                            noWrap
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Fast Fueler
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button className='nav-link' component={NavLink} to={item.split('-')[1]} key={item} sx={{ color: '#fff' }}>
                                    {item.split('-')[0]}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton sx={{ pr: 2 }} onClick={handleOpenUserMenu}>
                                <Badge badgeContent={4} color="secondary">
                                    <BellIcon sx={{ color: 'white' }} />
                                </Badge>
                            </IconButton>
                            <Typography noWrap sx={{ pr: 1 }}>{"Station Name"}</Typography>
                            <Tooltip title='Logout'>
                                <IconButton onClick={handleOpenUserMenu}>
                                    <MoreVertIcon sx={{ color: 'white' }} />
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
                                <MenuItem disabled>
                                    {"1290456N"}
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>

                            </Menu>

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
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
            <Toolbar />
            <Box sx={{ display: 'flex' }}>
                <Grid container boxShadow={2} sx={{ width: '100%', minHeight: 150, pl: 5, pt: 2, pr: 10, backgroundColor: '', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Grid item xs={12} md={7}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }} >
                            Fuel Distribution and Queue Management system
                        </Typography>
                        <Grid item>
                            <Typography variant="subtitle1" sx={{}}>
                                We will provide you with a optimal solution to get your fuel needs. No waiting in queues.
                            </Typography>
                            <Typography variant="button" sx={{}}>
                                Come Refill Go.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <img width='350px' alt='station' src={FUELIMG} />
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}


export default DrawerAppBar;