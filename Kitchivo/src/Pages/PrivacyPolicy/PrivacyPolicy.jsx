import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
      <p className="mb-4 text-gray-700">Your privacy is important to us. This Privacy Policy explains how Kitchivo collects, uses, and protects your personal information when you use our website and services.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Information We Collect</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Personal information you provide (name, email, address, etc.)</li>
        <li>Order and payment details</li>
        <li>Usage data and cookies</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">How We Use Information</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>To process orders and provide services</li>
        <li>To improve our website and user experience</li>
        <li>To send updates and marketing (with your consent)</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Your Rights</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Access, update, or delete your personal data</li>
        <li>Opt out of marketing communications</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Contact Us</h2>
      <p className="text-gray-700">If you have any questions about this Privacy Policy, please contact us at demo@demo.com.</p>
    </div>
    <Footer />
  </div>
);

export default PrivacyPolicy;
