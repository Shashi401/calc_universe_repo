import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface Grade {
  name: string;
  score: number;
  weight: number;
}

const GradeCalculator: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([
    { name: 'Midterm', score: 85, weight: 30 },
    { name: 'Final', score: 90, weight: 40 },
    { name: 'Assignments', score: 88, weight: 30 }
  ]);
  const [newGrade, setNewGrade] = useState<Grade>({
    name: '',
    score: 0,
    weight: 0
  });

  const calculateWeightedAverage = () => {
    const totalWeight = grades.reduce((sum, grade) => sum + grade.weight, 0);
    if (totalWeight === 0) return 0;

    const weightedSum = grades.reduce((sum, grade) => sum + (grade.score * grade.weight), 0);
    return weightedSum / totalWeight;
  };

  const getLetterGrade = (score: number) => {
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    if (score >= 73) return 'C';
    if (score >= 70) return 'C-';
    if (score >= 67) return 'D+';
    if (score >= 63) return 'D';
    if (score >= 60) return 'D-';
    return 'F';
  };

  const addGrade = () => {
    if (newGrade.name && newGrade.score >= 0 && newGrade.weight > 0) {
      setGrades([...grades, newGrade]);
      setNewGrade({ name: '', score: 0, weight: 0 });
    }
  };

  const removeGrade = (index: number) => {
    setGrades(grades.filter((_, i) => i !== index));
  };

  const finalGrade = calculateWeightedAverage();
  const letterGrade = getLetterGrade(finalGrade);

  return (
    <CalculatorLayout
      title="Grade Calculator"
      description="Calculate your weighted average grade and final letter grade."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Add Grade</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Assignment Name"
                  value={newGrade.name}
                  onChange={(e) => setNewGrade({ ...newGrade, name: e.target.value })}
                  className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Score (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newGrade.score}
                      onChange={(e) => setNewGrade({ ...newGrade, score: Number(e.target.value) })}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Weight (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newGrade.weight}
                      onChange={(e) => setNewGrade({ ...newGrade, weight: Number(e.target.value) })}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <button
                  onClick={addGrade}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Grade
                </button>
              </div>
            </div>

            <div className="card bg-primary-500/10">
              <h2 className="text-2xl font-heading text-white mb-6">Final Grade</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-1">Weighted Average</p>
                  <div className="text-4xl font-bold text-primary-400">
                    {finalGrade.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Letter Grade</p>
                  <div className="text-4xl font-bold text-success-400">
                    {letterGrade}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-heading text-white mb-6">Grade Breakdown</h2>
            <div className="space-y-4">
              {grades.map((grade, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex-grow">
                    <h3 className="text-white font-medium">{grade.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                      <div>
                        <p className="text-gray-400">Score</p>
                        <p className="text-primary-400">{grade.score}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Weight</p>
                        <p className="text-warning-400">{grade.weight}%</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeGrade(index)}
                    className="text-error-400 hover:text-error-300 ml-4"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}

              {grades.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No grades added yet. Add some grades to calculate your average.
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-dark-500 rounded-lg">
              <h3 className="text-lg font-heading text-white mb-4">Grading Scale</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-success-400">A: 93-100%</p>
                  <p className="text-success-400">A-: 90-92%</p>
                </div>
                <div>
                  <p className="text-primary-400">B+: 87-89%</p>
                  <p className="text-primary-400">B: 83-86%</p>
                  <p className="text-primary-400">B-: 80-82%</p>
                </div>
                <div>
                  <p className="text-warning-400">C+: 77-79%</p>
                  <p className="text-warning-400">C: 73-76%</p>
                  <p className="text-warning-400">C-: 70-72%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default GradeCalculator;