'use client';

import { useState, useEffect } from 'react';
import { TimeCapsule } from '@/types';
import { getTimeCapsules, deleteTimeCapsule } from '@/lib/storage';
import { getEmotionConfig } from '@/lib/emotions';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { clsx } from 'clsx';
import { Trash2, Lock, Eye } from 'lucide-react';

interface TimeCapsuleListProps {
  refreshTrigger: number;
}

export default function TimeCapsuleList({ refreshTrigger }: TimeCapsuleListProps) {
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [selectedCapsule, setSelectedCapsule] = useState<TimeCapsule | null>(null);

  useEffect(() => {
    setCapsules(getTimeCapsules().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  }, [refreshTrigger]);

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个时光胶囊吗？此操作无法撤销。')) {
      deleteTimeCapsule(id);
      setCapsules(prev => prev.filter(c => c.id !== id));
      if (selectedCapsule?.id === id) {
        setSelectedCapsule(null);
      }
    }
  };

  if (capsules.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⏰</span>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">还没有时光胶囊</h3>
        <p className="text-gray-500">创建你的第一个时光胶囊，封存此刻的情绪</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">我的时光胶囊</h3>
      
      {capsules.map((capsule) => {
        const emotionConfig = getEmotionConfig(capsule.emotion);
        
        return (
          <div
            key={capsule.id}
            className={clsx(
              'border-2 rounded-xl p-4 transition-all cursor-pointer',
              emotionConfig.bgColor,
              selectedCapsule?.id === capsule.id
                ? 'ring-2 ring-purple-500 ring-offset-2'
                : 'hover:shadow-md'
            )}
            onClick={() => setSelectedCapsule(selectedCapsule?.id === capsule.id ? null : capsule)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{emotionConfig.icon}</span>
                  <h4 className="font-medium text-gray-800">{capsule.title}</h4>
                  {capsule.isPrivate && <Lock className="w-4 h-4 text-gray-500" />}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {format(capsule.createdAt, 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
                </p>
                
                <div className={clsx(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  emotionConfig.color,
                  emotionConfig.bgColor
                )}>
                  {emotionConfig.label}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCapsule(selectedCapsule?.id === capsule.id ? null : capsule);
                  }}
                  className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(capsule.id);
                  }}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {selectedCapsule?.id === capsule.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{capsule.content}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
