import { useState, useEffect } from 'react';
import { Check, Lock } from 'lucide-react';

type Step = 1 | 2 | 3 | 'result';

const DecisionSystemDemo = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selections, setSelections] = useState({
    intent: null as number | null,
    dataStage: null as number | null,
    time: null as number | null
  });
  const [showResult, setShowResult] = useState(false);
  const [autoSelected, setAutoSelected] = useState(false);

  // Auto-select first option after 1.5s for Question 1
  useEffect(() => {
    if (currentStep === 1 && selections.intent === null && !autoSelected) {
      const timer = setTimeout(() => {
        setSelections(prev => ({ ...prev, intent: 0 }));
        setAutoSelected(true);
        setTimeout(() => setCurrentStep(2), 600);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, selections.intent, autoSelected]);

  const handleIntentSelect = (index: number) => {
    if (selections.intent !== null) return; // No changing
    setSelections(prev => ({ ...prev, intent: index }));
    setTimeout(() => setCurrentStep(2), 500);
  };

  const handleDataStageSelect = (index: number) => {
    if (selections.dataStage !== null) return;
    setSelections(prev => ({ ...prev, dataStage: index }));
    setTimeout(() => setCurrentStep(3), 500);
  };

  const handleTimeSelect = (index: number) => {
    if (selections.time !== null) return;
    setSelections(prev => ({ ...prev, time: index }));
    setTimeout(() => {
      setCurrentStep('result');
      setShowResult(true);
    }, 500);
  };

  const intentOptions = [
    'Is this worth continuing?',
    "I'm unsure what these results mean"
  ];

  const dataStageOptions = [
    'Traffic, no sales',
    'Some engagement, no clarity',
    'Nothing meaningful yet'
  ];

  const timeOptions = [
    'Just started',
    'A few days',
    'Longer than expected'
  ];

  const lockedSections = [
    'What this result actually means',
    'What NOT to change yet',
    "The exact signal you're missing",
    'The mistake that causes most people to quit here'
  ];

  const getStepNumber = () => {
    if (currentStep === 'result') return 3;
    return currentStep;
  };

  return (
    <section className="mb-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          First Traffic Checkpoint™
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          The system evaluates your situation.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className={currentStep !== 'result' ? 'text-primary font-medium' : 'text-muted-foreground'}>
            Checkpoint {getStepNumber()} of 3
          </span>
          {currentStep === 'result' && (
            <span className="text-primary font-medium ml-2">→ Result</span>
          )}
        </div>
        <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ 
              width: currentStep === 'result' 
                ? '100%' 
                : `${(getStepNumber() / 3) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Questions Container */}
      <div className="max-w-lg mx-auto">
        
        {/* QUESTION 1: INTENT */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <p className="text-lg text-foreground font-medium">
                What are you trying to figure out right now?
              </p>
            </div>
            <div className="space-y-3">
              {intentOptions.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleIntentSelect(idx)}
                  disabled={selections.intent !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 ${
                    selections.intent === idx
                      ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_25px_rgba(255,213,0,0.35)]'
                      : selections.intent !== null
                        ? 'bg-secondary/30 text-muted-foreground/50 cursor-not-allowed'
                        : 'bg-secondary/50 text-foreground hover:bg-secondary border border-white/5 cursor-pointer'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUESTION 2: DATA STAGE */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <p className="text-lg text-foreground font-medium">
                What happened so far?
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2 italic">
                Most people misread this stage.
              </p>
            </div>
            <div className="space-y-3">
              {dataStageOptions.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleDataStageSelect(idx)}
                  disabled={selections.dataStage !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 ${
                    selections.dataStage === idx
                      ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_25px_rgba(255,213,0,0.35)]'
                      : selections.dataStage !== null
                        ? 'bg-secondary/30 text-muted-foreground/50 cursor-not-allowed'
                        : 'bg-secondary/50 text-foreground hover:bg-secondary border border-white/5 cursor-pointer'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUESTION 3: TIME */}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <p className="text-lg text-foreground font-medium">
                How long has traffic been running?
              </p>
            </div>
            <div className="space-y-3">
              {timeOptions.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleTimeSelect(idx)}
                  disabled={selections.time !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 ${
                    selections.time === idx
                      ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_25px_rgba(255,213,0,0.35)]'
                      : selections.time !== null
                        ? 'bg-secondary/30 text-muted-foreground/50 cursor-not-allowed'
                        : 'bg-secondary/50 text-foreground hover:bg-secondary border border-white/5 cursor-pointer'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT PANEL */}
        {showResult && (
          <div className="animate-fade-in">
            {/* Result Badge */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-[0_0_30px_rgba(255,213,0,0.4)]">
                <Check className="w-4 h-4" />
                RESULT: WAIT
              </span>
              <p className="mt-3 text-xs text-muted-foreground/50">
                Based on internal checkpoint logic
              </p>
            </div>

            {/* Locked Sections */}
            <div className="space-y-2 mb-6">
              {lockedSections.map((section, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-white/5 cursor-not-allowed"
                >
                  <span className="text-sm text-muted-foreground/40 blur-[2px] select-none">
                    {section}
                  </span>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground/30" />
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Line */}
            <p className="text-center text-sm text-foreground/80 mb-10">
              This is where most people make the wrong decision.
            </p>

            {/* CTA - Sticky on mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent md:relative md:p-0 md:bg-none z-50">
              <a 
                href="#cta"
                className="block w-full text-center bg-primary text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,213,0,0.5)] animate-[pulse-result_3s_ease-in-out_1]"
              >
                Unlock the Full First Traffic Checkpoint™
              </a>
              <p className="text-center text-xs text-muted-foreground/50 mt-3">
                One-time system. Use it on every store.
              </p>
            </div>
            
            {/* Spacer for sticky CTA on mobile */}
            <div className="h-24 md:h-0" />
          </div>
        )}
      </div>
    </section>
  );
};

export default DecisionSystemDemo;