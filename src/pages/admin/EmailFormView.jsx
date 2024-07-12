import { Button, CardContent, FormControl, IconButton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useEmailStore from "../../state/emailState";
import MainLayout from "../../layout/MainLayout";
import BackButton, { EditButton, SaveButton } from "../../components/Buttons";
import CardView, { CardFooter } from "../../components/CardView";
import TextFieldCustom, { AttachmentFieldCustom, HtmlFieldCustom } from "../../components/Fields";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';

const fileTypeIcons = {
    'application/pdf': <PictureAsPdfIcon/>,            // PDF
    'text/plain': <TextSnippetIcon/>,                 // Text
    'text/x-python-script': <TerminalIcon/>,
    'application/msword': 'fa-file-word',        // Word
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'fa-file-word', // DOCX
    'application/vnd.ms-excel': 'fa-file-excel', // Excel
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'fa-file-excel', // XLSX
    'image/jpeg': <ImageIcon/>,                // JPEG
    'image/png': <ImageIcon/>,                 // PNG
    'audio/mpeg': 'fa-file-audio',                // MP3
    'video/mp4': 'fa-file-video',                 // MP4
    // Add more types and corresponding icons as needed
  };

  const FileIcon = ({ mimeType, color }) => {
    console.log(mimeType)
    const icon = fileTypeIcons[mimeType] || <ArticleIcon/>; // Default icon if type is not mapped
  
    return (
      <IconButton style={{ fontSize: '24px', marginRight: '8px', color:color }}>{icon}</IconButton>
    );
  };
  

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
    const [attachments, setAttachments] = useState(null);
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
        console.log(attachments, typeof(attachments))
        const sendMail = async()=>{
            if(create){
            const fileData = await readFileAsByteArray(attachments);
            console.log(fileData)
            const attachmentDTO = {
                id: null, // Assuming id is auto-generated on the server
                name: attachments.name,
                attachmentType: 0, // Replace with the actual attachment type
                type: attachments.type,
                data: fileData,
            };

            addEmail({
                "subject": subject,
                "emailFrom": emailFrom,
                "emailTo": emailTo,
                "emailCc": emailCc,
                "replyTo": replyTo,
                "scheduledDate": scheduledDate,
                "emailBody": emailBody,
                "attachments": [attachmentDTO],
                "status": 1,
            });
            setViewMode(true);
        }}
        sendMail();
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

    const readFileAsByteArray = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const arrayBuffer = reader.result;
            const byteArray = new Uint8Array(arrayBuffer);
            resolve(Array.from(byteArray));
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      };

      const handleDownload = (data, name, type) => {
        const link = document.createElement('a');
        link.href = `data:${type};base64,${data}`;
        link.download = name;
        link.click();
      };
    
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
                <AttachmentFieldCustom label="Attachments" placeholder="Enter Attachments" setValue={setAttachments} viewValue={email&&!editMode?email.attachments&&"":null} id="attachments" required={true} disabled={viewMode} />
                <ul>
                    {email&&email.attachments&&email.attachments.map((attachment, index) => (
                    <a href="" onClick={() => handleDownload(attachment.data, attachment.name, attachment.type)} key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <FileIcon mimeType={attachment.type} color={primaryMainColor}/>
                        <span style={{ flex: 1 }}>{attachment.name}</span>
                    </a>
                    ))}
                </ul>
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