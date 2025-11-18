import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import Breadcrumb from '../../components/Breadcrumb';
import deleteIcon from "../../assets/delete.svg";

const Wishlist = () => {
  // Mock wishlist data - in real app, this would come from state management/API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Non-Stick Frying Pan',
      price: '₹4,199',
      originalPrice: '₹6,799',
      discount: '-38%',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
    },
    {
      id: 2,
      name: 'Stainless Steel Cookware Set',
      price: '₹10,999',
      originalPrice: '₹16,999',
      discount: '-35%',
      image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500',
    },
    {
      id: 3,
      name: 'Ceramic Dinner Plate Set',
      price: '₹3,299',
      originalPrice: '₹4,999',
      discount: '-33%',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500',
    },
    {
      id: 4,
      name: 'Kitchen Knife Set - Professional',
      price: '₹7,499',
      originalPrice: '₹12,499',
      discount: '-40%',
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500',
    },
    {
      id: 5,
      name: 'Glass Storage Container Set',
      price: '₹2,899',
      originalPrice: '₹4,199',
      discount: '-30%',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500',
    },
    {
      id: 6,
      name: 'Bamboo Cutting Board',
      price: '₹2,099',
      originalPrice: '₹3,299',
      discount: '-38%',
      image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=500',
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlistItems([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Wishlist' }
        ]}
      />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Clear All
              </button>
              <Link
                to="/"
                className="px-4 py-2 bg-lima-600 text-white rounded-lg font-semibold text-sm hover:bg-lima-700 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="relative group/card">
                {/* Remove Button - Positioned at top right */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-error-100 text-white rounded-full flex items-center justify-center cursor-pointer transition-all"
                  aria-label="Remove from wishlist"
                >
                  <img src={deleteIcon} alt="Remove from wishlist" />
                </button>
                
                {/* Product Card */}
                <ProductCard product={item} hideWishlistButton={true} />
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-8 text-center max-w-md">
              Save items you love to your wishlist. Review them anytime and decide when you're ready to purchase.
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-lima-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-lima-700 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
