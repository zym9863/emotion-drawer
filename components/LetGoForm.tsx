'use client';

import { useState } from 'react';
import { LetGoNote, EmotionType } from '@/types';
import { saveLetGoNote } from '@/lib/storage';
import EmotionSelector from './EmotionSelector';
import { clsx } from 'clsx';
import { Calendar, Heart } from 'lucide-react';
import { format, addDays, addMonths, addYears } from 'date-fns';

interface LetGoFormProps {
  onSave: () => void;
}

export default function LetGoForm({ onSave }: LetGoFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<EmotionType | null>(null);
  const [openDate, setOpenDate] = useState<Date>(addMonths(new Date(), 3));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickDateOptions = [
    { label: '1个月后', date: addMonths(new Date(), 1) },
    { label: '3个月后', date: addMonths(new Date(), 3) },
    { label: '6个月后', date: addMonths(new Date(), 6) },
    { label: '1年后', date: addYears(new Date(), 1) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !emotion) return;

    setIsSubmitting(true);

    const note: LetGoNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      emotion,
      createdAt: new Date(),
      openDate,
      isOpened: false,
      reminderSent: false
    };

    try {
      saveLetGoNote(note);
      
      // Reset form
      setTitle('');
      setContent('');
      setEmotion(null);
      setOpenDate(addMonths(new Date(), 3));
      
      onSave();
    } catch (error) {
      console.error('保存释怀之约失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">释怀之约</h2>
          <p className="text-sm text-gray-600">与未来的自己约定一个和解的时刻</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            约定标题
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="这个约定是关于什么的..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>

        <EmotionSelector
          selectedEmotion={emotion}
          onEmotionSelect={setEmotion}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            写给未来的自己
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你现在的感受、困扰，以及对未来自己的期望..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            开启时间
          </label>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickDateOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setOpenDate(option.date)}
                className={clsx(
                  'px-3 py-2 text-sm rounded-lg border transition-all',
                  format(openDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd')
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={format(openDate, 'yyyy-MM-dd')}
              onChange={(e) => setOpenDate(new Date(e.target.value))}
              min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!title.trim() || !content.trim() || !emotion || isSubmitting}
          className={clsx(
            'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all',
            (!title.trim() || !content.trim() || !emotion || isSubmitting)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl'
          )}
        >
          <Heart className="w-4 h-4" />
          {isSubmitting ? '创建中...' : '创建约定'}
        </button>
      </form>
    </div>
  );
}
