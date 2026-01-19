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

  const checkpoints: Checkpoint[] = [
    {
      id: 0,
      title: "Where are you with traffic?",
      subtext: "Most people are here after their first store.",
      options: [
        "I haven't sent any traffic yet",
        "I'm scared to run ads",
        "I tried traffic but don't know if I did it right",
        "I'm sending traffic but don't know what to change",
        "I want free traffic before paid ads"
      ],
      highlightIndex: 0,
      highlightLabel: "Most common"
    },
    {
      id: 1,
      title: "What traffic are you thinking about?",
      subtext: "Select one option.",
      options: [
        "Free traffic (TikTok, Reels, organic)",
        "Paid ads (Meta, TikTok, Google)",
        "Influencers / shoutouts",
        "I don't know — that's the problem"
      ]
    },
    {
      id: 2,
      title: "Where are you in the process?",
      subtext: "Timing changes everything.",
      options: [
        "Haven't started yet",
        "Just started",
        "A few days in"
      ]
    }
  ];

  const lockedSteps = [
    { step: 3, title: "Exactly how much traffic to send before deciding anything" },
    { step: 4, title: "Free vs paid traffic — which one the system recommends for you" },
    { step: 5, title: "The moment this decision flips — and what to do immediately" },
    { step: 6, title: "The #1 traffic mistake beginners make in week one" }
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
    <section className="mb-14 px-4 md:px-2">
      {/* Hero Header */}
      <div className="text-center mb-8 md:mb-10 max-w-3xl mx-auto">
        <h2 className="text-[1.75rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 md:mb-6">
          You Built the Store.<br />
          <span className="text-primary">Now Comes the Part That Actually Matters: Traffic.</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed mb-4">
          Most beginners don't fail because their store is bad.<br className="hidden sm:block" />
          They fail because they don't know how to send traffic — or what kind.
        </p>
        <div className="bg-secondary/30 border border-white/10 rounded-xl p-4 sm:p-5 max-w-lg mx-auto">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            This system tells you exactly:<br />
            <span className="text-foreground font-medium">when to send traffic</span> · <span className="text-foreground font-medium">what type to send</span> · <span className="text-foreground font-medium">what not to touch</span>
          </p>
        </div>
      </div>

      {/* Section Title */}
      {!showResult && (
        <div className="max-w-2xl mx-auto mb-6 md:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-foreground text-center mb-2">
            Tell the system where you are with traffic
          </h3>
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
                        Analyzing traffic pattern…
                      </p>
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        Checking against first-time store data…
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
            {/* Decision Badge - Traffic Focused */}
            <div className="text-center mb-6 md:mb-8">
              <span className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold bg-primary text-primary-foreground shadow-[0_0_40px_rgba(255,213,0,0.45)]">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                HOLD & PREPARE TRAFFIC
                <span className="text-xs sm:text-sm font-medium opacity-90">(Action Required)</span>
              </span>
            </div>

            {/* Badge Subtext */}
            <div className="text-center mb-6 md:mb-8 max-w-lg mx-auto">
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                This is not "do nothing."<br />
                <span className="text-muted-foreground">This is "set traffic up correctly so you don't waste it."</span>
              </p>
            </div>

            {/* Traffic Pattern Match */}
            <div className="bg-secondary/20 border border-white/5 rounded-xl p-4 sm:p-5 mb-6">
              <p className="text-base sm:text-lg font-semibold text-foreground mb-1">
                Traffic Pattern Match
              </p>
              
              <div className="space-y-2 sm:space-y-2.5 font-mono text-xs sm:text-sm mt-4">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">Compared against</span>
                  <span className="text-foreground font-semibold">10,367</span>
                  <span className="text-muted-foreground/70">first-time stores</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full flex-shrink-0" />
                  <span className="text-foreground font-semibold">7,412</span>
                  <span className="text-muted-foreground/70">had no traffic plan when they launched</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <span className="w-1.5 h-1.5 bg-red-500/60 rounded-full flex-shrink-0" />
                  <span className="text-foreground font-semibold">83%</span>
                  <span className="text-muted-foreground/70">wasted traffic by changing the wrong thing first</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">Stores that followed the system reached clarity</span>
                  <span className="text-primary font-semibold">2.6× faster</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground/50 mt-5">
                This system is designed specifically for first-time traffic decisions.
              </p>
            </div>

            {/* Collapsible Steps */}
            <div className="bg-secondary/40 border border-primary/30 rounded-xl p-4 sm:p-6 mb-6">
              <p className="text-lg sm:text-xl md:text-xl font-bold text-foreground mb-4">
                Your Traffic Steps
              </p>
              
              {/* Unlocked Steps */}
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Step 1</p>
                    <p className="text-sm md:text-base text-foreground/80">
                      What this traffic decision means right now
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Step 2</p>
                    <p className="text-sm md:text-base text-foreground/80">
                      What NOT to change while sending traffic
                    </p>
                  </div>
                </div>
              </div>

              {/* Locked Steps */}
              <div className="space-y-3">
                {lockedSteps.map((item) => (
                  <div 
                    key={item.step}
                    className="group flex items-start gap-3 p-4 bg-secondary/30 border border-white/10 rounded-lg cursor-not-allowed hover:border-red-500/20 transition-colors"
                  >
                    <Lock className="w-4 h-4 text-muted-foreground/40 mt-0.5 flex-shrink-0 group-hover:text-red-500/50 transition-colors" />
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground/50 mb-1">Step {item.step}</p>
                      <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent md:relative md:p-0 md:bg-none z-50">
              <a 
                href="#cta"
                className="block w-full text-center bg-primary text-primary-foreground font-bold py-5 px-8 rounded-xl text-lg md:text-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,213,0,0.5)] animate-[pulse_3s_ease-in-out_1]"
              >
                🔓 Unlock the Traffic System for This Store
              </a>
              <p className="text-center text-sm sm:text-base text-muted-foreground/80 mt-4">
                One-time access.<br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>Use it for every store you ever launch.
              </p>
            </div>

            {/* Final Psychological Anchor */}
            <div className="mt-12 md:mt-16 text-center pb-4">
              <p className="text-base sm:text-lg md:text-lg text-foreground/90 leading-relaxed font-medium mb-3">
                You don't need more tutorials.
              </p>
              <p className="text-lg sm:text-xl md:text-xl text-muted-foreground leading-relaxed">
                You need something that tells you what traffic to send —<br className="hidden sm:block" />
                right now.
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
