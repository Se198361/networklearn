/**
 * ============================================================================
 * SECTION CARD COMPONENT
 * ============================================================================
 * 
 * Displays a course section in the main game menu.
 * Each section groups multiple levels together with:
 * - Section icon and name
 * - Level count
 * - Progress bar showing completion percentage
 * - Badge reward information
 * - Lock/complete visual states
 * 
 * FEATURES:
 * - Themed border and glow based on section color
 * - Visual progress indicator
 * - Trophy icon when section is 100% complete
 * - Disabled state for locked sections
 * 
 * PROPS:
 * - section: Section data (name, icon, color, levels, badge)
 * - progress: Completion percentage (0-100)
 * - isUnlocked: Whether the player can access this section
 * - onClick: Handler for when section is selected
 * ============================================================================
 */

import { ChevronRight, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Section } from '@/data/levels';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Props interface for SectionCard component
 */
interface SectionCardProps {
  /** Section data object from levels.ts */
  section: Section;
  /** Completion percentage for this section (0-100) */
  progress: number;
  /** Whether this section is accessible (previous section completed) */
  isUnlocked: boolean;
  /** Callback when the section card is clicked */
  onClick: () => void;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * SectionCard Component
 * 
 * Renders a large clickable card representing a course section.
 * Shows section details, progress, and badge information.
 */
export const SectionCard = ({ section, progress, isUnlocked, onClick }: SectionCardProps) => {
  // ---------------------------------------------------------------------------
  // STYLE DEFINITIONS
  // ---------------------------------------------------------------------------

  /**
   * Color class mappings for each section theme
   * Includes: border color, glow effect, progress bar color, and text color
   */
  const colorClasses = {
    cyan: {
      border: 'border-neon-cyan/30 hover:border-neon-cyan',
      glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.2)]',
      progress: 'bg-neon-cyan',
      text: 'text-neon-cyan'
    },
    magenta: {
      border: 'border-neon-magenta/30 hover:border-neon-magenta',
      glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-magenta)/0.2)]',
      progress: 'bg-neon-magenta',
      text: 'text-neon-magenta'
    },
    green: {
      border: 'border-neon-green/30 hover:border-neon-green',
      glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.2)]',
      progress: 'bg-neon-green',
      text: 'text-neon-green'
    },
    yellow: {
      border: 'border-neon-yellow/30 hover:border-neon-yellow',
      glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-yellow)/0.2)]',
      progress: 'bg-neon-yellow',
      text: 'text-neon-yellow'
    },
    orange: {
      border: 'border-neon-orange/30 hover:border-neon-orange',
      glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-orange)/0.2)]',
      progress: 'bg-neon-orange',
      text: 'text-neon-orange'
    },
    purple: {
      border: 'border-neon-purple/30 hover:border-neon-purple',
      glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.2)]',
      progress: 'bg-neon-purple',
      text: 'text-neon-purple'
    },
  };

  // Get the color set for this section
  const colors = colorClasses[section.color as keyof typeof colorClasses];
  
  // Check if section is fully completed
  const isComplete = progress === 100;

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}  // Prevent clicking locked sections
      className={cn(
        // Base card styles
        'relative w-full p-6 rounded-xl bg-card/50 backdrop-blur-sm border transition-all duration-300 text-left group',
        // Apply theme colors if unlocked, otherwise dim the card
        isUnlocked 
          ? `${colors.border} ${colors.glow}` 
          : 'border-muted/20 opacity-50 cursor-not-allowed'
      )}
    >
      {/* ===================================================================== */}
      {/* HEADER: Icon, Name, Level Count, and Status Icon */}
      {/* ===================================================================== */}
      <div className="flex items-start justify-between mb-4">
        {/* Left side: Section icon and info */}
        <div className="flex items-center gap-3">
          {/* Section emoji icon */}
          <span className="text-3xl">{section.icon}</span>
          
          <div>
            {/* Section name */}
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {section.name}
            </h3>
            {/* Level count */}
            <p className="text-sm text-muted-foreground">
              {section.levels.length} levels
            </p>
          </div>
        </div>
        
        {/* Right side: Trophy (if complete) or Chevron (if unlocked) */}
        {isComplete ? (
          // Show trophy icon when section is 100% complete
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center', 
            colors.text, 
            'bg-current/10'
          )}>
            <Trophy className="w-5 h-5" />
          </div>
        ) : (
          // Show chevron arrow indicating more content
          <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>

      {/* ===================================================================== */}
      {/* PROGRESS BAR SECTION */}
      {/* ===================================================================== */}
      <div className="space-y-2">
        {/* Progress label and percentage */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          {/* Color the percentage text if any progress has been made */}
          <span className={cn('font-mono', progress > 0 && colors.text)}>
            {progress}%
          </span>
        </div>
        
        {/* Progress bar track */}
        <div className="progress-bar">
          {/* Progress bar fill (width based on completion percentage) */}
          <div 
            className={cn('progress-bar-fill', colors.progress)}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BADGE INFO SECTION */}
      {/* ===================================================================== */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-sm">
          {/* Trophy icon */}
          <Trophy className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Badge: </span>
          {/* Badge name (colored if section is complete) */}
          <span className={cn('font-medium', isComplete && colors.text)}>
            {section.badge}
          </span>
        </div>
      </div>
    </button>
  );
};
