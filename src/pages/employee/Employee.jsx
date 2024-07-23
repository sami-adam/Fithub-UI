import useEmployeeStore from "../../state/employeeState";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { CreateButton } from "../../components/Buttons";
import ListIcon from '@mui/icons-material/List';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DataTable from "../../components/DataTable";
import SearchBar from "../../components/SearchBar";
import { useTranslation } from 'react-i18next';
import { randomNumberBetween } from "@mui/x-data-grid/internals";
import EmployeeCard from "../../components/EmployeeCard";

export default function Employee() {
    const {employees, fetchEmployees} = useEmployeeStore();
    const searchEmployees = useEmployeeStore((state) => state.searchEmployees);
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [viewType, setViewType] = useState("cards");
    const [search, setSearch] = useState("");
    const { t } = useTranslation();

    useEffect(()=>{
        if(search === ""){
            fetchEmployees();
        }
        if(search !== ""){
            searchEmployees(search);
        }
    }, [fetchEmployees, search, searchEmployees]);

    const columns = [
        { field: 'id', headerName: t('ID'), width: 70 },
        { field: 'name', headerName: t('Name'), width: 150 },
        { field: 'identificationNumber', headerName: t('Identification Number'), width: 200 },
        { field: 'email', headerName: t('Email'), width: 180 },
        { field: 'phone', headerName: t('Phone'), width: 150 },
    ];

    const rows = [];
    employees.forEach((employee) => {
        rows.push({
            id: employee.id !=null? employee.id: randomNumberBetween(1, 1000),
            name: employee.name,
            identificationNumber: employee.identificationNumber,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            user: employee.user
        });
    });
    return (
        <>
        {viewType === "cards" &&
       <MainLayout>
        <SearchBar setSearch={setSearch}/>
       <div style={{display:"flex", justifyContent:"space-between"}}>
         <CreateButton url='/employee-form-view'/>
         <div>
            <IconButton color="primary" aria-label="Card" component="span" onClick={()=> setViewType("cards")}><RecentActorsIcon/></IconButton>
            <IconButton color="primary" aria-label="list" component="span" sx={{marginLeft: 2}} onClick={()=> setViewType("list")}><ListIcon/></IconButton>
        </div>
       </div>
       <div style={{maxHeight:"84vh", overflowY:"scroll", paddingBottom:"30px"}}>
            <Box sx={{ alignItems: 'start', minHeight: '100vh', width:"90%" ,display: 'ruby', flexWrap: 'wrap', p: 1, m: 1, maxWidth:300, overflowY:"scroll"}}>
                        {employees.map((employee) => <EmployeeCard employee={employee}/>)}
            </Box>
        </div>
        </MainLayout> }
        {viewType === "list" &&
        <DataTable columns={columns} rows={rows} selected={selected} setSelected={setSelected} deleted={deleted} setDeleted={setDeleted} 
        createUrl={'/employee-form-view'} detailsUrl={'/employee-form-view'} 
        viewButtons={[{"viewName": "cards", "setViewType": setViewType, button:<RecentActorsIcon/>}, {"viewName": "list", "setViewType": setViewType, button:<ListIcon/>}]} 
        setSearch={setSearch}/>
        } 
        </>
    );
}