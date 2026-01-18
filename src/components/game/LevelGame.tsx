/**
 * ============================================================================
 * LEVEL GAME COMPONENT
 * ============================================================================
 * 
 * The main gameplay component where players learn concepts and answer questions.
 * This is the core interactive element of the game.
 * 
 * STRUCTURE:
 * 1. Header with navigation and level info
 * 2. Learning Content section (comprehensive educational material)
 * 3. Multiple questions section (6 questions per level)
 * 4. Feedback display (correct/incorrect)
 * 5. Celebration screen (on level complete)
 * 
 * FEATURES:
 * - Multiple questions per level (6 questions)
 * - Comprehensive learning content before questions
 * - Immediate visual feedback (correct answers turn green, wrong turn red)
 * - Audio feedback using useSoundEffects hook
 * - Celebration animation with particle effects
 * - Progress tracking through questions
 * 
 * PROPS:
 * - level: Complete level data including questions and explanation
 * - onComplete: Callback when player finishes the level
 * - onBack: Callback to return to level selection
 * - completionCount: Number of times this level was completed correctly
 * - onCorrectAnswer: Callback when user gets all questions correct
 * ============================================================================
 */

import { useState } from 'react';
import { ArrowLeft, Check, X, Zap, CheckCircle2, BookOpen, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Level } from '@/data/levels';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Props interface for LevelGame component
 */
interface LevelGameProps {
  /** Complete level data including questions, explanation, and metadata */
  level: Level;
  /** Callback when level is completed. Receives score */
  onComplete: (score: number) => void;
  /** Callback to navigate back to level selection */
  onBack: () => void;
  /** Number of correct completions for this level */
  completionCount: number;
  /** Callback when user completes all questions correctly */
  onCorrectAnswer: () => void;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * LevelGame Component
 * 
 * Renders the full gameplay experience for a single level.
 * Manages learning content, multiple questions, and celebration states.
 */
export const LevelGame = ({ level, onComplete, onBack, completionCount, onCorrectAnswer }: LevelGameProps) => {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  
  /** Current phase: 'learning' for reading content, 'questions' for answering */
  const [phase, setPhase] = useState<'learning' | 'questions'>('learning');
  
  /** Current question index (0 to questions.length - 1) */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  /** Index of the currently selected answer option (null if none selected) */
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  /** Whether the user has submitted their current answer */
  const [isAnswered, setIsAnswered] = useState(false);
  
  /** Track correct answers count */
  const [correctCount, setCorrectCount] = useState(0);
  
  /** Whether to show the celebration/success screen */
  const [showCelebration, setShowCelebration] = useState(false);
  
  /** Sound effects hook for audio feedback */
  const { playSound } = useSoundEffects();

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------

  /** Get current question */
  const currentQuestion = level.questions[currentQuestionIndex];
  
  /** Check if the selected answer is correct */
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  
  /** Total number of questions */
  const totalQuestions = level.questions.length;
  
  /** Check if this is the last question */
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  /**
   * Handle starting the questions after reading content
   */
  const handleStartQuestions = () => {
    playSound('click');
    setPhase('questions');
  };

  /**
   * Handle answer submission
   */
  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    
    if (isCorrect) {
      playSound('correct');
      setCorrectCount(prev => prev + 1);
    } else {
      playSound('incorrect');
    }
  };

  /**
   * Handle moving to next question or completing level
   */
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // All questions answered - show celebration if majority correct
      const finalCorrectCount = correctCount + (isCorrect ? 1 : 0);
      const passedLevel = finalCorrectCount >= Math.ceil(totalQuestions / 2);
      
      if (passedLevel) {
        playSound('complete');
        onCorrectAnswer(); // Increment completion count
        setShowCelebration(true);
      } else {
        // Didn't pass - still complete level but with lower score
        onComplete(finalCorrectCount * 15);
      }
    } else {
      // Move to next question
      playSound('click');
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  /**
   * Handle completing the level from celebration screen
   */
  const handleComplete = () => {
    const finalScore = (correctCount + (isCorrect ? 1 : 0)) * 20;
    onComplete(finalScore);
  };

  /**
   * Handle selecting an answer option
   */
  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    playSound('click');
    setSelectedAnswer(index);
  };

  // ---------------------------------------------------------------------------
  // CELEBRATION SCREEN
  // ---------------------------------------------------------------------------

  if (showCelebration) {
    const finalCorrectCount = correctCount + (isCorrect ? 1 : 0);
    return (
      <div className="min-h-screen bg-background circuit-bg flex items-center justify-center p-4">
        <div className="text-center animate-scale-in">
          {/* Animated checkmark with glow */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-neon-green/20 flex items-center justify-center glow-green animate-pulse">
              <Check className="w-16 h-16 text-neon-green" />
            </div>
            
            {/* Particle effects */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-neon-green"
                style={{
                  top: '50%',
                  left: '50%',
                  animation: `particle ${0.8 + Math.random() * 0.4}s ease-out forwards`,
                  transform: `rotate(${i * 30}deg) translateY(-80px)`,
                }}
              />
            ))}
          </div>
          
          {/* Success message */}
          <h2 className="text-3xl font-bold text-foreground mb-2 text-glow-green">
            Level Complete!
          </h2>
          <p className="text-muted-foreground mb-2">
            You've mastered "{level.title}"
          </p>
          
          {/* Score display */}
          <div className="text-lg text-foreground mb-2">
            {finalCorrectCount}/{totalQuestions} Questions Correct
          </div>
          
          {/* Points earned display */}
          <div className="flex items-center justify-center gap-2 text-neon-cyan mb-8">
            <Zap className="w-5 h-5" />
            <span className="font-mono text-xl">+{finalCorrectCount * 20} points</span>
          </div>

          {/* Continue button */}
          <Button
            onClick={handleComplete}
            className="cyber-btn px-8 py-6 text-lg border-glow-cyan"
          >
            <span className="text-glow-cyan">Continue</span>
          </Button>
        </div>
        
        <style>{`
          @keyframes particle {
            0% { opacity: 1; transform: rotate(var(--rotation)) translateY(0); }
            100% { opacity: 0; transform: rotate(var(--rotation)) translateY(-120px); }
          }
        `}</style>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // LEARNING PHASE
  // ---------------------------------------------------------------------------

  if (phase === 'learning') {
    return (
      <div className="min-h-screen bg-background circuit-bg">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-glow-cyan">Back to Levels</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completionCount} {completionCount === 1 ? 'completion' : 'completions'}</span>
                </div>
                <div className="font-mono text-primary">
                  Level {level.id}/65
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Level Title */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary">{level.sectionName}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-glow-cyan mb-2">
              {level.title}
            </h1>
            <p className="text-muted-foreground">Read and understand the concepts below, then test your knowledge</p>
          </div>

          {/* Learning Content */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8 mb-8 animate-slide-up">
            <h2 className="font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              What You'll Learn
            </h2>
            
            {/* Comprehensive content - now with more detail */}
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {level.content.map((section, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                  <h3 className="font-semibold text-foreground text-lg mb-2 flex items-center gap-2">
                    <span className="text-primary font-mono text-sm bg-primary/10 px-2 py-0.5 rounded">{String(i + 1).padStart(2, '0')}</span>
                    {section.heading}
                  </h3>
                  <p className="pl-8 text-base">{section.text}</p>
                  {section.example && (
                    <div className="pl-8 mt-2 p-3 bg-primary/5 border-l-2 border-primary rounded-r">
                      <span className="text-primary font-medium">Example: </span>
                      <span>{section.example}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-neon-cyan" />
                Key Takeaways
              </h3>
              <ul className="grid gap-2">
                {level.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Start Questions Button */}
          <div className="text-center">
            <Button
              onClick={handleStartQuestions}
              className="cyber-btn px-8 py-6 text-lg border-glow-cyan"
            >
              <span className="text-glow-cyan flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Start Quiz ({totalQuestions} Questions)
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // QUESTIONS PHASE
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-background circuit-bg">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline text-glow-cyan">Back to Levels</span>
            </button>
            
            <div className="flex items-center gap-4">
              {/* Question counter */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Question</span>
                <span className="font-mono text-primary">{currentQuestionIndex + 1}/{totalQuestions}</span>
              </div>
              {/* Score so far */}
              <div className="flex items-center gap-2 text-sm text-neon-green">
                <Check className="w-4 h-4" />
                <span className="font-mono">{correctCount} correct</span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Level info */}
        <div className="text-center mb-6 animate-fade-in">
          <p className="text-sm font-mono text-muted-foreground mb-1">{level.sectionName}</p>
          <h1 className="text-xl font-bold text-foreground">{level.title}</h1>
        </div>

        {/* Question Card */}
        <div className="bg-card border border-border rounded-xl p-6 animate-slide-up">
          {/* Question text */}
          <h2 className="font-semibold text-foreground mb-6 text-lg">
            {currentQuestion.question}
          </h2>

          {/* Answer options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={cn(
                  'w-full p-4 rounded-lg border text-left transition-all duration-200',
                  'hover:border-primary/50 hover:bg-primary/5',
                  selectedAnswer === index && !isAnswered && 'border-primary bg-primary/10',
                  isAnswered && index === currentQuestion.correctAnswer && 'border-neon-green bg-neon-green/10',
                  isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && 'border-destructive bg-destructive/10',
                  !isAnswered && selectedAnswer !== index && 'border-border'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border',
                    selectedAnswer === index && !isAnswered && 'border-primary text-primary',
                    isAnswered && index === currentQuestion.correctAnswer && 'border-neon-green text-neon-green bg-neon-green/20',
                    isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && 'border-destructive text-destructive bg-destructive/20',
                    selectedAnswer !== index && !isAnswered && 'border-muted-foreground text-muted-foreground'
                  )}>
                    {isAnswered && index === currentQuestion.correctAnswer ? (
                      <Check className="w-4 h-4" />
                    ) : isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer ? (
                      <X className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  
                  <span className={cn(
                    'flex-1',
                    isAnswered && index === currentQuestion.correctAnswer && 'text-neon-green',
                    isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && 'text-destructive',
                    !isAnswered && 'text-foreground'
                  )}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={cn(
              'p-4 rounded-lg mb-6 animate-fade-in',
              isCorrect 
                ? 'bg-neon-green/10 border border-neon-green/30' 
                : 'bg-destructive/10 border border-destructive/30'
            )}>
              <p className={cn('font-medium', isCorrect ? 'text-neon-green' : 'text-destructive')}>
                {isCorrect 
                  ? '🎉 Correct! Great job!' 
                  : '❌ Not quite right. The correct answer is highlighted above.'
                }
              </p>
              {currentQuestion.explanation && (
                <p className="text-sm text-muted-foreground mt-2">{currentQuestion.explanation}</p>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={isAnswered ? handleNextQuestion : handleSubmit}
            disabled={selectedAnswer === null && !isAnswered}
            className={cn(
              'w-full cyber-btn py-6 text-lg font-semibold',
              isAnswered && isCorrect && 'border-glow-green',
              !isAnswered && selectedAnswer !== null && 'border-glow-cyan'
            )}
          >
            <span className="text-glow-cyan">
              {isAnswered 
                ? (isLastQuestion ? 'Complete Level' : 'Next Question')
                : 'Submit Answer'
              }
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
