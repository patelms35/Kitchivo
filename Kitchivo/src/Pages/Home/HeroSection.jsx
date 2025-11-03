import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1565183928294-7d22d2650c6e?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1588854337221-4cf9fa96589c?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1920&h=1080&fit=crop',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={image} alt={`Kitchen ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-lima-500 w-8' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                Transform Your Home with <span className="text-lima-400">Kitchivo</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100 drop-shadow-md">
                Discover premium quality home & kitchen essentials available on Amazon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToSection('products')} className="px-8 py-3 bg-lima-600 text-white font-semibold rounded-lg hover:bg-lima-700 transition-all duration-300 transform hover:scale-105 shadow-lg">Shop Now</button>
                <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-lima-600 font-semibold rounded-lg border-2 border-white hover:bg-lima-600 hover:text-white hover:border-lima-600 transition-all duration-300 transform hover:scale-105 text-center shadow-lg">Buy on Amazon</a>
              </div>
            </div>

           

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
