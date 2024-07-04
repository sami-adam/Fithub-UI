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
import Membership from '../pages/membership/Membership';
import Member from '../pages/membership/Member';
import { useNavigate } from "react-router-dom";


const pages = ['Memberships', 'Emails'];
const settings = ['Profile', 'Logout'];

function MainLayout() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activePage, setActivePage] = React.useState(pages[0]);
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});

  const token = localStorage.getItem('token');
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

  React.useEffect(() => {
    async function fetchUser() {
        try{
            if(token.length > 0){
                const user = await fetch(`http://localhost:8080/api/v1/auth/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                }).then(response => response.json()).then(data => {
                    return data;});
                setUser(user);
            }
        } catch (error) {
            //localStorage.removeItem('token');
            console.error('Error:', error);
            //window.location.href = "/signin";
        };
    }
    console.log("User:", user);
    fetchUser();
    },[]);

  return (
    <>
        <AppBar position="static" style={{boxShadow: "0px 0px 0px 0px white", position: 'fixed', top: 0, zIndex:999,backgroundColor: "teal"}}>
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
                    <div style={{width: '128px', backgroundColor:'teal', color: 
                    '#f9f7f7', fontWeight: 'bold', border: '1px solid #3e9191', borderRadius: '15px', borderBlockStart:'none'}}>
                        Memberships
                    </div>
                </Button>

                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=> navigate('/members')}>
                    <div style={{width: '84px', backgroundColor:'teal', color: 
                    '#f9f7f7', fontWeight: 'bold', border: '1px solid #3e9191', borderRadius: '15px', borderBlockStart:'none'}}>
                        Members
                    </div>
                </Button>

                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=> navigate('/emails')}>
                    <div style={{width: '80px', backgroundColor:'teal', color: 
                    '#f9f7f7', fontWeight: 'bold', border: '1px solid #3e9191', borderRadius: '15px',borderBlockStart:'none'}}>
                        Emails
                    </div>
                </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user && <Avatar alt={user.name}>{user.name && user.name[0]}</Avatar>}
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
                        <Typography textAlign="center">Account  <i style={{color:"blue"}}>{user.email}</i></Typography>
                    </MenuItem>

                    <MenuItem key="logOut" onClick={handleLogout}>
                        <Typography textAlign="center" style={{color:"red"}}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    </>
  );
}
export default MainLayout;