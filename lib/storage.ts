import { TimeCapsule, LetGoNote } from '@/types';

const TIME_CAPSULES_KEY = 'emotion-drawer-time-capsules';
const LET_GO_NOTES_KEY = 'emotion-drawer-let-go-notes';

// Time Capsules Storage
export const saveTimeCapsule = (capsule: TimeCapsule): void => {
  const capsules = getTimeCapsules();
  capsules.push(capsule);
  localStorage.setItem(TIME_CAPSULES_KEY, JSON.stringify(capsules));
};

export const getTimeCapsules = (): TimeCapsule[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(TIME_CAPSULES_KEY);
  if (!stored) return [];
  
  try {
    const capsules = JSON.parse(stored);
    return capsules.map((capsule: any) => ({
      ...capsule,
      createdAt: new Date(capsule.createdAt)
    }));
  } catch {
    return [];
  }
};

export const deleteTimeCapsule = (id: string): void => {
  const capsules = getTimeCapsules();
  const filtered = capsules.filter(capsule => capsule.id !== id);
  localStorage.setItem(TIME_CAPSULES_KEY, JSON.stringify(filtered));
};

// Let Go Notes Storage
export const saveLetGoNote = (note: LetGoNote): void => {
  const notes = getLetGoNotes();
  notes.push(note);
  localStorage.setItem(LET_GO_NOTES_KEY, JSON.stringify(notes));
};

export const getLetGoNotes = (): LetGoNote[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(LET_GO_NOTES_KEY);
  if (!stored) return [];
  
  try {
    const notes = JSON.parse(stored);
    return notes.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      openDate: new Date(note.openDate)
    }));
  } catch {
    return [];
  }
};

export const updateLetGoNote = (id: string, updates: Partial<LetGoNote>): void => {
  const notes = getLetGoNotes();
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...updates };
    localStorage.setItem(LET_GO_NOTES_KEY, JSON.stringify(notes));
  }
};

export const deleteLetGoNote = (id: string): void => {
  const notes = getLetGoNotes();
  const filtered = notes.filter(note => note.id !== id);
  localStorage.setItem(LET_GO_NOTES_KEY, JSON.stringify(filtered));
};
