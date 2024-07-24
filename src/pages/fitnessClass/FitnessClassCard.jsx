import { Avatar, Button, Typography } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import useFitnessClassStore from "../../state/fitnessClassState";
import { useTranslation } from "react-i18next";
import HTMLReactParser from "html-react-parser/lib/index";

export default function FitnessClassCard({fitnessClass}){
    const [fitnessClassId, setFitnessClassId] = useState(0);
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const navigate = useNavigate();
    const {t} = useTranslation();
    const deleteFitnessClass = useFitnessClassStore((state) => state.deleteFitnessClass);

    useEffect(() => {
        if (fitnessClassId > 0){
            deleteFitnessClass(fitnessClassId);
            setFitnessClassId(0);
        }
    }, [deleteFitnessClass, fitnessClassId]);

    return (
        <div className="card" style={{marginRight:"30px", marginTop:"30px"}} onDoubleClick={()=> navigate("/fitness-class-form-view",{"state": fitnessClass})}>
        <div className="card-body" id="clickable" style={{backgroundColor:primaryLightColor,boxShadow: '1px 1px 1px 1px #e3e3e3',textAlign:'center',borderRadius:'7px',padding:'2px',width:"200px"}}>
        <h3 className="card-title" style={{fontSize:'medium', color:'#5f5f69'}}>{fitnessClass.name}</h3>
        <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{HTMLReactParser(fitnessClass.description)}</p>
        <p className="card-text" style={{fontSize:'small',color:'#072287'}}>{fitnessClass.intensityLevel}</p>
        <Button onClick={()=> window.confirm("Are you sure?") ? setFitnessClassId(fitnessClass.id): setFitnessClassId(0)}> <DeleteOutlinedIcon style={{color: "darkgoldenrod"}}/> </Button>
      </div>
    </div>
    )

}
