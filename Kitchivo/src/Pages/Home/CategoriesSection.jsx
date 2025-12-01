// import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';

// const CategoriesSection = ({categories}) => {
//   const scrollContainerRef = useRef(null);

//   const scroll = (direction) => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const categories = [
//     { id: 1, name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop' },
//     { id: 2, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop' },
//     { id: 3, name: 'Cleaning', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop' },
//     { id: 4, name: 'Storage', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop' },
//     { id: 5, name: 'Cookware', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400&h=300&fit=crop' },
//     { id: 6, name: 'Dining', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=300&fit=crop' },
//     { id: 7, name: 'Appliances', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
//     { id: 8, name: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop' },
//   ];

//   return (
//     <section id="categories" className="py-8 sm:py-12 md:py-16 bg-white">
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-2 sm:mb-4">Explore by Category</h2>
//           <p className="text-gray-600 text-sm sm:text-base md:text-lg">Find exactly what you need for your home</p>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative px-0 sm:px-8 md:px-12">
//           {/* Left Arrow - Hidden on mobile */}
//           <button
//             onClick={() => scroll('left')}
//             className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-lima-600 hover:text-white active:bg-lima-700 transition-all duration-300"
//             aria-label="Previous"
//           >
//             <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>

//           {/* Right Arrow - Hidden on mobile */}
//           <button
//             onClick={() => scroll('right')}
//             className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-lima-600 hover:text-white active:bg-lima-700 transition-all duration-300"
//             aria-label="Next"
//           >
//             <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </button>

//           {/* Categories Slider */}
//           <div
//             ref={scrollContainerRef}
//             className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {categories.map((category) => (
//               <div key={category.id} className="flex-none w-[110px] sm:w-[130px] md:w-[140px] snap-start">
//                 <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="group cursor-pointer text-center block">
//                   <div className="flex justify-center mb-2 sm:mb-3">
//                     <div className="w-full aspect-square rounded-full overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ring-2 ring-gray-100 group-hover:ring-4 group-hover:ring-lima-500">
//                       <img 
//                         src={category.image} 
//                         alt={category.name} 
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
//                       />
//                     </div>
//                   </div>
//                   <h3 className="font-medium text-xs sm:text-sm text-gray-800 group-hover:text-lima-600 transition-colors px-1">{category.name}</h3>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CategoriesSection;


import React, { useRef } from "react";
import { Link } from "react-router-dom";

const CategoriesSection = ({ categories = [] }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <section id="categories" className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-2 sm:mb-4">
            Explore by Category
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Find exactly what you need for your home
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-0 sm:px-8 md:px-12">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-lima-600 hover:text-white active:bg-lima-700 transition-all duration-300"
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-lima-600 hover:text-white active:bg-lima-700 transition-all duration-300"
            aria-label="Next"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Categories Slider */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pt-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-none w-[110px] sm:w-[130px] md:w-[140px] snap-start"
              >
                <Link
                  to={`/category/${category.id}`}
                  className="group cursor-pointer text-center block"
                >
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className="w-full aspect-square rounded-full overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ring-2 ring-gray-100 group-hover:ring-4 group-hover:ring-lima-500">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <h3 className="font-medium text-xs sm:text-sm text-gray-800 group-hover:text-lima-600 transition-colors px-1">
                    {category.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;
