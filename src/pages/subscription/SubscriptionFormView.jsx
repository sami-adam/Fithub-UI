import { Button, CardContent, CardHeader, FormControl, useTheme, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateFieldCustom, DisplayField, NumberFieldCustom, SearchableSelect, SelectFieldCustom } from "../../components/Fields";
import MainLayout from "../../layout/MainLayout";
import BackButton, { ActionButton, EditButton, SaveButton } from "../../components/Buttons";
import FormView, { CardFooter } from "../../components/FormView";
import useSubscriptionStore from "../../state/subscriptionState";
import useMemberStore from "../../state/memberState";
import useProductStore from "../../state/productState";
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import PDFPrint from "../../components/ReportTools";
import SubscriptionInvoice from "../../reports/SubscriptionInvoice";
import FormHeaderActions from "../../components/FormHeaderActions";

const statusColors = {
    "NEW": "gray",
    "PAID": "teal",
    "ACTIVE": "rgb(0, 130, 153)",
    "EXPIRED": "#991515",
    null: "gray"
}

const statuses = {
    "NEW": 0,
    "PAID": 1,
    "ACTIVE": 2,
    "EXPIRED": 3,
    "CANCELLED": 4
}

const reverseStatuses = {
    0: "NEW",
    1: "PAID",
    2: "ACTIVE",
    3: "EXPIRED",
    4: "CANCELLED"
}

export default function SubscriptionFormView() {

    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [member, setMember] = useState(null);
    const [product, setProduct] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [subscriptionUnitPrice, setSubscriptionUnitPrice] = useState(0);
    const [subscriptionQty, setSubscriptionQty] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [status, setStatus] = useState("");
    const [changeStatus, setChangeStatus] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryDarkColor = theme.palette.primary.dark;
    const primaryLightColor = theme.palette.primary.light;

    const subscription = location.state;
    const { t, i18n } = useTranslation();

    const addSubscription = useSubscriptionStore((state)=> state.addSubscription);
    const updateSubscription = useSubscriptionStore((state)=> state.updateSubscription);
    const changeStatusSubscription = useSubscriptionStore((state)=> state.changeStatus);
    const [members, fetchMembers] = useMemberStore((state)=> [state.members, state.fetchMembers]);
    const [products, fetchProducts] = useProductStore((state)=> [state.products, state.fetchProducts]);

    const handleCreate = () => {
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
        setViewMode(subscription? true: false);
        if(subscription){
            setTotalAmount((product&&product.price || subscription&& subscription.unitPrice || 0) * subscriptionQty || 0);
            setTaxAmount((product&&product.tax && product.tax.rate || subscription.product.tax && subscription.product.tax.rate || 0) / 100 * (product&&product.price || subscription&& subscription.unitPrice || 0) * subscriptionQty || 0);
            setNetAmount(totalAmount + taxAmount - discountAmount);
        }
        try{
            fetchMembers();
            fetchProducts();
        } catch (error) {
            console.error("Error:", error);
        }
        
        if(create){
            addSubscription({
                "member": {"id": member.id},
                "product": {"id": product.id},
                "tax": {"id": product.tax&&product.tax.id},
                "startDate": startDate,
                "endDate": endDate,
                "subscriptionUnitPrice": product.price,
                "subscriptionQty": subscriptionQty,
                "discountAmount": discountAmount,
                "status": 0
            });
            setViewMode(true);
        }
        if(save){
            updateSubscription({
                "id": subscription.id,
                "member": {"id": member&&member.id},
                "product": {"id": product&&product.id},
                "tax": {"id": product&&product.tax&&product.tax.id},
                "startDate": startDate,
                "endDate": endDate,
                "subscriptionUnitPrice": product&&product.price,
                "subscriptionQty": subscriptionQty,
                "discountAmount": discountAmount,
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);
            if(member){
                subscription.member = member;
            }
            if(product){
                subscription.product = product;
            }
            if(startDate){
                subscription.startDate = startDate;
            }
            if(endDate){
                subscription.endDate = endDate;
            }
            if(subscriptionUnitPrice){
                subscription.unitPrice = subscriptionUnitPrice;
            }
            if(subscriptionQty){
                subscription.qty = subscriptionQty;
            }
            if(discountAmount){
                subscription.discount = discountAmount;
            }
        }
        if(changeStatus){
            const statusInt = statuses[t(subscription.status, {lng:'en'})] + 1;
            updateSubscription({
                "id": subscription.id,
                "status": statusInt
            });
            setChangeStatus(false);
            setStatus(reverseStatuses[statusInt]);
            subscription.status = reverseStatuses[statusInt];
            
        }
    }
    , [create, save, editMode, member, startDate, endDate, subscriptionUnitPrice, subscriptionQty, fetchMembers, subscription, fetchProducts, product, addSubscription, updateSubscription, changeStatus, status, discountAmount]);

    return (
        <>
        <MainLayout>
        <BackButton />
        <FormView borderColor={primaryMainColor}>
            <CardHeader 
                action={
                    <>
                    <ActionButton text="PAID" icon={<PaidIcon/>} onClick={setChangeStatus} toolTip={t("Change status to PAID")} hide={subscription&&subscription.status == t("NEW")? false: true}/>
                    <ActionButton text="ACTIVE" icon={<CheckCircleOutlineIcon/>} onClick={setChangeStatus} toolTip={t("Change status to ACTIVE")} hide={subscription&&subscription.status == t("PAID")? false: true} color="teal"/>
                    </>
                    } 
                title={
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Typography variant="h8" component="div" style={{fontWeight:"bold", color:statusColors[i18n.t(subscription&&subscription.status,{lng:'en'})]}}>
                        {subscription&&subscription.status}
                    </Typography>
                    <div style={{marginInlineEnd:"40%"}}>
                        <FormHeaderActions>
                            <MenuItem disableRipple sx={{maxHeight:"25px",overflow:"hidden"}}>
                                <PDFPrint document={subscription&& <SubscriptionInvoice subscription={subscription}/>} fileName="subscription_invoice" title="Subscription Invoice"/>
                            </MenuItem>
                        </FormHeaderActions>
                    </div>
                    </div>
                }
                    style={{borderBottom:"0.1px solid rgb(241 241 241)"}}/>
            <CardContent>
                <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}> 
                    <SearchableSelect label={t("Member")} setValue={setMember} viewValue={(subscription&&!editMode?subscription.member&&subscription.member:null) || (member || null) || (subscription&&editMode?subscription.member:null)} id="member" required={true} disabled={viewMode&&!editMode} items={members} itemFields={["firstName", "lastName"]}/>
                    <SearchableSelect label={t("Product")} setValue={setProduct} viewValue={(subscription&&!editMode?subscription.product&&subscription.product:null) || (product || null) || (subscription&&editMode?subscription.product&&subscription.product:null)} id="product" required={true} disabled={viewMode&&!editMode} items={products} itemFields={["name","category.name"]}/>
                    <DateFieldCustom label={t("Start Date")} setValue={setStartDate} viewValue={subscription&&!editMode?dayjs(subscription.startDate,"YYYY-MM-DD"):null} id="startDate" required={true} disabled={viewMode&&!editMode}/>
                    <DateFieldCustom label={t("End Date")} setValue={setEndDate} viewValue={subscription&&!editMode?dayjs(subscription.endDate,"YYYY-MM-DD"):null} id="endDate" required={true} disabled={viewMode&&!editMode}/>
                    {/* <NumberFieldCustom label={t("Price")} placeholder="0" setValue={setSubscriptionUnitPrice} viewValue={subscription&&!editMode?subscription.unitPrice:null} id="subscriptionUnitPrice" required={true} disabled={viewMode&&!editMode}/> */}
                    <DisplayField label="Price" value={product&&product.price || subscription&& subscription.unitPrice || 0} postValue="SAR"/>
                    <DisplayField label="Tax" value={product&&product.tax && product.tax.name || subscription.product.tax && subscription.product.tax.name || ""}/>
                    <NumberFieldCustom label={t("Quantity")} placeholder="0.0" setValue={setSubscriptionQty} viewValue={subscription&&!editMode?subscription.qty:null} id="subscriptionQty" required={true} disabled={viewMode&&!editMode}/>
                    <DisplayField label={t("Total Amount")} value={totalAmount} postValue="SAR"/>
                    <NumberFieldCustom label={t("Discount")} placeholder="0.0" setValue={setDiscountAmount} viewValue={subscription&&!editMode?subscription.discount:null} id="discountAmount" required={true} disabled={viewMode&&!editMode}/>
                    <DisplayField label={t("Tax Amount")} value={taxAmount} postValue="SAR"/>
                    <DisplayField label="Net Amount" value={netAmount} postValue="SAR"/>
                    <br/>
                    {/* <p style={{color: primaryMainColor, display:create? '': 'none'}}>Successfully create</p> */}
                </FormControl>
            </CardContent>
            <CardFooter>
                <SaveButton onClick={handleCreate} lable={t("Create")} hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/subscriptions')}>View Subscriptions</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable={t("Save")} hide={!editMode}/>
            </CardFooter>
        </FormView>
        </MainLayout>
        </>
    )
}