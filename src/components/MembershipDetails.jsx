import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import MainLayout from "../layout/MainLayout";

const statusColors = {
    NEW: "gray", 
    PAID: "blue", 
    ACTIVE: "teal", 
    EXPIRED: "red", 
    CANCELLED: "red"
};

export default function MembershipDetails() {
    const token = localStorage.getItem("token");   
    const [membership, setMembership] = useState({});
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        async function fetchMembership() {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/membership/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => response.json()).then((data) => setMembership(data));
                console.log("Response", response);
            } catch (error) {
                localStorage.removeItem('token');
                console.error('Error:', error);
                window.location.href = "/signin";
            }
        }
        fetchMembership();
    }, [token, id]);
    console.log(membership);
    
    return (
        <>
        <MainLayout/>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh',paddingTop:"100px" }}>
            <Card sx={{  width: '70%', marginBottom: 2, borderWidth: 2, borderStyle: 'solid'}}>
                <CardContent>
                    <Typography variant="h8" component="div" style={{color:statusColors[membership.status],fontWeight:"bold"}}>
                        {membership.status}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Member Name: {membership.member && membership.member.firstName} {membership.member && membership.member.lastName}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {membership.subscription && membership.subscription.name}
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
            </Card>
            </Box>
        </>
    )
}