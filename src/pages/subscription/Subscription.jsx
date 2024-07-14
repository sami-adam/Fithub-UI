import { useEffect, useState } from "react";
import * as React from 'react';
import DataTable from "../../components/DataTable";
import { useProps } from "@mui/x-data-grid/internals";


export default function Subscription() {
    const token = localStorage.getItem("token");
    const [subscriptions, setSubscriptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState(false);

    console.log(token);
    useEffect(() => {
        async function fetchSubscriptions() {
            try {
                const response = await fetch("http://localhost:8080/api/v1/subscriptions", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => response.json()).then((data) => setSubscriptions(data));
            } catch (error) {
                localStorage.removeItem('token');
                console.error('Error:', error);
                window.location.href = "/signin";

            }
        }
        async function deleteSubscriptions() {
            if (deleted) {
                selected.forEach(async (id) => {
                    const response = await fetch(`http://localhost:8080/api/v1/subscription/${id}`, {
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
                fetchSubscriptions();
            }
        }
        deleteSubscriptions();
        fetchSubscriptions();
    }, [token, deleted]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'productName', headerName: 'Subscription', width: 150 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'startDate', headerName: 'Start Date', width: 130 },
        { field: 'endDate', headerName: 'End Date', width: 130 },
        { field: 'unitPrice', headerName: 'Unit Price', width: 80 },
        { field: 'qty', headerName: 'Quantity', width: 60 },
        { field: 'totalAmount', headerName: 'Total Amount', width: 130 },
        { field: 'discount', headerName: 'Discount', width: 130 },
        { field: 'netAmount', headerName: 'Net Amount', width: 130},
        { field: 'status', headerName: 'Status', width: 130 },
    ];
    const rows = [];
    subscriptions.forEach((subscription) => {
        rows.push({
            id: subscription.id,
            product: subscription.product,
            productName: subscription.product&&subscription.product.name,
            member: subscription.member,
            firstName: subscription.member.firstName,
            lastName: subscription.member.lastName,
            email: subscription.member.email,
            phone: subscription.member.phone,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            unitPrice: subscription.subscriptionUnitPrice,
            qty: subscription.subscriptionQty,
            totalAmount: subscription.totalAmount,
            discount: subscription.discountAmount,
            netAmount: subscription.netAmount,
            status: subscription.status,
        });
    });
    return (
        <DataTable columns={columns} rows={rows} selected={selected} setSelected={setSelected} deleted={deleted} setDeleted={setDeleted} createUrl={'/subscription-form-view'} detailsUrl={'/subscription-form-view'}/>
    );
}