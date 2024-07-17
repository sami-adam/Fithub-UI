// src/App.js
import React, { useEffect } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Paper, Typography, useTheme } from '@mui/material';
import DashboardCard from './DashboardCard';
import GroupSVG from './svg/groupSVG';
import CalendarSVG from './svg/CalendarSVG';
import useMemberStore from "../state/memberState";
import useSubscriptionStore from "../state/subscriptionState";
import useProductStore from "../state/productState";
import useProductCategoryStore from "../state/productCategoryState";
import PieChartCustom from './PieChartCustom';
import { useTranslation } from 'react-i18next';

function Dashboard() {
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const [members, fetchMembers] = useMemberStore((state) => [state.members, state.fetchMembers]);
    const [subscriptions, fetchSubscriptions] = useSubscriptionStore((state) => [state.subscriptions, state.fetchSubscriptions]);
    const [products, fetchProducts] = useProductStore((state) => [state.products, state.fetchProducts]);
    const [productCategories, fetchProductCategories] = useProductCategoryStore((state) => [state.productCategories, state.fetchProductCategories]);

    const activeSubscriptions = subscriptions.filter((s) => s.status === "ACTIVE").length;
    const paidSubscriptions = subscriptions.filter((s) => s.status === "PAID").length;
    const newSubscriptions = subscriptions.filter((s) => s.status === "NEW").length;
    const expiredSubscriptions = subscriptions.filter((s) => s.status === "EXPIRED").length;
    const [t, i18n] = useTranslation();

    useEffect(() => {
        fetchMembers();
        fetchSubscriptions();
        fetchProducts();
        fetchProductCategories();
        theme.direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [fetchMembers, fetchSubscriptions, fetchProducts, fetchProductCategories, i18n.language]);
    const pieChartData =[]
    var pieId = 0;
    const pieChartColors = ["whitesmoke", "#CFB53B", primaryMainColor];
    productCategories.forEach((productCategory) => {
        pieChartData.push({
            id: pieId,
            value: subscriptions.filter((s) => s.product.category.id === productCategory.id).length,
            label: productCategory.name,
            color: pieChartColors[pieId%3],
        });
        pieId++;
    });
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
            <DashboardCard svg={<CalendarSVG color="rgb(0 130 153)"/>} text="Active Subscriptions" number={activeSubscriptions}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <DashboardCard svg={<CalendarSVG color="#06c"/>} text="Paid Subscriptions" number={paidSubscriptions}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <DashboardCard svg={<CalendarSVG color="#607D8B"/>} text="New Subscriptions" number={newSubscriptions}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <DashboardCard svg={<CalendarSVG color="#F44336"/>} text="Expired Subscriptions" number={expiredSubscriptions}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <DashboardCard svg={<GroupSVG color={primaryMainColor}/>} text="Active Members" number={members.length}/>
        </Grid>
        <Grid item xs={12}>
            <PieChartCustom items={pieChartData}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;