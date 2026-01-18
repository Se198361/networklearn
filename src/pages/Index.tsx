/**
 * ============================================================================
 * INDEX PAGE (LANDING PAGE) COMPONENT
 * ============================================================================
 * 
 * The main landing page for NetWorkLearn game.
 * Introduces the game, highlights features, and provides entry point to play.
 * 
 * SECTIONS:
 * 1. Hero - Title, tagline, and main CTA button
 * 2. Stats - Quick numbers (65 levels, 6 sections, 7 badges)
 * 3. Features - 4 key selling points with icons
 * 4. Learning Path - Preview of all 6 course sections
 * 5. Final CTA - Secondary call-to-action with "no signup" messaging
 * 6. Footer - Simple branding footer
 * 
 * DESIGN:
 * - Cyber/tech aesthetic with neon colors
 * - Animated circuit background
 * - Glassmorphism cards
 * - Responsive layout
 * 
 * NAVIGATION:
 * - "Start Learning" button navigates to /game route
 * ============================================================================
 */

import { useNavigate } from 'react-router-dom';
import { Play, Zap, Trophy, Users, ChevronRight, Shield, Network, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CircuitBackground } from '@/components/CircuitBackground';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Index Component
 * 
 * Landing page that introduces the game and entices users to start playing.
 * Uses animated elements and clear CTAs to drive engagement.
 */
const Index = () => {
  // ---------------------------------------------------------------------------
  // HOOKS
  // ---------------------------------------------------------------------------
  
  /** React Router navigation hook */
  const navigate = useNavigate();
  
  /** Sound effects hook for button clicks */
  const { playSound } = useSoundEffects();

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  /**
   * Handle "Start Learning" button click
   * Plays click sound and navigates to game page
   */
  const handleStart = () => {
    playSound('click');
    navigate('/game');
  };

  // ---------------------------------------------------------------------------
  // STATIC DATA
  // ---------------------------------------------------------------------------

  /**
   * Feature cards data
   * Displayed in a grid to highlight key benefits
   */
  const features = [
    {
      icon: Network,
      title: '65 Interactive Levels',
      description: 'From OSI basics to advanced security, learn through hands-on activities'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Audio and visual feedback keeps you engaged and motivated'
    },
    {
      icon: Trophy,
      title: '7 Achievement Badges',
      description: 'Earn badges as you master each networking domain'
    },
    {
      icon: Users,
      title: 'Track Your Progress',
      description: 'See how you compare with other learners worldwide'
    }
  ];

  /**
   * Course sections preview data
   * Shows users what they'll learn in each section
   */
  const sections = [
    { name: 'OSI Model Foundations', levels: 10, icon: '🔧' },
    { name: 'TCP/IP Model', levels: 8, icon: '🌐' },
    { name: 'IP Addressing', levels: 10, icon: '📍' },
    { name: 'Network Devices', levels: 14, icon: '🖥️' },
    { name: 'Core Protocols', levels: 13, icon: '📡' },
    { name: 'Network Attacks', levels: 10, icon: '🛡️' },
  ];

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated circuit board background */}
      <CircuitBackground />

      <div className="relative z-10">
        {/* ================================================================= */}
        {/* HERO SECTION */}
        {/* ================================================================= */}
        <div className="container mx-auto px-4 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            {/* Version badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <span className="text-2xl">🌐</span>
              <span className="font-mono text-primary">NetWorkLearn v1.0</span>
            </div>

            {/* Main headline with gradient text */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Master
              <span className="text-primary text-glow-cyan"> Networking</span>
              <br />
              Through Play
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              65 interactive levels teaching you everything from OSI fundamentals 
              to advanced security concepts. No experience required.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {/* Primary CTA button */}
              <Button
                onClick={handleStart}
                size="lg"
                className="cyber-btn px-8 py-6 text-lg border-glow-cyan group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Learning
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Social proof text */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span>15,234 students learning</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-mono">65</div>
                <div className="text-sm text-muted-foreground">Levels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-magenta font-mono">6</div>
                <div className="text-sm text-muted-foreground">Sections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green font-mono">7</div>
                <div className="text-sm text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* FEATURES SECTION */}
        {/* ================================================================= */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Feature icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                {/* Feature title and description */}
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* COURSE SECTIONS PREVIEW */}
        {/* ================================================================= */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Complete Learning Path
          </h2>

          {/* Section preview cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {sections.map((section, i) => (
              <div
                key={section.name}
                className="flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-border hover:border-primary/30 transition-all"
              >
                {/* Section icon */}
                <span className="text-3xl">{section.icon}</span>
                <div className="flex-1">
                  {/* Section name and level count */}
                  <h3 className="font-medium text-foreground">{section.name}</h3>
                  <p className="text-sm text-muted-foreground">{section.levels} levels</p>
                </div>
                {/* Section number badge */}
                <div className="font-mono text-primary text-sm">
                  #{String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* FINAL CTA SECTION */}
        {/* ================================================================= */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto">
            {/* "No signup required" badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">No signup required</span>
            </div>

            {/* CTA headline */}
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to become a networking pro?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start your journey now. Your progress is saved automatically.
            </p>

            {/* Secondary CTA button */}
            <Button
              onClick={handleStart}
              size="lg"
              className="cyber-btn px-12 py-6 text-lg border-glow-green"
            >
              <Zap className="w-5 h-5 mr-2" />
              Begin Your Journey
            </Button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* FOOTER */}
        {/* ================================================================= */}
        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
            <p>🌐 NetWorkLearn — Learn Networking the Fun Way</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
