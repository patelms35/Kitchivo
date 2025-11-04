import React, { useRef } from 'react';
import ProductCard from '../../components/ProductCard';

const BestsellersSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const products = [
    { id: 1, name: 'Premium Chef Knife Set', description: 'Professional quality stainless steel', originalPrice: '₹9,399', price: '₹7,499', discount: '-20%', image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 2, name: 'Non-Stick Cookware Set', description: '10-piece ceramic coating', originalPrice: '₹12,699', price: '₹10,799', discount: '-15%', image: 'https://images.unsplash.com/photo-1584990347449-39b0635d788d?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 3, name: 'Smart Storage Containers', description: 'Airtight and stackable design', price: '₹2,899', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 4, name: 'Luxury Cutting Board', description: 'Bamboo wood with juice groove', originalPrice: '₹4,199', price: '₹3,799', discount: '-10%', image: 'https://images.unsplash.com/photo-1594450501726-b5d5be5d7528?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 5, name: 'Elegant Dinner Set', description: '24-piece porcelain collection', originalPrice: '₹17,699', price: '₹13,299', discount: '-25%', image: 'https://images.unsplash.com/photo-1578991771779-1e8d0c0c8f4d?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 6, name: 'Modern Spice Rack', description: 'Rotating 20-jar organizer', price: '₹4,599', image: 'https://images.unsplash.com/photo-1606775962616-a2f82abe8e29?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 7, name: 'Stainless Steel Blender', description: '1500W professional blender', originalPrice: '₹11,299', price: '₹7,899', discount: '-30%', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 8, name: 'Kitchen Towel Set', description: 'Ultra-absorbent cotton blend', price: '₹2,099', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop', amazonLink: '#' },
  ];

  return (
    <section id="products" className="py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">Our Bestsellers</h2>
          <p className="text-gray-600 text-lg">Top-rated products loved by our customers</p>
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

export default BestsellersSection;
