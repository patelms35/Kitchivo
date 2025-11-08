import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import deleteIcon from "../../assets/delete.svg";

const Cart = () => {
  // Mock cart data - in real app, this would come from state management/API
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Non-Stick Frying Pan',
      price: 4199,
      originalPrice: 6799,
      discount: '-38%',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
      quantity: 2,
      size: 'M',
      color: 'Black',
    },
    {
      id: 2,
      name: 'Stainless Steel Cookware Set',
      price: 10999,
      originalPrice: 16999,
      discount: '-35%',
      image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500',
      quantity: 1,
      size: 'L',
      color: 'Silver',
    },
    {
      id: 3,
      name: 'Ceramic Dinner Plate Set',
      price: 3299,
      originalPrice: 4999,
      discount: '-33%',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500',
      quantity: 1,
      size: 'Standard',
      color: 'White',
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      setCartItems([]);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => {
    const itemDiscount = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
    return sum + itemDiscount;
  }, 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cart' }
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                          aria-label="Remove item"
                        >
                          <img src={deleteIcon} alt="Remove" className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Size & Color */}
                      <div className="flex gap-4 text-sm text-gray-600 mb-3">
                        <span>Size: <span className="font-medium text-gray-900">{item.size}</span></span>
                        <span>Color: <span className="font-medium text-gray-900">{item.color}</span></span>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg sm:text-xl font-bold text-san-felix-700">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{item.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 border-2 border-gray-300 rounded flex items-center justify-center text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center font-semibold text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 border-2 border-gray-300 rounded flex items-center justify-center text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-3 text-sm text-gray-600">
                        Item Total: <span className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-semibold text-green-600">-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-san-felix-700">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-lima-600 transition-all duration-300 mb-3">
                  Buy on amazon
                </button>

                <Link
                  to="/"
                  className="block text-center text-sm text-lima-600 hover:text-lima-700 font-medium"
                >
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Easy Returns & Refunds</span>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
              Your Cart is Empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-8 text-center max-w-md">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
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

export default Cart;
