import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Plus, Minus, RefreshCw, Download, Trash2 } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface Graph {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}

const GraphingCalculator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [graphs, setGraphs] = useState<Graph[]>([
    { id: '1', expression: 'x^2', color: '#3d94ff', visible: true }
  ]);
  const [xMin, setXMin] = useState<number>(-10);
  const [xMax, setXMax] = useState<number>(10);
  const [yMin, setYMin] = useState<number>(-10);
  const [yMax, setYMax] = useState<number>(10);
  const [scale, setScale] = useState<number>(1);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw axes
    drawAxes(ctx, canvas.width, canvas.height);

    // Draw graphs
    graphs.forEach(graph => {
      if (graph.visible) {
        drawFunction(ctx, graph.expression, graph.color, canvas.width, canvas.height);
      }
    });
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#292c43';
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = 0; x <= width; x += width / 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= height; y += height / 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawAxes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
  };

  const drawFunction = (
    ctx: CanvasRenderingContext2D,
    expression: string,
    color: string,
    width: number,
    height: number
  ) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const step = (xMax - xMin) / width;
    let isFirstPoint = true;

    for (let px = 0; px < width; px++) {
      const x = xMin + (px * (xMax - xMin)) / width;
      try {
        // Evaluate the expression
        const scope = { x };
        const y = evaluateExpression(expression, scope);

        if (typeof y === 'number' && !isNaN(y)) {
          const py = height - ((y - yMin) * height) / (yMax - yMin);
          
          if (isFirstPoint) {
            ctx.moveTo(px, py);
            isFirstPoint = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
      } catch (error) {
        // Skip invalid points
        continue;
      }
    }

    ctx.stroke();
  };

  const evaluateExpression = (expression: string, scope: { x: number }): number => {
    // Replace mathematical expressions with JavaScript equivalents
    const jsExpression = expression
      .replace(/\^/g, '**')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E');

    // Create a function from the expression
    const fn = new Function('x', `return ${jsExpression}`);
    return fn(scope.x);
  };

  useEffect(() => {
    drawGraph();
  }, [graphs, xMin, xMax, yMin, yMax, scale]);

  const addGraph = () => {
    const colors = ['#3d94ff', '#10c46b', '#ef4444', '#b931f7'];
    const newId = (graphs.length + 1).toString();
    setGraphs([
      ...graphs,
      {
        id: newId,
        expression: 'x',
        color: colors[graphs.length % colors.length],
        visible: true
      }
    ]);
  };

  const removeGraph = (id: string) => {
    setGraphs(graphs.filter(g => g.id !== id));
  };

  const updateExpression = (id: string, expression: string) => {
    setGraphs(graphs.map(g => 
      g.id === id ? { ...g, expression } : g
    ));
  };

  const toggleVisibility = (id: string) => {
    setGraphs(graphs.map(g =>
      g.id === id ? { ...g, visible: !g.visible } : g
    ));
  };

  const handleZoomIn = () => {
    setXMin(prev => prev * 0.8);
    setXMax(prev => prev * 0.8);
    setYMin(prev => prev * 0.8);
    setYMax(prev => prev * 0.8);
  };

  const handleZoomOut = () => {
    setXMin(prev => prev * 1.2);
    setXMax(prev => prev * 1.2);
    setYMin(prev => prev * 1.2);
    setYMax(prev => prev * 1.2);
  };

  const handleReset = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
    setScale(1);
  };

  return (
    <CalculatorLayout
      title="Graphing Calculator"
      description="Plot and analyze mathematical functions with our interactive graphing calculator."
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card bg-dark-600 p-6">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-full bg-dark-700 rounded-lg"
                />
                
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-dark-500 rounded-lg hover:bg-dark-400 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-dark-500 rounded-lg hover:bg-dark-400 transition-colors"
                  >
                    <Minus className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-2 bg-dark-500 rounded-lg hover:bg-dark-400 transition-colors"
                  >
                    <RefreshCw className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading text-white">Functions</h2>
                <button
                  onClick={addGraph}
                  className="p-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Plus className="h-5 w-5 text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {graphs.map(graph => (
                  <div
                    key={graph.id}
                    className="bg-dark-500 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full cursor-pointer"
                          style={{ backgroundColor: graph.color }}
                          onClick={() => toggleVisibility(graph.id)}
                        />
                        <span className="text-white">y =</span>
                      </div>
                      <button
                        onClick={() => removeGraph(graph.id)}
                        className="text-gray-400 hover:text-error-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={graph.expression}
                      onChange={(e) => updateExpression(graph.id, e.target.value)}
                      className="w-full bg-dark-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter function (e.g., x^2)"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">View Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">X Min</label>
                  <input
                    type="number"
                    value={xMin}
                    onChange={(e) => setXMin(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">X Max</label>
                  <input
                    type="number"
                    value={xMax}
                    onChange={(e) => setXMax(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Y Min</label>
                  <input
                    type="number"
                    value={yMin}
                    onChange={(e) => setYMin(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Y Max</label>
                  <input
                    type="number"
                    value={yMax}
                    onChange={(e) => setYMax(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="card bg-dark-500/50">
              <h3 className="text-xl font-heading text-white mb-4">Supported Functions</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Basic operations: +, -, *, /, ^</li>
                <li>• Trigonometric: sin(x), cos(x), tan(x)</li>
                <li>• Square root: sqrt(x)</li>
                <li>• Constants: pi, e</li>
                <li>• Example: sin(x) * e^(-x/4)</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default GraphingCalculator;