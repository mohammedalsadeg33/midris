import { useState, useEffect, useCallback } from 'react';
import { Resource, Opportunity } from '../types';
import { RESOURCES } from '../data/resources';
import { OPPORTUNITIES } from '../data/opportunities';

const STORAGE_KEY = 'medrise_saved_bookmarks_v1';

export interface BookmarkedRecord {
  id: string;
  type: 'resource' | 'opportunity';
  savedAt: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback if local storage fails
    }
    return [
      { id: 'res-anki-cloze-med', type: 'resource', savedAt: new Date().toISOString() },
      { id: 'opp-kasr-alainy-congress', type: 'opportunity', savedAt: new Date().toISOString() }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // Ignore quota errors
    }
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((item) => item.id === id),
    [bookmarks]
  );

  const toggleBookmark = useCallback((id: string, type: 'resource' | 'opportunity') => {
    setBookmarks((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [{ id, type, savedAt: new Date().toISOString() }, ...prev];
      }
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  // Retrieve full objects for display
  const savedResources: Resource[] = bookmarks
    .filter((b) => b.type === 'resource')
    .map((b) => RESOURCES.find((r) => r.id === b.id))
    .filter((r): r is Resource => Boolean(r));

  const savedOpportunities: Opportunity[] = bookmarks
    .filter((b) => b.type === 'opportunity')
    .map((b) => OPPORTUNITIES.find((o) => o.id === b.id))
    .filter((o): o is Opportunity => Boolean(o));

  const totalCount = bookmarks.length;

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    clearAllBookmarks,
    savedResources,
    savedOpportunities,
    totalCount
  };
}
