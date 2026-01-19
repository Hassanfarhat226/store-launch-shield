import { useState } from 'react';
import { Check, Lock, ChevronDown } from 'lucide-react';

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
    'What to monitor next (and exact thresholds)',
    'When this decision changes',
    'What action replaces "WAIT"',
    'Exact next step once traffic stabilizes'
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
      {/* Header - Reframed */}
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

      {/* Why These Questions Look Simple - Framing Block */}
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
                {/* Checkpoint Header */}
                <div className={`flex items-center justify-between p-5 ${
                  isCheckpointComplete(checkpoint.id) ? 'cursor-default' : ''
                }`}>
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

                {/* Checkpoint Options - Expandable */}
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

                {/* Processing State for this checkpoint */}
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
            {/* Result Badge */}
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg md:text-xl font-bold bg-primary text-primary-foreground shadow-[0_0_40px_rgba(255,213,0,0.45)]">
                <Check className="w-5 h-5" />
                SYSTEM DECISION: WAIT
              </span>
              <p className="mt-4 text-base text-foreground/70">
                Based on your current stage — not guesswork.
              </p>
            </div>

            {/* Unlocked Sections - Fully Readable */}
            <div className="space-y-4 mb-6">
              <div className="bg-secondary/40 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-4 h-4 text-primary" />
                  <p className="text-base md:text-lg font-semibold text-foreground">
                    What this decision actually means
                  </p>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  You're too early to judge performance — but not too early to prepare.
                  Most stores that fail at this stage fail because they react emotionally.
                </p>
              </div>

              <div className="bg-secondary/40 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-4 h-4 text-primary" />
                  <p className="text-base md:text-lg font-semibold text-foreground">
                    What NOT to change yet
                  </p>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Pricing, product, and theme changes at this stage usually delay clarity
                  instead of improving results.
                </p>
              </div>
            </div>

            {/* Locked Sections - Blurred */}
            <div className="space-y-3 mb-6">
              {lockedSections.map((section, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center justify-between p-5 rounded-xl bg-secondary/20 border border-white/10 cursor-not-allowed hover:border-primary/20 transition-colors"
                  title="Unlock full system logic"
                >
                  <span className="text-base text-muted-foreground/40 blur-[2px] select-none">
                    {section}
                  </span>
                  <Lock className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground/60 mb-10">
              Full decision logic unlocks after purchase.
            </p>

            {/* CTA Section */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent md:relative md:p-0 md:bg-none z-50">
              <a 
                href="#cta"
                className="block w-full text-center bg-primary text-primary-foreground font-bold py-5 px-8 rounded-xl text-lg md:text-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,213,0,0.5)] animate-[pulse_3s_ease-in-out_1]"
              >
                Unlock the Full First Traffic Checkpoint™
              </a>
              <p className="text-center text-sm text-muted-foreground/70 mt-4">
                One system. Use it on every store.<br />
                No guessing. No second-guessing.
              </p>
              <p className="text-center text-xs text-muted-foreground/50 mt-2">
                This is the same system used after every launch —<br />
                not a one-time checklist.
              </p>
            </div>

            {/* Final Psychological Anchor */}
            <div className="mt-12 md:mt-16 text-center pb-4">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-2">
                Most beginners quit because they don't know what they're waiting for.
              </p>
              <p className="text-base md:text-lg text-foreground/90 font-medium leading-relaxed">
                This system tells you exactly when to wait —<br />
                and exactly when to move.
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
