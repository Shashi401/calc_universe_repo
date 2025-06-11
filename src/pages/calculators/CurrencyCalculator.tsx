import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, RefreshCw, ArrowRight } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ExchangeRates {
  [key: string]: number;
}

const CurrencyCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
    { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
    { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
    { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'COP', name: 'Colombian Peso', symbol: '$' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
    { code: 'RON', name: 'Romanian Leu', symbol: 'lei' }
  ];

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again later.');
      console.error('Error fetching exchange rates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 300000);
    return () => clearInterval(interval);
  }, []);

  const convertCurrency = () => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setError('Exchange rates not available');
      return;
    }

    // Convert to USD first (base currency), then to target currency
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const result = amountInUSD * exchangeRates[toCurrency];
    setConvertedAmount(result);
  };

  useEffect(() => {
    if (!isLoading && Object.keys(exchangeRates).length > 0) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getPopularCurrencies = () => {
    const popular = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD'];
    return popular.filter(code => code !== fromCurrency);
  };

  return (
    <CalculatorLayout
      title="Currency Converter"
      description="Convert between different currencies using real-time exchange rates."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card bg-dark-600 backdrop-blur-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-4">
                <label className="block text-gray-300">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-dark-500 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={isLoading}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={swapCurrencies}
                  className="bg-primary-500/20 p-4 rounded-full hover:bg-primary-500/30 transition-colors"
                  disabled={isLoading}
                >
                  <RefreshCw className="h-6 w-6 text-primary-400" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <label className="block text-gray-300">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full bg-dark-500 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={isLoading}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="text"
                    value={isLoading ? 'Loading...' : error ? 'Error' : formatCurrency(convertedAmount, toCurrency)}
                    readOnly
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-error-500/20 text-error-400 rounded-lg">
                {error}
              </div>
            )}

            {!error && !isLoading && (
              <div className="mt-8 p-4 bg-dark-500 rounded-lg">
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-gray-400">
                    {formatCurrency(1, fromCurrency)}
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">
                    {formatCurrency(exchangeRates[toCurrency] / exchangeRates[fromCurrency], toCurrency)}
                  </span>
                </div>
                {lastUpdated && (
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {getPopularCurrencies().map(code => {
              if (isLoading || error) return null;
              const rate = exchangeRates[code] / exchangeRates[fromCurrency];
              const convertedValue = amount * rate;
              const currency = currencies.find(c => c.code === code)!;

              return (
                <div key={code} className="card bg-dark-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-heading text-white">{code}</h3>
                      <p className="text-gray-400">{currency.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-400">
                        {formatCurrency(convertedValue, code)}
                      </p>
                      <p className="text-sm text-gray-400">
                        Rate: {rate.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          <p>Exchange rates provided by ExchangeRate-API. Updated every 5 minutes.</p>
        </motion.div>
      </div>
    </CalculatorLayout>
  );
};

export default CurrencyCalculator;