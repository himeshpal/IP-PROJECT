import React, { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw, Repeat } from "lucide-react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(200);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = "97f1ee97af1e2bd9cabffd6bdd900b17";
  const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(API_URL);
        setCurrencies(Object.keys(response.data.rates));
      } catch (err) {
        setError("Failed to fetch currency list.");
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      fetchExchangeRate();
    }
  }, [baseCurrency, targetCurrency]);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(API_URL);
      const rates = response.data.rates;
      if (rates) {
        setExchangeRate(rates[targetCurrency] / rates[baseCurrency]);
        setError(null);
      } else {
        setError("Invalid currency selection.");
      }
    } catch (err) {
      setError("Error fetching exchange rate.");
    }
  };

  const handleSwapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Currency Converter
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">From</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSwapCurrencies}
            className="p-3 mx-3 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <Repeat className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">To</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
            <p className="text-lg font-medium text-gray-600">
              Converted Amount
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {(amount * exchangeRate).toFixed(2)} {targetCurrency}
            </p>
          </div>
        )}
        <button
          onClick={fetchExchangeRate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105"
        >
          <RefreshCw className="mr-2 h-5 w-5" /> Refresh Rates
        </button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
