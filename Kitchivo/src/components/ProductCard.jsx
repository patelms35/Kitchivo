import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-san-felix-700 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-lg z-10">
            {product.discount}
          </div>
        )}
        
        {/* Right Side Icons - Wishlist */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button 
            className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-md hover:bg-lima-600 hover:text-white transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
            aria-label="Add to Wishlist"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Bottom Buttons - Add to Cart & Quick View */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-10">
          <button 
            className="flex-1 bg-gray-900 text-white py-2.5 px-4 rounded-md hover:bg-lima-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
            aria-label="Add to Cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to cart
          </button>
          <button 
            className="flex-1 bg-gray-900 text-white py-2.5 px-4 rounded-md hover:bg-lima-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
            aria-label="Quick View"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Quick view
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-left">
        <h3 className="font-semibold text-base text-gray-800 mb-2 group-hover:text-lima-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <p className="text-base font-normal text-gray-400 line-through">
              {product.originalPrice}
            </p>
          )}
          <p className="text-lg font-normal text-san-felix-800">
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
