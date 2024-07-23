import { Avatar, Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import useEmployeeStore from "../../src/state/employeeState";
import { useTranslation } from "react-i18next";

export default function EmployeeCard({employee}) {
    const [employeeId, setEmployeeId] = useState(0);
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const navigate = useNavigate();
    const {t} = useTranslation();
    const deleteEmployee = useEmployeeStore((state) => state.deleteEmployee);

    useEffect(() => {
        if (employeeId > 0){
          deleteEmployee(employeeId);
          setEmployeeId(0);
        }
        
      }, [deleteEmployee, employeeId]);
    return (
        <div className="card" style={{marginRight:"30px", marginTop:"30px"}} onDoubleClick={()=> navigate("/employee-form-view",{"state": employee})}>
        <div className="card-body" id="clickable" style={{backgroundColor:primaryLightColor,boxShadow: '1px 1px 1px 1px #e3e3e3',textAlign:'center',borderRadius:'7px',padding:'2px',width:"200px"}}>
            <div style={{display: 'inline-table', paddingTop:"8px"}}>
            <Avatar style={{width:'80px',height:'80px',backgroundColor:primaryMainColor}}>{employee.name[0]}</Avatar>
            </div>
            <h3 className="card-title" style={{fontSize:'medium', color:'#5f5f69'}}>{employee.name}</h3>
            <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{employee.identificationNumber}</p>
            {/* <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{"000" + employee.id}</p> */}
            <p className="card-text" style={{fontSize:'small',color:'#072287'}}>{employee.email}</p>
            <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{employee.phone}</p>
            {/* <p className="card-text">{employee.address}</p> */}
            <Button onClick={()=> window.confirm("Are you sure?") ? setEmployeeId(employee.id): setEmployeeId(0)}> <DeleteOutlinedIcon style={{color: "darkgoldenrod"}}/> </Button>
        </div>
        </div>
    );
}