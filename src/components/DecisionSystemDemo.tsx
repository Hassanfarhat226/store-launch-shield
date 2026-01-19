import { useState } from 'react';
import { Check, Lock } from 'lucide-react';

type Step = 1 | 2 | 3 | 'result';

const DecisionSystemDemo = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selections, setSelections] = useState({
    situation: null as number | null,
    interpretation: null as number | null
  });
  const [showResult, setShowResult] = useState(false);

  const handleSituationSelect = (index: number) => {
    if (selections.situation !== null) return;
    setSelections(prev => ({ ...prev, situation: index }));
    setTimeout(() => setCurrentStep(2), 600);
  };

  const handleInterpretationSelect = (index: number) => {
    if (selections.interpretation !== null) return;
    setSelections(prev => ({ ...prev, interpretation: index }));
    setTimeout(() => {
      setCurrentStep('result');
      setShowResult(true);
    }, 600);
  };

  // Checkpoint 1: Emotionally accurate beginner options
  const situationOptions = [
    "I'm getting traffic, but no sales yet",
    "I'm seeing activity, but nothing clear",
    "It feels too early to tell"
  ];

  // Locked interpretation items
  const lockedInterpretation = [
    'Why this result was chosen',
    'What NOT to change yet',
    'What signal actually matters',
    'The exact next action window'
  ];

  // Locked Checkpoint 3 items
  const lockedNextSteps = [
    'Wait and observe for X hours',
    'Focus on this one metric only',
    'Ignore these signals completely',
    'Take action only if this happens'
  ];

  return (
    <section className="mb-14">
      {/* Header - Reframed as protection */}
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
          Try the First Traffic Checkpoint™
        </h2>
        <p className="text-sm text-muted-foreground/80 max-w-sm mx-auto leading-relaxed">
          See how the system evaluates your situation — before you send real traffic.
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2 max-w-xs mx-auto">
          This is the moment most beginners misinterpret results and quit too early.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="text-primary/80 font-medium">
            Checkpoint {currentStep === 'result' ? 2 : currentStep} of 3
          </span>
        </div>
        <div className="mt-3 h-1 bg-secondary/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary/80 transition-all duration-500 ease-out"
            style={{ 
              width: currentStep === 'result' 
                ? '66%' 
                : `${((currentStep as number) / 3) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Checkpoints Container */}
      <div className="max-w-lg mx-auto">
        
        {/* CHECKPOINT 1: WHERE YOU ARE RIGHT NOW */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <p className="text-base md:text-lg text-foreground font-medium">
                Right after a store is built, most people are here.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                This isn't failure — it's the earliest data window.
              </p>
            </div>
            <div className="space-y-3">
              {situationOptions.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleSituationSelect(idx)}
                  disabled={selections.situation !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 ${
                    selections.situation === idx
                      ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_25px_rgba(255,213,0,0.35)]'
                      : selections.situation !== null
                        ? 'bg-secondary/30 text-muted-foreground/50 cursor-not-allowed'
                        : 'bg-secondary/50 text-foreground hover:bg-secondary border border-white/5 cursor-pointer'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {/* Micro-copy for doubt */}
            <p className="text-center text-xs text-muted-foreground/50 italic mt-5">
              Most people change the wrong thing here.
            </p>
          </div>
        )}

        {/* CHECKPOINT 2: INTERPRETATION (PARTIAL) */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <p className="text-base md:text-lg text-foreground font-medium">
                This is where most stores get misjudged.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                The result itself isn't the problem. The interpretation is.
              </p>
            </div>

            {/* Selection for provisional outcome */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleInterpretationSelect(0)}
                disabled={selections.interpretation !== null}
                className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 ${
                  selections.interpretation === 0
                    ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_25px_rgba(255,213,0,0.35)]'
                    : selections.interpretation !== null
                      ? 'bg-secondary/30 text-muted-foreground/50 cursor-not-allowed'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary border border-white/5 cursor-pointer'
                }`}
              >
                Show me what this means
              </button>
            </div>
          </div>
        )}

        {/* RESULT PANEL - After Checkpoint 2 */}
        {showResult && (
          <div className="animate-fade-in">
            {/* Result Badge */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-[0_0_30px_rgba(255,213,0,0.4)]">
                <Check className="w-4 h-4" />
                RESULT: WAIT
              </span>
              <p className="mt-3 text-xs text-muted-foreground/50">
                Based on internal checkpoint rules
              </p>
            </div>

            {/* Locked Interpretation Sections */}
            <div className="space-y-2 mb-6">
              {lockedInterpretation.map((section, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-white/5 cursor-not-allowed"
                >
                  <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                    {section}
                  </span>
                  <Lock className="w-4 h-4 text-muted-foreground/30" />
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground/50 mb-8">
              Full decision logic unlocks after purchase.
            </p>

            {/* CHECKPOINT 3: LOCKED ENTIRELY */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground/60 font-medium">
                  Checkpoint 3 of 3
                </p>
                <p className="text-xs text-muted-foreground/40 mt-1">
                  This is where the system tells you exactly what to do next.
                </p>
              </div>
              <div className="space-y-2 opacity-50">
                {lockedNextSteps.map((step, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-white/3"
                  >
                    <span className="text-xs text-muted-foreground/20 blur-[3px] select-none">
                      {step}
                    </span>
                    <Lock className="w-3 h-3 text-muted-foreground/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Critical psychological line */}
            <p className="text-center text-sm text-foreground/70 mb-10">
              This is where most people make the wrong decision.
            </p>

            {/* CTA - Sticky on mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent md:relative md:p-0 md:bg-none z-50">
              <a 
                href="#cta"
                className="block w-full text-center bg-primary text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,213,0,0.5)] animate-[pulse_3s_ease-in-out_1]"
              >
                Unlock the Full First Traffic Checkpoint™
              </a>
              <p className="text-center text-xs text-muted-foreground/50 mt-3">
                One-time system • Use it on every store
              </p>
              <p className="text-center text-xs text-muted-foreground/40 mt-1">
                Most people spend more than this testing blindly.
              </p>
            </div>
            
            {/* Spacer for sticky CTA on mobile */}
            <div className="h-28 md:h-0" />
          </div>
        )}
      </div>
    </section>
  );
};

export default DecisionSystemDemo;
