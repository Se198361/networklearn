/**
 * ============================================================================
 * LEVEL CARD COMPONENT
 * ============================================================================
 * 
 * Displays an individual level in the level selection grid.
 * Shows level information and provides visual feedback for:
 * - Locked levels (grayed out, lock icon)
 * - Unlocked levels (clickable, play icon)
 * - Completed levels (checkmark, green accent)
 * 
 * FEATURES:
 * - Responsive hover effects with glow matching section color
 * - Sound effect on click
 * - Student completion count display
 * - Level number badge
 * 
 * PROPS:
 * - level: The level data object
 * - isUnlocked: Whether the player can access this level
 * - isCompleted: Whether the player has finished this level
 * - onClick: Handler for when level is selected
 * - sectionColor: Theme color for visual styling
 * ============================================================================
 */

import { Lock, Check, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Props interface for LevelCard component
 */
interface LevelCardProps {
  /** Level data containing id and title */
  level: {
    id: number;
    title: string;
  };
  /** Actual completion count from tracking */
  completionCount: number;
  /** Whether this level is accessible (previous level completed) */
  isUnlocked: boolean;
  /** Whether the player has already completed this level */
  isCompleted: boolean;
  /** Callback when the level card is clicked */
  onClick: () => void;
  /** Section theme color for styling (cyan, magenta, green, etc.) */
  sectionColor: string;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * LevelCard Component
 * 
 * Renders a clickable card for a single level in the game.
 * Appearance changes based on lock/complete status.
 */
export const LevelCard = ({ level, completionCount, isUnlocked, isCompleted, onClick, sectionColor }: LevelCardProps) => {
  // ---------------------------------------------------------------------------
  // HOOKS
  // ---------------------------------------------------------------------------
  
  /** Sound effects hook for click feedback */
  const { playSound } = useSoundEffects();

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  /**
   * Handle card click
   * Only triggers if level is unlocked
   * Plays click sound and calls parent onClick handler
   */
  const handleClick = () => {
    if (isUnlocked) {
      playSound('click');
      onClick();
    }
  };

  // ---------------------------------------------------------------------------
  // STYLE DEFINITIONS
  // ---------------------------------------------------------------------------

  /**
   * Color classes mapped to section colors
   * Defines border color and hover glow effect for each theme
   */
  const colorClasses = {
    cyan: 'border-neon-cyan hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)]',
    magenta: 'border-neon-magenta hover:shadow-[0_0_20px_hsl(var(--neon-magenta)/0.3)]',
    green: 'border-neon-green hover:shadow-[0_0_20px_hsl(var(--neon-green)/0.3)]',
    yellow: 'border-neon-yellow hover:shadow-[0_0_20px_hsl(var(--neon-yellow)/0.3)]',
    orange: 'border-neon-orange hover:shadow-[0_0_20px_hsl(var(--neon-orange)/0.3)]',
    purple: 'border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.3)]',
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <button
      onClick={handleClick}
      disabled={!isUnlocked}  // Disable click for locked levels
      className={cn(
        // Base styles (defined in index.css as .level-card)
        'level-card group text-left w-full',
        // Apply section color if unlocked
        isUnlocked && colorClasses[sectionColor as keyof typeof colorClasses],
        // Green border for completed levels
        isCompleted && 'border-neon-green/50',
        // Dim and disable cursor for locked levels
        !isUnlocked && 'opacity-40 cursor-not-allowed border-muted'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {/* ------------------------------------------------------------------- */}
        {/* LEFT SIDE: Level info (number, title, completion count) */}
        {/* ------------------------------------------------------------------- */}
        <div className="flex-1 min-w-0">
          {/* Level number and completion checkmark */}
          <div className="flex items-center gap-2 mb-1">
            {/* Level number badge (formatted as #01, #02, etc.) */}
            <span className="font-mono text-sm text-muted-foreground">
              #{String(level.id).padStart(2, '0')}
            </span>
            
            {/* Show checkmark badge if completed */}
            {isCompleted && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-neon-green/20">
                <Check className="w-3 h-3 text-neon-green" />
              </span>
            )}
          </div>
          
          {/* Level title (truncates if too long) */}
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {level.title}
          </h3>
          
          {/* Completion count - shows actual tracked completions */}
          <p className="text-xs text-muted-foreground mt-1">
            {completionCount === 0 ? 'Not completed yet' : `${completionCount} correct ${completionCount === 1 ? 'completion' : 'completions'}`}
          </p>
        </div>
        
        {/* ------------------------------------------------------------------- */}
        {/* RIGHT SIDE: Status icon (Lock / Check / Play) */}
        {/* ------------------------------------------------------------------- */}
        <div className="flex-shrink-0 mt-1">
          {!isUnlocked ? (
            // LOCKED: Gray background with lock icon
            <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          ) : isCompleted ? (
            // COMPLETED: Green background with checkmark
            <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center glow-green">
              <Check className="w-5 h-5 text-neon-green" />
            </div>
          ) : (
            // UNLOCKED (not completed): Primary color with play icon
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-cyan transition-shadow">
              <Play className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
