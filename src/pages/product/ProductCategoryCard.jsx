import { Avatar, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductCategoryStore from "../../state/productCategoryState";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


export default function ProductCategoryCard({ category }) {
    const [categoryId, setCategoryId] = useState(0);
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const navigate = useNavigate();
    const deleteCategory = useProductCategoryStore((state) => state.deleteProductCategory);
    useEffect(() => {
        if (categoryId > 0) {
            deleteCategory(categoryId);
            setCategoryId(0);
        }
    }
        , [deleteCategory, categoryId]);
    return (
        <div className="card" style={{paddingTop:'30px', paddingLeft:'10px', paddingRight:'30px'}} onDoubleClick={()=> navigate("/product-category-form-view",{"state": category})}>
        <div className="card-body" id="clickable" style={{backgroundColor:primaryLightColor,boxShadow: '1px 1px 1px 1px #e3e3e3',textAlign:'center',borderRadius:'7px',padding:'2px',width:"200px"}}>
            <div style={{display: 'inline-table', paddingTop:"8px"}}><Avatar style={{width:'80px',height:'80px',backgroundColor:primaryMainColor}}>{category.name[0]+category.name[1]}</Avatar></div>
            <h3 className="card-title" style={{fontSize:'medium', color:'#5f5f69'}}>{category.name}</h3>
            <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{"000" + category.id}</p>
            <p className="card-text" style={{fontSize:'small',color:'#072287'}}>{category.description}</p>
            <Button onClick={()=> window.confirm("Are you sure?") ? setCategoryId(category.id): setCategoryId(0)}> <DeleteOutlinedIcon style={{color: "darkgoldenrod"}}/> </Button>
        </div>
        </div>
    )
}