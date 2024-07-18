import { Paper, Typography } from "@mui/material";

export default function DashboardCard({text, number, svg, onDoubleClick}) {

    return (
        <Paper style={{padding: "18px"}} elevation={0} sx={{boxShadow:"0px 4px 5px 5px rgb(244 244 244)", borderRadius:"12px"}}>
        <div style={{display:"flex",justifyContent:"space-evenly"}} onDoubleClick={onDoubleClick} className="dashboard-card">
            <div>
                {svg}
            </div>
            <div>
            <Typography variant="h6" fontWeight={"bold"}>{number}</Typography>
            <Typography variant="h8" fontSize={"0.975rem"} color={"rgb(145, 158, 171)"}>{text}</Typography>
            </div>
        </div>
        </Paper>
    );
  };