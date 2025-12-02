import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo_Full.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.authStore);
  const navigate = useNavigate();

  const name = user?.name || "-";
  const email = user?.email || "-";
  const phone = user?.phone || "-";

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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-center px-2">{name}</h2>
            <p className="text-green-100 text-xs sm:text-sm md:text-base text-center px-2 break-all">{email}</p>
          </div>

          {/* Right Side - Content Section */}
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">
                Profile Details
              </h1>
              <p className="text-sm md:text-base text-gray-500">Manage your account information</p>
            </div>

            {loading && !user ? (
              <div className="flex items-center justify-center py-8 md:py-12">
                <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-2 md:gap-3 mb-2">
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
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Full Name
                    </p>
                  </div>
                  <p className="text-base md:text-lg font-semibold text-gray-800 ml-0 md:ml-13 break-words">
                    {name}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-2 md:gap-3 mb-2">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Email Address
                    </p>
                  </div>
                  <p className="text-base md:text-lg font-semibold text-gray-800 ml-0 md:ml-13 break-all">
                    {email}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-2 md:gap-3 mb-2">
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
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Phone Number
                    </p>
                  </div>
                  <p className="text-base md:text-lg font-semibold text-gray-800 ml-0 md:ml-13 break-words">
                    {phone}
                  </p>
                </div>

                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/profile-edit")}
                    className="flex-1 px-4 md:px-5 py-2.5 md:py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md text-sm md:text-base"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/change-password")}
                    className="flex-1 px-4 md:px-5 py-2.5 md:py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-md text-sm md:text-base"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Profile;
