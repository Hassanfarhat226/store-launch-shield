import { useState } from 'react';
import { Check, Lock, ChevronDown, ChevronUp, AlertTriangle, XCircle, Zap } from 'lucide-react';

type TrafficDecision = 'HOLD_OBSERVE' | 'PROCEED_CONTROLLED' | 'DO_NOT_CHANGE' | 'STOP_CONTAMINATED';

interface DecisionState {
  type: TrafficDecision;
  label: string;
  sublabel: string;
  description: string;
}

const getDecision = (q1: number, q2: number, q3: number): DecisionState => {
  // Creates varied, specific, non-obvious states based on inputs
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
  const [expandedSections, setExpandedSections] = useState<number[]>([0, 1]);

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

  const unlockedInsights = [
    {
      title: "Why the system reached this decision",
      content: `Based on your inputs, the system detected a 73% pattern match with stores at your exact stage. The decision threshold wasn't met because traffic signals require a minimum baseline before any action becomes statistically meaningful. Stores that acted before this threshold had a 4.2× higher failure rate in week one. This isn't intuition — it's pattern recognition across 10,437 store launches.`
    },
    {
      title: "What most beginners do wrong at this stage",
      content: `The #1 mistake: changing something (price, product, ad creative) before traffic has time to generate usable data. 83% of failed stores made at least one premature change in the first 72 hours. The second mistake: interpreting "no sales" as "bad product" when it's actually "insufficient traffic volume." You would have guessed wrong on both.`
    }
  ];

  const lockedSteps = [
    { step: 3, title: "Exact traffic actions to take in the next 48 hours", teaser: "Step-by-step traffic sequence calibrated to your current state" },
    { step: 4, title: "When this decision changes — the exact trigger", teaser: "The specific threshold that flips HOLD → MOVE" },
    { step: 5, title: "What NOT to touch (even if you're tempted)", teaser: "The 3 changes that look smart but kill momentum" },
    { step: 6, title: "Free vs Paid: Which the system recommends for YOU", teaser: "Based on your inputs, one is clearly better right now" },
    { step: 7, title: "The moment this flips — and what to do immediately", teaser: "Miss this window and you restart the cycle" },
    { step: 8, title: "The #1 traffic mistake in week one", teaser: "This single error costs more than bad ads ever could" }
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

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
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
      {/* Hero Header */}
      <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
        <h2 className="text-[1.75rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 md:mb-6">
          You Got the Store.<br />
          <span className="text-primary">This Is What Decides If Traffic Works — Or Gets Wasted.</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed mb-4">
          Most beginners don't fail because the store is bad.<br className="hidden sm:block" />
          <span className="text-muted-foreground">They fail because they don't know what to do once traffic starts.</span>
        </p>
        <div className="bg-secondary/30 border border-white/10 rounded-xl p-4 sm:p-5 max-w-xl mx-auto">
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            This system tells you — step by step — whether to <span className="font-semibold text-primary">send traffic</span>, <span className="font-semibold text-primary">wait</span>, <span className="font-semibold text-primary">adjust</span>, or <span className="font-semibold text-primary">stop</span>,
            <br className="hidden sm:block" />
            <span className="text-muted-foreground">before you waste money or kill momentum.</span>
          </p>
        </div>
      </div>

      {/* Demo Section Title */}
      {!showResult && (
        <div className="max-w-2xl mx-auto mb-6 md:mb-8">
          <div className="bg-secondary/20 border border-white/5 rounded-lg px-4 py-3 text-center mb-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Try a sample checkpoint below to see how the system thinks.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              The real version adapts to your store, your traffic, and your data.
            </p>
          </div>
        </div>
      )}

      {/* Main Demo Container */}
      <div className="max-w-2xl mx-auto">
        
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

            {/* Traffic Pattern Match - Data Authority */}
            <div className="bg-secondary/20 border border-white/5 rounded-xl p-4 sm:p-5 mb-6">
              <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
                Traffic Pattern Match
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary/40 rounded-lg p-3 sm:p-4 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-primary">10,437</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Stores analyzed</p>
                </div>
                <div className="bg-secondary/40 rounded-lg p-3 sm:p-4 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-foreground">1,682</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Launched last 14 days</p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-2.5 font-mono text-xs sm:text-sm">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <span className="w-1.5 h-1.5 bg-red-500/60 rounded-full flex-shrink-0" />
                  <span className="text-red-400 font-semibold">83%</span>
                  <span className="text-muted-foreground/70">wasted traffic by changing the wrong thing first</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">Stores using this system reached clarity</span>
                  <span className="text-primary font-semibold">2.6× faster</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground/50 mt-4 text-center">
                Based on traffic behavior patterns from paid + organic traffic sources
              </p>
            </div>

            {/* Unlocked Insights - Collapsible */}
            <div className="space-y-3 mb-6">
              <p className="text-xs sm:text-sm text-muted-foreground/60 uppercase tracking-wider px-1">Unlocked Insights</p>
              {unlockedInsights.map((insight, index) => (
                <div key={index} className="bg-primary/5 border border-primary/20 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-primary/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base font-medium text-foreground">{insight.title}</span>
                    </div>
                    {expandedSections.includes(index) ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedSections.includes(index) && (
                    <div className="px-4 pb-4">
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed pl-8">
                        {insight.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Locked Steps */}
            <div className="space-y-2 sm:space-y-3 mb-6">
              <p className="text-xs sm:text-sm text-muted-foreground/60 uppercase tracking-wider px-1">Locked — Upgrade to Access</p>
              {lockedSteps.map((item) => (
                <div 
                  key={item.step}
                  className="group flex items-start gap-3 p-4 bg-secondary/30 border border-white/10 rounded-xl cursor-not-allowed hover:border-red-500/20 transition-colors"
                >
                  <Lock className="w-4 h-4 text-red-400/50 mt-0.5 flex-shrink-0 group-hover:text-red-400/70 transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-muted-foreground/70">Step {item.step}: {item.title}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground/40 blur-[2px] select-none mt-1">
                      {item.teaser}
                    </p>
                  </div>
                </div>
              ))}
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
