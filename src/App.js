import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from "./pages/user/SignIn"
import Home from './pages/home/Home';
import MainLayout from './layout/MainLayout';
import Membership from './pages/membership/Membership';
import EmailList from './components/EmailList';
import Email from './pages/admin/Email';
import Member from './pages/membership/Member';
import MemberFormView from './pages/membership/MemberFormView';
import CreateMemebership from './pages/membership/CreateMembership';
import EmailDetails from './components/EmailDetails';
import MembershipDetails from './components/MembershipDetails';
import { blue, blueGrey, green, teal } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
      light: "aliceblue",
      dark: blue[800],
    },
    secondary: {
      main: blue[500],
      light: blue[200],
      dark: blue[800],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/emails" element={<Email />} />
        <Route path="/emailDetails/:id" element={<EmailDetails />} />
        <Route path="/memberships" element={<Membership />} />
        <Route path="/membershipDetails/:id" element={<MembershipDetails />} />
        <Route path="/members" element={<Member />} />
        <Route path='/member-form-view' element={<MemberFormView />} />
        <Route path="/createMembership" element={<CreateMemebership />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
