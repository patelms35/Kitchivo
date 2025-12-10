import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from '../../assets/Logo_Full.png';
import { useDispatch } from 'react-redux';
import { resendOtp, verifyOtp } from '../../redux/slices/AuthSlice';
import { toast } from 'react-toastify';

const VerifyOTP = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email';
  const fullName = location.state?.fullName ;
  const password = location.state?.password;
  const phone = location.state?.phone;
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // ---------------------------- FORM VALIDATION ---------------------------- //
  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().matches(/^\d$/, "Only numbers allowed"))
        .min(6, "OTP must be 6 digits")
        .max(6, "OTP must be 6 digits"),
    }),
    onSubmit: (values) => {
      const otpValue = values.otp.join("");
      const obj = {
        email: email,
        otp: otpValue,
        phone:phone,
        password:password,
        name:fullName
      }
      dispatch(verifyOtp(obj)).then((res) => {
        if(res?.payload?.status === 1){
          toast.success("OTP Verified Successfully");
          navigate("/login");
        }
        // navigate("/");
      });

    },
  });

  const otp = formik.values.otp;

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    formik.setFieldValue("otp", newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(paste)) return;

    const arr = paste.split("");
    formik.setFieldValue("otp", arr);

    inputRefs.current[arr.length - 1]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;

    dispatch(resendOtp(email)).then((res) => {
      // navigate("/");
      formik.setFieldValue("otp", ["", "", "", "", "", ""]);
      setTimer(60);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    }).catch((err) => {
      toast.error("Failed to resend OTP. Please try again.");
    });

  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT SIDE IMAGE SECTION (same) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-gradient-to-br from-lima-500 to-lima-700">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop)',
            opacity: 0.3
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 lg:p-10 xl:p-12 w-full">
          <div className="max-w-lg w-full text-center">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Secure Verification</h1>
            <p className="text-lg text-lima-50">
              We've sent a verification code to your email.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM SECTION */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white min-h-screen">
        <div className="max-w-md w-full space-y-8">

          {/* HEADER */}
          <div className="text-center">
            <img src={Logo} className="h-14 mx-auto" alt="logo" />
            <h2 className="mt-6 text-3xl font-bold">Verify OTP</h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter the 6–digit code sent to
            </p>
            <p className="text-lima-600 text-base font-medium">{email}</p>
          </div>

          {/* FORM */}
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">

              {/* OTP BOXES */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter Verification Code
                </label>

                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-lima-500"
                    />
                  ))}
                </div>

                {formik.errors.otp && (
                  <p className="text-red-600 text-xs mt-2 text-center">
                    {formik.errors.otp}
                  </p>
                )}
              </div>

              {/* TIMER / RESEND */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-sm text-gray-600">
                    Resend code in{" "}
                    <span className="font-bold text-lima-600">
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                    </span>
                  </p>
                ) : (
                  <button type="button" onClick={handleResend}
                    className="text-sm font-medium text-lima-600 hover:text-lima-700">
                    Resend Code
                  </button>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full py-3 text-white bg-lima-600 rounded-lg font-medium hover:bg-lima-700 transition transform hover:scale-[1.02]"
              >
                Verify & Continue
              </button>
            </form>

            {/* EXTRA */}
            {/* <p className="text-center text-sm mt-6 text-gray-600">
              Didn’t receive the code?{" "}
              <Link to="/login" className="text-lima-600 font-medium">
                Try another method
              </Link>
            </p> */}
          </div>

          {/* BACK */}
          <div className="text-center">
            <Link to="/register" className="text-sm text-gray-600 hover:text-lima-600">
              ← Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

