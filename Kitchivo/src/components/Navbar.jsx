import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../assets/Logo_Full.png";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { searchProducts, clearSearchResults } from "../redux/slices/CommanSlice";

const Navbar = () => {

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authStore);
  const { dashboard, searchResults, searchLoading , systemSettings } = useSelector((state) => state.commanStore);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);
  const [collectionsDropdown, setCollectionsDropdown] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [blogDropdown, setBlogDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const searchBoxRef = useRef(null);

  const { logOut, user: authUser } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const displayName = (user && user.name) || (authUser && authUser.name) || "";

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";
    return (first + last).toUpperCase();
  };

  const initials = getInitials(displayName);

  const handleUserMenuBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setUserMenuOpen(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const trimmed = searchTerm.trim();

    if (!trimmed) {
      dispatch(clearSearchResults());
      setShowSearchDropdown(false);
      return;
    }

    setShowSearchDropdown(true);

    const handler = setTimeout(() => {
      dispatch(searchProducts(trimmed));
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, dispatch]);

  // Click outside to hide search dropdown
  useEffect(() => {
    if (!searchOpen) return;

    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ignore tiny scrolls
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
        return;
      }

      // If scrolling down and we've passed 100px, hide navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        // Scrolling up — show navbar
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If mobile menu or search is open, keep navbar visible
  const isNavVisible = showNavbar || mobileMenuOpen || searchOpen;
  const navigate = useNavigate();
  const location = useLocation();

  const searchResultsData = searchResults?.data || [];

  const handleWishlistClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Login required",
        text: "Please login first to view your wishlist.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#66d210",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    navigate("/wishlist");
  };

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      setMobileMenuOpen(false);
      navigate("/");
      return;
    }
    scrollToSection("home");
  };

  // Get unique categories from allProducts
  const categories = dashboard?.categories?.filter((cat) => cat.status) || [];

  return (
    <nav
      className={`sticky top-0 z-50 bg-white shadow-sm transform transition-transform duration-300 ${isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseLeave={() => setUserMenuOpen(false)}
    >
      {/* Top Bar - Hidden on mobile, visible on sm and up */}
      <div className="hidden md:block bg-gray-100 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-xs sm:text-sm">
            {/* Left - Contact Info */}
            <div className="flex items-center gap-3 sm:gap-6 text-gray-600">
              <a
                href="tel:+390235568493"
                className="flex items-center gap-1 sm:gap-2 hover:text-lima-600"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{systemSettings?.phone || "-"}</span>
              </a>
              <a
                href={`mailto:${systemSettings?.email || "-"}`}
                className="flex items-center gap-1 sm:gap-2 hover:text-lima-600"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{systemSettings?.email || "-"}</span>
              </a>
            </div>

            {/* Right - Language, Currency, Social */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <a href={systemSettings?.facebook_link || "#"} className="text-gray-600 hover:text-lima-600">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href={systemSettings?.instagram_link || "#"} className="text-gray-600 hover:text-lima-600">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href={systemSettings?.youtube_link || "#"} className="text-gray-600 hover:text-lima-600">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href={systemSettings?.twitter_link || "#"} className="text-gray-600 hover:text-lima-600">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L8.08 13.768l-2.907-.907c-.632-.196-.643-.632.132-.936l11.37-4.38c.526-.196.985.126.816.936z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/duyya1ffr/image/upload/v1764696771/Logo_Full_enjwvd.png"
                  alt="Kitchivo Logo"
                  className="h-6 sm:h-10 w-auto cursor-pointer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150x50/66d210/FFFFFF?text=KITCHIVO";
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={handleHomeClick}
                className="text-gray-800 hover:text-lima-600 transition-colors duration-300 font-medium"
              >
                Home
              </button>

              {/* <Link
                to="/new-products"
                className="text-gray-800 hover:text-lima-600 transition-colors duration-300 font-medium"
              >
                New Products
              </Link> */}

              <Link
                to="/products"
                className="text-gray-800 hover:text-lima-600 transition-colors duration-300 font-medium"
              >
                All Products
              </Link>

              <div className="relative">
                <button
                  onClick={() =>
                    setCollectionsDropdownOpen(!collectionsDropdownOpen)
                  }
                  onMouseEnter={() => setCollectionsDropdownOpen(true)}
                  onMouseLeave={() => setCollectionsDropdownOpen(false)}
                  className="text-gray-800 hover:text-lima-600 transition-colors duration-300 font-medium flex items-center gap-1"
                >
                  Collections
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${collectionsDropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Full Width Dropdown Menu */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-screen max-w-[1400px] transition-all duration-300 z-50 ${collectionsDropdownOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    }`}
                  onMouseEnter={() => setCollectionsDropdownOpen(true)}
                  onMouseLeave={() => setCollectionsDropdownOpen(false)}
                >
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-200 mx-6 lg:mx-8">
                    <div className="p-6 lg:p-8">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/category/${category.id}`}
                              className="group/item"
                              onClick={() => setCollectionsDropdownOpen(false)}
                            >
                              <div className="p-3 lg:p-4 rounded-lg hover:bg-lima-50 transition-all duration-300 text-center">
                                <h3 className="font-bold text-gray-900 mb-1 group-hover/item:text-lima-700">
                                  {category.name}
                                </h3>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="col-span-full text-center text-sm text-gray-500 py-4">
                            No categories available.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Icons */}
            {token ? (
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                {/* User menu with hover/focus dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setUserMenuOpen(true)}
                  // onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-2 text-gray-800 hover:text-lima-600 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                  >
                    {initials ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-lima-600 text-white text-xs font-semibold uppercase">
                        {initials}
                      </span>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                    <span className="hidden lg:inline text-sm">
                      {displayName ? `Hi, ${displayName}` : "Account"}
                    </span>
                    <span className="lg:hidden text-xs">
                      {displayName ? "Account" : "Sign in"}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-sm"
                      role="menu"
                      onMouseEnter={() => setUserMenuOpen(true)}
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/profile");
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        My Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/profile-edit");
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Edit Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/change-password");
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Change Password
                      </button>
                      <button
                        type="button"
                        onClick={logOut}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleWishlistClick}
                  className="relative text-gray-800 hover:text-lima-600 active:text-lima-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-lima-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {user && user?.wishlist_items ? user?.wishlist_items : 0}
                  </span>
                </button>

                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-gray-800 hover:text-lima-600 active:text-lima-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-gray-800 hover:text-lima-600 active:text-lima-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {mobileMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            ) :
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-800 hover:text-lima-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="hidden lg:inline text-sm">
                    Sign in / Register
                  </span>
                  <span className="lg:hidden text-xs">Sign in</span>
                </Link>

                <button
                  type="button"
                  onClick={handleWishlistClick}
                  className="relative text-gray-800 hover:text-lima-600 active:text-lima-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-lima-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    0
                  </span>
                </button>

                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-gray-800 hover:text-lima-600 active:text-lima-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-gray-800 hover:text-lima-600 active:text-lima-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {mobileMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            }
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b ${mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <button
            onClick={handleHomeClick}
            className="block w-full text-left px-3 py-2.5 text-gray-800 hover:text-lima-600 active:text-lima-700 hover:bg-gray-50 active:bg-gray-100 rounded-md font-medium text-sm sm:text-base"
          >
            Home
          </button>

          <Link
            to="/new-products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-gray-800 hover:text-lima-600 active:text-lima-700 hover:bg-gray-50 active:bg-gray-100 rounded-md font-medium text-sm sm:text-base"
          >
            New Products
          </Link>

          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-gray-800 hover:text-lima-600 active:text-lima-700 hover:bg-gray-50 active:bg-gray-100 rounded-md font-medium text-sm sm:text-base"
          >
            All Products
          </Link>

          {/* Collections Dropdown */}
          <div>
            <button
              onClick={() => setCollectionsDropdown(!collectionsDropdown)}
              className="flex items-center justify-between w-full px-3 py-2.5 text-gray-800 hover:text-lima-600 active:text-lima-700 hover:bg-gray-50 active:bg-gray-100 rounded-md font-medium text-sm sm:text-base"
            >
              Collections
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${collectionsDropdown ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown Items */}
            <div
              className={`overflow-hidden transition-all duration-300 ${collectionsDropdown
                ? "max-h-100 opacity-100"
                : "max-h-0 opacity-0"
                }`}
            >
              <div className="pl-6 pr-3 py-2 space-y-1">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-lima-600 hover:bg-lima-50 rounded-md"
                      onClick={() => {
                        setCollectionsDropdown(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No categories available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Popup Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
          <div className="flex items-start justify-center min-h-screen pt-8 sm:pt-16 md:pt-20 p-4">
            <div className="bg-white w-full max-w-[1400px] rounded-xl sm:rounded-2xl shadow-2xl transform transition-all duration-300">
              {/* Search Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                  Search Products
                </h3>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                    setShowSearchDropdown(false);
                    dispatch(clearSearchResults());
                  }}
                  className="text-gray-400 hover:text-gray-600 active:text-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Input + Results */}
              <div className="px-4 sm:px-6 py-4 sm:py-6">
                <div className="relative" ref={searchBoxRef}>
                  <input
                    type="text"
                    placeholder="Search for products..."
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                      if (searchTerm.trim()) {
                        setShowSearchDropdown(true);
                      }
                    }}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-10 sm:pr-12 text-sm sm:text-base md:text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-lima-500 transition-colors"
                  />
                  <button className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lima-600 transition-colors">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>

                  {/* Search Results Dropdown */}
                  {showSearchDropdown && searchTerm.trim() && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto z-20">
                      {searchLoading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                      ) : searchResultsData.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                          {searchResultsData.map((product) => (
                            <li
                              key={product.id}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchTerm("");
                                setShowSearchDropdown(false);
                                dispatch(clearSearchResults());
                                navigate(`/product/${product.id}`);
                              }}
                            >
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                                {product.featured_image ? (
                                  <img
                                    src={product.featured_image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                    No Image
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {product.name}
                                </p>
                                {product.category?.name && (
                                  <p className="text-xs text-gray-500 truncate">
                                    {product.category.name}
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">No products found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Popular Searches */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                  Popular Searches:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-lima-100 active:bg-lima-200 text-gray-700 hover:text-lima-700 rounded-full text-xs sm:text-sm transition-colors">
                    Kitchen Tools
                  </button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-lima-100 active:bg-lima-200 text-gray-700 hover:text-lima-700 rounded-full text-xs sm:text-sm transition-colors">
                    Cookware
                  </button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-lima-100 active:bg-lima-200 text-gray-700 hover:text-lima-700 rounded-full text-xs sm:text-sm transition-colors">
                    Storage
                  </button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-lima-100 active:bg-lima-200 text-gray-700 hover:text-lima-700 rounded-full text-xs sm:text-sm transition-colors">
                    Home Decor
                  </button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-lima-100 active:bg-lima-200 text-gray-700 hover:text-lima-700 rounded-full text-xs sm:text-sm transition-colors">
                    Dining Sets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
