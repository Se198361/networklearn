/**
 * ============================================================================
 * GAME PROGRESS HOOK
 * ============================================================================
 * 
 * Custom React hook that manages the player's game progress using localStorage.
 * This allows progress to persist across browser sessions without requiring
 * user authentication.
 * 
 * FEATURES:
 * - Tracks completed levels
 * - Maintains current level position
 * - Calculates total score
 * - Stores earned badges
 * - Provides utility functions for checking level status
 * 
 * STORAGE:
 * - Uses localStorage with key 'networklearn_progress'
 * - Data is stored as JSON string
 * - Automatically syncs state to storage on changes
 * ============================================================================
 */

import { useState, useEffect } from 'react';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * GameProgress Interface
 * Defines the complete state structure for player progress
 * 
 * @property completedLevels - Array of level IDs the player has finished
 * @property currentLevel - The next level the player should attempt
 * @property totalScore - Cumulative points earned across all levels
 * @property badges - Array of badge names the player has earned
 */
interface GameProgress {
  completedLevels: number[];
  currentLevel: number;
  totalScore: number;
  badges: string[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** LocalStorage key for persisting game progress */
const STORAGE_KEY = 'networklearn_progress';

/** Default progress state for new players or reset */
const defaultProgress: GameProgress = {
  completedLevels: [],  // No levels completed initially
  currentLevel: 1,       // Start at level 1
  totalScore: 0,         // Zero points
  badges: []             // No badges earned
};

// =============================================================================
// MAIN HOOK
// =============================================================================

/**
 * useGameProgress Hook
 * 
 * Provides complete game progress management including:
 * - Loading progress from localStorage on mount
 * - Saving progress to localStorage on changes
 * - Functions to update progress (complete levels, add badges)
 * - Utility functions to check level status
 * 
 * @returns Object containing progress state and management functions
 */
export const useGameProgress = () => {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  
  /** Current progress state */
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  
  /** Flag to track if initial load from localStorage is complete */
  const [isLoaded, setIsLoaded] = useState(false);

  // ---------------------------------------------------------------------------
  // LOAD FROM STORAGE (on mount)
  // ---------------------------------------------------------------------------
  
  /**
   * Effect: Load saved progress from localStorage when component mounts
   * 
   * - Checks if saved progress exists in localStorage
   * - Parses JSON and updates state
   * - Falls back to default if parsing fails
   * - Sets isLoaded flag to true when complete
   */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // Parse stored JSON and update state
        setProgress(JSON.parse(stored));
      } catch (e) {
        // If parsing fails (corrupted data), log error and use defaults
        console.error('Failed to parse progress:', e);
        setProgress(defaultProgress);
      }
    }
    // Mark loading as complete
    setIsLoaded(true);
  }, []);

  // ---------------------------------------------------------------------------
  // SAVE TO STORAGE (on progress change)
  // ---------------------------------------------------------------------------
  
  /**
   * Effect: Save progress to localStorage whenever it changes
   * 
   * - Only saves after initial load is complete (prevents overwriting with defaults)
   * - Converts progress object to JSON string
   */
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  // ---------------------------------------------------------------------------
  // PROGRESS UPDATE FUNCTIONS
  // ---------------------------------------------------------------------------

  /**
   * Marks a level as completed and updates the score
   * 
   * @param levelId - The ID of the completed level
   * @param score - Points earned for completing the level (typically 100 for correct, 50 for incorrect)
   */
  const completeLevel = (levelId: number, score: number) => {
    setProgress(prev => {
      // Only add level to completed list if not already there
      const newCompleted = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];
      
      return {
        ...prev,
        completedLevels: newCompleted,
        // Update current level to be one higher than completed level
        currentLevel: Math.max(prev.currentLevel, levelId + 1),
        // Add earned score to total
        totalScore: prev.totalScore + score
      };
    });
  };

  /**
   * Adds a new badge to the player's collection
   * 
   * @param badge - The name of the badge to add (e.g., "OSI Master")
   */
  const addBadge = (badge: string) => {
    setProgress(prev => {
      // Only add badge if not already earned
      if (prev.badges.includes(badge)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badge]
      };
    });
  };

  /**
   * Resets all progress to default state
   * Useful for "start over" functionality
   */
  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  // ---------------------------------------------------------------------------
  // STATUS CHECK FUNCTIONS
  // ---------------------------------------------------------------------------

  /**
   * Checks if a specific level is unlocked (available to play)
   * 
   * Logic:
   * - Level 1 is always unlocked
   * - Other levels require the previous level to be completed
   * 
   * @param levelId - The level ID to check
   * @returns true if the level can be played
   */
  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;  // First level always accessible
    return progress.completedLevels.includes(levelId - 1);  // Previous level must be done
  };

  /**
   * Checks if a specific level has been completed
   * 
   * @param levelId - The level ID to check
   * @returns true if the level has been completed
   */
  const isLevelCompleted = (levelId: number): boolean => {
    return progress.completedLevels.includes(levelId);
  };

  // ---------------------------------------------------------------------------
  // PROGRESS CALCULATION FUNCTIONS
  // ---------------------------------------------------------------------------

  /**
   * Calculates overall game completion percentage
   * 
   * @returns Percentage (0-100) of total levels completed
   */
  const getProgressPercentage = (): number => {
    return Math.round((progress.completedLevels.length / 65) * 100);
  };

  /**
   * Calculates completion percentage for a specific section
   * 
   * @param sectionLevels - Array of level IDs belonging to the section
   * @returns Percentage (0-100) of section levels completed
   */
  const getSectionProgress = (sectionLevels: number[]): number => {
    const completed = sectionLevels.filter(l => progress.completedLevels.includes(l)).length;
    return Math.round((completed / sectionLevels.length) * 100);
  };

  // ---------------------------------------------------------------------------
  // RETURN VALUES
  // ---------------------------------------------------------------------------

  return {
    // State
    progress,           // Current progress object
    isLoaded,           // Whether initial load is complete
    
    // Update functions
    completeLevel,      // Mark a level as done
    addBadge,           // Add a new badge
    resetProgress,      // Reset to defaults
    
    // Status checks
    isLevelUnlocked,    // Check if level is playable
    isLevelCompleted,   // Check if level is done
    
    // Progress calculations
    getProgressPercentage,  // Overall completion %
    getSectionProgress      // Section completion %
  };
};
