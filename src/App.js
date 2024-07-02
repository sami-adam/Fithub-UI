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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<MainLayout />} />
        <Route path="/emails" element={<Email />} />
        <Route path="/memberships" element={<Membership />} />
        <Route path="/members" element={<Member />} />
        <Route path='/createMember' element={<CreateMember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
