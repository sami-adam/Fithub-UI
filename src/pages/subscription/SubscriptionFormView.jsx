import { Button, CardContent, CardHeader, FormControl, useTheme, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateFieldCustom, NumberFieldCustom, SearchableSelect, SelectFieldCustom } from "../../components/Fields";
import MainLayout from "../../layout/MainLayout";
import BackButton, { ActionButton, EditButton, SaveButton } from "../../components/Buttons";
import FormView, { CardFooter } from "../../components/FormView";
import useSubscriptionStore from "../../state/subscriptionState";
import useMemberStore from "../../state/memberState";
import useProductStore from "../../state/productState";
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
    const [subscriptionQty, setSubscriptionQty] = useState(0);
    const [status, setStatus] = useState("");
    const [changeStatus, setChangeStatus] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryDarkColor = theme.palette.primary.dark;
    const primaryLightColor = theme.palette.primary.light;

    const subscription = location.state;

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
                "startDate": startDate,
                "endDate": endDate,
                "subscriptionUnitPrice": subscriptionUnitPrice,
                "subscriptionQty": subscriptionQty,
                "status": 0
            });
            setViewMode(true);
        }
        if(save){
            updateSubscription({
                "id": subscription.id,
                "member": {"id": member&&member.id},
                "product": {"id": product&&product.id},
                "startDate": startDate,
                "endDate": endDate,
                "subscriptionUnitPrice": subscriptionUnitPrice,
                "subscriptionQty": subscriptionQty,
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
        }
        if(changeStatus){
            const statusInt = statuses[subscription.status] + 1;
            updateSubscription({
                "id": subscription.id,
                "status": statusInt
            });
            setChangeStatus(false);
            setStatus(reverseStatuses[statusInt]);
            
        }
    }
    , [create, save, editMode, member, startDate, endDate, subscriptionUnitPrice, subscriptionQty, fetchMembers, subscription, fetchProducts, product, addSubscription, updateSubscription, changeStatus, status]);

    return (
        <>
        <MainLayout>
        <BackButton />
        <FormView borderColor={primaryMainColor}>
            <CardHeader 
                action={
                    <>
                    <ActionButton text="PAID" icon={<PaidIcon/>} onClick={setChangeStatus} toolTip="Change status to PAID" hide={subscription&&subscription.status == "NEW"? false: true}/>
                    <ActionButton text="ACTIVE" icon={<CheckCircleOutlineIcon/>} onClick={setChangeStatus} toolTip="Change status to ACTIVE" hide={subscription&&subscription.status == "PAID"? false: true} color="teal"/>
                    </>
                    } 
                title={
                    <Typography variant="h8" component="div" style={{fontWeight:"bold", color:statusColors[subscription&&subscription.status]}}>
                        {subscription&&subscription.status}
                    </Typography>
                }
                    style={{borderBottom:"0.1px solid rgb(241 241 241)"}}/>
            <CardContent>
                <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}> 
                    <SearchableSelect label="Member" setValue={setMember} viewValue={(subscription&&!editMode?subscription.member&&subscription.member:null) || (member || null) || (subscription&&editMode?subscription.member:null)} id="member" required={true} disabled={viewMode&&!editMode} items={members} itemFields={["firstName", "lastName"]}/>
                    <SearchableSelect label="Product" setValue={setProduct} viewValue={(subscription&&!editMode?subscription.product&&subscription.product:null) || (product || null) || (subscription&&editMode?subscription.product&&subscription.product:null)} id="product" required={true} disabled={viewMode&&!editMode} items={products} itemFields={["name","category.name"]}/>
                    <DateFieldCustom label="Start Date" setValue={setStartDate} viewValue={subscription&&!editMode?dayjs(subscription.startDate,"YYYY-MM-DD"):null} id="startDate" required={true} disabled={viewMode&&!editMode}/>
                    <DateFieldCustom label="End Date" setValue={setEndDate} viewValue={subscription&&!editMode?dayjs(subscription.endDate,"YYYY-MM-DD"):null} id="endDate" required={true} disabled={viewMode&&!editMode}/>
                    <NumberFieldCustom label="Price" placeholder="0" setValue={setSubscriptionUnitPrice} viewValue={subscription&&!editMode?subscription.unitPrice:null} id="subscriptionUnitPrice" required={true} disabled={viewMode&&!editMode}/>
                    <NumberFieldCustom label="Quantity" placeholder="0.0" setValue={setSubscriptionQty} viewValue={subscription&&!editMode?subscription.qty:null} id="subscriptionQty" required={true} disabled={viewMode&&!editMode}/>
                    <br/>
                    {/* <p style={{color: primaryMainColor, display:create? '': 'none'}}>Successfully create</p> */}
                </FormControl>
            </CardContent>
            <CardFooter>
                <SaveButton onClick={handleCreate} lable="Create" hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/subscriptions')}>View Subscriptions</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable="Save" hide={!editMode}/>
            </CardFooter>
        </FormView>
        </MainLayout>
        </>
    )
}