import React from "react";

const STORAGE_KEY = "preferredCurrency";
const DEFAULT_CURRENCY = "INR";

const getInitialCurrency = () => {
  if (typeof window === "undefined") {
    return DEFAULT_CURRENCY;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "INR" || stored === "USD") {
    return stored;
  }

  return DEFAULT_CURRENCY;
};

let currentCurrency = getInitialCurrency();
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener(currentCurrency);
    } catch (e) {
      // ignore listener errors
    }
  });
};

const setGlobalCurrency = (nextCurrency) => {
  if (nextCurrency !== "INR" && nextCurrency !== "USD") return;
  if (nextCurrency === currentCurrency) return;

  currentCurrency = nextCurrency;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, currentCurrency);
  }

  notifyListeners();
};

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (
      event.key === STORAGE_KEY &&
      (event.newValue === "INR" || event.newValue === "USD")
    ) {
      currentCurrency = event.newValue;
      notifyListeners();
    }
  });
}

export const usePreferredCurrency = () => {
  const [currency, setCurrencyState] = React.useState(currentCurrency);

  React.useEffect(() => {
    listeners.add(setCurrencyState);
    setCurrencyState(currentCurrency);

    return () => {
      listeners.delete(setCurrencyState);
    };
  }, []);

  return {
    currency,
    setCurrency: setGlobalCurrency,
  };
};
