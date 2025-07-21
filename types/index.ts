export interface TimeCapsule {
  id: string;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: Date;
  images?: string[];
  isPrivate: boolean;
}

export interface LetGoNote {
  id: string;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: Date;
  openDate: Date;
  isOpened: boolean;
  reminderSent: boolean;
}

export type EmotionType = 
  | 'happy'
  | 'sad'
  | 'angry'
  | 'anxious'
  | 'peaceful'
  | 'confused'
  | 'nostalgic'
  | 'hopeful'
  | 'lonely'
  | 'grateful';

export interface EmotionConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}
