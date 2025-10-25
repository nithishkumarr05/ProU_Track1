import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, Droplets, Leaf, Shield } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

const InteractiveDemo = ({ product }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showBenefits, setShowBenefits] = useState(false);

  const demoSteps = [
    {
      title: "Raw Material Selection",
      description: "Carefully selected premium seeds and nuts",
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Traditional Wood Pressing",
      description: "Cold-pressed using traditional wood-pressed methods",
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Quality Testing",
      description: "Rigorous quality checks for purity and freshness",
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Packaging & Delivery",
      description: "Eco-friendly packaging and fresh delivery",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  const benefits = [
    { icon: <Leaf className="w-5 h-5" />, text: "100% Natural & Organic" },
    { icon: <Shield className="w-5 h-5" />, text: "No Chemicals Added" },
    { icon: <Zap className="w-5 h-5" />, text: "Rich in Nutrients" },
    { icon: <Droplets className="w-5 h-5" />, text: "Cold-Pressed Fresh" }
  ];

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const stopDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Interactive Production Demo
          </h3>
          <div className="flex space-x-2">
            <Button
              onClick={isPlaying ? stopDemo : startDemo}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Start'} Demo
            </Button>
            <Button
              onClick={resetDemo}
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Demo Visualization */}
        <div className="relative mb-6">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <div className="mb-4">
                  {demoSteps[currentStep]?.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {demoSteps[currentStep]?.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {demoSteps[currentStep]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-6">
          {demoSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex-1 mx-1 p-3 rounded-lg text-center transition-all ${
                index === currentStep
                  ? 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200'
                  : index < currentStep
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
              animate={{
                scale: index === currentStep ? 1.05 : 1,
                opacity: index <= currentStep ? 1 : 0.6
              }}
            >
              <div className="mb-2">{step.icon}</div>
              <p className="text-xs font-medium">{step.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Toggle */}
        <div className="text-center">
          <Button
            onClick={() => setShowBenefits(!showBenefits)}
            variant="outline"
            className="mb-4"
          >
            {showBenefits ? 'Hide' : 'Show'} Health Benefits
          </Button>
          
          <AnimatePresence>
            {showBenefits && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900 rounded-lg"
                  >
                    <div className="text-green-600 dark:text-green-400">
                      {benefit.icon}
                    </div>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveDemo;
