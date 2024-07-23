import { useEffect, useState } from "react";
import { Button, CardContent, CardHeader, FormControl, Typography } from '@mui/material';
import MainLayout from '../../layout/MainLayout';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import FormView, { CardFooter } from '../../components/FormView';
import TextFieldCustom, { DateFieldCustom } from '../../components/Fields';
import BackButton, { CreateButton, EditButton, SaveButton } from '../../components/Buttons';
import { useLocation } from 'react-router-dom';
import useEmployeeStore from "../../state/employeeState";
import { useTranslation } from 'react-i18next';

export default function EmployeeFormView() {
    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [user, setUser] = useState(null);
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const primaryDarkColor = theme.palette.primary.dark;

    const employee = location.state;
    const addEmployee = useEmployeeStore((state)=> state.addEmployee);
    const updateEmployee = useEmployeeStore((state)=> state.updateEmployee);

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
        setViewMode(employee? true: false);
        if(create){
            addEmployee({
                "identificationNumber": identificationNumber,
                "name": name,
                "email": email,
                "phone": phone,
                "address": address,
            });
            setViewMode(true);
        }
        if(save){
            updateEmployee({
                "id": employee.id,
                "identificationNumber": identificationNumber,
                "name": name,
                "email": email,
                "phone": phone,
                "address": address,
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);
            if (identificationNumber){
                employee.identificationNumber = identificationNumber;
            }
            if (name){
                employee.name = name;
            }
            if (email){
                employee.email = email;
            }
            if (phone){
                employee.phone = phone;
            }
            if (address){
                employee.address = address;
            }
        }
    }, [create, save, addEmployee, updateEmployee, employee, identificationNumber, name, email, phone, address]);

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
                    <Typography variant="h8">{t("Empoyee Details")}</Typography>
                }
                    style={{borderBottom:"1px solid #c2ccd4", backgroundColor:primaryLightColor,opacity:0.8}}/>
            <CardContent>
                <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}> 
                    <TextFieldCustom label={t("Name")} placeholder="Enter Name" setValue={setName} viewValue={employee&&!editMode?employee.name:null} id="name" required={true} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Identification Number")} placeholder="Enter Identification Number" setValue={setIdentificationNumber} id="identificationNumber" required={true} viewValue={employee&&!editMode?employee.identificationNumber:null} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Email")} placeholder="Enter Email" setValue={setEmail} id="email" required={true} viewValue={employee&&!editMode?employee.email:null} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Phone")} placeholder="Enter Phone" setValue={setPhone} id="phone" required={true} viewValue={employee&&!editMode?employee.phone:null} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Address")} placeholder="Enter Address" setValue={setAddress} id="address" required={true} viewValue={employee&&!editMode?employee.address:null} disabled={viewMode&&!editMode} />
                    <br/>
                    
                </FormControl>
            </CardContent>
            <CardFooter>
                {/* <p style={{color: primaryMainColor, display:create? '': 'none'}}>Successfully create</p> */}
                <SaveButton onClick={handleCreate} lable={t("Create Employee")} hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/employees')}>{t("View Employees")}</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable={t("Save")} hide={!editMode}/>
            </CardFooter>
        </FormView>
        </MainLayout>
        </>

    );
}