import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import MainLayout from "../layout/MainLayout";
import ReactHtmlParser from 'html-react-parser';
import { useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

const statusColors = {
    OUTGOING : "blue", 
    SENT: "teal",
    RECEIVED: "black", 
    FAILED: "red", 
    CANCELLED: "red"
  };

export default function EmailDetails(){
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const location = useLocation();
    const email = location.state;
    return (
        <>
        <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh',paddingTop:"100px" }}>
            <Card sx={{  width: '70%', marginBottom: 2, borderColor: statusColors[email.status], borderWidth: 2, borderStyle: 'solid'}}>
                <CardContent>
                    <Typography variant="h8" component="div" style={{color: statusColors[email.status],fontWeight:"bold"}}>
                        {email.status}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    From: {email.emailFrom} 
                    </Typography>
                    <Typography variant="h5" component="div">
                    {email.subject}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {email.scheduledDate}
                    </Typography>
                    <Typography variant="body2">
                    {email.emailBody && ReactHtmlParser(email.emailBody)}
                    </Typography>
                
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            </Box>
            </MainLayout>
        </>
    )
}