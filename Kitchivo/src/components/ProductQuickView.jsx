import React, { useState, useEffect } from 'react';

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock additional images for demo - in real app, these would come from product data
  const productImages = [
    product?.image,
    product?.image,
    product?.image,
    product?.image,
    product?.image,
  ];

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Beige', class: 'bg-amber-100' },
    { name: 'Black', class: 'bg-gray-800' },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % productImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isOpen, productImages.length]);

  if (!isOpen || !product) return null;

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-2 sm:top-4 right-2 sm:right-4 float-right w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all z-20"
          aria-label="Close"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 md:p-6 lg:p-8 clear-both">
          {/* Left Side - Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <img
                key={selectedImage}
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
              />
              {product.discount && (
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-san-felix-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-semibold shadow-lg">
                  {product.discount}
                </div>
              )}
              
              {/* Image Navigation Arrows */}
              <button
                onClick={() => setSelectedImage((selectedImage - 1 + productImages.length) % productImages.length)}
                className="absolute left-1.5 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage((selectedImage + 1) % productImages.length)}
                className="absolute right-1.5 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all"
                aria-label="Next image"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      selectedImage === index ? 'bg-lima-600 w-5 sm:w-6' : 'bg-white/60 hover:bg-white/80 w-1.5 sm:w-2'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-lima-600 ring-1 sm:ring-2 ring-lima-200' : 'border-transparent hover:border-gray-300'
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
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-3 sm:space-y-3.5 md:space-y-4">
            {/* Product Title */}
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-xl sm:text-2xl md:text-2xl font-bold text-san-felix-700">
                  {product.price}
                </p>
                {product.originalPrice && (
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 line-through">
                    {product.originalPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t border-b border-gray-200 py-2.5 sm:py-3">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Regular fit, round neckline, short sleeves. Made of extra long staple pima cotton.
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg border-2 font-semibold text-xs sm:text-sm transition-all ${
                      selectedSize === size
                        ? 'border-lima-600 bg-lima-50 text-lima-700'
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
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Color</h3>
              <div className="flex gap-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 transition-all ${
                      selectedColor === index
                        ? 'border-lima-600 ring-1 sm:ring-2 ring-lima-200'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    aria-label={color.name}
                  >
                    <div className={`w-full h-full rounded-full ${color.class}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Wishlist in one row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 sm:gap-3">
              {/* Quantity */}
              <div className="flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all shrink-0"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="flex-1 sm:flex-initial sm:w-14 md:w-16 h-9 sm:h-10 border-2 border-gray-300 rounded-lg text-center font-semibold text-sm"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all shrink-0"
                    aria-label="Increase quantity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Wishlist */}
              <button className="flex-1 border-2 border-gray-300 text-gray-700 h-9 sm:h-10 px-3 rounded-lg font-semibold text-xs sm:text-sm hover:border-lima-600 hover:text-lima-600 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="hidden xs:inline sm:inline">Add to Wishlist</span>
                <span className="xs:hidden sm:hidden">Wishlist</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-3 space-y-2">
              <button className="w-full bg-gray-900 text-white py-2.5 sm:py-3 px-6 rounded-lg font-semibold text-sm hover:bg-lima-600 active:bg-lima-700 transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to cart
              </button>
              
              <button className="w-full bg-orange-500 text-white py-2.5 sm:py-3 px-6 rounded-lg font-semibold text-sm hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 flex items-center justify-center gap-2">
                
                Buy on Amazon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
