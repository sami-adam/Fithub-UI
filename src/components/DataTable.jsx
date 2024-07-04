import { DataGrid } from '@mui/x-data-grid';
import MainLayout from "../layout/MainLayout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function DataTable({ columns, rows, selected, setSelected, deleted, setDeleted, createUrl, detailsUrl }) {
    const navigate = useNavigate();
    return (
        <>
        <MainLayout />
        <div style={{ height: 750, width: '100%', paddingTop:'100px'}}>
            <Button variant="outlined" color="primary" style={{color:'teal', fontWeight:'bold',border:'0px'}} onClick={()=> navigate(createUrl)}>Create New</Button>
            <Button variant="outlined" color="primary" style={{color:'red', fontWeight:'bold',border:'0px',display:selected.length ==0 ? 'none': ''}} onClick={()=> window.confirm("Are You Sure?")?setDeleted(true):setDeleted(false)}>Delete</Button>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 80 },
                },
                }}
                pageSizeOptions={[50, 70]}
                checkboxSelection 
                onRowSelectionModelChange={(row) => setSelected(row)} 
                onRowDoubleClick={(row) => navigate(detailsUrl + '/' + row.id)}
                />
        </div>
        </>
    );
}