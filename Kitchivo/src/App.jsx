import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import VerifyOTP from './Pages/Auth/VerifyOTP';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Wishlist from './Pages/Wishlist/Wishlist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
}

export default App;
