/**
 * ============================================================================
 * GAME PAGE COMPONENT
 * ============================================================================
 * 
 * The main game page that manages navigation between different game views.
 * Acts as a controller component, determining what to render based on state.
 * 
 * VIEWS:
 * 1. 'sections' - Shows all 6 course sections to choose from
 * 2. 'levels' - Shows levels within a selected section
 * 3. 'game' - Shows the actual level gameplay (question answering)
 * 
 * RESPONSIBILITIES:
 * - Manages view state (which screen to show)
 * - Tracks selected section and level
 * - Handles navigation between views
 * - Integrates with useGameProgress for progress tracking
 * - Checks and awards badges on level completion
 * 
 * FLOW:
 * User selects section → View levels → Play level → Return to levels
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CircuitBackground } from '@/components/CircuitBackground';
import { ProgressHeader } from '@/components/game/ProgressHeader';
import { SectionCard } from '@/components/game/SectionCard';
import { LevelCard } from '@/components/game/LevelCard';
import { LevelGame } from '@/components/game/LevelGame';
import { BadgeDisplay } from '@/components/game/BadgeDisplay';
import { useGameProgress } from '@/hooks/useGameProgress';
import { useLevelCompletions } from '@/hooks/useLevelCompletions';
import { sections, levels, getBadges } from '@/data/levels';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** Possible view states for the game page */
type View = 'sections' | 'levels' | 'game';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Game Component
 * 
 * Main page component that orchestrates the game experience.
 * Manages navigation state and renders appropriate child components.
 */
export const Game = () => {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  
  /** Current view being displayed */
  const [view, setView] = useState<View>('sections');
  
  /** ID of the currently selected section (null if none) */
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  
  /** ID of the currently selected level (null if none) */
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  
  /** Sound effects hook */
  const { playSound } = useSoundEffects();

  // ---------------------------------------------------------------------------
  // HOOKS
  // ---------------------------------------------------------------------------

  /**
   * Game progress hook - provides progress state and functions
   */
  const {
    progress,
    isLoaded,
    completeLevel,
    isLevelUnlocked,
    isLevelCompleted,
    getProgressPercentage,
    getSectionProgress,
    addBadge
  } = useGameProgress();

  /**
   * Level completions tracking hook
   */
  const { getCompletionCount, incrementCompletion } = useLevelCompletions();

  // ---------------------------------------------------------------------------
  // EFFECTS
  // ---------------------------------------------------------------------------

  /**
   * Effect: Check and award badges when levels are completed
   * 
   * Runs whenever completedLevels changes.
   * Calculates which badges should be earned and adds any new ones.
   */
  useEffect(() => {
    // Calculate badges based on current progress
    const earnedBadges = getBadges(progress.completedLevels);
    
    // Add any newly earned badges
    earnedBadges.forEach(badge => {
      if (!progress.badges.includes(badge)) {
        addBadge(badge);
      }
    });
  }, [progress.completedLevels]);

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  /**
   * Handle clicking on a section card
   * Navigates to the levels view for that section
   */
  const handleSectionClick = (sectionId: number) => {
    playSound('click');
    setSelectedSection(sectionId);
    setView('levels');
  };

  /**
   * Handle clicking on a level card
   * Navigates to the game view for that level
   */
  const handleLevelClick = (levelId: number) => {
    setSelectedLevel(levelId);
    setView('game');
  };

  /**
   * Handle completing a level
   * Updates progress, checks for section completion, returns to levels view
   * 
   * @param score - Points earned (100 for correct, 50 for incorrect)
   */
  const handleLevelComplete = (score: number) => {
    if (selectedLevel) {
      // Update progress in localStorage
      completeLevel(selectedLevel, score);
      
      // Check if this level completion finishes a section
      const section = sections.find(s => s.levels.includes(selectedLevel));
      if (section) {
        // Check if all section levels are now complete
        const sectionComplete = section.levels.every(l => 
          progress.completedLevels.includes(l) || l === selectedLevel
        );
        
        // Play unlock sound if section just completed and badge not already earned
        if (sectionComplete && !progress.badges.includes(section.badge)) {
          playSound('unlock');
        }
      }
    }
    
    // Return to levels view
    setView('levels');
    setSelectedLevel(null);
  };

  /**
   * Handle back button clicks
   * Navigates to previous view in the hierarchy
   */
  const handleBack = () => {
    if (view === 'game') {
      // From game, go back to levels
      setView('levels');
      setSelectedLevel(null);
    } else if (view === 'levels') {
      // From levels, go back to sections
      setView('sections');
      setSelectedSection(null);
    }
  };

  // ---------------------------------------------------------------------------
  // DERIVED DATA
  // ---------------------------------------------------------------------------

  /** Currently selected section object */
  const currentSection = sections.find(s => s.id === selectedSection);
  
  /** Currently selected level object */
  const currentLevel = levels.find(l => l.id === selectedLevel);
  
  /** Levels belonging to the current section */
  const sectionLevels = currentSection 
    ? levels.filter(l => currentSection.levels.includes(l.id))
    : [];

  /**
   * Check if a section is unlocked
   * First section is always unlocked; others require previous section complete
   */
  const isSectionUnlocked = (sectionId: number): boolean => {
    if (sectionId === 1) return true;  // First section always accessible
    
    // Find previous section
    const prevSection = sections.find(s => s.id === sectionId - 1);
    if (!prevSection) return false;
    
    // Check if all levels in previous section are completed
    return prevSection.levels.every(l => progress.completedLevels.includes(l));
  };

  // ---------------------------------------------------------------------------
  // LOADING STATE
  // ---------------------------------------------------------------------------

  /**
   * Show loading screen while progress is being loaded from localStorage
   * Prevents flash of default content
   */
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
            <span className="text-2xl">🌐</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // GAME VIEW
  // ---------------------------------------------------------------------------

  /**
   * Render LevelGame component when in game view
   * Full-screen takeover for focused gameplay
   */
  if (view === 'game' && currentLevel) {
    return (
      <LevelGame 
        level={currentLevel} 
        onComplete={handleLevelComplete} 
        onBack={handleBack}
        completionCount={getCompletionCount(currentLevel.id)}
        onCorrectAnswer={() => incrementCompletion(currentLevel.id)}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // SECTIONS/LEVELS VIEW
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated circuit background */}
      <CircuitBackground />
      
      <div className="relative z-10">
        {/* Fixed progress header */}
        <ProgressHeader
          totalScore={progress.totalScore}
          completedLevels={progress.completedLevels.length}
          totalLevels={65}
          badges={progress.badges}
        />

        <div className="container mx-auto px-4 py-8">
          {/* =============================================================== */}
          {/* SECTIONS VIEW */}
          {/* =============================================================== */}
          {view === 'sections' && (
            <div className="space-y-8 animate-fade-in">
              {/* Page title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Journey</h2>
                <p className="text-muted-foreground">Master networking from basics to advanced security</p>
              </div>

              {/* Section cards grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    progress={getSectionProgress(section.levels)}
                    isUnlocked={isSectionUnlocked(section.id)}
                    onClick={() => handleSectionClick(section.id)}
                  />
                ))}
              </div>

              {/* Badge display at bottom */}
              <BadgeDisplay earnedBadges={progress.badges} />
            </div>
          )}

          {/* =============================================================== */}
          {/* LEVELS VIEW */}
          {/* =============================================================== */}
          {view === 'levels' && currentSection && (
            <div className="animate-fade-in">
              {/* Back button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Sections
              </button>

              {/* Section header with icon and progress */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl">{currentSection.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{currentSection.name}</h2>
                  <p className="text-muted-foreground">
                    {getSectionProgress(currentSection.levels)}% Complete · {currentSection.levels.length} Levels
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectionLevels.map((level) => (
                  <LevelCard
                    key={level.id}
                    level={level}
                    completionCount={getCompletionCount(level.id)}
                    isUnlocked={isLevelUnlocked(level.id)}
                    isCompleted={isLevelCompleted(level.id)}
                    onClick={() => handleLevelClick(level.id)}
                    sectionColor={currentSection.color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
