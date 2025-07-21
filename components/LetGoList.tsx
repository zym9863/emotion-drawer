'use client';

import { useState, useEffect } from 'react';
import { LetGoNote } from '@/types';
import { getLetGoNotes, updateLetGoNote, deleteLetGoNote } from '@/lib/storage';
import { getEmotionConfig } from '@/lib/emotions';
import { format, isAfter, differenceInDays } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { clsx } from 'clsx';
import { Trash2, Lock, Unlock, Clock, Heart } from 'lucide-react';

interface LetGoListProps {
  refreshTrigger: number;
}

export default function LetGoList({ refreshTrigger }: LetGoListProps) {
  const [notes, setNotes] = useState<LetGoNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<LetGoNote | null>(null);

  useEffect(() => {
    setNotes(getLetGoNotes().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  }, [refreshTrigger]);

  const handleOpen = (note: LetGoNote) => {
    if (!note.isOpened && isAfter(new Date(), note.openDate)) {
      updateLetGoNote(note.id, { isOpened: true });
      setNotes(prev => prev.map(n => n.id === note.id ? { ...n, isOpened: true } : n));
    }
    setSelectedNote(selectedNote?.id === note.id ? null : note);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个释怀之约吗？此操作无法撤销。')) {
      deleteLetGoNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
    }
  };

  const canOpen = (note: LetGoNote) => {
    return note.isOpened || isAfter(new Date(), note.openDate);
  };

  const getDaysRemaining = (note: LetGoNote) => {
    if (note.isOpened) return null;
    const days = differenceInDays(note.openDate, new Date());
    return days > 0 ? days : 0;
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">还没有释怀之约</h3>
        <p className="text-gray-500">创建一个与未来自己的约定</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">我的释怀之约</h3>
      
      {notes.map((note) => {
        const emotionConfig = getEmotionConfig(note.emotion);
        const daysRemaining = getDaysRemaining(note);
        const isOpenable = canOpen(note);
        
        return (
          <div
            key={note.id}
            className={clsx(
              'border-2 rounded-xl p-4 transition-all',
              emotionConfig.bgColor,
              isOpenable ? 'cursor-pointer hover:shadow-md' : 'opacity-75',
              selectedNote?.id === note.id && isOpenable
                ? 'ring-2 ring-blue-500 ring-offset-2'
                : ''
            )}
            onClick={() => isOpenable && handleOpen(note)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{emotionConfig.icon}</span>
                  <h4 className="font-medium text-gray-800">{note.title}</h4>
                  {note.isOpened ? (
                    <Unlock className="w-4 h-4 text-green-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  创建于 {format(note.createdAt, 'yyyy年MM月dd日', { locale: zhCN })}
                </p>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className={clsx(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    emotionConfig.color,
                    emotionConfig.bgColor
                  )}>
                    {emotionConfig.label}
                  </div>
                  
                  {!note.isOpened && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {daysRemaining === 0 ? '今天可开启' : `${daysRemaining}天后开启`}
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600">
                  开启时间: {format(note.openDate, 'yyyy年MM月dd日', { locale: zhCN })}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note.id);
                  }}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {selectedNote?.id === note.id && isOpenable && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                {note.isOpened ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <p className="text-green-800 text-sm font-medium">
                        🎉 这个约定已经开启！回顾一下当时的自己吧
                      </p>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
