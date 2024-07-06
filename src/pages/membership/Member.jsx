import { Box, Button, Container, Divider, List } from "@mui/material";
import { useEffect, useState } from "react";
import MemberCard from "../../components/MemberCard";
import { Padding } from "@mui/icons-material";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { CreateButton } from "../../components/Buttons";

export default function Member() {
    const [members, setMembers] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [fetchData, setFetchData] = useState(false);
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;

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
       <MainLayout>
       <div>
         <CreateButton url='/memberFormView'/>
       </div>
        <Box sx={{ alignItems: 'start', minHeight: '100vh', width:"90%" ,display: 'ruby', flexWrap: 'wrap', p: 1, m: 1, maxWidth:300}}>
                    {members.map((member) => <MemberCard member={member} setFetchData={setFetchData}/>)}
            </Box>
        </MainLayout>
       </>
    );
}
