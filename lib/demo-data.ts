import { TimeCapsule, LetGoNote } from '@/types';
import { addDays, addMonths, subDays } from 'date-fns';

export const demoTimeCapsules: TimeCapsule[] = [
  {
    id: 'demo-1',
    title: '深夜的思考',
    content: '今天又是一个失眠的夜晚，脑海里总是想起那些未完成的事情。我不知道我怎么了，明明应该开心的事情，却总是感到莫名的焦虑。也许这就是成长的代价吧，学会与不确定性共存。',
    emotion: 'confused',
    createdAt: subDays(new Date(), 3),
    isPrivate: true,
    images: []
  },
  {
    id: 'demo-2',
    title: '给远方朋友的信',
    content: '亲爱的朋友，我们已经很久没有联系了。我想告诉你，我很想念我们一起度过的那些时光。虽然现在各自忙碌，但你在我心中的位置从未改变。希望你一切都好，也希望我们能再次相聚。',
    emotion: 'nostalgic',
    createdAt: subDays(new Date(), 7),
    isPrivate: true,
    images: []
  },
  {
    id: 'demo-3',
    title: '今天的小确幸',
    content: '今天路过咖啡店，老板记得我的常点。这种被记住的感觉真的很温暖。虽然是很小的事情，但让我觉得自己在这个城市里不是完全的陌生人。感谢生活中这些微小但珍贵的瞬间。',
    emotion: 'grateful',
    createdAt: subDays(new Date(), 1),
    isPrivate: false,
    images: []
  }
];

export const demoLetGoNotes: LetGoNote[] = [
  {
    id: 'demo-let-go-1',
    title: '关于那段感情',
    content: '我知道我应该放下了，但心里总是有个声音在说"如果当时..."。我想给未来的自己一个约定，希望三个月后的我能够真正释怀，不再为过去的选择而纠结。愿未来的我能够微笑着回忆这段经历。',
    emotion: 'sad',
    createdAt: subDays(new Date(), 30),
    openDate: addMonths(new Date(), 2),
    isOpened: false,
    reminderSent: false
  },
  {
    id: 'demo-let-go-2',
    title: '工作的焦虑',
    content: '最近工作压力很大，总是担心自己做得不够好。我想对未来的自己说：不要太苛求完美，每个人都有自己的节奏。希望一年后的我能够更加自信，也更加从容地面对挑战。',
    emotion: 'anxious',
    createdAt: subDays(new Date(), 10),
    openDate: addDays(new Date(), 5), // 5天后可以开启
    isOpened: false,
    reminderSent: false
  },
  {
    id: 'demo-let-go-3',
    title: '对自己的和解',
    content: '我总是对自己太严格，总是觉得自己不够好。今天我想和未来的自己约定：学会爱自己，接受自己的不完美。希望半年后的我能够更加温柔地对待自己。',
    emotion: 'lonely',
    createdAt: subDays(new Date(), 60),
    openDate: subDays(new Date(), 1), // 已经可以开启
    isOpened: false,
    reminderSent: false
  }
];

// 初始化演示数据的函数
export const initDemoData = () => {
  if (typeof window === 'undefined') return;
  
  // 检查是否已经有数据
  const existingCapsules = localStorage.getItem('emotion-drawer-time-capsules');
  const existingNotes = localStorage.getItem('emotion-drawer-let-go-notes');
  
  // 如果没有数据，则添加演示数据
  if (!existingCapsules) {
    localStorage.setItem('emotion-drawer-time-capsules', JSON.stringify(demoTimeCapsules));
  }
  
  if (!existingNotes) {
    localStorage.setItem('emotion-drawer-let-go-notes', JSON.stringify(demoLetGoNotes));
  }
};
