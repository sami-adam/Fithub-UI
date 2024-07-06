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
import Email from '../pages/admin/Email';
import { Link } from 'react-router-dom';

import Member from '../pages/membership/Member';
import { useNavigate } from "react-router-dom";
import { Colors } from '../values/colors';
import { useTheme } from '@mui/material';


const pages = ['Memberships', 'Emails'];
const settings = ['Profile', 'Logout'];

function MainLayout({children}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activePage, setActivePage] = React.useState(pages[0]);
  const navigate = useNavigate();
  const theme = useTheme();

  const primaryMainColor = theme.palette.primary.main;
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
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
        <AppBar position="static" style={{boxShadow: "0px 0px 0px 0px white", position: 'fixed', top: 0, zIndex:999,backgroundColor: primaryMainColor}}>
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
                
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=> navigate('/memberships')}>
                    <div style={{width: '128px', backgroundColor:primaryMainColor, color: 
                    '#f9f7f7', fontWeight: 'bold', border: '1px solid #3e9191', borderRadius: '15px', borderBlockStart:'none'}}>
                        Memberships
                    </div>
                </Button>

                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=> navigate('/members')}>
                    <div style={{width: '84px', backgroundColor:primaryMainColor, color: 
                    '#f9f7f7', fontWeight: 'bold', border: '1px solid #3e9191', borderRadius: '15px', borderBlockStart:'none'}}>
                        Members
                    </div>
                </Button>

                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=> navigate('/emails')}>
                    <div style={{width: '80px', backgroundColor:primaryMainColor, color: 
                    '#f9f7f7', fontWeight: 'bold', border: '1px solid #3e9191', borderRadius: '15px',borderBlockStart:'none'}}>
                        Emails
                    </div>
                </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user && <Avatar alt={user.name} style={{backgroundColor:theme.palette.primary.light,color:"gray"}}>{user.name && user.name[0]}</Avatar>} <span style={{color:"white",fontSize:"18px",paddingLeft:"10px"}}>{user.name}</span>
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
                        <Typography textAlign="center">Account  <i style={{color:primaryMainColor}}>{user.email}</i></Typography>
                    </MenuItem>

                    <MenuItem key="logOut" onClick={handleLogout}>
                        <Typography textAlign="center" style={{color:"red"}}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        <Container maxWidth="xxl" style={{paddingTop: "100px"}}>
            {children}
        </Container>
    </>
  );
}
export default MainLayout;