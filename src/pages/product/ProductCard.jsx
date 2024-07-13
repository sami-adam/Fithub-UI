import { Avatar, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../state/productState";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


export default function ProductCard({ product }){
    const [productId, setProductId] = useState(0);
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const navigate = useNavigate();
    const deleteProduct = useProductStore((state) => state.deleteProduct);
    useEffect(() => {
        if (productId > 0){
        deleteProduct(productId);
        setProductId(0);
        }
        
    }, [deleteProduct, productId]);
        return (
            <div className="card" style={{paddingTop:'30px', paddingLeft:'10px', paddingRight:'30px'}} onDoubleClick={()=> navigate("/product-form-view",{"state": product})}>
            <div className="card-body" id="clickable" style={{backgroundColor:primaryLightColor,boxShadow: '1px 1px 1px 1px #e3e3e3',textAlign:'center',borderRadius:'7px',padding:'2px',width:"200px"}}>
                <div style={{display: 'inline-table'}}><Avatar style={{width:'80px',height:'80px',backgroundColor:primaryMainColor}} src={product.image}/></div>
                <h3 className="card-title" style={{fontSize:'medium', color:'#5f5f69'}}>{product.name}</h3>
                <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{"000" + product.id}</p>
                <p className="card-text" style={{fontSize:'small',color:'#072287'}}>{product.price} SR</p>
                <p className="card-text" style={{fontSize:'small', color:'#6b6969'}}>{product.category&&product.category.name}</p>
                <Button onClick={()=> window.confirm("Are you sure?") ? setProductId(product.id): setProductId(0)}> <DeleteOutlinedIcon style={{color: "darkgoldenrod"}}/> </Button>
            </div>
            </div>
            )}