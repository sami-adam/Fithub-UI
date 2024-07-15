import { useEffect, useState } from "react";
import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MainLayout from "../../layout/MainLayout";
import ReactHtmlParser from 'html-react-parser';
import { Subject } from "@mui/icons-material";
import DataTable from "../../components/DataTable";


function Email() {
    console.log("In Home" + localStorage.getItem('token'));
    const [emails, setEmails] = React.useState([]);
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        async function fetchData() {
            try{
                const token = localStorage.getItem('token');
                const emails = await fetch(`${baseUrl}/emails`, {
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
        async function deleteEmails() {
            if (deleted) {
                selected.forEach(async (id) => {
                    const response = await fetch(`${baseUrl}/email/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                    }).then(response => response.json()).then(data => {
                        console.log(data);
                        return data;
                    });
                });
                setDeleted(false);
                setSelected([]);
                fetchData();
            }
        }
        fetchData();
        deleteEmails(); 
    }, [token, deleted]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'subject', headerName: 'Subject', width: 200 },
        { field: 'scheduledDate', headerName: 'Schedule Date', width: 130},
        { field: 'emailFrom', headerName: 'Email From', width: 250 },
        { field: 'emailTo', headerName: 'Email To', width: 250 },
        { field: 'emailBody', headerName: 'Message', width: 250 , renderCell: (params) => { return ReactHtmlParser(params.value); }},
        { field: 'status', headerName: 'Status', width: 130 }
    ];
    const rows = [];
    console.log(emails);
    emails.forEach((email) => {
        rows.push({
            id: email.id,
            subject: email.subject,
            scheduledDate: email.scheduledDate&&email.scheduledDate.substring(0, 10),
            emailFrom: email.emailFrom,
            emailTo: email.emailTo,
            emailBody: email.emailBody,
            status: email.status,
            attachments: email.attachments,
        });
    });
    return (
        <>
            <DataTable columns={columns} rows={rows} selected={selected} setSelected={setSelected} deleted={deleted} setDeleted={setDeleted} createUrl={'/email-form-view'} detailsUrl={'/email-form-view'}/>
        </>
    );
}

export default Email;