/**
 * ============================================================================
 * PROGRESS HEADER COMPONENT
 * ============================================================================
 * 
 * A sticky header component that displays the player's current progress.
 * Shows at the top of the game screens with key statistics.
 * 
 * DISPLAYED STATS:
 * - Game logo and name
 * - Total score (points earned)
 * - Levels completed out of 65
 * - Badges earned out of 7
 * - Overall progress bar (percentage)
 * 
 * DESIGN:
 * - Glassmorphism effect (semi-transparent with blur)
 * - Neon accent colors for different stat icons
 * - Responsive layout (stacks on mobile)
 * 
 * PROPS:
 * - totalScore: Player's cumulative points
 * - completedLevels: Number of levels finished
 * - totalLevels: Total levels in game (65)
 * - badges: Array of earned badge names
 * ============================================================================
 */

import { Trophy, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Props interface for ProgressHeader component
 */
interface ProgressHeaderProps {
  /** Total points accumulated by the player */
  totalScore: number;
  /** Number of levels the player has completed */
  completedLevels: number;
  /** Total number of levels in the game */
  totalLevels: number;
  /** Array of badge names the player has earned */
  badges: string[];
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * ProgressHeader Component
 * 
 * Renders a fixed header with player stats and progress information.
 * Uses glassmorphism styling for modern aesthetic.
 */
export const ProgressHeader = ({ 
  totalScore, 
  completedLevels, 
  totalLevels, 
  badges 
}: ProgressHeaderProps) => {
  // Calculate overall progress percentage
  const progressPercent = Math.round((completedLevels / totalLevels) * 100);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div className="bg-card/50 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* ================================================================= */}
        {/* TOP ROW: Logo and Stats */}
        {/* ================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* ------------------------------------------------------------- */}
          {/* LOGO SECTION */}
          {/* ------------------------------------------------------------- */}
          <div className="flex items-center gap-3">
            {/* Logo icon with glow effect */}
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center glow-cyan">
              <span className="text-xl">🌐</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">NetWorkLearn</h1>
              <p className="text-xs text-muted-foreground">Master Networking</p>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STATS SECTION */}
          {/* ------------------------------------------------------------- */}
          <div className="flex items-center gap-6">
            
            {/* SCORE STAT */}
            <div className="flex items-center gap-2">
              {/* Yellow lightning icon for points */}
              <div className="w-8 h-8 rounded-full bg-neon-yellow/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-neon-yellow" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Score</p>
                <p className="font-mono font-bold text-foreground">
                  {totalScore.toLocaleString()}
                </p>
              </div>
            </div>

            {/* PROGRESS STAT */}
            <div className="flex items-center gap-2">
              {/* Cyan target icon for progress */}
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Progress</p>
                <p className="font-mono font-bold text-foreground">
                  {completedLevels}/{totalLevels}
                </p>
              </div>
            </div>

            {/* BADGES STAT */}
            <div className="flex items-center gap-2">
              {/* Green trophy icon for badges */}
              <div className="w-8 h-8 rounded-full bg-neon-green/10 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-neon-green" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Badges</p>
                <p className="font-mono font-bold text-foreground">
                  {badges.length}/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BOTTOM ROW: Progress Bar */}
        {/* ================================================================= */}
        <div className="mt-4">
          {/* Progress bar track (uses CSS class from index.css) */}
          <div className="progress-bar h-2">
            {/* Progress bar fill (animated width) */}
            <div 
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          {/* Percentage label */}
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {progressPercent}% Complete
          </p>
        </div>
      </div>
    </div>
  );
};
