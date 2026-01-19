import { useState } from 'react';
import { Check, Lock } from 'lucide-react';

const DecisionSystemDemo = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2000);
  };

  const situationOptions = [
    "I'm getting traffic, but no sales",
    "I see some activity, but I don't know what it means",
    "Nothing meaningful has happened yet",
    "I don't know what to do next"
  ];

  const lockedSections = [
    'What this result actually means',
    'What NOT to change yet (most people change this)',
    'What to watch next (and what to ignore)',
    'When this decision changes'
  ];

  const adaptationFactors = [
    'your traffic source',
    'what you changed',
    'how long you have been live',
    'what you are trying to achieve'
  ];

  return (
    <section className="mb-14 px-2">
      {/* Header - Reframed for emotional pull */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
          You Built the Store.<br />
          <span className="text-primary">This Is What Tells You What To Do Next.</span>
        </h2>
        <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-4">
          This system removes guessing after launch and tells you exactly what to do — or not do — at each stage.
        </p>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Most beginners don't fail because the store is bad.<br />
          They fail because they change the wrong thing at the wrong time.
        </p>
      </div>

      {/* Main Demo Container - Wider, more prominent */}
      <div className="max-w-2xl mx-auto">
        
        {/* Question Panel */}
        {!showResult && !isProcessing && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl lg:text-2xl text-foreground font-semibold mb-3">
                Based on where you are right now…
              </p>
              <p className="text-base md:text-lg text-foreground/70">
                What's happening right now?
              </p>
            </div>
            
            <div className="space-y-4">
              {situationOptions.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left px-6 py-5 rounded-xl text-base md:text-lg transition-all duration-300 ${
                    selectedOption === idx
                      ? 'bg-primary text-primary-foreground font-semibold shadow-[0_0_30px_rgba(255,213,0,0.4)]'
                      : selectedOption !== null
                        ? 'bg-secondary/30 text-muted-foreground/50 cursor-not-allowed'
                        : 'bg-secondary/60 text-foreground hover:bg-secondary hover:border-primary/30 border border-white/10 cursor-pointer'
                  } ${idx === 3 ? 'relative' : ''}`}
                >
                  {option}
                  {idx === 3 && selectedOption === null && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-primary/70 font-medium">
                      most chosen
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Helper text */}
            <p className="text-center text-sm text-muted-foreground/60 mt-6">
              This is normal right after a store is built.
            </p>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="animate-fade-in text-center py-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-lg md:text-xl text-foreground font-medium mb-2">
              Reviewing early-stage signals…
            </p>
            <p className="text-sm text-muted-foreground/60">
              This is where most beginners make the wrong move.
            </p>
          </div>
        )}

        {/* Result Panel */}
        {showResult && (
          <div className="animate-fade-in">
            {/* Result Badge */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg md:text-xl font-bold bg-primary text-primary-foreground shadow-[0_0_40px_rgba(255,213,0,0.45)]">
                <Check className="w-5 h-5" />
                RESULT: WAIT
              </span>
              <p className="mt-4 text-base text-foreground/70">
                This decision is based on your current stage — not guesswork.
              </p>
            </div>

            {/* Locked Sections */}
            <div className="space-y-3 mb-6">
              {lockedSections.map((section, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center justify-between p-5 rounded-xl bg-secondary/30 border border-white/10 cursor-not-allowed hover:border-primary/20 transition-colors"
                >
                  <span className="text-base text-muted-foreground/50 blur-[2px] select-none">
                    {section}
                  </span>
                  <Lock className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary/50 transition-colors" />
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground/60 mb-10">
              Full decision logic unlocks after purchase.
            </p>

            {/* Customization Signal */}
            <div className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-10">
              <p className="text-base md:text-lg text-foreground/80 font-medium mb-4">
                This decision adapts based on:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {adaptationFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{factor}</span>
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
                Get My Next Steps
              </a>
              <p className="text-center text-sm text-muted-foreground/60 mt-4">
                One-time system • Use it on every store
              </p>
              <p className="text-center text-xs text-muted-foreground/50 mt-2">
                If you don't need it, don't use it — but most people do.
              </p>
            </div>

            {/* Final Emotional Anchor */}
            <div className="mt-12 md:mt-16 text-center pb-4">
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                You already did the hard part — getting the store built.<br />
                <span className="text-foreground/90 font-medium">This makes sure your next move doesn't slow you down.</span>
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
