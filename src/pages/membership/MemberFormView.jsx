import { useEffect, useState } from "react";
import { Button, FormControl } from '@mui/material';
import MainLayout from '../../layout/MainLayout';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import CardView from '../../components/CardView';
import TextFieldCustom from '../../components/TextFieldCustom';
import BackButton, { CreateButton, EditButton, SaveButton } from '../../components/Buttons';
import { useLocation } from 'react-router-dom';
import useMemberStore from '../../state/memberState';


export default function MemberFormView() {
    //const [gender, setGender] = React.useState('male');
    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;

    const token = localStorage.getItem('token');
    const member = location.state;
    //let viewMode = member? true: false;
    const addMember = useMemberStore((state)=> state.addMember);
    const updateMember = useMemberStore((state)=> state.updateMember);

    const handleCreate = () => {
        console.log(firstName, lastName, email, phone, address)
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
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": phone,
                //"address": address,
            });
            setViewMode(true);
        }
        if(save){
            updateMember({
                "id": member.id,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": phone,
                //"address": address,
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);
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
    }, [member, addMember, updateMember, create, save, editMode, firstName, lastName, email, phone, address]);
    return (
        <>
        <MainLayout>
        <BackButton />
        <CardView borderColor={primaryMainColor}>
            <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}> 
                <TextFieldCustom label="First Name" placeholder="Enter First Name" setValue={setFirstName} viewValue={member&&!editMode?member.firstName:null} id="firstName" required={true} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Last Name" placeholder="Enter Last Name" setValue={setLastName} id="lastName" viewValue={member&&!editMode?member.lastName:null} required={true} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Email" placeholder="Enter Email" setValue={setEmail} id="email" required={true} viewValue={member&&!editMode?member.email:null} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Phone" placeholder="Enter Phone" setValue={setPhone} id="phone" required={true} viewValue={member&&!editMode?member.phone:null} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Address" placeholder="Enter Address" setValue={setAddress} id="address" required={true} viewValue={member&&!editMode?member.address:null} disabled={viewMode&&!editMode} />
                <br/>
                <p style={{color: primaryMainColor, display:create? '': 'none'}}>Successfully create</p>
                <SaveButton onClick={handleCreate} lable="Create Member" hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/members')}>View Members</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable="Save" hide={!editMode}/>
            </FormControl>
            
        </CardView>
        </MainLayout>
        </>

    );
}