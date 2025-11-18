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

function App() {
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
      <Route path="/category/:categoryName" element={<CategoryProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
}

export default App;
