/**
 * ============================================================================
 * BADGE DISPLAY COMPONENT
 * ============================================================================
 * 
 * Displays all available badges in a grid layout, showing which ones
 * the player has earned and which are still locked.
 * 
 * BADGES (7 total):
 * 1. OSI Master - Complete OSI Model Foundations (Levels 1-10)
 * 2. TCP/IP Expert - Complete TCP/IP Model (Levels 11-18)
 * 3. IP Guru - Complete IP Addressing (Levels 19-28)
 * 4. Hardware Hero - Complete Network Devices (Levels 29-42)
 * 5. Protocol Pro - Complete Core Protocols (Levels 43-55)
 * 6. Security Champion - Complete Network Attacks (Levels 56-65)
 * 7. Grand Master - Complete ALL 65 levels
 * 
 * VISUAL STATES:
 * - Earned: Shows section icon with green accent
 * - Locked: Shows lock icon, dimmed appearance
 * 
 * PROPS:
 * - earnedBadges: Array of badge names the player has earned
 * ============================================================================
 */

import { Trophy, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sections } from '@/data/levels';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Props interface for BadgeDisplay component
 */
interface BadgeDisplayProps {
  /** Array of badge names that the player has earned */
  earnedBadges: string[];
}

// =============================================================================
// BADGE DATA
// =============================================================================

/**
 * Complete list of all badges available in the game
 * Combines section badges with the special "Grand Master" badge
 * 
 * Each badge has:
 * - name: Display name of the badge
 * - icon: Emoji representing the badge
 * - color: Theme color for styling
 */
const allBadges = [
  // Section badges (derived from sections data)
  ...sections.map(s => ({ name: s.badge, icon: s.icon, color: s.color })),
  // Special "Grand Master" badge for 100% completion
  { name: 'Grand Master', icon: '👑', color: 'cyan' }
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * BadgeDisplay Component
 * 
 * Renders a card containing a grid of all badges.
 * Badges are displayed as circles with icons, either showing the
 * earned badge icon or a lock icon for unearned badges.
 */
export const BadgeDisplay = ({ earnedBadges }: BadgeDisplayProps) => {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
      {/* ===================================================================== */}
      {/* HEADER */}
      {/* ===================================================================== */}
      <h2 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-neon-yellow" />
        Badges
      </h2>
      
      {/* ===================================================================== */}
      {/* BADGE GRID */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {allBadges.map((badge) => {
          // Check if this badge has been earned
          const isEarned = earnedBadges.includes(badge.name);
          
          return (
            <div
              key={badge.name}
              className={cn(
                // Base card styles
                'p-4 rounded-lg border text-center transition-all duration-300',
                // Conditional styling based on earned status
                isEarned 
                  ? 'border-neon-green/50 bg-neon-green/5'   // Earned: green accent
                  : 'border-border bg-muted/20 opacity-50'   // Locked: dimmed
              )}
            >
              {/* Badge icon circle */}
              <div className={cn(
                'w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2',
                isEarned ? 'bg-neon-green/20' : 'bg-muted/30'
              )}>
                {isEarned ? (
                  // Earned: Show the badge's emoji icon
                  <span className="text-2xl">{badge.icon}</span>
                ) : (
                  // Locked: Show lock icon
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              
              {/* Badge name */}
              <p className={cn(
                'text-sm font-medium',
                isEarned ? 'text-neon-green' : 'text-muted-foreground'
              )}>
                {badge.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
