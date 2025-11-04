import React from 'react';

const CategoriesSection = () => {
  const categories = [
    { id: 1, name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop' },
    { id: 2, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop' },
    { id: 3, name: 'Cleaning', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop' },
    { id: 4, name: 'Storage', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop' },
    { id: 5, name: 'Cookware', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400&h=300&fit=crop' },
    { id: 6, name: 'Dining', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=300&fit=crop' },
    { id: 7, name: 'Appliances', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
    { id: 8, name: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop' },
  ];

  return (
    <section id="categories" className="py-12 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">Explore by Category</h2>
          <p className="text-gray-600 text-lg">Find exactly what you need for your home</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer text-center">
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 ring-4 ring-gray-100 group-hover:ring-lima-500">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="font-medium text-base md:text-lg text-gray-800 group-hover:text-lima-600 transition-colors px-2">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
