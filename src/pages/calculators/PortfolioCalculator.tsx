import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, BarChart2, DollarSign, Percent, Plus, Trash2 } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface Stock {
  symbol: string;
  shares: number;
  price: number;
  cost: number;
}

const PortfolioCalculator: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'AAPL', shares: 100, price: 175.50, cost: 150.25 },
    { symbol: 'MSFT', shares: 50, price: 325.75, cost: 290.50 },
    { symbol: 'GOOGL', shares: 25, price: 135.25, cost: 120.75 }
  ]);
  const [newStock, setNewStock] = useState<Stock>({
    symbol: '',
    shares: 0,
    price: 0,
    cost: 0
  });

  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalGain, setTotalGain] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);

  const calculatePortfolio = () => {
    const value = stocks.reduce((sum, stock) => sum + stock.shares * stock.price, 0);
    const cost = stocks.reduce((sum, stock) => sum + stock.shares * stock.cost, 0);
    const gain = value - cost;
    const returnPercent = cost > 0 ? (gain / cost) * 100 : 0;

    setTotalValue(value);
    setTotalCost(cost);
    setTotalGain(gain);
    setTotalReturn(returnPercent);
  };

  useEffect(() => {
    calculatePortfolio();
  }, [stocks]);

  const addStock = () => {
    if (newStock.symbol && newStock.shares > 0 && newStock.price > 0 && newStock.cost > 0) {
      setStocks([...stocks, newStock]);
      setNewStock({ symbol: '', shares: 0, price: 0, cost: 0 });
    }
  };

  const removeStock = (index: number) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <CalculatorLayout
      title="Portfolio Calculator"
      description="Track and analyze your stock portfolio performance and returns."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card bg-primary-500/10">
              <h2 className="text-2xl font-heading text-white mb-6">Portfolio Summary</h2>
              <div className="text-4xl font-bold text-primary-400">
                {formatCurrency(totalValue)}
              </div>
              <p className="text-gray-400 mt-2">Total Portfolio Value</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="card bg-success-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Total Cost</h3>
                <div className="text-2xl font-bold text-success-400">
                  {formatCurrency(totalCost)}
                </div>
              </div>

              <div className="card bg-warning-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Total Gain/Loss</h3>
                <div className="text-2xl font-bold text-warning-400">
                  {formatCurrency(totalGain)}
                </div>
              </div>
            </div>

            <div className="card bg-accent-500/10">
              <h3 className="text-lg font-heading text-white mb-2">Total Return</h3>
              <div className="text-2xl font-bold text-accent-400">
                {totalReturn.toFixed(2)}%
              </div>
            </div>

            {/* Add New Stock */}
            <div className="card">
              <h3 className="text-lg font-heading text-white mb-4">Add New Stock</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Stock Symbol"
                  value={newStock.symbol}
                  onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
                  className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Number of Shares"
                      value={newStock.shares || ''}
                      onChange={(e) => setNewStock({ ...newStock, shares: Number(e.target.value) })}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      placeholder="Current Price"
                      value={newStock.price || ''}
                      onChange={(e) => setNewStock({ ...newStock, price: Number(e.target.value) })}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    placeholder="Cost Basis per Share"
                    value={newStock.cost || ''}
                    onChange={(e) => setNewStock({ ...newStock, cost: Number(e.target.value) })}
                    className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <button
                  onClick={addStock}
                  className="w-full bg-primary-500 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Stock
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stock List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Portfolio Holdings</h2>
              <div className="space-y-4">
                {stocks.map((stock, index) => {
                  const value = stock.shares * stock.price;
                  const cost = stock.shares * stock.cost;
                  const gain = value - cost;
                  const returnPercent = (gain / cost) * 100;

                  return (
                    <div
                      key={index}
                      className="bg-dark-500 rounded-lg p-4 flex flex-col gap-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary-500/20 p-2 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-primary-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-heading text-white">{stock.symbol}</h3>
                            <p className="text-gray-400">{stock.shares} shares</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeStock(index)}
                          className="text-error-400 hover:text-error-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Current Price</p>
                          <p className="text-white">{formatCurrency(stock.price)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Cost Basis</p>
                          <p className="text-white">{formatCurrency(stock.cost)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Market Value</p>
                          <p className="text-white">{formatCurrency(value)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Gain/Loss</p>
                          <p className={gain >= 0 ? 'text-success-400' : 'text-error-400'}>
                            {formatCurrency(gain)} ({returnPercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PortfolioCalculator;