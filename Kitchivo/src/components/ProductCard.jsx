import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, hideWishlistButton = false }) => {
  const navigate = useNavigate();

  const handleQuickView = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg mb-3 sm:mb-4 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-san-felix-700 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-semibold shadow-lg z-10">
              {product.discount}
            </div>
          )}

          {/* Right Side Icons - Wishlist - Always visible on mobile, hover on desktop */}
          {!hideWishlistButton && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-10">
              <button
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-md flex items-center justify-center shadow-md hover:bg-lima-600 active:bg-lima-700 hover:text-white active:text-white transition-all duration-300 transform translate-x-0 sm:translate-x-4 sm:group-hover:translate-x-0"
                aria-label="Add to Wishlist"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Bottom Buttons - Always visible on mobile, hover on desktop */}
          <div className="cursor-pointer absolute bottom-0 left-0 right-0 flex flex-row gap-2 p-2 sm:p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 z-10">
            <button
              className="flex-1 bg-gray-900 text-white py-2 sm:py-2.5 px-2 sm:px-4 rounded-md hover:bg-lima-600 active:bg-lima-700 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
              aria-label="Add to Cart"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Add to cart</span>
            </button>
            <button
              className=" cursor-pointer flex-1 bg-gray-900 text-white py-2 sm:py-2.5 px-2 sm:px-4 rounded-md hover:bg-lima-600 active:bg-lima-700 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
              aria-label="Quick View"
              onClick={handleQuickView}
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>Quick view</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-left">
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1 sm:mb-2 group-hover:text-lima-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <p className="text-sm sm:text-base font-normal text-gray-400 line-through">
                {product.originalPrice}
              </p>
            )}
            <p className="text-base sm:text-lg font-semibold text-san-felix-800">
              {product.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
