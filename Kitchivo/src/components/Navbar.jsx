import React, { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);
  const [collectionsDropdown, setCollectionsDropdown] = useState(false);
  const [blogDropdown, setBlogDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            {/* Left - Contact Info */}
            <div className="flex items-center gap-6 text-gray-600">
              <a href="tel:+390235568493" className="flex items-center gap-2 hover:text-lima-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+39 (0)35 2568 4593</span>
              </a>
              <a href="mailto:demo@demo.com" className="flex items-center gap-2 hover:text-lima-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>demo@demo.com</span>
              </a>
            </div>

            
            {/* Right - Language, Currency, Social */}
            <div className="flex items-center gap-4">
            
              <div className="flex items-center gap-3">
                <a href="#" className="text-gray-600 hover:text-lima-600"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                <a href="#" className="text-gray-600 hover:text-lima-600"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                <a href="#" className="text-gray-600 hover:text-lima-600"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                <a href="#" className="text-gray-600 hover:text-lima-600"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L8.08 13.768l-2.907-.907c-.632-.196-.643-.632.132-.936l11.37-4.38c.526-.196.985.126.816.936z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/Logo.png"
                alt="Kitchivo Logo"
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150x50/66d210/FFFFFF?text=KITCHIVO';
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-800 hover:text-lima-600 transition-colors duration-300 font-medium">
                Home
              </button>

              <div className="relative group">
                <button className="text-gray-800 hover:text-lima-600 transition-colors duration-300 font-medium flex items-center gap-1">
                  Shop
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <div className="relative group">
                <button className="text-gray-800 hover:text-lima-600 transition-colors duration-300 font-medium flex items-center gap-1">
                  Collections
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <a href="#contact" className="text-gray-800 hover:text-lima-600 transition-colors duration-300 font-medium">
                Contact
              </a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="hidden lg:flex items-center gap-2 text-gray-800 hover:text-lima-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Sign in / Register</span>
              </button>

              <button className="relative text-gray-800 hover:text-lima-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-lima-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </button>

              <button className="relative text-gray-800 hover:text-lima-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-lima-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </button>

              <button 
                onClick={() => setSearchOpen(true)}
                className="text-gray-800 hover:text-lima-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-800 hover:text-lima-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-2 text-gray-800 hover:text-lima-600 hover:bg-gray-50 rounded-md font-medium">Home</button>
          <button onClick={() => scrollToSection('products')} className="block w-full text-left px-3 py-2 text-gray-800 hover:text-lima-600 hover:bg-gray-50 rounded-md font-medium">Shop</button>
          <a href="#collections" className="block px-3 py-2 text-gray-800 hover:text-lima-600 hover:bg-gray-50 rounded-md font-medium">Collections</a>
          <a href="#contact" className="block px-3 py-2 text-gray-800 hover:text-lima-600 hover:bg-gray-50 rounded-md font-medium">Contact</a>
        </div>
      </div>

      {/* Search Popup Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300">
          <div className="flex items-start justify-center min-h-screen pt-20">
            <div className="bg-white w-full max-w-[1400px] mx-4 rounded-2xl shadow-2xl transform transition-all duration-300">
              {/* Search Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800">Search Products</h3>
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search Input */}
              <div className="px-6 py-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    autoFocus
                    className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-lima-500 transition-colors"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lima-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="px-6 pb-6">
                <p className="text-sm text-gray-500 mb-3">Popular Searches:</p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-lima-100 text-gray-700 hover:text-lima-700 rounded-full text-sm transition-colors">Kitchen Tools</button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-lima-100 text-gray-700 hover:text-lima-700 rounded-full text-sm transition-colors">Cookware</button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-lima-100 text-gray-700 hover:text-lima-700 rounded-full text-sm transition-colors">Storage</button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-lima-100 text-gray-700 hover:text-lima-700 rounded-full text-sm transition-colors">Home Decor</button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-lima-100 text-gray-700 hover:text-lima-700 rounded-full text-sm transition-colors">Dining Sets</button>
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


