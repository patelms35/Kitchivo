import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';

const TermsOfService = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Terms of Service</h1>
      <p className="mb-4 text-gray-700">By using the Kitchivo website and services, you agree to the following terms and conditions. Please read them carefully.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Use of Service</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>You must be at least 18 years old or have parental consent.</li>
        <li>Do not misuse our services or attempt unauthorized access.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Orders & Payments</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>All orders are subject to acceptance and availability.</li>
        <li>Prices and product details may change without notice.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Limitation of Liability</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Kitchivo is not liable for indirect or consequential damages.</li>
        <li>Service is provided "as is" without warranties.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Contact Us</h2>
      <p className="text-gray-700">For questions about these Terms, contact us at demo@demo.com.</p>
    </div>
    <Footer />
  </div>
);

export default TermsOfService;
