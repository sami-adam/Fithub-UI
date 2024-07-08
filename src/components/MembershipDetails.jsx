import { useEffect, useState } from "react";
import { CardContent, Typography, CardActions, Button, CardHeader } from '@mui/material';
import MainLayout from "../layout/MainLayout";
import PaidIcon from '@mui/icons-material/Paid';
import { useTheme } from "@mui/material";
import { TaskAlt } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import BackButton from "./Buttons";
import CardView from "./CardView";
import { blue } from "@mui/material/colors";


const statusColors = {
    NEW: "gray", 
    PAID: blue[500],
    ACTIVE: "teal", 
    EXPIRED: "red", 
    CANCELLED: "red"
};

export default function MembershipDetails() {
    const [changeStage, setChangeStage] = useState(false);
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const location = useLocation();
    const membership = location.state;
    //const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function changeMembershipStage() {
            if (changeStage) {
                await fetch('http://localhost:8080/api/v1/membership/status/' + membership.id, {
                     method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify({}),
                });
                setChangeStage(false);
            }
        }
        changeMembershipStage();
    }
    , [changeStage, membership, token]);
    
    return (
        <>
        <MainLayout>
        <BackButton/>
        <CardView borderColor={statusColors[membership.status]}>
                <CardHeader 
                action={
                    <>
                    <Button size="small" onClick={()=> setChangeStage(true)} color="primary" variant="outlined" 
                    style={{color:primaryMainColor,fontWeight:"bold",border:"none",backgroundColor:"aliceblue", display:membership.status !== "NEW"?"none":""}}>
                        Paid <PaidIcon />
                    </Button>

                    <Button size="small" onClick={()=> setChangeStage(true)} color="primary" variant="outlined" 
                    style={{color:primaryMainColor,fontWeight:"bold",border:"none",backgroundColor:"aliceblue", display:membership.status !== "PAID"?"none":""}}>
                        Active <TaskAlt />
                    </Button>
                    </>
                    } 
                title={
                    <Typography variant="h8" component="div" style={{color:statusColors[membership.status],fontWeight:"bold"}}>
                        {membership.status}
                    </Typography>
                }
                    style={{borderBottom:"1px solid #c2ccd4", backgroundColor:"#f5faff"}}/>
                <CardContent>

                    
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Member Name: {membership.firstName} {membership.lastName}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {membership.subscription}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {membership.startDate} - {membership.endDate}
                    </Typography>
                    <Typography variant="body2">
                    {membership.netAmount}
                    </Typography>
                
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </CardView>
            </MainLayout>
        </>
    )
}