import { Button, Divider, List } from "@mui/material";
import { useEffect, useState } from "react";
import MemberCard from "../../components/MemberCard";
import { Padding } from "@mui/icons-material";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";


export default function Member() {
    const [members, setMembers] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [fetchData, setFetchData] = useState(false);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await fetch("http://localhost:8080/api/v1/members", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => response.json()).then((data) => setMembers(data));
            } catch (error) {
                localStorage.removeItem('token');
                console.error('Error:', error);
                window.location.href = "/signin";
            }
        }
        fetchMembers();
    }, [token, fetchData]);
    return (
       <>
       <MainLayout/>
       <div style={{paddingTop:'100px'}}>
         <Button variant="outlined" color="primary" style={{color:'teal', fontWeight:'bold',border:'0px'}} onClick={()=> navigate('/createMember')}>Create New</Button>
       </div>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} style={{display:'inline-flex'}}>
            {members.map((member) => <MemberCard member={member} setFetchData={setFetchData}/>)}
        </List>
       </>
    );
}
