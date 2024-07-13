import { Button, CardContent, FormControl, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCategoryStore from "../../state/productCategoryState";
import useProductStore from "../../state/productState";
import MainLayout from "../../layout/MainLayout";
import BackButton, { EditButton, SaveButton } from "../../components/Buttons";
import FormView, { CardFooter } from "../../components/FormView";
import TextFieldCustom, { NumberFieldCustom, SelectFieldCustom } from "../../components/Fields";

export default function ProductFormView() {
    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const primaryMainColor = theme.palette.primary.main;
    const product = location.state;

    const addProduct = useProductStore((state)=> state.addProduct);
    const updateProduct = useProductStore((state)=> state.updateProduct);
    const [categories, fetchCategories] = useCategoryStore((state)=> [state.productCategories, state.fetchProductCategories]);

    const handleCreate = () => {
        setCreate(true);
    }
    const handleEdit = () => {
        setViewMode(false);
        setEditMode(true);
    }
    const handleSave = () => {
        setSave(true);
    }

    useEffect(() => {
        setViewMode(product? true: false);
        try{
            fetchCategories();
        } catch (error) {
            console.error("Error:", error);
        }
        
        if(create){
            addProduct({
                "name": name,
                "description": description,
                "price": price,
                "category": {"id": category},
                "image": image
            });
            setViewMode(true);
        }
        if(save){
            updateProduct({
                "id": product.id,
                "name": name,
                "description": description,
                "price": price,
                "category": {"id": category},
                "image": image
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);
            if(category){
                product.category = category;
            }
            if(image){
                product.image = image;
            }
            if(name){
                product.name = name;
            }
            if(description){
                product.description = description;
            }
            if(price){
                product.price = price;
            }
        }
    }, [create, save, product, name, description, price, category, image, addProduct, updateProduct, fetchCategories]);
    return (
        <>
        <MainLayout>
        <BackButton />
        <FormView borderColor={primaryMainColor}>
            <CardContent>
                <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}>
                    <TextFieldCustom label="Product Name" placeholder="Enter Product Name" setValue={setName} viewValue={product&&!editMode?product.name:null} id="name" required={true} disabled={viewMode&&!editMode} />
                    <SelectFieldCustom label="Category" setValue={setCategory} styles={{width:"300px",marginLeft:"25px"}}
                    viewValue={(product&&!editMode?product.category&&product.category.id:null) || (category || null) || (product&&editMode?product.category.id:null)} 
                    items={categories} id="category" required={true} disabled={viewMode&&!editMode} itemFields={["name"]} />
                    <TextFieldCustom label="Description" placeholder="Enter Description" setValue={setDescription} viewValue={product&&!editMode?product.description:null} id="description" required={true} disabled={viewMode&&!editMode} />
                    <NumberFieldCustom label="Price" placeholder="Enter Price" styles={{width:"300px",marginLeft:"25px"}} setValue={setPrice} viewValue={product&&!editMode?product.price:null} id="price" required={true} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label="Image" placeholder="Enter Image URL" setValue={setImage} viewValue={product&&!editMode?product.image:null} id="image" required={true} disabled={viewMode&&!editMode} />
                </FormControl>
            </CardContent>
            <CardFooter>
                <SaveButton onClick={handleCreate} lable="Create Product" hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/products')}>View Products</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable="Save" hide={!editMode}/>
            </CardFooter>
        </FormView>
        </MainLayout>
        </>
    )
}