import { EmotionConfig, EmotionType } from '@/types';

export const emotionConfigs: Record<EmotionType, EmotionConfig> = {
  happy: {
    label: '开心',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200',
    icon: '😊'
  },
  sad: {
    label: '难过',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    icon: '😢'
  },
  angry: {
    label: '愤怒',
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200',
    icon: '😠'
  },
  anxious: {
    label: '焦虑',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    icon: '😰'
  },
  peaceful: {
    label: '平静',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    icon: '😌'
  },
  confused: {
    label: '困惑',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    icon: '😕'
  },
  nostalgic: {
    label: '怀念',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 border-pink-200',
    icon: '🥺'
  },
  hopeful: {
    label: '希望',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 border-cyan-200',
    icon: '🌟'
  },
  lonely: {
    label: '孤独',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 border-gray-200',
    icon: '😔'
  },
  grateful: {
    label: '感恩',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    icon: '🙏'
  }
};

export const getEmotionConfig = (emotion: EmotionType): EmotionConfig => {
  return emotionConfigs[emotion];
};
