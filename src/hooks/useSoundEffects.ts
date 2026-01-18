/**
 * ============================================================================
 * SOUND EFFECTS HOOK
 * ============================================================================
 * 
 * Custom React hook that provides game sound effects using the Web Audio API.
 * No external audio files are needed - all sounds are generated programmatically
 * using oscillators and gain nodes.
 * 
 * AVAILABLE SOUNDS:
 * - 'correct': Ascending happy tone (C5 → E5 → G5) for correct answers
 * - 'incorrect': Descending sad tone (Eb4 → Bb3) for wrong answers
 * - 'complete': Victory fanfare for level completion
 * - 'click': Quick click sound for button interactions
 * - 'unlock': Rising tone for badge/section unlocks
 * 
 * USAGE:
 * const { playSound } = useSoundEffects();
 * playSound('correct');  // Plays the correct answer sound
 * 
 * NOTE: Web Audio API requires user interaction before playing audio
 * in most browsers (handled by click events naturally)
 * ============================================================================
 */

import { useCallback, useRef } from 'react';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** Available sound effect types */
type SoundType = 'correct' | 'incorrect' | 'complete' | 'click' | 'unlock';

// =============================================================================
// MAIN HOOK
// =============================================================================

/**
 * useSoundEffects Hook
 * 
 * Creates and manages an AudioContext for generating game sounds.
 * Uses Web Audio API oscillators to create different tones without
 * needing to load external audio files.
 * 
 * @returns Object containing the playSound function
 */
export const useSoundEffects = () => {
  // ---------------------------------------------------------------------------
  // REFS
  // ---------------------------------------------------------------------------
  
  /**
   * Ref to store the AudioContext instance
   * Using a ref ensures the same context is reused across renders
   * and persists for the component's lifetime
   */
  const audioContextRef = useRef<AudioContext | null>(null);

  // ---------------------------------------------------------------------------
  // AUDIO CONTEXT GETTER
  // ---------------------------------------------------------------------------

  /**
   * Gets or creates the AudioContext instance
   * 
   * AudioContext is created lazily (on first use) to avoid issues with
   * browser autoplay policies. The context is reused for all subsequent sounds.
   * 
   * @returns The AudioContext instance
   */
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      // Create new AudioContext, with fallback for older browsers
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // ---------------------------------------------------------------------------
  // TONE GENERATOR
  // ---------------------------------------------------------------------------

  /**
   * Plays a single tone with specified parameters
   * 
   * Creates an oscillator connected to a gain node for volume control,
   * plays the tone for the specified duration, then automatically stops.
   * 
   * @param frequency - Tone frequency in Hz (e.g., 440 = A4)
   * @param duration - How long to play in seconds
   * @param type - Oscillator waveform: 'sine', 'square', 'triangle', 'sawtooth'
   * @param volume - Initial volume (0.0 to 1.0)
   */
  const playTone = useCallback((
    frequency: number, 
    duration: number, 
    type: OscillatorType = 'sine', 
    volume: number = 0.3
  ) => {
    try {
      const ctx = getAudioContext();
      
      // Create oscillator (sound generator)
      const oscillator = ctx.createOscillator();
      
      // Create gain node (volume control)
      const gainNode = ctx.createGain();

      // Connect: oscillator → gain → speakers
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Configure oscillator
      oscillator.type = type;  // Waveform shape
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);  // Set pitch

      // Configure volume with fade-out
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      // Exponential ramp to near-zero prevents click at end
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      // Play the tone
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Gracefully handle if audio is unavailable (e.g., no audio device)
      console.log('Audio not available');
    }
  }, [getAudioContext]);

  // ---------------------------------------------------------------------------
  // SOUND EFFECT PLAYER
  // ---------------------------------------------------------------------------

  /**
   * Plays a predefined sound effect
   * 
   * Each sound type triggers a specific sequence of tones to create
   * recognizable audio feedback for game events.
   * 
   * @param type - The type of sound to play
   */
  const playSound = useCallback((type: SoundType) => {
    switch (type) {
      case 'correct':
        // =====================================================================
        // CORRECT ANSWER: Ascending happy chord (C5 → E5 → G5)
        // Creates an uplifting, "success" feeling
        // =====================================================================
        playTone(523.25, 0.1, 'sine', 0.2);  // C5 (first note)
        setTimeout(() => playTone(659.25, 0.1, 'sine', 0.2), 100);  // E5 (100ms later)
        setTimeout(() => playTone(783.99, 0.2, 'sine', 0.2), 200);  // G5 (200ms later, longer)
        break;
        
      case 'incorrect':
        // =====================================================================
        // INCORRECT ANSWER: Descending minor tones (Eb4 → Bb3)
        // Creates a "wrong/sad" feeling
        // =====================================================================
        playTone(311.13, 0.15, 'square', 0.15);  // Eb4 (higher note first)
        setTimeout(() => playTone(233.08, 0.2, 'square', 0.15), 150);  // Bb3 (lower note)
        break;
        
      case 'complete':
        // =====================================================================
        // LEVEL COMPLETE: Victory fanfare (ascending scale + held note)
        // Creates a triumphant, celebratory feeling
        // =====================================================================
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          // Play ascending notes (C5, E5, G5, C6) with 100ms intervals
          setTimeout(() => playTone(freq, 0.15, 'sine', 0.2), i * 100);
        });
        // Final held note (C6) for emphasis
        setTimeout(() => playTone(1046.50, 0.4, 'sine', 0.25), 400);
        break;
        
      case 'click':
        // =====================================================================
        // BUTTON CLICK: Quick, subtle click
        // Provides tactile feedback for UI interactions
        // =====================================================================
        playTone(800, 0.05, 'sine', 0.1);  // Short, soft high-pitched click
        break;
        
      case 'unlock':
        // =====================================================================
        // BADGE/SECTION UNLOCK: Rising tone (A4 → A5)
        // Creates an "achievement unlocked" feeling
        // =====================================================================
        playTone(440, 0.1, 'sine', 0.15);  // A4 (lower)
        setTimeout(() => playTone(880, 0.2, 'sine', 0.15), 100);  // A5 (octave higher)
        break;
    }
  }, [playTone]);

  // ---------------------------------------------------------------------------
  // RETURN VALUES
  // ---------------------------------------------------------------------------

  return { 
    playSound  // Function to trigger sound effects
  };
};
