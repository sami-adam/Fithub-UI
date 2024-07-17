// Invoice.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useTheme } from '@mui/material';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50',
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    color: '#34495E',
  },
  address: {
    fontSize: 12,
    marginBottom: 5,
    color: '#7F8C8D',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#ECF0F1',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderBottomStyle: 'solid',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
  },
  tableCell: {
    fontSize: 12,
    color: '#2C3E50',
    textAlign: 'center',
  },
  total: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#2C3E50',
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#BDC3C7',
    borderTopStyle: 'solid',
    paddingTop: 10,
    color: '#7F8C8D',
  },
});

// Create Document Component
export default function SubscriptionInvoice ({ subscription }) {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.header}>Invoice Number: {subscription.id}</Text>
        <Text style={styles.header}>Date: {new Date().toUTCString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Bill To:</Text>
        <Text style={styles.address}>{subscription.firstName + " " + subscription.lastName}</Text>
        <Text style={styles.address}>{"Riyadh, Saudi"}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader, {backgroundColor: "#e9f7f6"}]}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Subscription</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Quantity</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Price</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{`${subscription.product.name}(${subscription.product.category.name})`}</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{subscription.qty}</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{subscription.unitPrice} SAR</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>{subscription.totalAmount} SAR</Text></View>
        </View>
      </View>

      <Text style={styles.total}>Total: {subscription.totalAmount} SAR</Text>

      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
      </View>
    </Page>
  </Document>
);
}

