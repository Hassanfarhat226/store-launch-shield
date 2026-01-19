import { useState } from 'react';
import { Check, Lock, ChevronDown } from 'lucide-react';

type Step = 1 | 2 | 3;

interface Selections {
  step1: number | null;
  step2: number | null;
  step3: number | null;
}

const DecisionSystemDemo = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selections, setSelections] = useState<Selections>({
    step1: null,
    step2: null,
    step3: null
  });

  const isComplete = selections.step1 !== null && selections.step2 !== null && selections.step3 !== null;

  const handleStep1Select = (index: number) => {
    setSelections(prev => ({ ...prev, step1: index }));
    setTimeout(() => setCurrentStep(2), 400);
  };

  const handleStep2Select = (index: number) => {
    setSelections(prev => ({ ...prev, step2: index }));
    setTimeout(() => setCurrentStep(3), 400);
  };

  const handleStep3Select = (index: number) => {
    setSelections(prev => ({ ...prev, step3: index }));
  };

  const step1Options = [
    'Is this product viable?',
    'Improve early performance',
    'Decide whether to stop'
  ];

  const step2Options = [
    'Traffic but no engagement',
    'Engagement but no sales',
    'A few sales',
    'Nothing yet / too early'
  ];

  const step3Options = [
    'No',
    'Yes (page, price, or product)'
  ];

  const lockedCategories = [
    'Traffic minimum threshold',
    'Early-data vs failure classification',
    'What NOT to change yet',
    'Exact next action timing'
  ];

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          The First Traffic Checkpoint™
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Answer 3 quick questions. The system tells you what to do next.
        </p>
      </div>

      {/* Progressive Steps Container */}
      <div className="max-w-2xl mx-auto space-y-4">
        
        {/* STEP 1 */}
        <div 
          className={`rounded-2xl border transition-all duration-300 ${
            currentStep === 1 
              ? 'border-primary/40 bg-card' 
              : selections.step1 !== null 
                ? 'border-white/10 bg-card/50' 
                : 'border-white/5 bg-card/30'
          }`}
        >
          <button
            onClick={() => selections.step1 !== null && setCurrentStep(1)}
            className="w-full p-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                selections.step1 !== null 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep === 1 
                    ? 'bg-primary/20 text-primary border border-primary/50' 
                    : 'bg-secondary text-muted-foreground'
              }`}>
                {selections.step1 !== null ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  What are you trying to figure out right now?
                </div>
                {selections.step1 !== null && currentStep !== 1 && (
                  <div className="text-xs text-primary mt-0.5">{step1Options[selections.step1]}</div>
                )}
              </div>
            </div>
            {selections.step1 !== null && (
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${currentStep === 1 ? 'rotate-180' : ''}`} />
            )}
          </button>
          
          {currentStep === 1 && (
            <div className="px-5 pb-5 space-y-3">
              <p className="text-xs text-muted-foreground/70 italic ml-11 mb-4">
                Used differently depending on intent
              </p>
              {step1Options.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleStep1Select(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all duration-200 ${
                    selections.step1 === idx
                      ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_20px_rgba(255,213,0,0.3)]'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-white/5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* STEP 2 */}
        <div 
          className={`rounded-2xl border transition-all duration-300 ${
            currentStep === 2 
              ? 'border-primary/40 bg-card' 
              : selections.step2 !== null 
                ? 'border-white/10 bg-card/50' 
                : 'border-white/5 bg-card/30 opacity-50'
          }`}
        >
          <button
            onClick={() => selections.step1 !== null && selections.step2 !== null && setCurrentStep(2)}
            disabled={selections.step1 === null}
            className="w-full p-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                selections.step2 !== null 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep === 2 
                    ? 'bg-primary/20 text-primary border border-primary/50' 
                    : 'bg-secondary text-muted-foreground'
              }`}>
                {selections.step2 !== null ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  What best describes what you're seeing so far?
                </div>
                {selections.step2 !== null && currentStep !== 2 && (
                  <div className="text-xs text-primary mt-0.5">{step2Options[selections.step2]}</div>
                )}
              </div>
            </div>
            {selections.step2 !== null && (
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${currentStep === 2 ? 'rotate-180' : ''}`} />
            )}
          </button>
          
          {currentStep === 2 && selections.step1 !== null && (
            <div className="px-5 pb-5 space-y-3">
              <div className="ml-11 mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-primary">
                  Got it — this changes how early results are evaluated.
                </p>
              </div>
              <p className="text-xs text-muted-foreground/70 italic ml-11 mb-2">
                Most beginners misinterpret this stage.
              </p>
              {step2Options.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleStep2Select(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all duration-200 ${
                    selections.step2 === idx
                      ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_20px_rgba(255,213,0,0.3)]'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-white/5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* STEP 3 */}
        <div 
          className={`rounded-2xl border transition-all duration-300 ${
            currentStep === 3 
              ? 'border-primary/40 bg-card' 
              : selections.step3 !== null 
                ? 'border-white/10 bg-card/50' 
                : 'border-white/5 bg-card/30 opacity-50'
          }`}
        >
          <button
            onClick={() => selections.step2 !== null && selections.step3 !== null && setCurrentStep(3)}
            disabled={selections.step2 === null}
            className="w-full p-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                selections.step3 !== null 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep === 3 
                    ? 'bg-primary/20 text-primary border border-primary/50' 
                    : 'bg-secondary text-muted-foreground'
              }`}>
                {selections.step3 !== null ? <Check className="w-4 h-4" /> : '3'}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  Have you changed anything since traffic started?
                </div>
                {selections.step3 !== null && currentStep !== 3 && (
                  <div className="text-xs text-primary mt-0.5">{step3Options[selections.step3]}</div>
                )}
              </div>
            </div>
            {selections.step3 !== null && (
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${currentStep === 3 ? 'rotate-180' : ''}`} />
            )}
          </button>
          
          {currentStep === 3 && selections.step2 !== null && (
            <div className="px-5 pb-5 space-y-3">
              <div className="ml-11 mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-primary">
                  This is where momentum is usually lost.
                </p>
              </div>
              <p className="text-xs text-muted-foreground/70 italic ml-11 mb-2">
                Prevents false early decisions
              </p>
              {step3Options.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleStep3Select(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all duration-200 ${
                    selections.step3 === idx
                      ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_20px_rgba(255,213,0,0.3)]'
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-white/5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RESULT PANEL - Shows after all steps complete */}
        {isComplete && (
          <div className="mt-8 rounded-2xl border-2 border-primary/50 bg-card p-6 relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
            
            {/* Result Badge */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-[0_0_30px_rgba(255,213,0,0.4)]">
                <Check className="w-4 h-4" />
                RESULT: WAIT
              </span>
              <p className="mt-3 text-xs text-muted-foreground/60">
                Based on internal checkpoint rules
              </p>
            </div>

            {/* Locked Categories */}
            <div className="space-y-3 mb-6">
              {lockedCategories.map((category, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-white/5"
                >
                  <span className="text-sm text-muted-foreground/50 blur-[2px] select-none">
                    {category}
                  </span>
                  <Lock className="w-4 h-4 text-primary/60 flex-shrink-0" />
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground/60 italic mb-6">
              Full decision logic unlocks after purchase.
            </p>

            {/* Micro-psychology text */}
            <div className="text-center mb-6 py-4 border-t border-b border-white/10">
              <p className="text-sm text-foreground/80 italic">
                "Most people quit here by mistake."
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a 
                href="#cta"
                className="w-full flex items-center justify-center text-center bg-primary text-primary-foreground font-bold py-4 px-6 rounded-xl hover:shadow-[0_0_40px_rgba(255,213,0,0.5)] transition-all duration-300 text-base"
              >
                Unlock the Full First Traffic Checkpoint™
              </a>
              <p className="text-center text-xs text-muted-foreground/50 mt-3">
                One-time system • Use it on every store
              </p>
            </div>
          </div>
        )}

        {/* Pre-result teaser when not complete */}
        {!isComplete && (
          <div className="mt-6 text-center py-8 rounded-2xl border border-white/5 bg-card/30">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-muted-foreground/40" />
            </div>
            <p className="text-sm text-muted-foreground/60">
              Complete all 3 steps to see your result
            </p>
          </div>
        )}
      </div>

      {/* Bottom copy */}
      <div className="text-center mt-12 max-w-xl mx-auto">
        <p className="text-base text-muted-foreground">
          You don't need to think. You just need to unlock this.
        </p>
      </div>
    </section>
  );
};

export default DecisionSystemDemo;