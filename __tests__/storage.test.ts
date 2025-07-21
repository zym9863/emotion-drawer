/**
 * @jest-environment jsdom
 */

import { 
  saveTimeCapsule, 
  getTimeCapsules, 
  deleteTimeCapsule,
  saveLetGoNote,
  getLetGoNotes,
  updateLetGoNote,
  deleteLetGoNote
} from '@/lib/storage';
import { TimeCapsule, LetGoNote } from '@/types';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Time Capsules', () => {
    const mockCapsule: TimeCapsule = {
      id: 'test-1',
      title: 'Test Capsule',
      content: 'Test content',
      emotion: 'happy',
      createdAt: new Date(),
      isPrivate: true,
      images: []
    };

    test('should save time capsule', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      saveTimeCapsule(mockCapsule);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'emotion-drawer-time-capsules',
        JSON.stringify([mockCapsule])
      );
    });

    test('should get time capsules', () => {
      const mockData = JSON.stringify([mockCapsule]);
      localStorageMock.getItem.mockReturnValue(mockData);
      
      const result = getTimeCapsules();
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Capsule');
    });

    test('should delete time capsule', () => {
      const mockData = JSON.stringify([mockCapsule]);
      localStorageMock.getItem.mockReturnValue(mockData);
      
      deleteTimeCapsule('test-1');
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'emotion-drawer-time-capsules',
        JSON.stringify([])
      );
    });
  });

  describe('Let Go Notes', () => {
    const mockNote: LetGoNote = {
      id: 'test-note-1',
      title: 'Test Note',
      content: 'Test note content',
      emotion: 'sad',
      createdAt: new Date(),
      openDate: new Date(),
      isOpened: false,
      reminderSent: false
    };

    test('should save let go note', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      saveLetGoNote(mockNote);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'emotion-drawer-let-go-notes',
        JSON.stringify([mockNote])
      );
    });

    test('should get let go notes', () => {
      const mockData = JSON.stringify([mockNote]);
      localStorageMock.getItem.mockReturnValue(mockData);
      
      const result = getLetGoNotes();
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Note');
    });

    test('should update let go note', () => {
      const mockData = JSON.stringify([mockNote]);
      localStorageMock.getItem.mockReturnValue(mockData);
      
      updateLetGoNote('test-note-1', { isOpened: true });
      
      const expectedNote = { ...mockNote, isOpened: true };
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'emotion-drawer-let-go-notes',
        JSON.stringify([expectedNote])
      );
    });

    test('should delete let go note', () => {
      const mockData = JSON.stringify([mockNote]);
      localStorageMock.getItem.mockReturnValue(mockData);
      
      deleteLetGoNote('test-note-1');
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'emotion-drawer-let-go-notes',
        JSON.stringify([])
      );
    });
  });
});
