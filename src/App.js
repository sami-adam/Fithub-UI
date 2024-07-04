import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from "./pages/user/SignIn"
import Home from './pages/home/Home';
import MainLayout from './layout/MainLayout';
import Membership from './pages/membership/Membership';
import EmailList from './components/EmailList';
import Email from './pages/admin/Email';
import Member from './pages/membership/Member';
import CreateMember from './pages/membership/CreateMember';
import CreateMemebership from './pages/membership/CreateMembership';
import EmailDetails from './components/EmailDetails';
import MembershipDetails from './components/MembershipDetails';

function App() {
  return (
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
        <Route path='/createMember' element={<CreateMember />} />
        <Route path="/createMembership" element={<CreateMemebership />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
