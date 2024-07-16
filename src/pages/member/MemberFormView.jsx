import { useEffect, useState } from "react";
import { Button, CardContent, CardHeader, FormControl, Typography } from '@mui/material';
import MainLayout from '../../layout/MainLayout';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import FormView, { CardFooter } from '../../components/FormView';
import TextFieldCustom, { DateFieldCustom } from '../../components/Fields';
import BackButton, { CreateButton, EditButton, SaveButton } from '../../components/Buttons';
import { useLocation } from 'react-router-dom';
import useMemberStore from '../../state/memberState';
import ReactHtmlParser from 'html-react-parser';
import { useTranslation } from 'react-i18next';


export default function MemberFormView() {
    //const [gender, setGender] = React.useState('male');
    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const primaryDarkColor = theme.palette.primary.dark;

    const member = location.state;
    //let viewMode = member? true: false;
    const addMember = useMemberStore((state)=> state.addMember);
    const updateMember = useMemberStore((state)=> state.updateMember);

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
        setViewMode(member? true: false);
        if(create){
            addMember({
                "identificationNumber": identificationNumber,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": phone,
                //"address": address,
            });
            setViewMode(true);
        }
        if(save){
            console.log(identificationNumber)
            updateMember({
                "id": member.id,
                "identificationNumber": identificationNumber,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": phone,
                //"address": address,
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);
            if (identificationNumber){
                member.identificationNumber = identificationNumber;
            }
            if (firstName){
                member.firstName = firstName;
            }
            if (lastName){
                member.lastName = lastName;
            }
            if (email){
                member.email = email;
            }
            if (phone){
                member.phone = phone;
            }
        }
    }, [member, addMember, updateMember, create, save, editMode, identificationNumber, firstName, lastName, email, phone, address]);
    return (
        <>
        <MainLayout>
        <BackButton />
        <FormView borderColor={primaryMainColor}>
        <CardHeader 
                action={
                    <>
                    <Button size="small" color="primary" variant="outlined" 
                    style={{color:primaryDarkColor,fontWeight:"bold",border:"none",backgroundColor:primaryLightColor}}>
                        {member&&member.subscriptions&&member.subscriptions.length || 0} {t("Subscriptions")}
                    </Button>
                    </>
                    } 
                title={
                    <Typography variant="h8" component="div" style={{fontWeight:"bold"}}>
                        {t("Member Details")}
                    </Typography>
                }
                    style={{borderBottom:"1px solid #c2ccd4", backgroundColor:primaryLightColor,opacity:0.8}}/>
            <CardContent>
                <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}> 
                    <TextFieldCustom label={t("First Name")} placeholder="Enter First Name" setValue={setFirstName} viewValue={member&&!editMode?member.firstName:null} id="firstName" required={true} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Last Name")} placeholder="Enter Last Name" setValue={setLastName} id="lastName" viewValue={member&&!editMode?member.lastName:null} required={true} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Identification Number")} placeholder="Enter Identification Number" setValue={setIdentificationNumber} id="identificationNumber" required={true} viewValue={member&&!editMode?member.identificationNumber:null} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Email")} placeholder="Enter Email" setValue={setEmail} id="email" required={true} viewValue={member&&!editMode?member.email:null} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Phone")} placeholder="Enter Phone" setValue={setPhone} id="phone" required={true} viewValue={member&&!editMode?member.phone:null} disabled={viewMode&&!editMode} />
                    <TextFieldCustom label={t("Address")} placeholder="Enter Address" setValue={setAddress} id="address" required={true} viewValue={member&&!editMode?member.address:null} disabled={viewMode&&!editMode} />
                    <TextFieldCustom viewValue={member&&member.subscriptions&&member.subscriptions[0]?member.subscriptions[0].endDate: t("No Subscription Found")} label={t("Subscription End")} setValue={setAddress} id="subscription-end-date" disabled={true}/>
                    <br/>
                    
                </FormControl>
            </CardContent>
            <CardFooter>
                {/* <p style={{color: primaryMainColor, display:create? '': 'none'}}>Successfully create</p> */}
                <SaveButton onClick={handleCreate} lable={t("Create Member")} hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/members')}>{t("View Members")}</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable={t("Save")} hide={!editMode}/>
            </CardFooter>
        </FormView>
        </MainLayout>
        </>

    );
}