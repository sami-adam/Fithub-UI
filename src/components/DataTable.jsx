import { DataGrid } from '@mui/x-data-grid';
import MainLayout from "../layout/MainLayout";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from '../values/colors';
import { useTheme } from '@mui/material';
import { CreateButton } from './Buttons';



export default function DataTable({ columns, rows, selected, setSelected, deleted, setDeleted, createUrl, detailsUrl, viewButtons= []}) {
    const navigate = useNavigate();
    const theme = useTheme();

    const primaryMainColor = theme.palette.primary.main;
    return (
        <>
        <MainLayout>
            <div style={{ height: 750, width: '100%'}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>
                        <Button variant="outlined" color="primary" style={{color:'red', fontWeight:'bold',border:'0px',display:selected.length ==0 ? 'none': ''}} onClick={()=> window.confirm("Are You Sure?")?setDeleted(true):setDeleted(false)}>Delete</Button>
                        <CreateButton url={createUrl}/>
                    </div>
                    <div>
                        {viewButtons&&viewButtons.map((button)=> <IconButton color="primary" aria-label={button.viewName} component="span" onClick={()=> button.setViewType(button.viewName)}>{button.button}</IconButton>)}
                    </div>
                </div>
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
                    //onRowDoubleClick={(row) => navigate(detailsUrl + '/' + row.id)}
                    onRowDoubleClick={(row) => navigate(detailsUrl, {"state": row.row})}
                    getRowClassName={(params) => 'table-row'}
                    />
            </div>
        </MainLayout>
        </>
    );
}