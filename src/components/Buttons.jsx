import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material";

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
    const primaryMainColor = theme.palette.primary.main;
    return (
        <Button variant="outlined" color="primary" style={{color:primaryMainColor, fontWeight:'bold',border:'0px',display:hide?'none':'',width:"164px",border:"2px solid aliceblue;",borderRadius:"16px"}} onClick={onClick}>{lable}</Button>
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