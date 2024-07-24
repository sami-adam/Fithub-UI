import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import MainLayout from "../layout/MainLayout";
import { Button, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from '../values/colors';
import { useTheme } from '@mui/material';
import BackButton, { CreateButton } from './Buttons';
import SearchBar from './SearchBar';
import { arSD, enUS } from '@mui/x-data-grid/locales';
import { useTranslation } from 'react-i18next';
import FormHeaderActions from './FormHeaderActions';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export default function DataTable({ columns, rows, selected, setSelected, deleted, setDeleted, createUrl, detailsUrl, viewButtons= [], setSearch}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const {t, i18n } = useTranslation();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const location = useLocation();
    return (
        <>
        <MainLayout>
            {setSearch && <SearchBar setSearch={setSearch}/>}
            <br/>
            <br/>
            <div style={{ height: 750, width: '100%'}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>
                        <CreateButton url={createUrl}/>
                    </div>
                    <div>
                        <FormHeaderActions>
                            <IconButton variant="outlined" color="primary" style={{color:'gray',fontSize:"16px", fontWeight:'bold',border:'0px',display:selected.length ==0 ? 'none': 'flex', justifyContent:"start"}} onClick={()=> window.confirm(t("Are You Sure?"))?setDeleted(true):setDeleted(false)} 
                                sx={{':hover': {width:"100%", height:"100%", borderRadius:"5px"}}}>
                                <DeleteOutlineOutlinedIcon style={{color:primaryMainColor,paddingInlineEnd:"10px"}}/> {t("Delete")}
                            </IconButton>
                        </FormHeaderActions>
                    </div>
                    <div>
                        {viewButtons&&viewButtons.map((button)=> <IconButton color="primary" aria-label={button.viewName} component="span" onClick={()=> button.setViewType(button.viewName)}>{button.button}</IconButton>)}
                        {location.state && location.state.search !== "" && <BackButton/>}
                    </div>
                </div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{
                        [`& .${gridClasses.columnHeader}`]: {
                          color: primaryMainColor,
                          fontSize: '1.1em',
                          fontWeight: 'bold',
                        },
                        [`& .${gridClasses.cell}`]: {
                            textAlign: 'center',
                        },
                        [`& .${gridClasses.row}`]: {
                            color: "gray",
                            fontSize: '1em',

                        },
                        [`& .${gridClasses.rowHover}`]: {
                            '&:hover': {
                              backgroundColor: Colors.lightGray,
                            },
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