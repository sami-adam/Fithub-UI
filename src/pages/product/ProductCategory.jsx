import { useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import useProductCategoryStore from "../../state/productCategoryState";
import ProductCategoryCard from "./ProductCategoryCard";
import { CreateButton } from "../../components/Buttons";
import { Box } from "@mui/material";

export default function ProductCategory() {
    const { productCategories, fetchProductCategories } = useProductCategoryStore();

    useEffect(() => {
        fetchProductCategories();
    }, [fetchProductCategories]);

    return (
        <MainLayout>
            <CreateButton url="/product-category-form-view" />
            <div style={{ maxHeight: "84vh", overflowY: "scroll", paddingBottom: "30px" }}>
                <Box sx={{ alignItems: "start", minHeight: "100vh", width: "90%", display: "ruby", flexWrap: "wrap", p: 1, m: 1, maxWidth: 300, overflowY: "scroll" }}>
                    {productCategories && productCategories.map((category) => <ProductCategoryCard category={category} />)}
                </Box>
            </div>
        </MainLayout>
    );
}