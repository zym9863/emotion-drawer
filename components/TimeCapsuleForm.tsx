'use client';

import { useState } from 'react';
import { TimeCapsule, EmotionType } from '@/types';
import { saveTimeCapsule } from '@/lib/storage';
import EmotionSelector from './EmotionSelector';
import { clsx } from 'clsx';
import { Send, Image as ImageIcon } from 'lucide-react';

interface TimeCapsuleFormProps {
  onSave: () => void;
}

export default function TimeCapsuleForm({ onSave }: TimeCapsuleFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<EmotionType | null>(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !emotion) return;

    setIsSubmitting(true);

    const capsule: TimeCapsule = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      emotion,
      createdAt: new Date(),
      isPrivate,
      images: []
    };

    try {
      saveTimeCapsule(capsule);
      
      // Reset form
      setTitle('');
      setContent('');
      setEmotion(null);
      setIsPrivate(true);
      
      onSave();
    } catch (error) {
      console.error('保存时光胶囊失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">⏰</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">创建时光胶囊</h2>
          <p className="text-sm text-gray-600">封存此刻的情绪与想法</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            胶囊标题
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="给这个时光胶囊起个名字..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>

        <EmotionSelector
          selectedEmotion={emotion}
          onEmotionSelect={setEmotion}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            内容
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你想说的话、无法寄出的信件、或是特殊的回忆..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPrivate"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="isPrivate" className="text-sm text-gray-700">
            设为私密（只有你能看到）
          </label>
        </div>

        <button
          type="submit"
          disabled={!title.trim() || !content.trim() || !emotion || isSubmitting}
          className={clsx(
            'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all',
            (!title.trim() || !content.trim() || !emotion || isSubmitting)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
          )}
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? '封存中...' : '封存胶囊'}
        </button>
      </form>
    </div>
  );
}
