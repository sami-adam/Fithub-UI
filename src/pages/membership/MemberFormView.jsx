import * as React from 'react';
import { Button, FormControl } from '@mui/material';
import MainLayout from '../../layout/MainLayout';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import CardView from '../../components/CardView';
import TextFieldCustom from '../../components/TextFieldCustom';
import BackButton, { CreateButton, EditButton, SaveButton } from '../../components/Buttons';
import { useLocation } from 'react-router-dom';


export default function MemberFormView() {
    //const [gender, setGender] = React.useState('male');
    const [create, setCreate] = React.useState(false);
    const [save, setSave] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [viewMode, setViewMode] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;

    const token = localStorage.getItem('token');
    const member = location.state;
    //let viewMode = member? true: false;

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
    React.useEffect(() => {
        setViewMode(member? true: false);
        async function createMember() {
            if (create) {
                await fetch('http://localhost:8080/api/v1/member', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify({
                        "firstName": firstName,
                        "lastName": lastName,
                        "email": email,
                        "phone": phone,
                        //"address": address,
                    }),
                }).then(response => response.json()).then(data => {
                    console.log(data);
                    return data;
                });
                setViewMode(true);
            }
            
        }
        async function updateMember() {
            if (save) {
                const res = await fetch(`http://localhost:8080/api/v1/member/${member.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify({
                        "firstName": firstName,
                        "lastName": lastName,
                        "email": email,
                        "phone": phone,
                        //"address": address,
                    }),
                }).then(response => response.json()).then(data => {
                    console.log(data);
                    return data;
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
                //if (address){

                
                //member.address = address;
            }
        }
        updateMember();
        createMember();
    }, [create, save, editMode]);
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