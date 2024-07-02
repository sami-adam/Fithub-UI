import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl } from '@mui/material';

export default function CreateMember() {
    const [gender, setGender] = React.useState('male');
    const [created, setCreated] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');

    const token = localStorage.getItem('token');

    const handleCreate = () => {
        console.log(firstName, lastName, email, phone, address)
        setCreated(true);
    }
    React.useEffect(() => {
        async function createMember() {
            if (created) {
                const response = await fetch('http://localhost:8080/api/v1/member', {
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
            }
        }
        createMember();
        //window.location.href = "/";
    }, [created]);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <FormControl variant="outlined" style={{ marginBottom: '20px' }}> 
                <TextField
                    required
                    disabled={created}
                    id="firstName"
                    label="First Name"
                    variant="standard" onChange={(e) => setFirstName(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    id="lastName"
                    required
                    disabled={created}
                    label="Last Name"
                    variant="standard" onChange={(e) => setLastName(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    id="email"
                    required
                    disabled={created}
                    label="Email"
                    variant="standard" onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    id="phone"
                    required
                    disabled={created}
                    label="Phone"
                    variant="standard" onChange={(e) => setPhone(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    id="address"
                    disabled={created}
                    label="Address"
                    variant="standard" onChange={(e) => setAddress(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
            </FormControl>
            <Button variant="contained" style={{ marginBottom: '20px' }} onClick={handleCreate} disabled={created}>Create Member</Button>
        </Box>

    );
}