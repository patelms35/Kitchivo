import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import VerifyOTP from './Pages/Auth/VerifyOTP';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Wishlist from './Pages/Wishlist/Wishlist';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Products from './Pages/Products/Products';
import NewProducts from './Pages/NewProducts/NewProducts';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService/TermsOfService';
import ProfileEdit from './Pages/ProfileEdit/ProfileEdit';
import Profile from './Pages/Profile/Profile';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import { useDispatch } from 'react-redux';
import { getProfile } from './redux/slices/AuthSlice';
import { useEffect } from 'react';
import { getDashboard, getSystemSettings } from './redux/slices/CommanSlice';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getSystemSettings());
    if (token) {
      dispatch(getProfile());
    }
  }, [token]);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/new-products" element={<NewProducts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/category/:category_id" element={<CategoryProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/profile-edit" element={<ProfileEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
