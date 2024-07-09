import { Button, FormControl, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateFieldCustom, NumberFieldCustom, SelectFieldCustom } from "../../components/Fields";
import MainLayout from "../../layout/MainLayout";
import BackButton, { EditButton, SaveButton } from "../../components/Buttons";
import CardView from "../../components/CardView";
import useSubscriptionStore from "../../state/subscriptionState";
import useMemberStore from "../../state/memberState";
import dayjs from "dayjs";

export default function SubscriptionFormView() {

    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [member, setMember] = useState(null);
    const [startDate, setStartDate] = useState(dayjs("2021-01-01", "YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(dayjs("2021-01-01", "YYYY-MM-DD"));
    const [subscriptionUnitPrice, setSubscriptionUnitPrice] = useState(0);
    const [subscriptionQty, setSubscriptionQty] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;

    const subscription = location.state;

    const addSubscription = useSubscriptionStore((state)=> state.addSubscription);
    const updateSubscription = useSubscriptionStore((state)=> state.updateSubscription);
    const [members, fetchMembers] = useMemberStore((state)=> [state.members, state.fetchMembers]);

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
        } catch (error) {
            console.error("Error:", error);
        }
        
        if(create){
            addSubscription({
                "member": {"id": member},
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
                "member": {"id": member},
                "startDate": startDate,
                "endDate": endDate,
                "subscriptionUnitPrice": subscriptionUnitPrice,
                "subscriptionQty": subscriptionQty,
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);
            if(member){
                subscription.member = member.id;
            }
            if(startDate){
                subscription.startDate = startDate;
            }
            if(endDate){
                subscription.endDate = endDate;
            }
            if(subscriptionUnitPrice){
                subscription.subscriptionUnitPrice = subscriptionUnitPrice;
            }
            if(subscriptionQty){
                subscription.subscriptionQty = subscriptionQty;
            }
        }
    }
    , [create, save, editMode, member, startDate, endDate, subscriptionUnitPrice, subscriptionQty, fetchMembers]);

    return (
        <>
        <MainLayout>
        <BackButton />
        <CardView borderColor={primaryMainColor}>
            <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}> 
                <SelectFieldCustom label="Member" setValue={setMember} viewValue={subscription&&!editMode?subscription.member&&subscription.member.id:null} id="member" required={true} disabled={viewMode&&!editMode} items={members} itemFields={["firstName", "lastName"]}/>
                <DateFieldCustom label="Start Date" setValue={setStartDate} viewValue={subscription&&!editMode?dayjs(subscription.startDate,"YYYY-MM-DD"):null} id="startDate" required={true} disabled={viewMode&&!editMode}/>
                <DateFieldCustom label="End Date" setValue={setEndDate} viewValue={subscription&&!editMode?dayjs(subscription.endDate,"YYYY-MM-DD"):null} id="endDate" required={true} disabled={viewMode&&!editMode}/>
                <NumberFieldCustom label="Price" placeholder="0" setValue={setSubscriptionUnitPrice} viewValue={subscription&&!editMode?subscription.unitPrice:null} id="subscriptionUnitPrice" required={true} disabled={viewMode&&!editMode}/>
                <NumberFieldCustom label="Quantity" placeholder="0.0" setValue={setSubscriptionQty} viewValue={subscription&&!editMode?subscription.qty:null} id="subscriptionQty" required={true} disabled={viewMode&&!editMode}/>
                <br/>
                <p style={{color: primaryMainColor, display:create? '': 'none'}}>Successfully create</p>
                <SaveButton onClick={handleCreate} lable="Create" hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/subscriptions')}>View Subscriptions</Button>
                <EditButton onClick={handleEdit} hide={editMode||!viewMode}/>
                <SaveButton onClick={handleSave} lable="Save" hide={!editMode}/>
            </FormControl>
        </CardView>
        </MainLayout>
        </>
    )
}