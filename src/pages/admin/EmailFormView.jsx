import { Button, CardContent, FormControl, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useEmailStore from "../../state/emailState";
import MainLayout from "../../layout/MainLayout";
import BackButton, { EditButton, SaveButton } from "../../components/Buttons";
import CardView, { CardFooter } from "../../components/CardView";
import TextFieldCustom, { HtmlFieldCustom } from "../../components/Fields";

export default function EmailFormView(){
    const [create, setCreate] = useState(false);
    const [save, setSave] = useState(false);
    const [subject, setSubject] = useState('');
    const [emailFrom, setEmailFrom] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [emailCc, setEmailCc] = useState('');
    const [replyTo, setReplyTo] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [emailBody, setEmailBody] = useState("<p><br></p>");
    const [attachments, setAttachments] = useState('');
    const [status, setStatus] = useState('');
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const primaryMainColor = theme.palette.primary.main;
    const primaryLightColor = theme.palette.primary.light;
    const primaryDarkColor = theme.palette.primary.dark;

    const email = location.state;
    const addEmail = useEmailStore((state) => state.addEmail);
    const updateEmail = useEmailStore((state) => state.updateEmail);

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
        console.log(emailBody)
        setViewMode(email ? true : false);
        if(create){
            addEmail({
                "subject": subject,
                "emailFrom": emailFrom,
                "emailTo": emailTo,
                "emailCc": emailCc,
                "replyTo": replyTo,
                "scheduledDate": scheduledDate,
                "emailBody": emailBody,
                //"attachments": attachments,
                "status": 1,
            });
            setViewMode(true);
        }
        if(save){
            updateEmail({
                "id": email.id,
                "subject": subject,
                "emailFrom": emailFrom,
                "emailTo": emailTo,
                "emailCc": emailCc,
                "replyTo": replyTo,
                "scheduledDate": scheduledDate,
                "emailBody": emailBody,
                "attachments": attachments,
                "status": status,
            });
            setEditMode(false);
            setViewMode(true);
            setSave(false);

            if(subject){
                email.subject = subject;
            }
            if(emailFrom){
                email.emailFrom = emailFrom;
            }
            if(emailTo){
                email.emailTo = emailTo;
            }
            if(emailCc){
                email.emailCc = emailCc;
            }
            if(replyTo){
                email.replyTo = replyTo;
            }
            if(scheduledDate){
                email.scheduledDate = scheduledDate;
            }
            if(emailBody&&emailBody != "<p><br></p>"){
                email.emailBody = emailBody;
            }
            if(attachments){
                email.attachments = attachments;
            }
            if(status){
                email.status = status;
            }
        }
    }, [create, save, editMode, subject, emailFrom, emailTo, emailCc, replyTo, scheduledDate, emailBody, attachments, status]);

    return (
        <>
        <MainLayout>
        <BackButton />
        <CardView borderColor={primaryMainColor}>
            <CardContent>
                <FormControl variant="outlined" style={{ marginBottom: '20px' , display:"grid", justifyContent:"center"}}> 
                <TextFieldCustom label="Subject" placeholder="Enter Subject" setValue={setSubject} viewValue={email&&!editMode?email.subject:null} id="subject" required={true} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Email From" placeholder="Enter Email From" setValue={setEmailFrom} viewValue={email&&!editMode?email.emailFrom:null} id="emailFrom" required={true} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Email To" placeholder="Enter Email To" setValue={setEmailTo} viewValue={email&&!editMode?email.emailTo:null} id="emailTo" required={true} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Email Cc" placeholder="Enter Email Cc" setValue={setEmailCc} viewValue={email&&!editMode?email.emailCc:null} id="emailCc" required={true} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Reply To" placeholder="Enter Reply To" setValue={setReplyTo} viewValue={email&&!editMode?email.replyTo:null} id="replyTo" required={true} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Scheduled Date" placeholder="Enter Scheduled Date" setValue={setScheduledDate} viewValue={email&&!editMode?email.scheduledDate:null} id="scheduledDate" required={true} disabled={viewMode&&!editMode} />
                <HtmlFieldCustom label="Email Body" placeholder="Enter Email Body" setValue={setEmailBody} viewValue={email&&!editMode?email.emailBody:emailBody} id="emailBody" required={true} disabled={viewMode&&!editMode} />
                <TextFieldCustom label="Attachments" placeholder="Enter Attachments" setValue={setAttachments} viewValue={email&&!editMode?email.attachments:null} id="attachments" required={true} disabled={viewMode&&!editMode} />
                    <br/>
                </FormControl>
            </CardContent>
            <CardFooter>
                <SaveButton onClick={handleCreate} lable="Send Email" hide={create||viewMode||editMode} />
                <Button variant="outlined" style={{ marginBottom: '20px' , display:create? '': 'none'}} onClick={()=> navigate('/emails')}>View Emails</Button>
                {/* <EditButton onClick={handleEdit} hide={editMode||!viewMode}/> */}
                <SaveButton onClick={handleSave} lable="Save" hide={!editMode}/>
            </CardFooter>
        </CardView>
        </MainLayout>
        </>
    )
}