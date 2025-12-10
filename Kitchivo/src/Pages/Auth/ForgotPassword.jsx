import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo_Full.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPassword, forgotPasswordToVerifyOtp, resetPassword } from "../../redux/slices/AuthSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRefs = useRef([]);


  const [step, setStep] = useState(1);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userOtp, setUserOtp] = useState(null);


  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // console.log("Send OTP to:", values.email);
      setSubmitting(true);
      setUserEmail(values.email);
      await dispatch(forgotPassword(values.email)).then((res) => {
        if (res?.payload?.status == 1) {
          toast.success((res?.payload?.message || "OTP sent successfully to your email"));
          setStep(2);
          setSubmitting(false)
          resetForm();
        }
      }).then().catch((err) => {
        toast.error("Something went wrong Please try again!");
        console.log("Errror", err);
      }).catch(() => {
        toast.error("Something went wrong Please try again!");
      });
    },
  });


  const otpFormik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().matches(/^[0-9]$/, "Must be a digit"))
        .min(6, "OTP required")
        .max(6, "OTP required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const otpValue = values.otp.join("");
      // console.log("OTP verified:", otpValue);
      setUserOtp(otpValue);
      const obj = {
        email: userEmail,
        otp: otpValue
      }

      setSubmitting(true);
      await dispatch(forgotPasswordToVerifyOtp(obj)).then((res) => {
        if (res?.payload?.status == 1) {
          toast.success((res?.payload?.message || "OTP verified successfully"));
          setStep(3);
          setSubmitting(false)
          resetForm();
        }
      }).then().catch((err) => {
        toast.error("Something went wrong Please try again!");
        console.log("Errror", err);
      }).catch(() => {
        toast.error("Something went wrong Please try again!");
      });

    },
  });

  const otpHandleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpFormik.values.otp];
    newOtp[index] = value;

    otpFormik.setFieldValue("otp", newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  const passwordFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const obj = {
        email:userEmail,
        otp:userOtp,
        new_password : values.newPassword
      }
      await dispatch(resetPassword(obj)).then((res) => {
        if (res?.payload?.status == 1) {
          toast.success((res?.payload?.message || "Password reset successfully"));
          navigate("/login");
          setSubmitting(false)
          resetForm();
        }
      }).then().catch((err) => {
        toast.error("Something went wrong Please try again!");
        console.log("Errror", err);
      }).catch(() => {
        toast.error("Something went wrong Please try again!");
      });
    },
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SECTION — STAYS SAME */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-gradient-to-br from-lima-500 to-lima-700">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop)",
            opacity: 0.3,
          }}
        ></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-10 w-full">
          <div className="max-w-lg w-full text-center">
            <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>

            <h1 className="text-5xl font-bold mb-6">Reset Password</h1>
            <p className="text-xl text-lima-50 leading-relaxed">
              Don’t worry! Enter your email and receive a reset code.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-12 bg-white min-h-screen">
        <div className="max-w-md w-full space-y-8">
          {/* Logo / Title */}
          <div className="text-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-16 mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/150x50/66d210/FFFFFF?text=KITCHIVO";
                }}
              />
            </Link>

            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              {step === 1 && "Forgot Password?"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Create New Password"}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {step === 1 && "Receive verification code in your email"}
              {step === 2 && "Enter 6-digit code sent to your email"}
              {step === 3 && "Set your new password"}
            </p>
          </div>

          {/* --------------------------
              STEP 1 — EMAIL FORM
          --------------------------- */}
          {step === 1 && (
            <form
              onSubmit={emailFormik.handleSubmit}
              className="bg-gray-50 shadow-xl p-10 rounded-2xl space-y-6"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={emailFormik.values.email}
                  onChange={emailFormik.handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-lima-500 focus:border-lima-500"
                />

                {emailFormik.touched.email && emailFormik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailFormik.errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-lima-600 hover:bg-lima-700 text-white py-3 rounded-lg font-medium"
              >
                {emailFormik.isSubmitting ? "Loading..." : "Send Verification Code"}
              </button>
            </form>
          )}

          {/* --------------------------
              STEP 2 — OTP FORM
          --------------------------- */}
          {step === 2 && (
            <form
              onSubmit={otpFormik.handleSubmit}
              className="bg-gray-50 shadow-xl p-10 rounded-2xl space-y-6"
            >
              <label className="block text-center text-sm text-gray-700 mb-4">
                Enter verification code
              </label>

              <div className="flex justify-center gap-3">
                {otpFormik.values.otp.map((digit, index) => (
                  <input
                    key={index}
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    name={`otp[${index}]`}
                    value={digit}
                    onChange={(e) => otpHandleChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:ring-lima-500"
                  />
                ))}
              </div>

              <button
                type="button"
                className="text-lima-600 text-sm"
                onClick={() => setStep(1)}
              >
                Resend Code
              </button>

              <button
                type="submit"
                className="w-full bg-lima-600 hover:bg-lima-700 text-white py-3 rounded-lg font-medium"
              >
                {otpFormik.isSubmitting? "Loading...":"Verify Code"}
              </button>
            </form>
          )}

          {/* --------------------------
              STEP 3 — PASSWORD RESET
          --------------------------- */}
          {step === 3 && (
            <form
              onSubmit={passwordFormik.handleSubmit}
              className="bg-gray-50 shadow-xl p-10 rounded-2xl space-y-6"
            >
              {/* New Password */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordFormik.values.newPassword}
                    onChange={passwordFormik.handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                  />

                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2 cursor-pointer text-gray-500"
                  >
                    👁
                  </span>
                </div>

                {passwordFormik.touched.newPassword &&
                  passwordFormik.errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {passwordFormik.errors.newPassword}
                    </p>
                  )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordFormik.values.confirmPassword}
                    onChange={passwordFormik.handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                  />

                  <span
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-2 cursor-pointer text-gray-500"
                  >
                    👁
                  </span>
                </div>

                {passwordFormik.touched.confirmPassword &&
                  passwordFormik.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {passwordFormik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <button
                type="submit"
                className="w-full bg-lima-600 hover:bg-lima-700 text-white py-3 rounded-lg font-medium"
              >
                Reset Password
              </button>
            </form>
          )}

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-lima-600"
            >
              Remember your password? Sign in
            </Link>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-lima-600 flex justify-center items-center"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
