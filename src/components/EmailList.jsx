import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ReactHtmlParser from 'html-react-parser';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';



export default function EmailList({email}) {
 
  return (
    <>
    <ListItem alignItems="flex-start" style={{boxShadow: "2px 2px 2px 2px #fbfbfb"}}>
        <ListItemAvatar>
          <Avatar alt={email.status} style={{color: email.status[0] == "F"? "red": "teal", fontWeight: "bold"}}>{email.status[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={email.subject}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {email.emailTo}
              </Typography>
              <br/>
              {ReactHtmlParser(email.emailBody)}
            </React.Fragment>
          }
        />
        <Button> <DeleteOutlinedIcon style={{color: "darkgoldenrod"}}/> </Button>
      </ListItem>
      </>
  );
}