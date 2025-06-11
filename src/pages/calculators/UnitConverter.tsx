import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Divide } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

type UnitCategory = 'length' | 'mass' | 'temperature' | 'volume' | 'area' | 'time';

interface UnitConversion {
  from: string;
  to: string;
  value: number;
  result: number;
  category: UnitCategory;
  timestamp: Date;
}

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('km');
  const [value, setValue] = useState<number>(1);
  const [history, setHistory] = useState<UnitConversion[]>([]);

  const unitCategories: Record<UnitCategory, { name: string; units: Record<string, string> }> = {
    length: {
      name: 'Length',
      units: {
        km: 'Kilometers',
        m: 'Meters',
        cm: 'Centimeters',
        mm: 'Millimeters',
        mi: 'Miles',
        yd: 'Yards',
        ft: 'Feet',
        in: 'Inches'
      }
    },
    mass: {
      name: 'Mass',
      units: {
        kg: 'Kilograms',
        g: 'Grams',
        mg: 'Milligrams',
        lb: 'Pounds',
        oz: 'Ounces'
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        c: 'Celsius',
        f: 'Fahrenheit',
        k: 'Kelvin'
      }
    },
    volume: {
      name: 'Volume',
      units: {
        l: 'Liters',
        ml: 'Milliliters',
        gal: 'Gallons',
        qt: 'Quarts',
        pt: 'Pints',
        cup: 'Cups',
        floz: 'Fluid Ounces'
      }
    },
    area: {
      name: 'Area',
      units: {
        m2: 'Square Meters',
        km2: 'Square Kilometers',
        cm2: 'Square Centimeters',
        mm2: 'Square Millimeters',
        ha: 'Hectares',
        ac: 'Acres',
        ft2: 'Square Feet',
        in2: 'Square Inches'
      }
    },
    time: {
      name: 'Time',
      units: {
        s: 'Seconds',
        min: 'Minutes',
        h: 'Hours',
        d: 'Days',
        wk: 'Weeks',
        mo: 'Months',
        yr: 'Years'
      }
    }
  };

  // Conversion factors relative to base unit for each category
  const conversionFactors: Record<UnitCategory, Record<string, number>> = {
    length: {
      km: 1000,
      m: 1,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.34,
      yd: 0.9144,
      ft: 0.3048,
      in: 0.0254
    },
    mass: {
      kg: 1000,
      g: 1,
      mg: 0.001,
      lb: 453.592,
      oz: 28.3495
    },
    temperature: {
      c: 1,
      f: 1,
      k: 1
    },
    volume: {
      l: 1,
      ml: 0.001,
      gal: 3.78541,
      qt: 0.946353,
      pt: 0.473176,
      cup: 0.236588,
      floz: 0.0295735
    },
    area: {
      m2: 1,
      km2: 1000000,
      cm2: 0.0001,
      mm2: 0.000001,
      ha: 10000,
      ac: 4046.86,
      ft2: 0.092903,
      in2: 0.00064516
    },
    time: {
      s: 1,
      min: 60,
      h: 3600,
      d: 86400,
      wk: 604800,
      mo: 2592000,
      yr: 31536000
    }
  };

  const convert = (value: number, from: string, to: string, category: UnitCategory): number => {
    if (category === 'temperature') {
      // Special handling for temperature conversions
      let celsius;
      switch (from) {
        case 'f':
          celsius = (value - 32) * (5/9);
          break;
        case 'k':
          celsius = value - 273.15;
          break;
        default:
          celsius = value;
      }

      switch (to) {
        case 'f':
          return (celsius * 9/5) + 32;
        case 'k':
          return celsius + 273.15;
        default:
          return celsius;
      }
    } else {
      // Standard conversion using factors
      const factors = conversionFactors[category];
      const baseValue = value * factors[from];
      return baseValue / factors[to];
    }
  };

  const handleConvert = () => {
    const result = convert(value, fromUnit, toUnit, category);
    const conversion: UnitConversion = {
      from: fromUnit,
      to: toUnit,
      value,
      result,
      category,
      timestamp: new Date()
    };
    setHistory([conversion, ...history]);
  };

  const formatValue = (value: number): string => {
    return value.toLocaleString(undefined, {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0
    });
  };

  return (
    <CalculatorLayout
      title="Unit Converter"
      description="Convert between different units of measurement with precision."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Unit Categories */}
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Select Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(unitCategories).map(([key, { name }]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCategory(key as UnitCategory);
                      setFromUnit(Object.keys(unitCategories[key as UnitCategory].units)[0]);
                      setToUnit(Object.keys(unitCategories[key as UnitCategory].units)[1]);
                    }}
                    className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                      category === key
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                    }`}
                  >
                    <Divide className="h-6 w-6" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion Form */}
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Convert</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Value</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-gray-300 mb-2">From</label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {Object.entries(unitCategories[category].units).map(([key, name]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-primary-400" />
                  </div>

                  <div className="sm:col-start-2">
                    <label className="block text-gray-300 mb-2">To</label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {Object.entries(unitCategories[category].units).map(([key, name]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleConvert}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                >
                  Convert
                </button>
              </div>
            </div>
          </motion.div>

          {/* Conversion History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-heading text-white mb-6">Conversion History</h2>
            <div className="space-y-4">
              {history.map((conversion, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">
                      {unitCategories[conversion.category].name}
                    </span>
                    <span className="text-primary-400">
                      {conversion.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-medium">
                        {formatValue(conversion.value)} {conversion.from}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">
                        {formatValue(conversion.result)} {conversion.to}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default UnitConverter;