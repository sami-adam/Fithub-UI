import { Avatar, Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import useMemberStore from "../../src/state/memberState";

export default function MemberCard({ member }) {
  const [memberId, setMemberId] = useState(0);
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  const navigate = useNavigate();
  const deleteMember = useMemberStore((state) => state.deleteMember);
  useEffect(() => {
    if (memberId > 0){
      deleteMember(memberId);
      setMemberId(0);
    }
    
  }, [deleteMember, memberId]);
  return (
    <div className="card" style={{marginRight:"30px", marginTop:"30px"}} onDoubleClick={()=> navigate("/member-form-view",{"state": member})}>
      <div className="card-body" id="clickable" style={{backgroundColor:primaryLightColor,boxShadow: '1px 1px 1px 1px #e3e3e3',textAlign:'center',borderRadius:'7px',padding:'2px',width:"200px"}}>
        <div style={{display: 'inline-table'}}><Avatar style={{width:'80px',height:'80px',backgroundColor:primaryMainColor}}>{member.firstName[0] + member.lastName[0]}</Avatar></div>
        <h3 className="card-title" style={{fontSize:'medium', color:'#5f5f69'}}>{member.firstName} {member.lastName}</h3>
        <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{"000" + member.id}</p>
        <p className="card-text" style={{fontSize:'small',color:'#072287'}}>{member.email}</p>
        <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{member.phone}</p>
        <p className="card-text">{member.address}</p>
        <Button onClick={()=> window.confirm("Are you sure?") ? setMemberId(member.id): setMemberId(0)}> <DeleteOutlinedIcon style={{color: "darkgoldenrod"}}/> </Button>
      </div>
    </div>
  );
}