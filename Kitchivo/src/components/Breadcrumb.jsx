import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              )}
              {item.href ? (
                item.href.startsWith('/') ? (
                  <Link 
                    to={item.href}
                    className="text-gray-500 hover:text-lima-600 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => navigate(item.href)}
                    className="text-gray-500 hover:text-lima-600 transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                )
              ) : (
                <span className="text-gray-900 font-semibold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
