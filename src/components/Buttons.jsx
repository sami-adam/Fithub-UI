import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Button, IconButton, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material";
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function BackButton() {
    return (
        <IconButton aria-label="back" onClick={()=> window.history.back()} style={{position:"absolute",display:"contents"}}>
            <ArrowBackIcon />
        </IconButton>
    )
}

export function CreateButton({ url }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    return (
        <Button variant="outlined" color="primary" style={{color:primaryMainColor, fontWeight:'bold',border:'0px'}} onClick={()=> navigate(url)}>Create New</Button>
    )
}

export function SaveButton({ onClick, lable, hide }) {
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const primaryMainColor = theme.palette.primary.main;
    const handleOnclick = () => {
        onClick();
        setOpenSnackbar(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
      };
      
    return (
        <>
        <Button variant="outlined" color="primary" style={{color:primaryMainColor, fontWeight:'bold',border:'0px',display:hide?'none':'',width:"164px",border:"2px solid aliceblue;",borderRadius:"16px"}} onClick={handleOnclick}>{lable}</Button>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Saved Successfully!
            </Alert>
        </Snackbar>
    </>
    )
}

export function EditButton({ onClick, hide }) {
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    return (
        <Button variant="outlined" color="primary" style={{color:primaryMainColor, fontWeight:'bold',border:'0px',display:hide?'none':'',width:"164px",border:"2px solid aliceblue;",borderRadius:"16px"}} onClick={onClick}>
            Edit
        </Button>
    )
}

export function NavButton({ url, icon}){
    const navigate = useNavigate();
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    return (
        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=> navigate(url)}>
            <div style={{width: '128px', backgroundColor:primaryMainColor, color: 
            '#f9f7f7', fontWeight: 'bold', border: '1px solid ' + primaryLightColor, borderRadius: '15px'}}>
                <IconButton size="small" style={{color: 'white'}}>{icon}</IconButton>
            </div>
        </Button>
    )
}