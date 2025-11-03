import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from './HeroSection';

const Home = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with: ${email}`);
    setEmail('');
  };

  const categories = [
    { id: 1, name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop' },
    { id: 2, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop' },
    { id: 3, name: 'Cleaning', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop' },
    { id: 4, name: 'Storage', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop' },
    { id: 5, name: 'Cookware', image: 'https://images.unsplash.com/photo-1584990347449-39b0635d788d?w=400&h=300&fit=crop' },
    { id: 6, name: 'Dining', image: 'https://images.unsplash.com/photo-1578991771779-1e8d0c0c8f4d?w=400&h=300&fit=crop' },
  ];

  const products = [
    { id: 1, name: 'Premium Chef Knife Set', description: 'Professional quality stainless steel', price: '$89.99', image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 2, name: 'Non-Stick Cookware Set', description: '10-piece ceramic coating', price: '$129.99', image: 'https://images.unsplash.com/photo-1584990347449-39b0635d788d?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 3, name: 'Smart Storage Containers', description: 'Airtight and stackable design', price: '$34.99', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 4, name: 'Luxury Cutting Board', description: 'Bamboo wood with juice groove', price: '$45.99', image: 'https://images.unsplash.com/photo-1594450501726-b5d5be5d7528?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 5, name: 'Elegant Dinner Set', description: '24-piece porcelain collection', price: '$159.99', image: 'https://images.unsplash.com/photo-1578991771779-1e8d0c0c8f4d?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 6, name: 'Modern Spice Rack', description: 'Rotating 20-jar organizer', price: '$54.99', image: 'https://images.unsplash.com/photo-1606775962616-a2f82abe8e29?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 7, name: 'Stainless Steel Blender', description: '1500W professional blender', price: '$94.99', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop', amazonLink: '#' },
    { id: 8, name: 'Kitchen Towel Set', description: 'Ultra-absorbent cotton blend', price: '$24.99', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop', amazonLink: '#' },
  ];

  const trustBadges = [
    { icon: '🏆', title: 'Amazon Trusted', description: 'Official Amazon seller' },
    { icon: '⭐', title: 'Premium Quality', description: 'Top-rated products only' },
    { icon: '🚚', title: 'Fast Delivery', description: 'Prime shipping available' },
    { icon: '❤️', title: 'Loved by 10,000+', description: 'Happy customers worldwide' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />

      <section id="categories" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">Explore by Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you need for your home</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-square overflow-hidden">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-lima-600 transition-colors">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">Our Bestsellers</h2>
            <p className="text-gray-600 text-lg">Top-rated products loved by our customers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <p className="text-xl font-bold text-lima-600 mb-4">{product.price}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-white border-2 border-lima-600 text-lima-600 rounded-lg hover:bg-lima-600 hover:text-white transition-all duration-300 font-medium text-sm">❤️ Wishlist</button>
                    <a href={product.amazonLink} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-lima-600 text-white rounded-lg hover:bg-lima-700 transition-all duration-300 font-medium text-center text-sm">🛍️ Buy Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1900px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">Why Choose Kitchivo?</h2>
            <p className="text-gray-600 text-lg">Your trusted partner for home essentials</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center p-6 bg-san-felix-100 rounded-xl hover:bg-lima-100 transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl mb-4">{badge.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{badge.title}</h3>
                <p className="text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-r from-lima-600 to-san-felix-500">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated with Kitchivo</h2>
          <p className="text-white/90 text-lg mb-8">Subscribe to get special offers, free giveaways, and exclusive deals.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800" />
            <button type="submit" className="px-8 py-3 bg-white text-lima-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
