import { Box, Card } from "@mui/material";
import { useTheme } from '@mui/material';

export default function CardView({children, borderColor}) {

    const theme = useTheme();
    const primaryLightColor = theme.palette.primary.light;
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh',paddingTop:"30px" }}>
            <Card sx={{  width: '70%', marginBottom: 2, borderWidth: 2, borderStyle: 'solid', 
                borderColor: primaryLightColor, borderRadius:"20px", boxShadow:"2px 0px 2px 3px whitesmoke;"}} className="card-view">
                {children}
            </Card>
        </Box>
    )
}