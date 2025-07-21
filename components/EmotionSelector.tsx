'use client';

import { EmotionType } from '@/types';
import { emotionConfigs } from '@/lib/emotions';
import { clsx } from 'clsx';

interface EmotionSelectorProps {
  selectedEmotion: EmotionType | null;
  onEmotionSelect: (emotion: EmotionType) => void;
  className?: string;
}

export default function EmotionSelector({ 
  selectedEmotion, 
  onEmotionSelect, 
  className 
}: EmotionSelectorProps) {
  return (
    <div className={clsx('space-y-3', className)}>
      <label className="block text-sm font-medium text-gray-700">
        选择当前情绪
      </label>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(emotionConfigs).map(([emotion, config]) => (
          <button
            key={emotion}
            type="button"
            onClick={() => onEmotionSelect(emotion as EmotionType)}
            className={clsx(
              'flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105',
              selectedEmotion === emotion
                ? `${config.bgColor} border-current ${config.color} shadow-md`
                : 'bg-white border-gray-200 hover:border-gray-300'
            )}
          >
            <span className="text-2xl mb-1">{config.icon}</span>
            <span className={clsx(
              'text-xs font-medium',
              selectedEmotion === emotion ? config.color : 'text-gray-600'
            )}>
              {config.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
