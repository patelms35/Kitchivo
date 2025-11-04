import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';
import BestsellersSection from './BestsellersSection';
import NewInSection from './NewInSection';
import FAQsSection from './FAQsSection';
import FindUsOnSection from './FindUsOnSection';

const Home = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with: ${email}`);
    setEmail('');
  };

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

      <CategoriesSection />

      <NewInSection />
      <BestsellersSection />


      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
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

      <FAQsSection />

      <FindUsOnSection />

      <section className="py-16 md:py-20 bg-gradient-to-r from-lima-600 to-san-felix-500">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
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
