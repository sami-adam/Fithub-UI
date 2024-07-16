import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import MainLayout from "../layout/MainLayout";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from '../values/colors';
import { useTheme } from '@mui/material';
import { CreateButton } from './Buttons';
import SearchBar from './SearchBar';
import { arSD, enUS } from '@mui/x-data-grid/locales';
import { useTranslation } from 'react-i18next';



export default function DataTable({ columns, rows, selected, setSelected, deleted, setDeleted, createUrl, detailsUrl, viewButtons= [], setSearch}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const {t, i18n } = useTranslation();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    return (
        <>
        <MainLayout>
            {setSearch && <SearchBar setSearch={setSearch}/>}
            <div style={{ height: 750, width: '100%'}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>
                        <Button variant="outlined" color="primary" style={{color:'red', fontWeight:'bold',border:'0px',display:selected.length ==0 ? 'none': ''}} onClick={()=> window.confirm(t("Are You Sure?"))?setDeleted(true):setDeleted(false)}>Delete</Button>
                        <CreateButton url={createUrl}/>
                    </div>
                    <div>
                        {viewButtons&&viewButtons.map((button)=> <IconButton color="primary" aria-label={button.viewName} component="span" onClick={()=> button.setViewType(button.viewName)}>{button.button}</IconButton>)}
                    </div>
                </div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{
                        [`& .${gridClasses.columnHeader}`]: {
                          color: primaryMainColor,
                          fontSize: '1.1em',
                        },
                        [`& .${gridClasses.cell}`]: {
                            textAlign: 'center',
                        },
                      }}
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
                    slots={{ toolbar: GridToolbar }}
                    density='compact' 
                    localeText={i18n.language == 'ar'?arSD.components.MuiDataGrid.defaultProps.localeText:enUS.components.MuiDataGrid.defaultProps.localeText}
                    />
            </div>
        </MainLayout>
        </>
    );
}