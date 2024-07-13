import { useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import useProductStore from "../../state/productState";
import ProductCard from "./ProductCard";
import { CreateButton } from "../../components/Buttons";
import { Box } from "@mui/material";

export default function Product() {
    const { products, fetchProducts} = useProductStore();

    useEffect(()=>{
        fetchProducts();
    }, [fetchProducts]);
    return (
        <MainLayout>
        <CreateButton url='/product-form-view'/>
        <div style={{maxHeight:"84vh", overflowY:"scroll", paddingBottom:"30px"}}>
            <Box sx={{ alignItems: 'start', minHeight: '100vh', width:"90%" ,display: 'ruby', flexWrap: 'wrap', p: 1, m: 1, maxWidth:300, overflowY:"scroll"}}>
                {products&&products.map((product) => <ProductCard product={product}/>)}
            </Box>
        </div>
        </MainLayout>
    );
}