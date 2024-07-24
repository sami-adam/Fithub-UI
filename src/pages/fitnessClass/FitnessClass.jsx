import { useEffect, useState } from "react";
import useFitnessClassStore from "../../state/fitnessClassState";
import FitnessClassCard from "./FitnessClassCard";
import MainLayout from "../../layout/MainLayout";
import SearchBar from "../../components/SearchBar";
import { CreateButton } from "../../components/Buttons";
import { Box, IconButton } from "@mui/material";
import DataTable from "../../components/DataTable";
import { useTranslation } from "react-i18next";
import ListIcon from '@mui/icons-material/List';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { randomNumberBetween } from "@mui/x-data-grid/internals";
import ReactHtmlParser from 'html-react-parser';


export default function FitnessClass(){
    const { fitnessClasses, fetchFitnessClasses} = useFitnessClassStore();
    const searchFitnessClasses = useFitnessClassStore((state) => state.searchFitnessClasses);
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [viewType, setViewType] = useState("list");
    const [search, setSearch] = useState("");
    const { t } = useTranslation();

    useEffect(()=>{
        if(search === ""){
            fetchFitnessClasses();
        }
        if(search !== ""){
            searchFitnessClasses(search);
        }
    }, [fetchFitnessClasses, search, searchFitnessClasses]);

    const columns = [
        { field: 'id', headerName: t('ID'), width: 70 },
        { field: 'name', headerName: t('Name'), width: 150 },
        { field: 'description', headerName: t('Description'), width: 200, renderCell: (params) => { return ReactHtmlParser(params.value); }},
        { field: 'intensityLevel', headerName: t('Intensity Level'), width: 180}
    ];
    const rows = [];
    fitnessClasses.forEach((fitnessClass) => {
        rows.push({
            id: fitnessClass.id!=null?fitnessClass.id: randomNumberBetween(1, 1000),
            name: fitnessClass.name,
            description: fitnessClass.description,
            intensityLevel: fitnessClass.intensityLevel
        });
    });
    return (
        <>
        {viewType === "cards" &&
       <MainLayout>
        <SearchBar setSearch={setSearch}/>
       <div style={{display:"flex", justifyContent:"space-between"}}>
         <CreateButton url='/fitness-class-form-view'/>
         <div>
            <IconButton color="primary" aria-label="Card" component="span" onClick={()=> setViewType("cards")}><RecentActorsIcon/></IconButton>
            <IconButton color="primary" aria-label="list" component="span" sx={{marginLeft: 2}} onClick={()=> setViewType("list")}><ListIcon/></IconButton>
        </div>
       </div>
       <div style={{maxHeight:"84vh", overflowY:"scroll", paddingBottom:"30px"}}>
            <Box sx={{ alignItems: 'start', minHeight: '100vh', width:"90%" ,display: 'ruby', flexWrap: 'wrap', p: 1, m: 1, maxWidth:300, overflowY:"scroll"}}>
                        {fitnessClasses.map((fitnessClass) => <FitnessClassCard fitnessClass={fitnessClass}/>)}
            </Box>
        </div>
        </MainLayout> }
        {viewType === "list" &&
        <DataTable columns={columns} rows={rows} selected={selected} setSelected={setSelected} deleted={deleted} setDeleted={setDeleted} 
        createUrl={'/fitness-class-form-view'} detailsUrl={'/fitness-class-form-view'} 
        viewButtons={[{"viewName": "cards", "setViewType": setViewType, button:<RecentActorsIcon/>}, {"viewName": "list", "setViewType": setViewType, button:<ListIcon/>}]} 
        setSearch={setSearch}/>
        } 
        </>
    );
}