import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import ProductCard from '../../components/ProductCard';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // All products data
  const allProducts = [
    { id: 8, name: 'Plastic Modular Drawer', description: 'Set of 6 elegant glasses', originalPrice: '₹1,999', price: '₹999', discount: '-50%', image: 'https://m.media-amazon.com/images/I/513G67HTG9L.jpg', amazonLink: '#', category: 'Storage', rating: 4.5, reviews: 128, badge: 'Bestseller' },
    { id: 2, name: 'Plastic Modular Drawer Storage', description: 'Eco-friendly borosilicate glass', originalPrice: '₹1,999', price: '₹899', discount: '-55%', image: 'https://m.media-amazon.com/images/I/713PnYt0aEL._SX679_.jpg', amazonLink: '#', category: 'Storage', rating: 4.7, reviews: 89, badge: 'New' },
    { id: 3, name: 'Multipurpose Modular Drawer', description: 'Sustainable kitchen essential', originalPrice: '₹1,999', price: '₹1,199', discount: '-31%', image: 'https://m.media-amazon.com/images/I/71G94w0sIgL._SX679_.jpg', amazonLink: '#', category: 'Storage', rating: 4.3, reviews: 56 },
    { id: 1, name: 'Memory Foam Pillow', description: 'Handcrafted artisan design', originalPrice: '₹1,999', price: '₹529', discount: '-71%', image: 'https://m.media-amazon.com/images/I/61PdLfoIlHL._SX300_SY300_QL70_FMwebp_.jpg', amazonLink: '#', category: 'Home Decor', rating: 4.8, reviews: 256 },
    { id: 5, name: 'Modern Tea Kettle', description: 'Elegant design with whistle', originalPrice: '₹2,799', price: '₹2,299', discount: '-15%', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop', amazonLink: '#', category: 'Cookware', rating: 4.6, reviews: 143 },
    { id: 4, name: 'Stainless Steel Cookware', description: 'Premium 5-piece set', price: '₹8,999', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop', amazonLink: '#', category: 'Cookware', rating: 4.8, reviews: 298, badge: 'Bestseller' },
    { id: 6, name: 'Minimalist Dinnerware Set', description: '16-piece modern collection', price: '₹12,499', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop', amazonLink: '#', category: 'Dinnerware', rating: 4.6, reviews: 167, badge: 'New' },
    { id: 7, name: 'Wooden Utensil Holder', description: 'Natural bamboo organizer', originalPrice: '₹1,499', price: '₹1,199', discount: '-20%', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop', amazonLink: '#', category: 'Storage', rating: 4.4, reviews: 134 },
    { id: 9, name: 'Glass Water Bottle', description: 'Eco-friendly 1L capacity', originalPrice: '₹899', price: '₹599', discount: '-33%', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', amazonLink: '#', category: 'Drinkware', rating: 4.5, reviews: 234, badge: 'Bestseller' },
    { id: 10, name: 'Ceramic Coffee Mugs', description: 'Set of 4 handcrafted mugs', originalPrice: '₹1,299', price: '₹999', discount: '-23%', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop', amazonLink: '#', category: 'Drinkware', rating: 4.7, reviews: 123 },
    { id: 11, name: 'Non-Stick Frying Pan', description: 'Premium granite coating', originalPrice: '₹2,499', price: '₹1,799', discount: '-28%', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400&h=400&fit=crop', amazonLink: '#', category: 'Cookware', rating: 4.9, reviews: 456 },
    { id: 12, name: 'Spice Rack Organizer', description: '12 glass jars with stand', originalPrice: '₹1,799', price: '₹1,299', discount: '-28%', image: 'https://images.unsplash.com/photo-1596040033229-a0b3b10b5e67?w=400&h=400&fit=crop', amazonLink: '#', category: 'Storage', rating: 4.4, reviews: 112 },
    { id: 13, name: 'Cutting Board Set', description: 'Bamboo boards - set of 3', originalPrice: '₹1,199', price: '₹899', discount: '-25%', image: 'https://images.unsplash.com/photo-1594031574785-3c63c29a4b18?w=400&h=400&fit=crop', amazonLink: '#', category: 'Kitchen Tools', rating: 4.6, reviews: 178 },
    { id: 14, name: 'Stainless Steel Utensil Set', description: 'Premium 24-piece collection', price: '₹3,999', image: 'https://images.unsplash.com/photo-1595484912425-4fb4cc13c777?w=400&h=400&fit=crop', amazonLink: '#', category: 'Kitchen Tools', rating: 4.5, reviews: 289, badge: 'Bestseller' },
    { id: 15, name: 'Dish Drying Rack', description: 'Space-saving design', originalPrice: '₹1,499', price: '₹1,099', discount: '-27%', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', amazonLink: '#', category: 'Storage', rating: 4.3, reviews: 98 },
    { id: 16, name: 'Pressure Cooker', description: '5L capacity with safety features', originalPrice: '₹3,499', price: '₹2,799', discount: '-20%', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop', amazonLink: '#', category: 'Cookware', rating: 4.8, reviews: 324 },
    { id: 17, name: 'Kitchen Storage Container Set', description: 'Air-tight 20-piece collection', originalPrice: '₹2,499', price: '₹1,899', discount: '-24%', image: 'https://images.unsplash.com/photo-1600493572133-8c0de8680a52?w=400&h=400&fit=crop', amazonLink: '#', category: 'Storage', rating: 4.7, reviews: 189 },
    { id: 18, name: 'Electric Hand Blender', description: '5-speed with attachments', originalPrice: '₹2,299', price: '₹1,799', discount: '-22%', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', amazonLink: '#', category: 'Kitchen Tools', rating: 4.6, reviews: 201, badge: 'New' },
    { id: 19, name: 'Ceramic Bowl Set', description: 'Microwave safe - 6 pieces', originalPrice: '₹1,599', price: '₹1,199', discount: '-25%', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=400&fit=crop', amazonLink: '#', category: 'Dinnerware', rating: 4.5, reviews: 145 },
    { id: 20, name: 'Stainless Steel Water Bottles', description: 'Set of 3 - 1L each', originalPrice: '₹1,799', price: '₹1,399', discount: '-22%', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', amazonLink: '#', category: 'Drinkware', rating: 4.6, reviews: 178 },
    { id: 21, name: 'Granite Mortar and Pestle', description: 'Traditional kitchen essential', originalPrice: '₹899', price: '₹699', discount: '-22%', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop', amazonLink: '#', category: 'Kitchen Tools', rating: 4.7, reviews: 234 },
    { id: 22, name: 'Glass Food Storage Jars', description: 'Set of 8 with wooden lids', originalPrice: '₹1,999', price: '₹1,499', discount: '-25%', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop', amazonLink: '#', category: 'Storage', rating: 4.8, reviews: 267 },
    { id: 23, name: 'Silicone Baking Mat Set', description: 'Non-stick - 3 piece set', originalPrice: '₹799', price: '₹599', discount: '-25%', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop', amazonLink: '#', category: 'Kitchen Tools', rating: 4.4, reviews: 156 },
    { id: 24, name: 'Stainless Steel Kadhai', description: 'Deep frying pan with lid', originalPrice: '₹2,999', price: '₹2,299', discount: '-23%', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400&h=400&fit=crop', amazonLink: '#', category: 'Cookware', rating: 4.7, reviews: 312 },
  ];

  const categories = ['All', 'Storage', 'Cookware', 'Dinnerware', 'Drinkware', 'Kitchen Tools', 'Home Decor'];

  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  // Apply price range filter
  const priceFilteredProducts = filteredProducts.filter(product => {
    const price = parseInt(product.price.replace(/[^0-9]/g, ''));
    
    if (priceRange === 'under-1000') return price < 1000;
    if (priceRange === '1000-5000') return price >= 1000 && price < 5000;
    if (priceRange === '5000-10000') return price >= 5000 && price < 10000;
    if (priceRange === 'above-10000') return price >= 10000;
    return true; // 'all'
  });

  // Sort products
  const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'All Products' }
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
          >
            All Products
          </motion.h1>
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-base text-gray-600">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
            </p>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-lima-600 text-white rounded-lg font-semibold text-sm hover:bg-lima-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By - Custom Dropdown */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Sort By</h3>
                <div className="relative">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-left text-sm text-gray-700 hover:border-lima-600 focus:outline-none focus:ring-2 focus:ring-lima-600 focus:border-transparent transition-all duration-200 flex items-center justify-between"
                  >
                    <span className="font-medium">
                      {sortBy === 'featured' && 'Featured'}
                      {sortBy === 'newest' && 'Newest First'}
                      {sortBy === 'price-low' && 'Price: Low to High'}
                      {sortBy === 'price-high' && 'Price: High to Low'}
                      {sortBy === 'rating' && 'Highest Rated'}
                      {sortBy === 'name' && 'Name: A to Z'}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {sortDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setSortDropdownOpen(false)}
                      />
                      
                      {/* Dropdown List */}
                      <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        <button
                          onClick={() => {
                            setSortBy('featured');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === 'featured' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Featured</span>
                            {sortBy === 'featured' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('newest');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === 'newest' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Newest First</span>
                            {sortBy === 'newest' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('price-low');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === 'price-low' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Price: Low to High</span>
                            {sortBy === 'price-low' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('price-high');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === 'price-high' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Price: High to Low</span>
                            {sortBy === 'price-high' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('rating');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === 'rating' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Highest Rated</span>
                            {sortBy === 'rating' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('name');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === 'name' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Name: A to Z</span>
                            {sortBy === 'name' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceRange === 'all'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Prices</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="under-1000"
                      checked={priceRange === 'under-1000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Under ₹1,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="1000-5000"
                      checked={priceRange === '1000-5000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">₹1,000 - ₹5,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="5000-10000"
                      checked={priceRange === '5000-10000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">₹5,000 - ₹10,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="above-10000"
                      checked={priceRange === 'above-10000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Above ₹10,000</span>
                  </label>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSortBy('featured');
                  setPriceRange('all');
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters Sidebar - Slide-in */}
          <div className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFiltersOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="absolute left-0 top-0 bottom-0 w-[280px] sm:w-[320px] bg-white shadow-xl overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-4">
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="mobile-category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By - Mobile */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Sort By</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="featured"
                        checked={sortBy === 'featured'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="newest"
                        checked={sortBy === 'newest'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Newest First</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="price-low"
                        checked={sortBy === 'price-low'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Price: Low to High</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="price-high"
                        checked={sortBy === 'price-high'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Price: High to Low</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="rating"
                        checked={sortBy === 'rating'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Highest Rated</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="name"
                        checked={sortBy === 'name'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Name: A to Z</span>
                    </label>
                  </div>
                </div>

                {/* Price Range - Mobile */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-price"
                        value="all"
                        checked={priceRange === 'all'}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">All Prices</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-price"
                        value="under-1000"
                        checked={priceRange === 'under-1000'}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Under ₹1,000</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-price"
                        value="1000-5000"
                        checked={priceRange === '1000-5000'}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">₹1,000 - ₹5,000</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-price"
                        value="5000-10000"
                        checked={priceRange === '5000-10000'}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">₹5,000 - ₹10,000</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-price"
                        value="above-10000"
                        checked={priceRange === 'above-10000'}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Above ₹10,000</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSortBy('featured');
                      setPriceRange('all');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full px-4 py-3 bg-lima-600 text-white rounded-lg font-semibold text-sm hover:bg-lima-700 transition-colors"
                  >
                    Show {sortedProducts.length} Products
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6 text-center">
                  No products match your current filters. Try adjusting your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSortBy('featured');
                    setPriceRange('all');
                  }}
                  className="px-6 py-2 bg-lima-600 text-white rounded-lg font-semibold hover:bg-lima-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
