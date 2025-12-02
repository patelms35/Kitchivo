import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfileThunk } from "../../redux/slices/CommanSlice";
import { toast } from "react-toastify";
import Logo from "../../assets/Logo_Full.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authStore);
  const { updateProfileLoading, profile } = useSelector(
    (state) => state.commanStore
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      if (profile.name) {
        setName(profile.name);
      }
      if (profile.phone) {
        setPhone(profile.phone);
      }
    }
  }, [profile]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("phone", phone.trim());

    try {
      const resultAction = await dispatch(updateUserProfileThunk(formData));
      if (updateUserProfileThunk.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload?.message || "Profile updated successfully");
        navigate("/");
      } else {
        const errorMessage =
          resultAction.payload?.message ||
          resultAction.payload?.detail ||
          "Failed to update profile";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8 md:py-12 lg:py-16">
      <div className="w-full max-w-6xl bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden my-4 md:my-6 lg:my-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Left Side - Image Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-green-500 to-green-700 p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center text-white min-h-[300px] md:min-h-[400px] lg:min-h-[600px]">
            <div className="mb-6 md:mb-8">
              <img
                src={Logo}
                alt="Kitchivo Logo"
                className="h-7 sm:h-8 md:h-10 w-auto brightness-0 invert"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 md:mb-6 border-4 border-white/30">
              <svg
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-center px-2">Edit Profile</h2>
            <p className="text-green-100 text-xs sm:text-sm md:text-base text-center px-4">
              Update your personal information
            </p>
            <div className="mt-6 md:mt-8 w-full px-4">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="w-full px-4 md:px-5 py-2 md:py-2.5 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 shadow-md text-sm md:text-base"
              >
                Back to Profile
              </button>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">
                Update Information
              </h1>
              <p className="text-sm md:text-base text-gray-500">Make changes to your account details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <label
                    htmlFor="name"
                    className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base transition-all duration-200"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-xs md:text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <label
                    htmlFor="phone"
                    className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Phone Number
                  </label>
                </div>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base transition-all duration-200"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-2 text-xs md:text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="pt-2 md:pt-4">
                <button
                  type="submit"
                  disabled={updateProfileLoading}
                  className="w-full flex justify-center items-center gap-2 px-4 md:px-6 py-3 md:py-4 border border-transparent text-sm md:text-base font-semibold rounded-lg md:rounded-xl shadow-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {updateProfileLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProfileEdit;
