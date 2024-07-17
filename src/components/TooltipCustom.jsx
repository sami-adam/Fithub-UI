import { Tooltip, useTheme } from "@mui/material";


export default function TooltipCustom({ children, title }) {
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    return (
        <Tooltip title={title} TransitionProps={{style: {backgroundColor: 'white', color: primaryMainColor, fontWeight: 'bold',boxShadow: '0px 0px 10px 0px #000000'}}}>
            {children}
        </Tooltip>
    )
}