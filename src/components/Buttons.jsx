import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Button, IconButton, Snackbar, styled, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { tooltipClasses } from '@mui/material/Tooltip';

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
    const {t} = useTranslation();
    return (
        <Button variant="outlined" color="primary" style={{color:primaryMainColor, fontWeight:'bold',border:'0px'}} onClick={()=> navigate(url)}>{t("Create New")}</Button>
    )
}

export function SaveButton({ onClick, lable, hide }) {
    const theme = useTheme();
    const {t} = useTranslation();
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
        <Button variant="outlined" color="primary" style={{color:primaryMainColor, fontWeight:'bold',border:'0px',display:hide?'none':'',width:"164px",border:"2px solid aliceblue;",borderRadius:"16px"}} onClick={handleOnclick}>{t(lable)}</Button>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%', backgroundColor:primaryMainColor,fontWeight:"bold" }}>
                {t("Saved Successfully!")}
            </Alert>
        </Snackbar>
    </>
    )
}

export function EditButton({ onClick, hide }) {
    const theme = useTheme();
    const {t} = useTranslation();
    const primaryMainColor = theme.palette.primary.main;
    return (
        <Button variant="outlined" color="primary" style={{color:primaryMainColor, fontWeight:'bold',border:'0px',display:hide?'none':'',width:"164px",border:"2px solid aliceblue;",borderRadius:"16px"}} onClick={onClick}>
            {t("Edit")}
        </Button>
    )
}

export function NavButton({ url, icon, toolTipe}){
    const navigate = useNavigate();
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const {t} = useTranslation();
    return (
        <Tooltip title={t(toolTipe)} TransitionProps={{style: {backgroundColor: primaryLightColor, color: primaryMainColor, fontWeight: 'bold',boxShadow: theme.shadows[1]}}}>
        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=> navigate(url)}>
            <div style={{width: '128px', backgroundColor:primaryMainColor, color: 
            '#f9f7f7', fontWeight: 'bold', border:"1px solid "+primaryMainColor}} className="nav-button">
                <IconButton size="small" style={{color: 'white'}}>{icon}</IconButton>
            </div>
        </Button>
        </Tooltip>
    )
}

export function ActionButton({ text, icon, onClick, toolTip, hide=false, color }){
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    return (
        <>
        { !hide &&
        <Tooltip title={toolTip} TransitionProps={{style: {backgroundColor: 'white', color: primaryMainColor, fontWeight: 'bold',boxShadow: '0px 0px 10px 0px #000000'}}}>
        <IconButton size="small" style={{display:"flex", justifyContent:"center",width:"120px",border:"1px solid aliceblue",borderRadius:"16px", fontSize:'14px'}} variant="outlined" onClick={onClick}>
            <div style={{display:"flex",justifyContent:"space-between",width:"85px",alignItems:"center", color: color||"primary"}}>
                {text} {icon}
            </div>
        </IconButton>
        </Tooltip> }
        </>
    )
}