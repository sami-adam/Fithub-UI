import { useEffect } from "react";
import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import EmailList from "../../components/EmailList";
import MainLayout from "../../layout/MainLayout";

function Email() {
    console.log("In Home" + localStorage.getItem('token'));
    const [emails, setEmails] = React.useState([]);
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    useEffect(() => {
        async function fetchData() {
            try{
                // SignIn Endpoint: http://localhost:8080/api/v1/emails
                const token = localStorage.getItem('token');
                const emails = await fetch('http://localhost:8080/api/v1/emails', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                }).then(response => response.json()).then(data => {
                    return data;});
                setEmails(emails);
            } catch (error) {
                localStorage.removeItem('token');
                console.error('Error:', error);
                window.location.href = "/signin";
            };
        }
        fetchData();
    }, [token]);
    return (
        <>
            <MainLayout/>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingTop:'100px'}}>
                {emails.map((email) => <EmailList email={email} />)}
                <Divider variant="inset" component="li" />
            </List>
        </>
    );
}

export default Email;