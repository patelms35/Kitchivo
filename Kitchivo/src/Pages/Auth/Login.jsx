import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo_Full.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
   const { loginAction, error } = useAuth();


  const savedEmail = localStorage.getItem("email") || "";
  const savedPassword = localStorage.getItem("password") || "";
  const savedRememberMe = localStorage.getItem("rememberMe") || false;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });



  const formik = useFormik({
    initialValues: {
      email: savedRememberMe ? savedEmail : "",
      password: savedRememberMe ? savedPassword : "",
      rememberMe: savedRememberMe,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      console.log("Login form submitted:", values);
      if (values.rememberMe) {
        localStorage.setItem("email", values.email);
        localStorage.setItem("password", values.password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }
      try {
        await loginAction(values);
        setSubmitting(false)
        resetForm();
      } catch (e) {
        toast.error(e)
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ------------- LEFT SIDE -------------- */}
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
              Welcome Back to Kitchivo
            </h1>
            <p className="text-base lg:text-lg xl:text-xl mb-6 lg:mb-8 text-lima-50 leading-relaxed">
              Your one-stop destination for premium kitchen essentials and home
              products.
            </p>

            {/* Features */}
            <div className="space-y-3 lg:space-y-4">
              {["Quality Products", "Fast Delivery", "Secure Shopping"].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-3 lg:gap-4">
                    <div className="bg-white/20 p-2 lg:p-2.5 rounded-lg backdrop-blur-sm">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-base lg:text-lg font-medium">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ------------ RIGHT SIDE (FORM) ------------- */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-white">
        <div className="max-w-md w-full space-y-6 md:space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-block">
              <img
                src={Logo}
                alt="Kitchivo Logo"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/150x50/66d210/FFFFFF?text=KITCHIVO";
                }}
              />
            </Link>
            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* ---------------- FORM ---------------- */}
          <div className="bg-white lg:bg-gray-50 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-5 sm:p-6 md:p-8 lg:p-10">
            <form
              className="space-y-4 sm:space-y-5 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full pl-3 sm:pl-5 pr-3 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-lima-500"
                    placeholder="you@example.com"
                  />
                </div>

                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full pl-3 sm:pl-5 pr-9 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-lima-500"
                    placeholder="Enter your password"
                  />

                  {/* Show/Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    👁
                  </button>
                </div>

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    className="h-4 w-4 text-lima-600 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="font-medium text-lima-600 hover:text-lima-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 md:py-3.5 rounded-lg text-white bg-lima-600 hover:bg-lima-700 shadow-sm font-medium text-sm sm:text-base"
              >
                {formik.isSubmitting ? "Loading..." : "Sign In"}
              </button>
            </form>

            {/* Sign Up */}
            <div className="mt-5 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-lima-600 hover:text-lima-700"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          {/* Back Home */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-xs sm:text-sm text-gray-600 hover:text-lima-600"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
