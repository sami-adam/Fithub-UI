import { Avatar } from "@mui/material";

export default function MemberCard({ member }) {
  return (
    <div className="card" style={{paddingTop:'30px', paddingLeft:'10px'}}>
      <div className="card-body" style={{boxShadow: '1px 1px 1px 1px #e3e3e3',textAlign:'center',borderRadius:'7px',padding:'2px'}}>
        <div style={{display: 'inline-table'}}><Avatar style={{width:'80px',height:'80px',backgroundColor:'teal'}}>{member.firstName[0] + member.lastName[0]}</Avatar></div>
        <h3 className="card-title">{member.firstName} {member.lastName}</h3>
        <p className="card-text">{member.email}</p>
        <p className="card-text">{member.phone}</p>
        <p className="card-text">{member.address}</p>
      </div>
    </div>
  );
}