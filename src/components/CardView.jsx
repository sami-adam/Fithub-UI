import { Box, Card } from "@mui/material";

export default function CardView({children, borderColor}) {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh',paddingTop:"100px" }}>
            <Card sx={{  width: '70%', marginBottom: 2, borderWidth: 2, borderStyle: 'solid', borderColor: borderColor||"#91d9d2"}}>
                {children}
            </Card>
        </Box>
    )
}