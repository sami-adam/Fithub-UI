import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from "./pages/user/SignIn"
import Home from './pages/home/Home';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
