import React from "react";
import { usePreferredCurrency } from "../hooks/usePreferredCurrency";

const currencyOptions = [
  { code: "INR", label: "India (INR ₹)" },
  { code: "USD", label: "USA (USD $)" },
];

const currencyMap = currencyOptions.reduce((acc, option) => {
  acc[option.code] = option.label;
  return acc;
}, {});

const FooterCurrencySelector = () => {
  const { currency, setCurrency } = usePreferredCurrency();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-6">
      <p className="text-gray-800 text-xs sm:text-sm font-semibold mb-2">
        Preferred Currency
      </p>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full text-left text-xs sm:text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-lima-500 focus:border-lima-500 transition"
        >
          <span>{currencyMap[currency] || currencyMap.INR}</span>
          <svg
            className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg text-xs sm:text-sm overflow-hidden"
            role="listbox"
          >
            {currencyOptions.map((option) => (
              <li key={option.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={currency === option.code}
                  onClick={() => {
                    setCurrency(option.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-lima-50 transition ${
                    currency === option.code
                      ? "bg-lima-100 text-lima-800 font-semibold"
                      : "text-gray-800"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-gray-600 text-[11px] sm:text-xs mt-2">
        Prices update automatically across the site.
      </p>
    </div>
  );
};

export default FooterCurrencySelector;
