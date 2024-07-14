import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from "./pages/user/SignIn"
import Home from './pages/home/Home';
import Email from './pages/admin/Email';
import Member from './pages/member/Member';
import MemberFormView from './pages/member/MemberFormView';
import { blue, blueGrey, green, teal } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Subscription from './pages/subscription/Subscription';
import SubscriptionFormView from './pages/subscription/SubscriptionFormView';
import EmailFormView from './pages/admin/EmailFormView';
import Product from './pages/product/Product';
import ProductFormView from './pages/product/ProductFormView';
import ProductCategory from './pages/product/ProductCategory';
import ProductCategoryFormView from './pages/product/ProductCategoryFormView';

const theme = createTheme({
  palette: {
    primary: {
      main: "#405D72",
      light: "rgb(250 251 255)",
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
        <Route path="/email-form-view" element={<EmailFormView />} />
        <Route path="/subscriptions" element={<Subscription/>} />
        <Route path='/subscription-form-view' element={<SubscriptionFormView />} />
        <Route path="/members" element={<Member />} />
        <Route path='/member-form-view' element={<MemberFormView />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product-form-view" element={<ProductFormView />} />
        <Route path="/product-categories" element={<ProductCategory />} />
        <Route path="/product-category-form-view" element={<ProductCategoryFormView />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
