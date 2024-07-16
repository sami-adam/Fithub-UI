import { useEffect, useState } from "react";
import * as React from 'react';
import DataTable from "../../components/DataTable";
import { randomNumberBetween, useProps } from "@mui/x-data-grid/internals";
import useSubscriptionStore from "../../state/subscriptionState";
import { type } from "@testing-library/user-event/dist/type";
import { useTranslation } from 'react-i18next';



export default function Subscription() {
    const token = localStorage.getItem("token");
    //const [subscriptions, setSubscriptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [search, setSearch] = useState("");
    const subscriptions = useSubscriptionStore((state) => state.subscriptions);
    const fetchSubscriptions = useSubscriptionStore((state) => state.fetchSubscriptions);
    const deleteSubscriptions = useSubscriptionStore((state) => state.deleteSubscription);
    const searchSubscriptions = useSubscriptionStore((state) => state.searchSubscriptions);
    const {t} = useTranslation();
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

    useEffect(() => {
        if (search === "") {
            fetchSubscriptions();
        }
        if (search !== "") {
            console.log(search);
            searchSubscriptions(search);
        }
        if (deleted) {
            selected.forEach((id) => {
                deleteSubscriptions(id);
            });
            setDeleted(false);
            setSelected([]);
            fetchSubscriptions();
        }
    }, [token, deleted, fetchSubscriptions, selected, deleteSubscriptions, search, searchSubscriptions]);
    const columns = [
        { field: 'id', headerName: t('ID'), width: 70 },
        { field: 'productName', headerName: t('Subscription'), width: 150 },
        { field: 'firstName', headerName: t('First name'), width: 130 },
        { field: 'lastName', headerName: t('Last name'), width: 130 },
        { field: 'email', headerName: t('Email'), width: 130 },
        { field: 'phone', headerName: t('Phone'), width: 130 },
        { field: 'startDate', headerName: t('Start Date'), width: 130 },
        { field: 'endDate', headerName: t('End Date'), width: 130 },
        { field: 'unitPrice', headerName: t('Unit Price'), width: 100 , type:'number', valueFormatter: (value) => {
            if (!value) {
              return value;
            }
            return currencyFormatter.format(value);
          },
        },
        { field: 'qty', headerName: t('Quantity'), width: 60 },
        { field: 'totalAmount', headerName: t('Total Amount'), width: 130 },
        { field: 'discount', headerName: t('Discount'), width: 130 },
        { field: 'netAmount', headerName: t('Net Amount'), width: 130,  flex:1},
        { field: 'status', headerName: t('Status'), width: 130 },
    ];
    const rows = [];
    subscriptions.forEach((subscription) => {
        rows.push({
            id: subscription.id !=null? subscription.id: randomNumberBetween(1, 1000),
            product: subscription.product,
            productName: subscription.product&&subscription.product.name,
            member: subscription.member,
            firstName: subscription.member&&subscription.member.firstName,
            lastName: subscription.member&&subscription.member.lastName,
            email: subscription.member&&subscription.member.email,
            phone: subscription.member&&subscription.member.phone,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            unitPrice: subscription.subscriptionUnitPrice,
            qty: subscription.subscriptionQty,
            totalAmount: subscription.totalAmount,
            discount: subscription.discountAmount,
            netAmount: subscription.netAmount,
            status: t(subscription.status),
        });
    });
    return (
        <DataTable columns={columns} rows={rows} selected={selected} setSelected={setSelected} deleted={deleted} setDeleted={setDeleted} createUrl={'/subscription-form-view'} detailsUrl={'/subscription-form-view'} setSearch={setSearch}/>
    );
}