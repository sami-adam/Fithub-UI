import { useEffect, useState } from "react";
import { Button, CardContent, CardHeader, FormControl, Typography } from '@mui/material';
import MainLayout from '../../layout/MainLayout';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import FormView, { CardFooter } from '../../components/FormView';
import TextFieldCustom, { DateFieldCustom, HtmlFieldCustom } from '../../components/Fields';
import BackButton, { CreateButton, EditButton, SaveButton } from '../../components/Buttons';
import { useLocation } from 'react-router-dom';
import useFitnessClassStore from '../../state/fitnessClassState';
import { useTranslation } from 'react-i18next';

export default function FitnessClassFormView(){
    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [intensityLevel, setIntensityLevel] = useState('');
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const primaryDarkColor = theme.palette.primary.dark;

    const fitnessClass = location.state;
    const addFitnessClass = useFitnessClassStore((state)=> state.addFitnessClass);
    const updateFitnessClass = useFitnessClassStore((state)=> state.updateFitnessClass);

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
        setViewMode(fitnessClass? true: false);
        if(create){
            addFitnessClass({
                "name": name,
                "description": description,
                "intensityLevel": intensityLevel,
            });
            setViewMode(true);
        }
        if(save){
            updateFitnessClass({
                "id": fitnessClass.id,
                "name": name,
                "description": description,
                "intensityLevel": intensityLevel,
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);
            if (name){
                fitnessClass.name = name;
            }
            if (description){
                fitnessClass.description = description;
            }
            if (intensityLevel){
                fitnessClass.intensityLevel = intensityLevel;
            }
        }
    }, [create, save, addFitnessClass, updateFitnessClass, fitnessClass, name, description, intensityLevel]);

    return (
        <>
        <MainLayout>
        <BackButton />
        <FormView borderColor={primaryMainColor}>
        <CardHeader 
                action={
                    <>
                    </>
                    } 
                title={
                   <>  </>
                }
                    style={{borderBottom:"1px solid #c2ccd4", backgroundColor:primaryLightColor,opacity:0.8}}/>
            <CardContent> 
                <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}> 
                    <TextFieldCustom label={t("Name")} placeholder="Enter Name" setValue={setName} id="name" required={true} viewValue={fitnessClass&&!editMode?fitnessClass.name:null} disabled={viewMode&&!editMode} />
                    <HtmlFieldCustom label={t("Description")} placeholder="Enter Description" setValue={setDescription} id="description" required={true} viewValue={(fitnessClass&&!editMode?fitnessClass.description:null) || (description||null) || (fitnessClass&&editMode?fitnessClass.description:null)} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("IntensityLevel")} placeholder="Enter IntensityLevel" setValue={setIntensityLevel} id="intensityLevel" required={true} viewValue={fitnessClass&&!editMode?fitnessClass.intensityLevel:null} disabled={viewMode&&!editMode} />
                    <br/>
                    
                </FormControl>
            </CardContent>
            <CardFooter>
                <SaveButton onClick={handleCreate} lable={t("Create Class")} hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/fitness-classes')}>{t("View Classes")}</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable={t("Save")} hide={!editMode}/>
            </CardFooter>
        </FormView>
        </MainLayout>
        </>

    );

}