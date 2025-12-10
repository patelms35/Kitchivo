import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo_Full.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import AuthServices from "../../services/AuthServices";
import { NumberInputKeyDown } from '../../helpers/numberInput';

const phnRegex = /^[0-9]{10}$/;
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Password toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Yup Schema
  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Full name is required"),
    email: Yup.string().trim().email("Invalid email").required("Email is required"),
    phone: Yup.string().trim().matches(phnRegex, "Please enter a valid Phone Number").required('Phone Number is required'),
    password: Yup.string().trim()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().trim()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms & privacy policy"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const res = await AuthServices.registerSendOtp(values)
      if (res && res?.status == 1) {
        navigate("/verify-otp", { state: { email: values.email, fullName: values.fullName, password: values.password, phone: values.phone } });
        setSubmitting(false);
        resetForm();
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Image Side */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-gradient-to-br from-lima-500 to-lima-700">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop)",
            opacity: 0.3,
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 lg:p-10 xl:p-12 w-full">
          <div className="max-w-lg w-full">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
              Join Kitchivo Today
            </h1>
            <p className="text-base lg:text-lg xl:text-xl mb-6 lg:mb-8 text-lima-50 leading-relaxed">
              Create an account and explore our amazing collection of kitchen
              essentials.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-white">
        <div className="max-w-md w-full space-y-6 md:space-y-8 my-6 md:my-0">
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-block">
              <img
                src={Logo}
                alt="Kitchivo Logo"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto mx-auto"
              />
            </Link>

            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Create Account
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Join us and start your shopping journey
            </p>
          </div>

          {/* Form */}
          <div className="bg-white lg:bg-gray-50 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-5 sm:p-6 md:p-8 lg:p-10">
            <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />
                {formik.errors.fullName && formik.touched.fullName && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="XXXXXXXXXX"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onKeyDown={NumberInputKeyDown}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min. 8 characters"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    👁
                  </button>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    👁
                  </button>
                </div>
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              {/* Terms */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  className="h-4 w-4"
                  checked={formik.values.agreeToTerms}
                  onChange={formik.handleChange}
                />
                <label className="ml-2 text-xs sm:text-sm text-gray-700">
                  I agree to the{" "}
                  <a className="text-lima-600 font-medium">Terms</a> &
                  <a className="text-lima-600 font-medium"> Privacy Policy</a>
                </label>
              </div>
              {formik.errors.agreeToTerms && formik.touched.agreeToTerms && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.agreeToTerms}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-lima-600 text-white rounded-lg hover:bg-lima-700 transition"
              >
                {formik.isSubmitting ? "Loading..." : "Create Account"}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="mt-5 text-center text-xs sm:text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-lima-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-xs text-gray-600 hover:text-lima-600"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
