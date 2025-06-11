import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Scale, Activity, Apple, Dumbbell, Ruler, Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface HealthMetrics {
  bmi: number;
  bodyFat: number;
  bmr: number;
  tdee: number;
  idealWeight: number;
}

interface CalculationHistory {
  metrics: HealthMetrics;
  inputs: {
    age: number;
    weight: number;
    height: number;
    gender: string;
    activity: string;
    neck: number;
    waist: number;
    hip: number;
  };
  timestamp: Date;
}

const HealthCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [gender, setGender] = useState<string>('male');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [neck, setNeck] = useState<number>(35);
  const [waist, setWaist] = useState<number>(80);
  const [hip, setHip] = useState<number>(90);
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  const activityLevels = {
    sedentary: { label: 'Sedentary', factor: 1.2 },
    light: { label: 'Lightly Active', factor: 1.375 },
    moderate: { label: 'Moderately Active', factor: 1.55 },
    very: { label: 'Very Active', factor: 1.725 },
    extra: { label: 'Extra Active', factor: 1.9 }
  };

  const calculateBMI = (weightKg: number, heightCm: number): number => {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  };

  const calculateBodyFat = (waist: number, neck: number, height: number, hip: number, gender: string): number => {
    if (gender === 'male') {
      return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
  };

  const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  const calculateTDEE = (bmr: number, activity: string): number => {
    return bmr * activityLevels[activity as keyof typeof activityLevels].factor;
  };

  const calculateIdealWeight = (height: number, gender: string): number => {
    const heightInInches = height / 2.54;
    if (gender === 'male') {
      return 50 + 2.3 * (heightInInches - 60);
    } else {
      return 45.5 + 2.3 * (heightInInches - 60);
    }
  };

  const handleCalculate = () => {
    const bmi = calculateBMI(weight, height);
    const bodyFat = calculateBodyFat(waist, neck, height, hip, gender);
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activityLevel);
    const idealWeight = calculateIdealWeight(height, gender);

    const newMetrics = {
      bmi,
      bodyFat,
      bmr,
      tdee,
      idealWeight
    };

    setMetrics(newMetrics);
    setHistory([
      {
        metrics: newMetrics,
        inputs: {
          age,
          weight,
          height,
          gender,
          activity: activityLevel,
          neck,
          waist,
          hip
        },
        timestamp: new Date()
      },
      ...history
    ]);
  };

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-warning-400' };
    if (bmi < 25) return { category: 'Normal', color: 'text-success-400' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-warning-400' };
    return { category: 'Obese', color: 'text-error-400' };
  };

  return (
    <CalculatorLayout
      title="Health Calculator"
      description="Calculate your BMI, body fat percentage, daily calorie needs, and more."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Input Form */}
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Activity Level</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {Object.entries(activityLevels).map(([key, { label }]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Neck (cm)</label>
                    <input
                      type="number"
                      value={neck}
                      onChange={(e) => setNeck(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Waist (cm)</label>
                    <input
                      type="number"
                      value={waist}
                      onChange={(e) => setWaist(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Hip (cm)</label>
                    <input
                      type="number"
                      value={hip}
                      onChange={(e) => setHip(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                >
                  Calculate
                </button>
              </div>
            </div>

            {/* Results */}
            {metrics && (
              <div className="space-y-6">
                <div className="card bg-primary-500/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-heading text-white">BMI</h3>
                    <Scale className="h-6 w-6 text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-primary-400 mb-2">
                    {metrics.bmi.toFixed(1)}
                  </div>
                  <p className={`${getBMICategory(metrics.bmi).color}`}>
                    {getBMICategory(metrics.bmi).category}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="card bg-success-500/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-heading text-white">Body Fat %</h3>
                      <Ruler className="h-6 w-6 text-success-400" />
                    </div>
                    <div className="text-2xl font-bold text-success-400">
                      {metrics.bodyFat.toFixed(1)}%
                    </div>
                  </div>

                  <div className="card bg-warning-500/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-heading text-white">Ideal Weight</h3>
                      <Scale className="h-6 w-6 text-warning-400" />
                    </div>
                    <div className="text-2xl font-bold text-warning-400">
                      {metrics.idealWeight.toFixed(1)} kg
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="card bg-accent-500/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-heading text-white">BMR</h3>
                      <Activity className="h-6 w-6 text-accent-400" />
                    </div>
                    <div className="text-2xl font-bold text-accent-400">
                      {Math.round(metrics.bmr)} kcal
                    </div>
                  </div>

                  <div className="card bg-primary-500/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-heading text-white">TDEE</h3>
                      <Dumbbell className="h-6 w-6 text-primary-400" />
                    </div>
                    <div className="text-2xl font-bold text-primary-400">
                      {Math.round(metrics.tdee)} kcal
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-heading text-white mb-6">Calculation History</h2>
            <div className="space-y-6">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">
                      {entry.inputs.gender === 'male' ? 'Male' : 'Female'}, {entry.inputs.age} years
                    </span>
                    <span className="text-primary-400">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Height</p>
                      <p className="text-white">{entry.inputs.height} cm</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Weight</p>
                      <p className="text-white">{entry.inputs.weight} kg</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">BMI</p>
                      <p className={`${getBMICategory(entry.metrics.bmi).color}`}>
                        {entry.metrics.bmi.toFixed(1)} ({getBMICategory(entry.metrics.bmi).category})
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Body Fat</p>
                      <p className="text-success-400">{entry.metrics.bodyFat.toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Daily Calories (BMR)</p>
                      <p className="text-accent-400">{Math.round(entry.metrics.bmr)} kcal</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Daily Calories (TDEE)</p>
                      <p className="text-primary-400">{Math.round(entry.metrics.tdee)} kcal</p>
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

export default HealthCalculator;