import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import ProductCard from '../../components/ProductCard';
import { fetchAllProducts, createWishlist } from '../../redux/slices/CommanSlice';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getProfile } from '../../redux/slices/AuthSlice';
import SEO from '../../components/SEO';

const Products = () => {
  const dispatch = useDispatch();
  const { loading, products, pagination, error } = useSelector(
    (state) => state.commanStore
  );
  const { dashboard } = useSelector((state) => state.commanStore);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = dashboard?.categories?.filter((cat) => cat.status) || [];

  const currentFilters = {
    page: 1,
    search: "",
    category_id: selectedCategory || "",
    sortBy: sortBy === 'featured' ? '' : sortBy,
    priceRange,
  };

  useEffect(() => {
    dispatch(
      fetchAllProducts(currentFilters)
    );
  }, [dispatch, selectedCategory, sortBy, priceRange]);

  const handleAddToWishlist = async (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Login required',
        text: 'Please login first to add products to your wishlist.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    // if (product?.is_wishlisted) {
    //   return;
    // }

    const productId = product?.id;
    if (!productId) {
      return;
    }

    try {
      const resultAction = await dispatch(createWishlist({ product_id: productId }));
      if (resultAction?.payload?.status == 1) {
        toast.success(resultAction?.payload?.message || 'Added to wishlist');
        dispatch(fetchAllProducts(currentFilters));
        dispatch(getProfile());
      } else {
        toast.error(resultAction?.payload?.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const filteredProducts = Array.isArray(products) ? products : [];

  const categoryName = selectedCategory 
    ? categories.find(cat => cat.id === Number(selectedCategory))?.name 
    : 'All Products';

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredProducts.slice(0, 10).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "image": product.featured_image,
        "description": product.description || product.name
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${categoryName} | Shop Quality Kitchen & Home Products - Kitchivo`}
        description={`Browse ${filteredProducts.length}+ ${categoryName.toLowerCase()} at Kitchivo. Find the best cookware, storage, dinnerware, and kitchen tools with great prices and quality.`}
        keywords={`${categoryName}, kitchen products, home products, buy ${categoryName.toLowerCase()}, cookware, storage, dinnerware, kitchenware online`}
        canonicalUrl={`${window.location.origin}/products`}
        schema={productListSchema}
      />
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
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
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
                  <label key="all" className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ''}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">All</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === String(category.id)}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.name}</span>
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
                      {sortBy === 'price_low_to_high' && 'Price: Low to High'}
                      {sortBy === 'price_high_to_low' && 'Price: High to Low'}
                      {sortBy === 'high_rating' && 'Highest Rated'}
                      {sortBy === 'name_a_to_z' && 'Name: A to Z'}
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
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'featured' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
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
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'newest' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
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
                            setSortBy('price_low_to_high');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'price_low_to_high' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Price: Low to High</span>
                            {sortBy === 'price_low_to_high' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('price_high_to_low');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'price_high_to_low' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Price: High to Low</span>
                            {sortBy === 'price_high_to_low' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('high_rating');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'high_rating' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Highest Rated</span>
                            {sortBy === 'high_rating' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('name_a_to_z');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'name_a_to_z' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Name: A to Z</span>
                            {sortBy === 'name_a_to_z' && (
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
                      value=""
                      checked={priceRange === ''}
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
                  setSelectedCategory('');
                  setSortBy('featured');
                  setPriceRange('');
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
                    <label key="mobile-all" className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-category"
                        value=""
                        checked={selectedCategory === ''}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">All</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="mobile-category"
                          value={category.id}
                          checked={selectedCategory === String(category.id)}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category.name}</span>
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
                        value="price_low_to_high"
                        checked={sortBy === 'price_low_to_high'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Price: Low to High</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="price_high_to_low"
                        checked={sortBy === 'price_high_to_low'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Price: High to Low</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="high_rating"
                        checked={sortBy === 'high_rating'}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Highest Rated</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-sort"
                        value="name_a_to_z"
                        checked={sortBy === 'name_a_to_z'}
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
                        value=""
                        checked={priceRange === ''}
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
                      setSelectedCategory('');
                      setSortBy('featured');
                      setPriceRange('');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full px-4 py-3 bg-lima-600 text-white rounded-lg font-semibold text-sm hover:bg-lima-700 transition-colors"
                  >
                    Show {filteredProducts.length} Products
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} onAddToWishlist={handleAddToWishlist} />
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
                    setSelectedCategory('');
                    setSortBy('featured');
                    setPriceRange('');
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
