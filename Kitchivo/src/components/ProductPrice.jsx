import React from "react";
import { usePreferredCurrency } from "../hooks/usePreferredCurrency";

const ProductPrice = ({ product }) => {
  const { currency } = usePreferredCurrency();
  const isINR = currency === "INR";

  const mrpValue = isINR ? product?.mrp : product?.price_in_dolor;
  const saleValue = isINR ? product?.sale_price : product?.sale_price_in_dollar;

  const formatValue = (value) => {
    if (value === undefined || value === null || value === "") {
      return "-";
    }

    const symbol = isINR ? "₹" : "$";
    return `${symbol} ${value}`;
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm sm:text-base font-normal text-gray-400 line-through">
        {formatValue(mrpValue)}
      </p>
      <p className="text-base sm:text-lg font-semibold text-san-felix-800">
        {formatValue(saleValue)}
      </p>
    </div>
  );
};

export default ProductPrice;
