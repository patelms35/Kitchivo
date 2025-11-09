import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import ProductCard from "../../components/ProductCard";

const NewProducts = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // All products data - only products with "New" badge
  const allNewProducts = [
    {
      id: 2,
      name: "Plastic Modular Drawer Storage",
      description: "Eco-friendly borosilicate glass",
      originalPrice: "₹1,999",
      price: "₹899",
      discount: "-55%",
      image: "https://m.media-amazon.com/images/I/713PnYt0aEL._SX679_.jpg",
      amazonLink: "#",
      category: "Storage",
      rating: 4.7,
      reviews: 89,
      badge: "New",
    },
    {
      id: 6,
      name: "Minimalist Dinnerware Set",
      description: "16-piece modern collection",
      price: "₹12,499",
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Dinnerware",
      rating: 4.6,
      reviews: 167,
      badge: "New",
    },
    {
      id: 18,
      name: "Electric Hand Blender",
      description: "5-speed with attachments",
      originalPrice: "₹2,299",
      price: "₹1,799",
      discount: "-22%",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Kitchen Tools",
      rating: 4.6,
      reviews: 201,
      badge: "New",
    },
    {
      id: 25,
      name: "Digital Kitchen Scale",
      description: "Precision weighing up to 5kg",
      originalPrice: "₹1,499",
      price: "₹999",
      discount: "-33%",
      image:
        "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Kitchen Tools",
      rating: 4.8,
      reviews: 312,
      badge: "New",
    },
    {
      id: 26,
      name: "Insulated Lunch Box Set",
      description: "Stainless steel - 3 containers",
      originalPrice: "₹1,799",
      price: "₹1,299",
      discount: "-28%",
      image:
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Storage",
      rating: 4.5,
      reviews: 156,
      badge: "New",
    },
    {
      id: 27,
      name: "Vegetable Chopper",
      description: "Multi-function food processor",
      originalPrice: "₹1,299",
      price: "₹899",
      discount: "-31%",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Kitchen Tools",
      rating: 4.4,
      reviews: 234,
      badge: "New",
    },
    {
      id: 28,
      name: "Coffee Maker French Press",
      description: "Premium glass carafe 1L",
      originalPrice: "₹2,499",
      price: "₹1,799",
      discount: "-28%",
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Drinkware",
      rating: 4.7,
      reviews: 189,
      badge: "New",
    },
    {
      id: 29,
      name: "Herb Scissors Set",
      description: "5-blade scissors with comb",
      originalPrice: "₹599",
      price: "₹399",
      discount: "-33%",
      image:
        "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Kitchen Tools",
      rating: 4.6,
      reviews: 145,
      badge: "New",
    },
    {
      id: 30,
      name: "Silicone Baking Molds",
      description: "Set of 6 - muffin & cake",
      originalPrice: "₹899",
      price: "₹649",
      discount: "-28%",
      image:
        "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Kitchen Tools",
      rating: 4.5,
      reviews: 198,
      badge: "New",
    },
    {
      id: 31,
      name: "Kitchen Storage Rack",
      description: "Keep food fresh longer",
      originalPrice: "₹2,999",
      price: "₹1,699",
      discount: "-43%",
      image:
        "https://m.media-amazon.com/images/I/713Djgri2WL._SX679_.jpg",
      amazonLink: "#",
      category: "Storage",
      rating: 4.8,
      reviews: 267,
      badge: "New",
    },
    {
      id: 32,
      name: "Multipurpose Modular Drawer Storage",
      description: "Eco-friendly travel set",
      originalPrice: "₹699",
      price: "₹499",
      discount: "-29%",
      image:
        "https://m.media-amazon.com/images/I/71G94w0sIgL._SX679_.jpg",
      amazonLink: "#",
      category: "Kitchen Tools",
      rating: 4.3,
      reviews: 134,
      badge: "New",
    },
    {
      id: 33,
      name: "Milk Frother Electric",
      description: "Handheld foam maker",
      originalPrice: "₹799",
      price: "₹599",
      discount: "-25%",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      amazonLink: "#",
      category: "Kitchen Tools",
      rating: 4.6,
      reviews: 178,
      badge: "New",
    },
  ];

  // Apply price range filter
  const priceFilteredProducts = allNewProducts.filter((product) => {
    const price = parseInt(product.price.replace(/[^0-9]/g, ""));

    if (priceRange === "under-1000") return price < 1000;
    if (priceRange === "1000-5000") return price >= 1000 && price < 5000;
    if (priceRange === "5000-10000") return price >= 5000 && price < 10000;
    if (priceRange === "above-10000") return price >= 10000;
    return true; // 'all'
  });

  // Sort products
  const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          parseInt(a.price.replace(/[^0-9]/g, "")) -
          parseInt(b.price.replace(/[^0-9]/g, ""))
        );
      case "price-high":
        return (
          parseInt(b.price.replace(/[^0-9]/g, "")) -
          parseInt(a.price.replace(/[^0-9]/g, ""))
        );
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "New Products" }]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header with Badge */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
            >
              New Products
            </motion.h1>
            <span className="px-3 py-1 bg-lima-600 text-white text-xs font-semibold rounded-full">
              NEW
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Discover our latest arrivals - Fresh additions to elevate your
            kitchen experience
          </p>
          <p className="text-sm text-gray-500">
            {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>

              {/* Sort By - Custom Dropdown */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Sort By
                </h3>
                <div className="relative">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-left text-sm text-gray-700 hover:border-lima-600 focus:outline-none focus:ring-2 focus:ring-lima-600 focus:border-transparent transition-all duration-200 flex items-center justify-between"
                  >
                    <span className="font-medium">
                      {sortBy === "featured" && "Featured"}
                      {sortBy === "price-low" && "Price: Low to High"}
                      {sortBy === "price-high" && "Price: High to Low"}
                      {sortBy === "rating" && "Highest Rated"}
                      {sortBy === "name" && "Name: A to Z"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        sortDropdownOpen ? "rotate-180" : ""
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
                            setSortBy("featured");
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === "featured"
                              ? "bg-lima-50 text-lima-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Featured</span>
                            {sortBy === "featured" && (
                              <svg
                                className="w-4 h-4 text-lima-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy("price-low");
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === "price-low"
                              ? "bg-lima-50 text-lima-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Price: Low to High</span>
                            {sortBy === "price-low" && (
                              <svg
                                className="w-4 h-4 text-lima-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy("price-high");
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === "price-high"
                              ? "bg-lima-50 text-lima-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Price: High to Low</span>
                            {sortBy === "price-high" && (
                              <svg
                                className="w-4 h-4 text-lima-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy("rating");
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === "rating"
                              ? "bg-lima-50 text-lima-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Highest Rated</span>
                            {sortBy === "rating" && (
                              <svg
                                className="w-4 h-4 text-lima-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy("name");
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${
                            sortBy === "name"
                              ? "bg-lima-50 text-lima-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Name: A to Z</span>
                            {sortBy === "name" && (
                              <svg
                                className="w-4 h-4 text-lima-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
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
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceRange === "all"}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      All Prices
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="under-1000"
                      checked={priceRange === "under-1000"}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Under ₹1,000
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="1000-5000"
                      checked={priceRange === "1000-5000"}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      ₹1,000 - ₹5,000
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="5000-10000"
                      checked={priceRange === "5000-10000"}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      ₹5,000 - ₹10,000
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="above-10000"
                      checked={priceRange === "above-10000"}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Above ₹10,000
                    </span>
                  </label>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSortBy("featured");
                  setPriceRange("all");
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
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  No products match your current filters. Try adjusting your
                  filters.
                </p>
                <button
                  onClick={() => {
                    setSortBy("featured");
                    setPriceRange("all");
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

export default NewProducts;
