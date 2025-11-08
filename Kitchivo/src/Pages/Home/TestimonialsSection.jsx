import React, { useRef } from 'react';

const TestimonialsSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const videos = [
    {
      id: 1,
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video IDs
      title: 'Amazing Kitchen Transformation',
    },
    {
      id: 2,
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video IDs
      title: 'Best Home Products Review',

    },
    {
      id: 3,
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video IDs
      title: 'Kitchen Essentials Unboxing',

    },
    {
      id: 4,
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video IDs
      title: 'Quality Products Testimonial',
    },
    {
      id: 5,
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video IDs
      title: 'My Kitchivo Experience',
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-lima-100 text-lima-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            CUSTOMER STORIES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-2 sm:mb-4">
            Hear from Our Customers
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Watch what our happy customers have to say about their Kitchivo experience
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-0 sm:px-8 md:px-12">
          {/* Left Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-lima-600 hover:text-white active:bg-lima-700 transition-all duration-300"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-lima-600 hover:text-white active:bg-lima-700 transition-all duration-300"
            aria-label="Next"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Videos Slider */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="flex-none w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] snap-start"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Video Container */}
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Video Info */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-lima-600 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;




