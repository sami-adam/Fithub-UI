import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from "./pages/user/SignIn"
import Home from './pages/home/Home';
import Email from './pages/admin/Email';
import Member from './pages/member/Member';
import MemberFormView from './pages/member/MemberFormView';
import EmailDetails from './components/EmailDetails';
import { blue, blueGrey, green, teal } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Subscription from './pages/subscription/Subscription';
import SubscriptionDetails from './components/SubscriptionDetails';
import CreateSubscription from './pages/subscription/CreateSubscription';
import SubscriptionFormView from './pages/subscription/SubscriptionFormView';

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
        <Route path="/subscriptions" element={<Subscription/>} />
        <Route path='/subscription-form-view' element={<SubscriptionFormView />} />
        <Route path="/subscriptionDetails/:id" element={<SubscriptionDetails/>} />
        <Route path="/members" element={<Member />} />
        <Route path='/member-form-view' element={<MemberFormView />} />
        <Route path="/create-subscription" element={<CreateSubscription />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
