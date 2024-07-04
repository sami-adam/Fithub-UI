import { Avatar, Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function MemberCard({ member, setFetchData }) {
  const [memberId, setMemberId] = useState(0);
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function deleteMember() {
      console.log(memberId);
      if (memberId > 0) {
        const response = await fetch(`http://localhost:8080/api/v1/member/${memberId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        }).then(response => response.json()).then(data => {
          console.log(data);
          setFetchData(true);
          return data;
        });
      }
    }
    deleteMember();

    setMemberId(0);
  }, [memberId]);
  return (
    <div className="card" style={{paddingTop:'30px', paddingLeft:'10px', paddingRight:'30px'}} onClick={()=> console.log("Card Pressed")}>
      <div className="card-body" id="clickable" style={{boxShadow: '1px 1px 1px 1px #e3e3e3',textAlign:'center',borderRadius:'7px',padding:'2px',width:"200px"}}>
        <div style={{display: 'inline-table'}}><Avatar style={{width:'80px',height:'80px',backgroundColor:'teal'}}>{member.firstName[0] + member.lastName[0]}</Avatar></div>
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