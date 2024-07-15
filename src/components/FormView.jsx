import { Box, Card, CardActions } from "@mui/material";
import { useTheme } from '@mui/material';

export default function FormView({children, borderColor}) {

    const theme = useTheme();
    const primaryLightColor = theme.palette.primary.light;
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh',paddingTop:"30px" }}>
            <Card sx={{  width: '70%', marginBottom: 2, borderWidth: 1, borderStyle: 'solid', 
                borderColor: primaryLightColor, borderRadius:"20px", boxShadow:"1px 1px 1px 1px 1px rgb(214 226 236)"}} className="card-view">
                {children}
            </Card>
        </Box>
    )
}

export function CardFooter({children}) {
    return (
        <CardActions style={{display:"flex",flexDirection:"column",justifyContent:"center",marginRight:"180px"}}>
            {children}
        </CardActions>
    )
}