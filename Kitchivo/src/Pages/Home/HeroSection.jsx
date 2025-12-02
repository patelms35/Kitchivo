import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ slides = [] }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Map API slide fields → your UI fields
  const formattedSlides = slides.map((item) => ({
    image: item.image,
    title: item.title,
    subtitle: item.title_1,
    description: item.title_2,
  }));

  useEffect(() => {
    if (formattedSlides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % formattedSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [formattedSlides.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (formattedSlides.length === 0) return null;

  return (
    <section
      id="home"
      className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] overflow-hidden mt-0"
    >
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {formattedSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {formattedSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-lima-500 w-8 sm:w-10"
                : "bg-white/50 hover:bg-white/80 w-2.5 sm:w-2"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              {formattedSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10 absolute"
                  }`}
                >
                  <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-lima-500/20 backdrop-blur-sm rounded-full">
                    <span className="text-lima-300 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                      {slide.subtitle}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-3 sm:mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-gray-100 drop-shadow-md mb-4 sm:mb-6">
                    {slide.description}
                  </p>
                </div>
              ))}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 pt-2">
                <button
                  onClick={() => navigate("/products")}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-lima-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-lima-700 active:bg-lima-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Shop Now</span>
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

