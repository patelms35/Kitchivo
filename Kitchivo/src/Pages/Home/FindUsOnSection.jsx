import React from 'react';

const FindUsOnSection = () => {
  const platforms = [
    {
      name: 'Blinkit',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg',
      link: '#'
    },
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      link: '#'
    },
    {
      name: 'Myntra',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/65c5da9f878952603e370d03_Myntra-Logo_1.svg',
      link: '#'
    },
    {
      name: 'Flipkart',
      logo: 'https://cdn.worldvectorlogo.com/logos/flipkart.svg',
      link: '#'
    },
    {
      name: 'Zepto',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Zepto_Logo.svg',
      link: '#'
    },
   
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-lima-100 text-lima-700 rounded-full text-sm font-semibold mb-4">
            SHOP WITH US
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">Find Us On</h2>
          <p className="text-gray-600 text-lg">Available on your favorite shopping platforms</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {platforms.map((platform, index) => (
            <a
              key={index}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-gray-200 rounded-xl p-8 flex items-center justify-center hover:border-lima-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <img 
                src={platform.logo} 
                alt={platform.name}
                className="w-full h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x80?text=' + platform.name;
                }}
              />
            </a>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-gradient-to-r from-lima-50 to-san-felix-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Shop Anywhere, Anytime</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Find our premium kitchen and home products on all major e-commerce platforms. Choose your preferred shopping destination and get started!
          </p>
          <button className="px-8 py-3 bg-lima-600 text-white font-semibold rounded-lg hover:bg-lima-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Explore All Stores
          </button>
        </div>
      </div>
    </section>
  );
};

export default FindUsOnSection;
