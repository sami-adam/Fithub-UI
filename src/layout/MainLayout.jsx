import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import { Divider, useTheme } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { NavButton } from '../components/Buttons';
import TableChartIcon from '@mui/icons-material/TableChart';
import CategoryIcon from '@mui/icons-material/Category';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import TranslateIcon from '@mui/icons-material/Translate';
import TuneIcon from '@mui/icons-material/Tune';
import Gear from '../assets/images/Gear';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import FitbitIcon from '@mui/icons-material/Fitbit';
import DarkMode from '../components/DarkMode';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


const pages = ['Subscriptions', 'Emails'];
const settings = ['Profile', 'Logout'];

function MainLayout({children}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activePage, setActivePage] = React.useState(pages[0]);
  const navigate = useNavigate();
  const theme = useTheme();

  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const {t, i18n } = useTranslation();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = ()=> {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <>
        <AppBar position="static" style={{position: 'fixed', top: 0, zIndex:999,backgroundColor: primaryMainColor, maxHeight:"8%"}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={()=> navigate('/')} 
                href='#'
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                FitHub
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <NavButton url={'/subscriptions'} icon={<InsertInvitationIcon sx={{fontSize:"35px"}}/>} toolTipe="Subscriptions"/>
                <NavButton url={'/members'} icon={<PeopleIcon sx={{fontSize:"35px"}}/>} toolTipe="Members"/>
                <NavButton url={'/employees'} icon={<RecentActorsIcon sx={{fontSize:"35px"}}/>} toolTipe="Employees"/>
                <NavButton url={'/fitness-classes'} icon={<FitbitIcon sx={{fontSize:"35px"}}/>} toolTipe="Classes"/>
                <Tooltip title={t("Products")} TransitionProps={{style: {backgroundColor: primaryLightColor, color: primaryMainColor, fontWeight: 'bold',boxShadow: theme.shadows[1],}}}>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleClick}>
                        <div style={{width: '128px', backgroundColor:primaryMainColor, color: 
                        '#f9f7f7', fontWeight: 'bold', border:"1px solid "+primaryMainColor}} className="nav-button">
                            <IconButton size="small" style={{color: 'white'}}><Gear color={primaryLightColor} width={35} height={35}/></IconButton>
                        </div>
                    </Button>
                </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={()=> navigate("/products")} style={{fontSize:"14px", color:"gray",fontWeight:"bold"}}><IndeterminateCheckBoxIcon style={{color:primaryMainColor, paddingInlineEnd:"10px"}}/>{t("Products")}</MenuItem>
                    <MenuItem onClick={()=> navigate("/product-categories")} style={{fontSize:"14px", color:"gray",fontWeight:"bold"}}><CategoryIcon style={{color:primaryMainColor, paddingInlineEnd:"10px"}}/>{t("Categories")}</MenuItem>
                    <MenuItem onClick={()=> navigate("/emails")} style={{fontSize:"14px", color:"gray",fontWeight:"bold"}}><MailIcon style={{color:primaryMainColor, paddingInlineEnd:"10px"}}/>{t("Emails")}</MenuItem>
                </Menu>
                
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings" TransitionProps={{style: {backgroundColor: primaryLightColor, color: primaryMainColor, fontWeight: 'bold',boxShadow: theme.shadows[1]}}}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user && <Avatar alt={user.name} style={{backgroundColor:theme.palette.primary.light,color:"gray"}}>{user.name && user.name[0]}</Avatar>}
                </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    <MenuItem key="account" onClick={() => console.log("Account Clicked")}>
                        <Typography textAlign="center" fontSize={"14px"} fontWeight="bold" color={primaryMainColor}>{user&&user.name}  <span style={{fontWeight:"normal"}}>({user && user.email})</span></Typography>
                    </MenuItem>
                    <Divider/>
                    <MenuItem key="language">
                        <Typography textAlign="center" style={{color:primaryMainColor, fontSize:"14px"}}>
                            <div style={{display:"flex", alignItems:"center"}}>
                            <LanguageSelector/>
                            </div>
                        </Typography>
                    </MenuItem>
                    {/* <MenuItem key="darkMode">
                        <Typography textAlign="center" style={{color:primaryMainColor, fontSize:"14px"}}>
                            <div style={{display:"flex", alignItems:"center"}}>
                            <DarkMode/>
                            </div>
                        </Typography>
                    </MenuItem> */}
                    <MenuItem key="logOut" onClick={handleLogout}>
                        <Typography textAlign="center" style={{color:"red", fontSize:"14px"}}>
                            <div style={{display:"flex", alignItems:"center",paddingInlineStart:"10px"}}> {t("Logout")}</div>
                        </Typography>
                    </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        <Container maxWidth="xxl" style={{paddingTop: "100px", position:"fixed"}}>
            {children}
        </Container>
    </>
  );
}
export default MainLayout;