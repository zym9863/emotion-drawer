'use client';

import { useState } from 'react';
import { X, Clock, Heart, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface WelcomeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeGuide({ isOpen, onClose }: WelcomeGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: '欢迎来到情绪抽屉',
      content: '这是一个私密的情绪记录空间，帮助你记录当下的感受，与未来的自己对话。',
      icon: '💝'
    },
    {
      title: '时光胶囊',
      content: '像写日记一样记录你的情绪和想法，每个胶囊都可以打上情绪标签，完全私密安全。',
      icon: '⏰'
    },
    {
      title: '释怀之约',
      content: '创建与未来自己的约定，设定开启时间，让时间帮助你观察心境的变化，走向释怀。',
      icon: '💙'
    },
    {
      title: '开始你的情绪之旅',
      content: '选择一个功能开始记录吧！记住，这里是你安全的情感港湾。',
      icon: '🌟'
    }
  ];

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="text-4xl mb-2">{currentStepData.icon}</div>
            <h2 className="text-xl font-bold">{currentStepData.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-center leading-relaxed mb-6">
            {currentStepData.content}
          </p>

          {/* Progress */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={clsx(
                  'w-2 h-2 rounded-full transition-colors',
                  index === currentStep
                    ? 'bg-purple-500'
                    : index < currentStep
                    ? 'bg-purple-300'
                    : 'bg-gray-200'
                )}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={clsx(
                'px-4 py-2 rounded-lg font-medium transition-all',
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              )}
            >
              上一步
            </button>

            <button
              onClick={() => {
                if (isLastStep) {
                  onClose();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              {isLastStep ? '开始使用' : '下一步'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
