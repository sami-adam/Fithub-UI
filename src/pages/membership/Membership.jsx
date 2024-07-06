import { useEffect, useState } from "react";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MainLayout from "../../layout/MainLayout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";


export default function Membership() {
    const token = localStorage.getItem("token");
    const [memberships, setMemberships] = useState([]);
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState(false);

    console.log(token);
    useEffect(() => {
        async function fetchMemberships() {
            try {
                const response = await fetch("http://localhost:8080/api/v1/memberships", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => response.json()).then((data) => setMemberships(data));
            } catch (error) {
                localStorage.removeItem('token');
                console.error('Error:', error);
                window.location.href = "/signin";

            }
        }
        async function deleteMemberships() {
            if (deleted) {
                selected.forEach(async (id) => {
                    const response = await fetch(`http://localhost:8080/api/v1/membership/${id}`, {
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
                fetchMemberships();
            }
        }
        deleteMemberships();
        fetchMemberships();
    }, [token, deleted]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'subscription', headerName: 'Subscription', width: 130 },
        { field: 'subscriptionPrice', headerName: 'Subscription Price', width: 130 },
        { field: 'startDate', headerName: 'Start Date', width: 130 },
        { field: 'endDate', headerName: 'End Date', width: 130 },
        { field: 'totalAmount', headerName: 'Total Amount', width: 130 },
        { field: 'discount', headerName: 'Discount', width: 130 },
        { field: 'netAmount', headerName: 'Net Amount', width: 130},
        { field: 'status', headerName: 'Status', width: 130 },
    ];
    const rows = [];
    memberships.forEach((membership) => {
        rows.push({
            id: membership.id,
            firstName: membership.member.firstName,
            lastName: membership.member.lastName,
            email: membership.member.email,
            phone: membership.member.phone,
            subscription: membership.subscription.name,
            subscriptionPrice: membership.subscription.price,
            startDate: membership.startDate,
            endDate: membership.endDate,
            totalAmount: membership.totalAmount,
            discount: membership.discountAmount,
            netAmount: membership.netAmount,
            status: membership.status,
        });
    });
    return (
        <DataTable columns={columns} rows={rows} selected={selected} setSelected={setSelected} deleted={deleted} setDeleted={setDeleted} createUrl={'/createMembership'} detailsUrl={'/membershipDetails'}/>
        // <>
        // <MainLayout/>
        // <div style={{ height: 400, width: '100%', paddingTop:'100px'}}>
        //     <Button variant="outlined" color="primary" style={{color:'teal', fontWeight:'bold',border:'0px'}} onClick={()=> navigate('/createMembership')}>Create New</Button>
        //     <Button variant="outlined" color="primary" style={{color:'red', fontWeight:'bold',border:'0px',display:selected.length ==0 ? 'none': ''}} onClick={()=> setDeleted(true)}>Delete</Button>
        //     <DataGrid
        //         rows={rows}
        //         columns={columns}
        //         initialState={{
        //         pagination: {
        //             paginationModel: { page: 0, pageSize: 5 },
        //         },
        //         }}
        //         pageSizeOptions={[5, 10]}
        //         checkboxSelection 
        //         onRowSelectionModelChange={(row) => setSelected(row)}
        //         />
        // </div>
        // </>
    );
}