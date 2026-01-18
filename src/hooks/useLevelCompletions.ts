/**
 * ============================================================================
 * LEVEL COMPLETIONS TRACKING HOOK
 * ============================================================================
 * 
 * Custom React hook that tracks how many times each level has been 
 * correctly completed. This replaces the fake "studentsCompleted" numbers
 * with real tracking based on the user's correct submissions.
 * 
 * FEATURES:
 * - Tracks correct completions per level
 * - Persists data to localStorage
 * - Increments count only on correct answer
 * 
 * STORAGE:
 * - Uses localStorage with key 'networklearn_completions'
 * - Data structure: { [levelId: number]: number }
 * ============================================================================
 */

import { useState, useEffect } from 'react';

// =============================================================================
// CONSTANTS
// =============================================================================

/** LocalStorage key for persisting completion counts */
const STORAGE_KEY = 'networklearn_completions';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** Map of level ID to number of correct completions */
type CompletionCounts = Record<number, number>;

// =============================================================================
// MAIN HOOK
// =============================================================================

/**
 * useLevelCompletions Hook
 * 
 * Provides tracking for correct level completions.
 * 
 * @returns Object containing completion counts and increment function
 */
export const useLevelCompletions = () => {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  
  /** Map of level IDs to completion counts */
  const [completions, setCompletions] = useState<CompletionCounts>({});
  
  /** Flag to track if initial load from localStorage is complete */
  const [isLoaded, setIsLoaded] = useState(false);

  // ---------------------------------------------------------------------------
  // LOAD FROM STORAGE (on mount)
  // ---------------------------------------------------------------------------
  
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCompletions(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse completion counts:', e);
        setCompletions({});
      }
    }
    setIsLoaded(true);
  }, []);

  // ---------------------------------------------------------------------------
  // SAVE TO STORAGE (on completions change)
  // ---------------------------------------------------------------------------
  
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completions));
    }
  }, [completions, isLoaded]);

  // ---------------------------------------------------------------------------
  // FUNCTIONS
  // ---------------------------------------------------------------------------

  /**
   * Increment the completion count for a level
   * Called when a user correctly completes a level
   * 
   * @param levelId - The ID of the completed level
   */
  const incrementCompletion = (levelId: number) => {
    setCompletions(prev => ({
      ...prev,
      [levelId]: (prev[levelId] || 0) + 1
    }));
  };

  /**
   * Get the completion count for a specific level
   * 
   * @param levelId - The ID of the level to check
   * @returns Number of correct completions for this level
   */
  const getCompletionCount = (levelId: number): number => {
    return completions[levelId] || 0;
  };

  return {
    completions,
    isLoaded,
    incrementCompletion,
    getCompletionCount
  };
};
