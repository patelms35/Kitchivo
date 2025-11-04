import React, { useState } from 'react';

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What are your shipping options?',
      answer: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Prime members get free standard shipping on all orders.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return.'
    },
    {
      question: 'Are all products genuine and original?',
      answer: 'Yes, all our products are 100% genuine and sourced directly from authorized manufacturers and distributors. We guarantee authenticity on every item.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within India. We are working on expanding our shipping services to international locations in the near future.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number to track your order on our website or the courier\'s website.'
    },
    {
      question: 'Do you offer bulk or wholesale pricing?',
      answer: 'Yes, we offer special pricing for bulk orders. Please contact our sales team at sales@kitchivo.com for more information about wholesale opportunities.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-lima-100 text-lima-700 rounded-full text-sm font-semibold mb-4">
            HELP CENTER
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Find answers to common questions about our products and services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-lima-500 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-left font-semibold text-gray-800 text-lg pr-4">
                  {faq.question}
                </span>
                <svg 
                  className={`w-6 h-6 text-lima-600 transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-6 py-5 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-3 bg-lima-600 text-white font-semibold rounded-lg hover:bg-lima-700 transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
