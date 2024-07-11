import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import MemberCard from "../../components/MemberCard";
import MainLayout from "../../layout/MainLayout";
import { CreateButton } from "../../components/Buttons";
import useMemberStore from "../../state/memberState";
import ListIcon from '@mui/icons-material/List';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DataTable from "../../components/DataTable";

export default function Member() {
    const { members, fetchMembers} = useMemberStore();
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [viewType, setViewType] = useState("list");

    useEffect(()=>{
        fetchMembers();
    }, [fetchMembers]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'phone', headerName: 'Phone', width: 150 },
    ];
    const rows = [];
    members.forEach((member) => {
        rows.push({
            id: member.id,
            name: member.firstName + " " + member.lastName,
            firstName: member.firstName,
            lastName: member.lastName,
            subscriptions: member.subscriptions,
            email: member.email,
            phone: member.phone,
        });
    });
    return (
       <>
       {viewType === "cards" &&
       <MainLayout>
       <div style={{display:"flex", justifyContent:"space-between"}}>
         <CreateButton url='/member-form-view'/>
         <div>
            <IconButton color="primary" aria-label="Card" component="span" onClick={()=> setViewType("cards")}><RecentActorsIcon/></IconButton>
            <IconButton color="primary" aria-label="list" component="span" sx={{marginLeft: 2}} onClick={()=> setViewType("list")}><ListIcon/></IconButton>
        </div>
       </div>
       <div style={{maxHeight:"84vh", overflowY:"scroll", paddingBottom:"30px"}}>
            <Box sx={{ alignItems: 'start', minHeight: '100vh', width:"90%" ,display: 'ruby', flexWrap: 'wrap', p: 1, m: 1, maxWidth:300, overflowY:"scroll"}}>
                        {members.map((member) => <MemberCard member={member}/>)}
            </Box>
        </div>
        </MainLayout> }
        {viewType === "list" &&
        <DataTable columns={columns} rows={rows} selected={selected} setSelected={setSelected} deleted={deleted} setDeleted={setDeleted} 
        createUrl={'/member-form-view'} detailsUrl={'/member-form-view'} 
        viewButtons={[{"viewName": "cards", "setViewType": setViewType, button:<RecentActorsIcon/>}, {"viewName": "list", "setViewType": setViewType, button:<ListIcon/>}]}/>
        } 
       </>
    );
}
