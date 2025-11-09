import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { getProductById } from '../../data/productsData';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Get product data from central data file
  const productData = getProductById(id);
  
  // If product not found, redirect to products page
  useEffect(() => {
    if (!productData) {
      navigate('/products');
    }
  }, [productData, navigate]);

  // Default product structure with data from central file
  const product = {
    id: id,
    name: productData?.name || 'Memory Foam Pillow',
    price: productData?.price || '₹529',
    originalPrice: productData?.originalPrice || '₹1,999',
    discount: productData?.discount || '-71%',
    image: productData?.image || 'https://m.media-amazon.com/images/I/61PdLfoIlHL._SX300_SY300_QL70_FMwebp_.jpg',
    image2: 'https://m.media-amazon.com/images/I/51sf0ElwymL.jpg',
    image3: 'https://m.media-amazon.com/images/I/618FLhHeKjL.jpg',
    image4: 'https://m.media-amazon.com/images/I/514QgiMSOoL.jpg',
    image5: 'https://m.media-amazon.com/images/I/615m-hR3E1L.jpg',
    description: productData?.description || 'Regular fit, round neckline, short sleeves. Made of extra long staple pima cotton. This premium quality product ensures durability and comfort for everyday use.',
    category: productData?.category || 'Home Decor',
    rating: productData?.rating || 4.8,
    reviews: productData?.reviews || 256,
  };

  // Mock additional images for demo
  const productImages = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ];

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Beige', class: 'bg-amber-100' },
    { name: 'Black', class: 'bg-gray-800' },
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % productImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.name }
        ]}
      />
      
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Image Gallery */}
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnail Gallery - Vertical on Desktop */}
              <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-lima-600 ring-2 ring-lima-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 rounded-lg overflow-hidden relative">
                <div className="aspect-square relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={productImages[selectedImage]}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 0.98, x: 40 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98, x: -40 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  {/* Image Navigation Arrows */}
                  <button
                    onClick={() => setSelectedImage((selectedImage - 1 + productImages.length) % productImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage((selectedImage + 1) % productImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-5">
              {/* Product Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                
                {/* Reviews */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                      </svg>
                    ))}
                  </div>
                  <button className="text-sm text-gray-600 hover:text-lima-600 underline">
                    Read reviews ( 1 )
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-sm text-gray-600 hover:text-lima-600">
                    Write a review
                  </button>
                </div>

                {/* Product Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-san-felix-700">{product.price}</span>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 min-w-12 border-2 rounded font-medium text-sm transition-all ${
                        selectedSize === size
                          ? 'border-lima-600 bg-lima-600 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Color</h3>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === index
                          ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      aria-label={color.name}
                    >
                      <div className={`w-full h-full rounded-full ${color.class}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 border-2 border-gray-300 rounded text-center font-semibold text-base"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
                    aria-label="Increase quantity"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button className="w-full bg-gray-900 text-white py-3 px-6 rounded font-semibold text-base hover:bg-lima-600 transition-all duration-300">
                  Add to cart
                </button>
                <button className="w-full bg-orange-500 text-white py-3 px-6 rounded font-semibold text-base hover:bg-orange-600 transition-all duration-300">
                  Buy on Amazon
                </button>
                {/* Additional Links */}
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-lima-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Size Guide
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-lima-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Wishlist
                  </button>
               
                </div>
              </div>

              {/* Product Info */}
              <div className="border-t pt-5 space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-600">In stock</span>
                  <span className="text-green-600 font-semibold">289 items</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Reference</span>
                  <span className="text-gray-900">demo_1</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Brand:</span>
                  <span className="text-gray-900">Studio Design</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Categories:</span>
                  <span className="text-gray-900">Home Furniture Lighting Lamp</span>
                </div>
              </div>

              
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 border-t">
            <div className="flex md:gap-4 lg:gap-8 border-b">
              <button 
                onClick={() => setActiveTab('description')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'description' 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'details' 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Product Details
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'reviews' 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Reviews
              </button>
            </div>
            <div className="py-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This premium quality product ensures durability and comfort for everyday use. 
                    Made with the finest materials and crafted with attention to detail.
                  </p>
                </div>
              )}
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Material:</span>
                      <span className="text-gray-600">Premium Pima Cotton</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Weight:</span>
                      <span className="text-gray-600">0.5 kg</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Dimensions:</span>
                      <span className="text-gray-600">25cm x 15cm x 10cm</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Care:</span>
                      <span className="text-gray-600">Machine washable, tumble dry low</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Warranty:</span>
                      <span className="text-gray-600">1 Year Manufacturer Warranty</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">John Doe</span>
                        <span className="text-sm text-gray-400">- 2 days ago</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Excellent product! The quality is outstanding and it exceeded my expectations. 
                        Highly recommend to anyone looking for a reliable and durable product.
                      </p>
                    </div>
                    {/* Add review button */}
                    <button className="text-lima-600 hover:text-lima-700 font-medium text-sm">
                      Write a review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;


