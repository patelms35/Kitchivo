import React, { useRef } from 'react';
import ProductCard from '../../components/ProductCard';

const NewInSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const products = [
    { id: 1, name: 'Ceramic Coffee Mug Set', description: 'Handcrafted artisan design', originalPrice: '₹2,499', price: '₹1,999', discount: '-20%', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 2, name: 'Glass Food Storage Set', description: 'Eco-friendly borosilicate glass', price: '₹3,299', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 3, name: 'Bamboo Cutting Board Set', description: 'Sustainable kitchen essential', originalPrice: '₹3,999', price: '₹2,999', discount: '-25%', image: 'https://images.unsplash.com/photo-1556228578-dd6a8f6c3b97?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 4, name: 'Stainless Steel Cookware', description: 'Premium 5-piece set', price: '₹8,999', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 5, name: 'Modern Tea Kettle', description: 'Elegant design with whistle', originalPrice: '₹2,799', price: '₹2,299', discount: '-15%', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 6, name: 'Minimalist Dinnerware Set', description: '16-piece modern collection', price: '₹12,499', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 7, name: 'Wooden Utensil Holder', description: 'Natural bamboo organizer', originalPrice: '₹1,499', price: '₹1,199', discount: '-20%', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 8, name: 'Crystal Wine Glasses', description: 'Set of 6 elegant glasses', price: '₹4,599', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop', amazonLink: '#' },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-lima-100 text-lima-700 rounded-full text-sm font-semibold mb-4">
            LATEST ARRIVALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">New In</h2>
          <p className="text-gray-600 text-lg">Discover our newest collection of home essentials</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-lima-600 hover:text-white transition-all duration-300"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-lima-600 hover:text-white transition-all duration-300"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Products Slider */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-none w-[calc(100%-24px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewInSection;
