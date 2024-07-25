import { Alert, Box, Button, Card, CardActions, Container, IconButton, Snackbar } from "@mui/material";
import { useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TooltipCustom from "./TooltipCustom";

export default function FormView({children, create, setCreate, viewMode, setViewMode, editMode, setEditMode, handleCreate, handleEdit, handleSave, createUrl}) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const primaryLightColor = theme.palette.primary.light;
    const primaryMainColor = theme.palette.primary.main;
    const {t} = useTranslation();
    const handleOnclick = () => {
        handleSave();
        setOpenSnackbar(true);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };
    const handleCancel = () => {
        setCreate(false);
        setEditMode(false);
        setViewMode(true);
    }
    return (
        <Container sx={{  width: '70%', marginBottom: 2, borderWidth: 1, borderStyle: 'solid', overflowY: "scroll", maxHeight: "80vh",
            borderColor: primaryLightColor, borderRadius:"20px", boxShadow:"0px 0px 2px 2px #d7d7d7"}} className="card-view">
            <div>
                <TooltipCustom title={t("Add")}>
                    <IconButton variant="standard" onClick={()=> navigate(createUrl)} sx={{display: "none"}}><AddIcon/></IconButton>
                </TooltipCustom>
                <TooltipCustom title={t("Create")}>
                    <IconButton variant="standard" onClick={handleCreate} sx={{display: (viewMode||editMode)? "none":""}}><CloudDownloadIcon color={primaryMainColor} sx={{fontSize:30}}/></IconButton>
                </TooltipCustom>
                <TooltipCustom title={t("Edit")}>
                    <IconButton variant="standard" onClick={handleEdit} sx={{display: (editMode||!viewMode)? "none": ""}}><EditIcon sx={{color:primaryMainColor, fontSize:30}}/></IconButton>
                </TooltipCustom>
                <TooltipCustom title={t("Save")}>
                    <IconButton variant="standard" onClick={handleOnclick} sx={{display: (!editMode||create)? "none":""}}><CloudDownloadIcon sx={{color:primaryMainColor, fontSize:30}}/></IconButton>
                </TooltipCustom>
                <TooltipCustom title={t("Discard")}>
                    <IconButton variant="standard" onClick={handleCancel} sx={{display: (viewMode&&!editMode)?"none":""}}><CancelIcon sx={{fontSize:30}}/></IconButton>
                </TooltipCustom>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%', backgroundColor:primaryMainColor,fontWeight:"bold" }}>
                    {t("Saved Successfully!")}
                </Alert>
            </Snackbar>
            </div>
            {children}
        </Container>
    )
}

export function CardFooter({children}) {
    return (
        <CardActions style={{display:"flex",flexDirection:"column",justifyContent:"center",marginRight:"180px"}}>
            {children}
        </CardActions>
    )
}