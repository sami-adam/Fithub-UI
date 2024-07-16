import { Button, CardContent, FormControl, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProductCategoryStore from "../../state/productCategoryState";
import MainLayout from "../../layout/MainLayout";
import BackButton, { EditButton, SaveButton } from "../../components/Buttons";
import FormView, { CardFooter } from "../../components/FormView";
import TextFieldCustom, { NumberFieldCustom, SelectFieldCustom } from "../../components/Fields";
import { useTranslation } from 'react-i18next';

export default function ProductCategoryFormView(){
    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const { t } = useTranslation();

    const primaryMainColor = theme.palette.primary.main;
    const category = location.state;

    const addCategory = useProductCategoryStore((state)=> state.addProductCategory);
    const updateCategory = useProductCategoryStore((state)=> state.updateProductCategory);
    
    
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
        setViewMode(category? true: false);
        if(create){
            addCategory({
                "name": name,
                "description": description
            });
            setViewMode(true);
        }
        if(save){
            updateCategory({
                "id": category.id,
                "name": name,
                "description": description
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);

            if(name){
                category.name = name;
            }
            if(description){
                category.description = description;
            }
        }
    }, [create, save, category, name, description, addCategory, updateCategory]);

    return (
        <MainLayout>
        <BackButton />
        <FormView borderColor={primaryMainColor}>
            <CardContent>
                <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}>
                    <TextFieldCustom label={t("Category Name")} placeholder="Enter Category Name" setValue={setName} viewValue={category&&!editMode?category.name:null} id="name" required={true} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Description")} placeholder="Enter Description" setValue={setDescription} viewValue={category&&!editMode?category.description:null} id="description" required={true} disabled={viewMode&&!editMode} />
                </FormControl>
            </CardContent>
            <CardFooter>
                <SaveButton onClick={handleCreate} lable={t("Create Category")} hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/product-categories')}>{t("View Categories")}</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable={t("Save")} hide={!editMode}/>
            </CardFooter>
        </FormView>
        </MainLayout>
    )
}