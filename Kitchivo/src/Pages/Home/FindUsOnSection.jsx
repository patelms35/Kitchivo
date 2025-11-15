import React from 'react';
import amazonLogo from '../../assets/amazon.svg';
import flipkartLogo from '../../assets/flipkart.svg';
import myntraLogo from '../../assets/myntra.svg';

const FindUsOnSection = () => {
  const platforms = [
    {
      name: 'Amazon',
      logo: amazonLogo,
      link: '#',
      tagline: 'Prime shipping and exclusive kitchen deals'
    },
    {
      name: 'Myntra',
      logo: myntraLogo,
      link: '#',
      tagline: 'Curated cookware for trendsetters'
    },
    {
      name: 'Flipkart',
      logo: flipkartLogo,
      link: '#',
      tagline: 'Festive offers on smart appliances'
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-lima-100 text-lima-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            SHOP WITH US
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-2 sm:mb-4">Find Us On</h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">Available on your favorite shopping platforms</p>
        </div>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 md:gap-8 max-w-5xl w-full">
            {platforms.map((platform, index) => (
              <a
                key={index}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-linear-to-br from-neutral-50 via-white to-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <div className="absolute -inset-px rounded-3xl bg-linear-to-br from-lima-200/40 via-transparent to-transparent blur-2xl" />
                </div>
                <div className="relative flex flex-1 flex-col items-center gap-6 text-center">
                  <div className="rounded-full bg-white/90 p-4 shadow-sm ring-1 ring-inset ring-gray-100 transition-all duration-300 group-hover:ring-lima-400">
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="h-12 w-32 object-contain grayscale transition duration-300 group-hover:grayscale-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x80?text=' + platform.name;
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#1E1E1E]">{platform.name}</h3>
                    {platform.tagline && (
                      <p className="text-sm text-gray-500">{platform.tagline}</p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-lima-600 transition-colors duration-300 group-hover:text-lima-700">
                    Shop now
                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUsOnSection;
