import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import ProductCard from '../../components/ProductCard';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Mock products data - In real app, this would come from API based on category
  const allProducts = {
    kitchen: [
      {
        id: 1,
        name: 'Premium Non-Stick Frying Pan',
        price: '₹4,199',
        originalPrice: '₹6,799',
        discount: '-38%',
        rating: 4.5,
        reviews: 128,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
        badge: 'Bestseller',
      },
      {
        id: 2,
        name: 'Stainless Steel Mixing Bowl Set',
        price: '₹2,499' ,
        originalPrice: '₹3,999',
        discount: '-37%',
        rating: 4.7,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500',
        badge: 'New',
      },
      {
        id: 3,
        name: 'Kitchen Knife Set Professional',
        price: '₹1,999',
        originalPrice: '₹2,499',
        discount: '-40%',
        rating: 4.8,
        reviews: 256,
        image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500',
      },
      {
        id: 4,
        name: 'Kitchen Storage Rack',
        price: '₹2,499',
        originalPrice: '₹4,999',
        discount: '-40%',
        rating: 4.6,
        reviews: 143,
        image: 'https://m.media-amazon.com/images/I/91WpqdiMZ1L._SX679_.jpg',
      },
    ],
    'home-decor': [
      {
        id: 5,
        name: 'Decorative Wall Clock',
        price: 2999,
        originalPrice: 4999,
        discount: '-40%',
        rating: 4.4,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500',
        badge: 'New',
      },
      {
        id: 6,
        name: 'Table Lamp Modern Design',
        price: 3499,
        originalPrice: 5999,
        discount: '-41%',
        rating: 4.6,
        reviews: 92,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
      },
    ],
    cleaning: [
      {
        id: 7,
        name: 'Microfiber Cleaning Cloth Set',
        price: 599,
        originalPrice: 999,
        discount: '-40%',
        rating: 4.5,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500',
        badge: 'Bestseller',
      },
      {
        id: 8,
        name: 'Spray Mop with Bucket',
        price: 1999,
        originalPrice: 3499,
        discount: '-42%',
        rating: 4.3,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500',
      },
    ],
    storage: [
      {
        id: 9,
        name: 'Glass Storage Container Set',
        price: 2899,
        originalPrice: 4199,
        discount: '-31%',
        rating: 4.7,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
        badge: 'Bestseller',
      },
      {
        id: 10,
        name: 'Plastic Storage Boxes 10pcs',
        price: 1599,
        originalPrice: 2499,
        discount: '-36%',
        rating: 4.4,
        reviews: 112,
        image: 'https://images.unsplash.com/photo-1600493572133-8c0de8680a52?w=500',
      },
    ],
    cookware: [
      {
        id: 11,
        name: 'Stainless Steel Cookware Set',
        price: 10999,
        originalPrice: 16999,
        discount: '-35%',
        rating: 4.8,
        reviews: 298,
        image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500',
        badge: 'Bestseller',
      },
      {
        id: 12,
        name: 'Cast Iron Skillet',
        price: 3999,
        originalPrice: 5999,
        discount: '-33%',
        rating: 4.9,
        reviews: 456,
        image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500',
      },
    ],
    dining: [
      {
        id: 13,
        name: 'Ceramic Dinner Plate Set',
        price: 3299,
        originalPrice: 4999,
        discount: '-34%',
        rating: 4.6,
        reviews: 167,
        image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=500',
        badge: 'New',
      },
      {
        id: 14,
        name: 'Crystal Wine Glasses Set',
        price: 2499,
        originalPrice: 3999,
        discount: '-37%',
        rating: 4.7,
        reviews: 123,
        image: 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=500',
      },
    ],
    appliances: [
      {
        id: 15,
        name: 'Electric Kettle 1.8L',
        price: 1899,
        originalPrice: 2999,
        discount: '-36%',
        rating: 4.5,
        reviews: 289,
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
        badge: 'Bestseller',
      },
      {
        id: 16,
        name: 'Hand Mixer 5 Speed',
        price: 2299,
        originalPrice: 3499,
        discount: '-34%',
        rating: 4.6,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
      },
    ],
    bathroom: [
      {
        id: 17,
        name: 'Bathroom Storage Organizer',
        price: 1499,
        originalPrice: 2499,
        discount: '-40%',
        rating: 4.3,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500',
      },
      {
        id: 18,
        name: 'Shower Caddy Stainless Steel',
        price: 899,
        originalPrice: 1499,
        discount: '-40%',
        rating: 4.4,
        reviews: 134,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500',
        badge: 'New',
      },
    ],
  };

  // Get category key from URL parameter
  const categoryKey = categoryName?.toLowerCase().replace(/\s+/g, '-');
  const products = allProducts[categoryKey] || [];

  // Format category name for display
  const displayCategoryName = categoryName?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Sorting logic
  const getSortedProducts = () => {
    let filtered = [...products];

    // Filter by price range
    if (priceRange === 'under-1000') {
      filtered = filtered.filter(p => p.price < 1000);
    } else if (priceRange === '1000-5000') {
      filtered = filtered.filter(p => p.price >= 1000 && p.price < 5000);
    } else if (priceRange === '5000-10000') {
      filtered = filtered.filter(p => p.price >= 5000 && p.price < 10000);
    } else if (priceRange === 'above-10000') {
      filtered = filtered.filter(p => p.price >= 10000);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.filter(p => p.badge === 'New').concat(filtered.filter(p => p.badge !== 'New'));
      default:
        return filtered;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/#categories' },
          { label: displayCategoryName }
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {displayCategoryName}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>

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
                  setSortBy('featured');
                  setPriceRange('all');
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
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

export default CategoryProducts;
