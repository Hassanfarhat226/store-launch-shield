import { useState } from 'react';
import { Check, Lock, ChevronDown, AlertTriangle } from 'lucide-react';

interface Checkpoint {
  id: number;
  title: string;
  subtext: string;
  options: string[];
  highlightIndex?: number;
  highlightLabel?: string;
}

const DecisionSystemDemo = () => {
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingCheckpoint, setProcessingCheckpoint] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  const checkpoints: Checkpoint[] = [
    {
      id: 0,
      title: "What's happening right now?",
      subtext: "This is completely normal right after a store is built.",
      options: [
        "I'm getting traffic, but no sales",
        "I see some activity, but I don't know what it means",
        "Nothing meaningful has happened yet",
        "I don't know what to do next"
      ],
      highlightIndex: 3,
      highlightLabel: "Most common"
    },
    {
      id: 1,
      title: "Where is traffic coming from (or will come from)?",
      subtext: "Different traffic sources require different early decisions.",
      options: [
        "Paid ads (Meta / TikTok / Google)",
        "Organic (TikTok, Reels, Shorts)",
        "Influencers / shoutouts",
        "I haven't sent traffic yet"
      ]
    },
    {
      id: 2,
      title: "How long has the store been live?",
      subtext: "Timing determines whether a result is meaningful or misleading.",
      options: [
        "Less than 48 hours",
        "3–7 days",
        "Over a week",
        "I haven't launched yet"
      ]
    }
  ];

  const lockedSections = [
    'The exact signal that flips this decision',
    'The mistake that resets most stores here',
    'What to change only after the signal appears',
    'Why guessing here delays success by weeks',
    'The move that kills otherwise winning products'
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
    }, 700);
  };

  const isCheckpointComplete = (id: number) => selections[id] !== undefined;
  const isCheckpointActive = (id: number) => id === currentCheckpoint && !showResult;
  const isCheckpointLocked = (id: number) => id > currentCheckpoint;

  return (
    <section className="mb-14 px-2">
      {/* Header */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
          You Just Built the Store.<br />
          <span className="text-primary">This Is the System That Tells You What To Do Next.</span>
        </h2>
        <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-3">
          This is a live preview of the First Traffic Checkpoint™ —<br />
          the same system you'll use every time you launch or test a store.
        </p>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          You're not expected to "get results" yet.<br />
          You're expected to interpret the right signals at the right time.
        </p>
      </div>

      {/* Why These Questions Look Simple */}
      {!showResult && (
        <div className="max-w-2xl mx-auto mb-10 bg-secondary/30 border border-white/10 rounded-xl p-6">
          <p className="text-base md:text-lg font-semibold text-foreground mb-3">
            Why these questions look simple
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
            Early-stage stores don't fail because of complex problems.<br />
            They fail because beginners misread early data and change the wrong thing.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            This system doesn't guess.<br />
            It classifies your situation and tells you what to do — or what NOT to touch.
          </p>
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
                      <p className={`text-base md:text-lg font-semibold ${
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
                        Evaluating against early failure patterns…
                      </p>
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        Checking against similar store launches…
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Result Panel */}
        {showResult && (
          <div className="animate-fade-in">
            {/* Decision Badge - Action-Framed */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg md:text-xl font-bold bg-primary text-primary-foreground shadow-[0_0_40px_rgba(255,213,0,0.45)]">
                <AlertTriangle className="w-5 h-5" />
                HOLD & OBSERVE
                <span className="text-sm font-medium opacity-90">(Action Required)</span>
              </span>
            </div>

            {/* System Confidence Proof */}
            <div className="bg-secondary/30 border border-white/10 rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-foreground mb-4">
                How the system reached this decision
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Matched against early-stage store patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Traffic maturity evaluated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Variable contamination detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-medium">Decision confidence: High</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/60 italic">
                Full rule logic unlocks after purchase.
              </p>
            </div>

            {/* Required Next Action - Partial Preview */}
            <div className="bg-secondary/40 border border-primary/30 rounded-xl p-6 mb-6">
              <p className="text-base md:text-lg font-bold text-foreground mb-4">
                Your Required Next Action (Partial Preview)
              </p>
              
              {/* Visible Steps */}
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm md:text-base text-foreground">
                    Keep traffic running unchanged for the next 48 hours
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm md:text-base text-foreground">
                    Monitor only clicks and add-to-carts
                  </p>
                </div>
              </div>

              {/* Blurred Steps */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-secondary/30 border border-white/10 rounded-lg">
                  <Lock className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                    Exact traffic threshold the system is waiting for
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/30 border border-white/10 rounded-lg">
                  <Lock className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                    The signal that flips this decision
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/30 border border-white/10 rounded-lg">
                  <Lock className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                    What action replaces "WAIT"
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/30 border border-white/10 rounded-lg">
                  <Lock className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                    What beginners do wrong at this exact stage
                  </span>
                </div>
              </div>
            </div>

            {/* Read More Expand */}
            {!showReadMore ? (
              <button
                onClick={() => setShowReadMore(true)}
                className="w-full text-center py-3 text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4 mb-6"
              >
                Read how the system knows this
              </button>
            ) : (
              <div className="bg-secondary/20 border border-white/10 rounded-xl p-5 mb-6 animate-fade-in">
                <p className="text-sm text-foreground/80 mb-3">
                  This decision is based on:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 mb-3">
                  <li>• traffic source behavior patterns</li>
                  <li>• time-on-site distribution</li>
                  <li>• early funnel compression</li>
                  <li>• launch-stage misclassification risk</li>
                </ul>
                <p className="text-sm text-muted-foreground/60 blur-[3px] select-none">
                  The algorithm weighs each factor against your specific traffic source and time window to determine whether
                </p>
              </div>
            )}

            {/* Locked Danger Sections */}
            <div className="space-y-3 mb-8">
              {lockedSections.map((section, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center justify-between p-5 rounded-xl bg-secondary/20 border border-white/10 cursor-not-allowed hover:border-red-500/30 transition-colors"
                  title="Unlock to see exact thresholds and timing logic."
                >
                  <span className="text-base text-muted-foreground/40 blur-[2px] select-none">
                    {section}
                  </span>
                  <Lock className="w-5 h-5 text-muted-foreground/30 group-hover:text-red-500/50 transition-colors" />
                </div>
              ))}
            </div>

            {/* Fork in the Road */}
            <div className="bg-secondary/30 border border-white/10 rounded-xl p-6 mb-8">
              <p className="text-base md:text-lg font-bold text-foreground mb-3">
                What happens next depends on ONE thing
              </p>
              <p className="text-sm text-muted-foreground mb-5">
                The next step is different depending on what happens first.<br />
                Most people guess. The system doesn't.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-secondary/40 border border-white/10 rounded-lg">
                  <Lock className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                    If engagement increases → Action A
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/40 border border-white/10 rounded-lg">
                  <Lock className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                    If engagement stalls → Action B
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent md:relative md:p-0 md:bg-none z-50">
              <a 
                href="#cta"
                className="block w-full text-center bg-primary text-primary-foreground font-bold py-5 px-8 rounded-xl text-lg md:text-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,213,0,0.5)] animate-[pulse_3s_ease-in-out_1]"
              >
                🔓 Unlock My Exact Next Steps
              </a>
              <p className="text-center text-sm text-muted-foreground/80 mt-4">
                Stop guessing. Follow the system that adapts as your store does.
              </p>
              <p className="text-center text-xs text-muted-foreground/50 mt-2">
                (Most people unlock this after wasting money guessing.)
              </p>
            </div>

            {/* Final Psychological Anchor */}
            <div className="mt-12 md:mt-16 text-center pb-4">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-2">
                This isn't advice.
              </p>
              <p className="text-base md:text-lg text-foreground/90 font-medium leading-relaxed">
                It's a decision system that removes guesswork —<br />
                at the exact moment most beginners panic.
              </p>
            </div>
            
            {/* Spacer for sticky CTA on mobile */}
            <div className="h-32 md:h-0" />
          </div>
        )}
      </div>
    </section>
  );
};

export default DecisionSystemDemo;
