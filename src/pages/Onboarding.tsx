import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, BookOpen, Clock, Target, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    subjects: [] as string[],
    goals: [] as string[],
    studyTime: '',
    experience: '',
  });

  const steps = [
    {
      title: "Welcome to Nora AI!",
      subtitle: "Let's personalize your learning experience",
      icon: User,
    },
    {
      title: "Tell us about yourself",
      subtitle: "Basic information to get started",
      icon: User,
    },
    {
      title: "Choose your subjects",
      subtitle: "What would you like to learn?",
      icon: BookOpen,
    },
    {
      title: "Set your goals",
      subtitle: "What do you want to achieve?",
      icon: Target,
    },
    {
      title: "Study preferences",
      subtitle: "When do you prefer to study?",
      icon: Clock,
    },
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'History', 'Geography', 'Computer Science'
  ];

  const goals = [
    'Improve grades', 'Prepare for exams', 'Learn new concepts',
    'Homework help', 'Test preparation', 'General knowledge'
  ];

  const studyTimes = [
    'Morning (6AM - 12PM)', 'Afternoon (12PM - 6PM)', 
    'Evening (6PM - 10PM)', 'Night (10PM - 12AM)'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <img src="/icons/logo.svg" alt="Nora AI" className="h-20 w-20 mx-auto mb-4" />
              <h2 className="text-3xl font-marlin font-bold text-gray-900 mb-4">
                Welcome to Nora AI!
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Your personal AI tutor is ready to help you learn smarter, not harder. 
                Let's set up your personalized learning experience.
              </p>
            </div>
            <motion.div 
              className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <h3 className="font-semibold text-gray-900 mb-2">What you'll get:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Personalized learning sessions</li>
                <li>• Real-time transcription</li>
                <li>• Custom study plans</li>
                <li>• Progress tracking</li>
              </ul>
            </motion.div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Your age"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade/Level</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                    placeholder="e.g., 10th Grade"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600">Select the subjects you'd like to study with Nora:</p>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map((subject, index) => (
                <motion.button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${
                    formData.subjects.includes(subject)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject}</span>
                    {formData.subjects.includes(subject) && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600">What are your learning goals?</p>
            <div className="grid grid-cols-1 gap-3">
              {goals.map((goal, index) => (
                <motion.button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    formData.goals.includes(goal)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{goal}</span>
                    {formData.goals.includes(goal) && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600">When do you prefer to study?</p>
            <div className="space-y-3">
              {studyTimes.map((time, index) => (
                <motion.button
                  key={time}
                  onClick={() => setFormData(prev => ({ ...prev, studyTime: time }))}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                    formData.studyTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{time}</span>
                    {formData.studyTime === time && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🎉 You're all set!</h3>
              <p className="text-green-700">
                Your personalized learning experience is ready. Click "Get Started" to begin your journey with Nora AI.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Header */}
        <motion.div 
          className="text-center mb-8"
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-marlin font-bold text-gray-900 mb-2">
            {/* {steps[currentStep].title} */}
          </h1>
          <p className="text-gray-600">{steps[currentStep].subtitle}</p>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={currentStep === steps.length - 1 ? () => window.location.href = '/dashboard' : handleNext}
            className="flex items-center gap-2"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;