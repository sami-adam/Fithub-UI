import { Box } from "@mui/material";
import { useEffect } from "react";
import MemberCard from "../../components/MemberCard";
import MainLayout from "../../layout/MainLayout";
import { CreateButton } from "../../components/Buttons";
import useMemberStore from "../../state/memberState";

export default function Member() {
    const { members, fetchMembers} = useMemberStore();

    useEffect(()=>{
        fetchMembers();
    }, [fetchMembers]);
    return (
       <>
       <MainLayout>
       <div>
         <CreateButton url='/member-form-view'/>
       </div>
        <Box sx={{ alignItems: 'start', minHeight: '100vh', width:"90%" ,display: 'ruby', flexWrap: 'wrap', p: 1, m: 1, maxWidth:300}}>
                    {members.map((member) => <MemberCard member={member}/>)}
            </Box>
        </MainLayout>
       </>
    );
}
