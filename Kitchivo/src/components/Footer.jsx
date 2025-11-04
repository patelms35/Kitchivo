import React from 'react';

const Footer = () => {
  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1E1E1E] text-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Brand */}
          <div>
            <img
              src="/Logo.png"
              alt="Kitchivo Logo"
              className="h-10 w-auto mb-4 brightness-0 invert"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150x50/FFFFFF/1E1E1E?text=KITCHIVO';
              }}
            />
            <p className="text-gray-400 text-sm">
              Your trusted source for premium home and kitchen essentials, available on Amazon.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-[#EF4C23] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-gray-400 hover:text-[#EF4C23] transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-[#EF4C23] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#EF4C23] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#faqs" className="text-gray-400 hover:text-[#EF4C23] transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-[#EF4C23] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-[#EF4C23] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#shipping" className="text-gray-400 hover:text-[#EF4C23] transition-colors">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EF4C23] transition-colors"
              >
                <span className="text-xl">📷</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EF4C23] transition-colors"
              >
                <span className="text-xl">📘</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EF4C23] transition-colors"
              >
                <span className="text-xl">📺</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 Kitchivo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

