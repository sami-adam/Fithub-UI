import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import MainLayout from "../../layout/MainLayout";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";


export default function CreateMemebership() {
  const [age, setAge] = React.useState("");
  const [members, setMembers] = useState([]);
  const token = localStorage.getItem("token");
  const [member, setMember] = React.useState("");
  const [subscription, setSubscription] = React.useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [startDate, setStartDate] = React.useState(dayjs(new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate()));
  const [endDate, setEndDate] = React.useState(dayjs(new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate()));
  const [subscriptionUnitPrice, setSubscriptionUnitPrice] = React.useState(0);
  const [subscriptionQty, setSubscriptionQty] = React.useState(0);
  const [created, setCreated] = React.useState(false);
  const [slectedStartDate, setSlectedStartDate] = React.useState('');
  const [slectedEndDate, setSlectedEndDate] = React.useState('');

  const navigate = useNavigate();

  const handleCreate = () => {
    setSlectedStartDate(startDate.format('YYYY-MM-DD'));
    setSlectedEndDate(endDate.format('YYYY-MM-DD'));
    console.log(member, subscription, slectedStartDate, slectedEndDate, subscriptionUnitPrice, subscriptionQty);
    setCreated(true);
    };

  React.useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("http://localhost:8080/api/v1/members", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
            .then((response) => response.json())
            .then((data) => setMembers(data));
        } catch (error) {
            localStorage.removeItem("token");
            console.error("Error:", error);
            window.location.href = "/signin";
            }
        }
    async function fetchSubscriptions() {
        try {
            const response = await fetch("http://localhost:8080/api/v1/subscriptions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => setSubscriptions(data));
        } catch (error) {
            localStorage.removeItem("token");
            console.error("Error:", error);
            window.location.href = "/signin";
        }

    }
    fetchMembers();
    fetchSubscriptions();
  }, []);

  console.log(members);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <React.Fragment>
      <MainLayout/>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%", paddingTop:'100px'}}>
        <Box sx={{ padding: 5 }}>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={2} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                }}
              >
                Member
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
                <FormControl fullWidth size="small">
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    >
                    {members.map((item) => (
                        <MenuItem value={item.id}>{item.firstName + ' ' + item.lastName}</MenuItem>
                    ))}
                    </Select>
              </FormControl>
            </Grid>



            <Grid item xs={12} sm={2} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                }}
              >
                Subscription
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
                <FormControl fullWidth size="small">
                    <Select
                    labelId="subscription-label"
                    id="subscription-label"
                    value={subscription}
                    onChange={(e) => setSubscription(e.target.value)}
                    >
                    {subscriptions.map((item) => (
                        <MenuItem value={item.id}>{item.name + ' (' + item.price + ')'}</MenuItem>
                    ))}
                    </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12} sm={2} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                }}
              >
                Start Date
              </InputLabel>
            </Grid>

            <Grid item xs={12} sm={10}>
                <FormControl fullWidth size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={startDate}
                        onChange={(date) => setStartDate(date)}/>
                </LocalizationProvider>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={2} sx={{ alignContent: "center" }}>
                <InputLabel
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        fontWeight: 700,
                    }}
                >
                    End Date
                </InputLabel>
            </Grid>

            <Grid item xs={12} sm={10}>
                <FormControl fullWidth size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={endDate}
                        onChange={(date) => setEndDate(date)}/>
                </LocalizationProvider>
                </FormControl>
            </Grid>



            <Grid item xs={12} sm={2} sx={{ alignContent: "center" }}>
                <InputLabel
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        fontWeight: 700,
                    }}
                >
                     Price
                </InputLabel>
            </Grid>

            <Grid item xs={12} sm={10}>
                <FormControl fullWidth size="small">
                <TextField value={subscriptionUnitPrice} inputProps={{ type: 'number'}} onChange={(newPrice)=> setSubscriptionUnitPrice(newPrice.target.value)}/>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={2} sx={{ alignContent: "center" }}>
                <InputLabel
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        fontWeight: 700,
                    }}
                >
                     QTY
                </InputLabel>
            </Grid>

            <Grid item xs={12} sm={10}>
                <FormControl fullWidth size="small">
                <TextField value={subscriptionQty} inputProps={{ type: 'number'}} onChange={(newPrice)=> setSubscriptionQty(newPrice.target.value)}/>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={10} style={{display:'flex', justifyContent:'center'}}>
            <FormControl  size="small">
                <p style={{color:'teal', display:created? '': 'none'}}>Successfully created</p>
                <Button variant="contained" style={{ marginBottom: '20px' , display:created? 'none': ''}} onClick={handleCreate}>Create Membership</Button>
                <Button variant="outlined" style={{ marginBottom: '20px' , display:created? '': 'none'}} onClick={()=> navigate('/memberships')}>View Memberships</Button>
            </FormControl>
            </Grid>
        </Grid>

            
        </Box>
      </Paper>
    </React.Fragment>
  );
}
