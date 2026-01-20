import { useState } from 'react';
import { Check, Lock, ChevronDown, ChevronUp, AlertTriangle, Zap, ClipboardCheck, Eye } from 'lucide-react';

type TrafficDecision = 'HOLD_OBSERVE' | 'PROCEED_CONTROLLED' | 'DO_NOT_CHANGE' | 'STOP_CONTAMINATED';

interface DecisionState {
  type: TrafficDecision;
  label: string;
  sublabel: string;
  description: string;
}

const getDecision = (q1: number, q2: number, q3: number): DecisionState => {
  if (q1 === 0 || q1 === 1) {
    return {
      type: 'HOLD_OBSERVE',
      label: 'HOLD & OBSERVE',
      sublabel: '(Action Required)',
      description: 'Traffic foundation not established. Sending traffic now contaminates your baseline data. The system detected pre-launch anxiety patterns in 68% of stores at this stage.'
    };
  }
  if (q1 === 2) {
    return {
      type: 'DO_NOT_CHANGE',
      label: 'DO NOT CHANGE',
      sublabel: '(Data Incomplete)',
      description: 'You\'re in the critical 72-hour observation window. Any changes now — price, product, or creative — will reset your signal baseline. This is where 83% of stores make their first fatal mistake.'
    };
  }
  if (q1 === 3) {
    return {
      type: 'STOP_CONTAMINATED',
      label: 'STOP — SIGNAL CONTAMINATED',
      sublabel: '(Immediate Review Required)',
      description: 'Traffic is active but signals are conflicted. The system detected a pattern break that requires isolation before proceeding. Continuing now guarantees misread data.'
    };
  }
  if (q1 === 4) {
    return {
      type: 'PROCEED_CONTROLLED',
      label: 'PROCEED WITH CONTROLLED TRAFFIC',
      sublabel: '(Thresholds Defined)',
      description: 'Free traffic first is the correct sequence for your profile. The system has defined your exit criteria — unlock to see the exact volume and timing thresholds.'
    };
  }
  return {
    type: 'HOLD_OBSERVE',
    label: 'HOLD & OBSERVE',
    sublabel: '(Action Required)',
    description: 'The system requires more signal clarity before recommending traffic action. This is not "wait and see" — this is "wait correctly."'
  };
};

const DecisionSystemDemo = () => {
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingCheckpoint, setProcessingCheckpoint] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1, 2]);

  const checkpoints = [
    {
      id: 0,
      title: "What's stopping you from sending traffic right now?",
      subtext: "Most beginners are stuck here — this is exactly where mistakes happen.",
      options: [
        "I haven't sent any traffic yet",
        "I'm scared to waste money on ads",
        "I tried traffic but don't know if it worked",
        "I'm getting clicks but no sales",
        "I don't know what to do next"
      ],
      highlightIndex: 0,
      highlightLabel: "Most common"
    },
    {
      id: 1,
      title: "What traffic are you most likely to try first?",
      subtext: "There's no wrong answer — the system adjusts based on your input.",
      options: [
        "Free traffic (TikTok, Reels, organic posts)",
        "Paid ads (Meta, TikTok Ads, Google)",
        "Influencers / shoutouts",
        "I genuinely don't know — that's the problem"
      ]
    },
    {
      id: 2,
      title: "How long has your store been live?",
      subtext: "Timing changes everything about what action to take.",
      options: [
        "Haven't launched yet",
        "Just launched (0-48 hours)",
        "A few days in",
        "Over a week"
      ]
    }
  ];

  // Step 1-2: Visible, expanded by default
  const visibleSteps = [
    {
      step: 1,
      title: "What your situation actually indicates (not what it feels like)",
      diagnosis: "You're in the early signal window — not failure.",
      signals: [
        { name: "Signal 1: Click-to-engagement quality", description: "(how visitors interact after landing)" },
        { name: "Signal 2: Add-to-cart density per traffic batch", description: "(early purchase intent patterns)" },
        { name: "Signal 3: Time-on-page vs bounce pattern", description: "(attention quality before exit)" }
      ],
      whyMatters: "These 3 signals tell the system whether you have usable data — not whether your store \"works.\" Most beginners misread silence as failure. The system doesn't."
    },
    {
      step: 2,
      title: "The #1 mistake to avoid in the next 48 hours",
      warning: "Do NOT touch: Product / pricing / layout — until the checkpoint says you have usable data.",
      comparison: {
        wrong: "What most people do: See zero sales → panic → change the product, price, or ad creative → contaminate all future data.",
        right: "What the system does instead: Measure the signal window → compare against baseline patterns → only recommend changes when the data supports it."
      },
      bottomLine: "The system prevents reactive decisions that reset your traffic learning curve."
    }
  ];

  // Steps 3-6: Locked with irresistible titles
  const lockedSteps = [
    { 
      step: 3, 
      title: "Exact traffic actions for the next 48 hours (Free + Paid paths)", 
      teaser: "A step-by-step traffic sequence based on your stage…" 
    },
    { 
      step: 4, 
      title: "The exact trigger that flips your decision (and what to do immediately)", 
      teaser: "The moment you move from HOLD → PUSH…" 
    },
    { 
      step: 5, 
      title: "What NOT to touch (even if you panic)", 
      teaser: "The 3 changes that kill momentum…" 
    },
    { 
      step: 6, 
      title: "Your recommended traffic method (Free vs Paid) — and why", 
      teaser: "Which channel fits your store right now…" 
    }
  ];

  const handleOptionSelect = (checkpointId: number, optionIndex: number) => {
    if (selections[checkpointId] !== undefined) return;
    
    setSelections(prev => ({ ...prev, [checkpointId]: optionIndex }));
    setIsProcessing(true);
    setProcessingCheckpoint(checkpointId);
    
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingCheckpoint(null);
      
      if (checkpointId < checkpoints.length - 1) {
        setCurrentCheckpoint(checkpointId + 1);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  const toggleStep = (step: number) => {
    setExpandedSteps(prev => 
      prev.includes(step) 
        ? prev.filter(s => s !== step)
        : [...prev, step]
    );
  };

  const isCheckpointComplete = (id: number) => selections[id] !== undefined;
  const isCheckpointActive = (id: number) => id === currentCheckpoint && !showResult;
  const isCheckpointLocked = (id: number) => id > currentCheckpoint;

  const decision = showResult ? getDecision(selections[0], selections[1], selections[2]) : null;

  const getDecisionStyles = (type: TrafficDecision) => {
    switch (type) {
      case 'HOLD_OBSERVE':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', shadow: 'shadow-amber-500/20' };
      case 'PROCEED_CONTROLLED':
        return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', shadow: 'shadow-emerald-500/20' };
      case 'DO_NOT_CHANGE':
        return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', shadow: 'shadow-orange-500/20' };
      case 'STOP_CONTAMINATED':
        return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', shadow: 'shadow-red-500/20' };
      default:
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', shadow: 'shadow-amber-500/20' };
    }
  };

  return (
    <section className="mb-14 px-4 md:px-2">
      {/* Section Header - Danger Zone Framing */}
      <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
        <h2 className="text-[1.75rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 md:mb-6">
          This Is Where Most Stores <span className="text-red-400">Lose Money</span> — Or <span className="text-primary">Gain Clarity</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed">
          The store isn't the hard part.<br className="hidden sm:block" />
          <span className="text-muted-foreground">Knowing what to do after traffic starts is what determines whether you win or stall.</span>
        </p>
      </div>

      {/* Main Demo Container - Wider */}
      <div className="max-w-3xl mx-auto">
        
        {/* CTA Instruction Bar - Highly Visible */}
        {!showResult && (
          <div className="bg-gradient-to-r from-primary/20 via-primary/15 to-primary/20 border-2 border-primary/40 rounded-xl p-5 sm:p-6 mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ClipboardCheck className="w-6 h-6 text-primary" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                Answer 3 quick questions. Get a sample plan.
              </h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              This is a preview. The paid version generates the full step-by-step traffic plan.
            </p>
          </div>
        )}

        {/* Stacked Checkpoints */}
        {!showResult && (
          <div className="space-y-4">
            {checkpoints.map((checkpoint) => (
              <div 
                key={checkpoint.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isCheckpointComplete(checkpoint.id)
                    ? 'bg-secondary/20 border-primary/30'
                    : isCheckpointActive(checkpoint.id)
                      ? 'bg-secondary/40 border-white/20'
                      : 'bg-secondary/10 border-white/5 opacity-50'
                }`}
              >
                <div className={`flex items-center justify-between p-5`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCheckpointComplete(checkpoint.id)
                        ? 'bg-primary text-primary-foreground'
                        : isCheckpointActive(checkpoint.id)
                          ? 'bg-foreground/20 text-foreground'
                          : 'bg-white/10 text-muted-foreground/50'
                    }`}>
                      {isCheckpointComplete(checkpoint.id) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        checkpoint.id + 1
                      )}
                    </div>
                    <div>
                      <p className={`text-lg sm:text-lg md:text-xl font-semibold leading-snug ${
                        isCheckpointLocked(checkpoint.id) ? 'text-muted-foreground/50' : 'text-foreground'
                      }`}>
                        {checkpoint.title}
                      </p>
                      {isCheckpointComplete(checkpoint.id) && (
                        <p className="text-sm text-primary mt-1">
                          {checkpoint.options[selections[checkpoint.id]]}
                        </p>
                      )}
                    </div>
                  </div>
                  {isCheckpointActive(checkpoint.id) && (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                  {isCheckpointLocked(checkpoint.id) && (
                    <Lock className="w-4 h-4 text-muted-foreground/30" />
                  )}
                </div>

                {isCheckpointActive(checkpoint.id) && !isProcessing && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="space-y-3">
                      {checkpoint.options.map((option, idx) => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(checkpoint.id, idx)}
                          className={`w-full text-left px-5 py-4 rounded-lg text-sm md:text-base transition-all duration-300 bg-secondary/60 text-foreground hover:bg-secondary hover:border-primary/30 border border-white/10 cursor-pointer relative`}
                        >
                          {option}
                          {checkpoint.highlightIndex === idx && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-primary font-medium px-2 py-0.5 bg-primary/10 rounded-full">
                              {checkpoint.highlightLabel}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-center text-sm text-muted-foreground/60 mt-4 italic">
                      {checkpoint.subtext}
                    </p>
                  </div>
                )}

                {processingCheckpoint === checkpoint.id && isProcessing && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="text-center py-6">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <p className="text-sm text-foreground/70">
                        Comparing against traffic patterns…
                      </p>
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        Matching to 10,437 first-time stores…
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Result Panel */}
        {showResult && decision && (
          <div className="animate-fade-in">
            {/* Decision Badge */}
            {(() => {
              const styles = getDecisionStyles(decision.type);
              return (
                <div className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-5 sm:p-6 md:p-8 text-center mb-6 md:mb-8 shadow-lg ${styles.shadow}`}>
                  <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-2">System Decision</p>
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold ${styles.text} mb-1`}>
                    {decision.label}
                  </h3>
                  <p className={`text-sm sm:text-base ${styles.text} opacity-80 mb-4`}>
                    {decision.sublabel}
                  </p>
                  <p className="text-sm sm:text-base text-foreground/80 max-w-lg mx-auto leading-relaxed">
                    {decision.description}
                  </p>
                </div>
              );
            })()}

            {/* Your Custom Traffic Plan Section */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Your Custom Traffic Plan <span className="text-primary">(Preview)</span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                  You'll get a step-by-step plan based on your answers. Below is a sample of how it's delivered.
                </p>
              </div>

              {/* System Basis - Credibility Numbers */}
              <div className="bg-secondary/30 border border-white/10 rounded-lg p-4 mb-6">
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-3 text-center">System Basis</p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm">
                  <div className="text-center">
                    <span className="text-foreground font-semibold">10,437</span>
                    <span className="text-muted-foreground ml-1">store launches matched</span>
                  </div>
                  <div className="text-center">
                    <span className="text-foreground font-semibold">1,562</span>
                    <span className="text-muted-foreground ml-1">recent beginner stores</span>
                  </div>
                  <div className="text-center">
                    <span className="text-primary font-semibold">73%</span>
                    <span className="text-muted-foreground ml-1">pattern match confidence</span>
                  </div>
                </div>
              </div>

              {/* Step-By-Step Plan Label */}
              <p className="text-sm sm:text-base text-primary font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Step-By-Step Plan
              </p>

              {/* Step 1: Visible, WOW content */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl overflow-hidden mb-3">
                <button
                  onClick={() => toggleStep(1)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-foreground">
                      {visibleSteps[0].title}
                    </span>
                  </div>
                  {expandedSteps.includes(1) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedSteps.includes(1) && (
                  <div className="px-4 sm:px-5 pb-5 animate-fade-in">
                    {/* Diagnosis Line */}
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-4 ml-11">
                      <p className="text-sm sm:text-base">
                        <span className="font-bold text-emerald-400">Diagnosis:</span>
                        <span className="text-foreground ml-2">"{visibleSteps[0].diagnosis}"</span>
                      </p>
                    </div>

                    {/* Signals the system is watching */}
                    <div className="ml-11 space-y-2 mb-4">
                      <p className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-2">Signals the system is watching:</p>
                      {visibleSteps[0].signals.map((signal, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <span className="text-foreground font-medium">{signal.name}</span>
                            <span className="text-muted-foreground/70 ml-1">{signal.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Why this matters */}
                    <div className="ml-11 bg-secondary/30 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1">Why this matters:</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {visibleSteps[0].whyMatters}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Visible, WOW content */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl overflow-hidden mb-6">
                <button
                  onClick={() => toggleStep(2)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-foreground">
                      {visibleSteps[1].title}
                    </span>
                  </div>
                  {expandedSteps.includes(2) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedSteps.includes(2) && (
                  <div className="px-4 sm:px-5 pb-5 animate-fade-in">
                    {/* Warning Line */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 ml-11">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base font-bold text-red-400">
                          {visibleSteps[1].warning}
                        </p>
                      </div>
                    </div>

                    {/* What most people do vs What the system does */}
                    <div className="ml-11 space-y-3 mb-4">
                      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                        <p className="text-xs text-red-400/70 uppercase tracking-wider mb-1">❌ What most people do:</p>
                        <p className="text-sm text-foreground/80">{visibleSteps[1].comparison.wrong}</p>
                      </div>
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                        <p className="text-xs text-emerald-400/70 uppercase tracking-wider mb-1">✓ What the system does instead:</p>
                        <p className="text-sm text-foreground/80">{visibleSteps[1].comparison.right}</p>
                      </div>
                    </div>

                    {/* Bottom line */}
                    <div className="ml-11 bg-secondary/30 rounded-lg p-3">
                      <p className="text-sm text-foreground/90 font-medium">
                        {visibleSteps[1].bottomLine}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider before locked steps */}
              <div className="border-t border-white/10 my-6" />

              {/* Locked Steps Label */}
              <p className="text-sm sm:text-base text-red-400/80 font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Locked Steps (where the real plan is)
              </p>

              {/* Steps 3-6: Locked */}
              <div className="space-y-3">
                {lockedSteps.map((item) => (
                  <div 
                    key={item.step}
                    className="group flex items-start gap-3 p-4 sm:p-5 bg-secondary/30 border border-white/10 rounded-xl cursor-not-allowed hover:border-red-500/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-muted-foreground/50 flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <Lock className="w-4 h-4 text-red-400/50 mt-1 flex-shrink-0 group-hover:text-red-400/70 transition-colors" />
                        <div>
                          <p className="text-sm sm:text-base font-medium text-muted-foreground/70">
                            Step {item.step}: {item.title}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground/40 blur-[2px] select-none mt-1">
                            {item.teaser}
                          </p>
                          <p className="text-xs text-muted-foreground/50 mt-2">
                            Unlocks with the full checkpoint
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forced Curiosity Line */}
            <div className="text-center py-4 mb-6">
              <p className="text-sm sm:text-base text-red-400/80 italic">
                This is where most people lose momentum by guessing.
              </p>
            </div>

            {/* Emotional Trigger */}
            <div className="bg-gradient-to-r from-amber-500/5 via-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-xl p-4 sm:p-5 text-center mb-8">
              <p className="text-sm sm:text-base text-orange-300/90 font-medium">
                Most users say this is the moment they realize why their last store failed.
              </p>
            </div>

            {/* CTA Section */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent md:relative md:p-0 md:bg-none z-50">
              <div className="bg-gradient-to-b from-secondary/50 to-secondary/80 border border-primary/30 rounded-2xl p-5 sm:p-6 md:p-8 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                  Pass the First Traffic Checkpoint
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                  $37
                </p>
                
                <a 
                  href="#cta"
                  className="block w-full bg-primary text-primary-foreground font-bold py-4 sm:py-5 px-8 rounded-xl text-base sm:text-lg md:text-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,213,0,0.5)] mb-4"
                >
                  Unlock the Traffic Decision System
                </a>
                
                <p className="text-sm sm:text-base text-muted-foreground/80 mb-2">
                  One-time system. Use it on every store you ever launch.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground/60">
                  Not a course. Not a subscription. No guessing.
                </p>
              </div>
            </div>

            {/* Final Emotional Frame */}
            <div className="mt-10 md:mt-14 text-center pb-4">
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-2">
                You already did the hard part — the store.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-3">
                Traffic is where most people quietly lose.
              </p>
              <p className="text-lg sm:text-xl font-bold text-primary">
                This system makes sure you don't.
              </p>
            </div>
            
            {/* Spacer for sticky CTA on mobile */}
            <div className="h-40 md:h-0" />
          </div>
        )}
      </div>
    </section>
  );
};

export default DecisionSystemDemo;
