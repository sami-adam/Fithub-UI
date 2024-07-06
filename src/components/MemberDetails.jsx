import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, CardActions, Button, Box, CardHeader, IconButton } from '@mui/material';
import MainLayout from "../layout/MainLayout";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BackButton from './Buttons';

const statusColors = {
    NEW: "gray", 
    PAID: "blue", 
    ACTIVE: "teal", 
    EXPIRED: "red", 
    CANCELLED: "red"
};

export default function MemberDetails() {
    const location = useLocation();
    console.log(location);
    const member = location.state;

    console.log(member);

    return (
        <>
        <MainLayout>

        <BackButton/>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh',paddingTop:"100px" }}>
            <Card sx={{  width: '70%', marginBottom: 2, borderWidth: 2, borderStyle: 'solid', borderColor: statusColors[0]||"#91d9d2"}}>
                <CardHeader 
                action={
                    <>
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    </>
                }
                title={member.firstName + " " + member.lastName}
                subheader={member.email}
                />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Member Name: {member.firstName} {member.lastName}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {member.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {member.phone}
                    </Typography>
                    <Typography variant="body2">
                    {member.address}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            </Box>
            </MainLayout>
        </>
    );
}