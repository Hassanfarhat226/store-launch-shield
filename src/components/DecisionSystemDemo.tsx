import { useState, useCallback, useEffect, useMemo } from 'react';
import { Check, Lock, AlertTriangle, ChevronRight } from 'lucide-react';

// Types for the decision system
interface InputState {
  traffic: number | null;
  changed: number | null;
  happened: number | null;
  duration: number | null;
  goal: number | null;
}

interface TeaserOutput {
  result: 'WAIT' | 'PASS' | 'STOP';
  ruleCount: number;
  lockedActions: string[];
  warningTease: string;
  emotionalNote: string;
}

// Deterministic teaser logic - changes output based on inputs but never reveals specifics
const getTeaserOutput = (inputs: InputState): TeaserOutput => {
  const { duration, happened, changed } = inputs;
  
  // Scenario variations based on inputs
  if (duration === 0 || duration === 1) {
    return {
      result: 'WAIT',
      ruleCount: 12,
      lockedActions: [
        'Primary action for next 48 hours',
        'Exact traffic minimum required',
        'Which signals matter right now',
        'What outcome triggers a pass',
        'What outcome triggers a stop'
      ],
      warningTease: 'One wrong change here can invalidate your test',
      emotionalNote: "You're not failing. You're just early — and guessing here is expensive."
    };
  }
  
  if (duration === 2 && (happened === 1 || happened === 2)) {
    return {
      result: 'PASS',
      ruleCount: 8,
      lockedActions: [
        'Exact scaling percentage to use',
        'Which metric confirms this signal',
        'Time threshold before next decision',
        'What to do if momentum stops',
        'Budget adjustment rules',
        'When to add a second product'
      ],
      warningTease: 'Scaling too fast here has a specific consequence',
      emotionalNote: "You have real traction. The next move matters more than you think."
    };
  }
  
  if (duration === 3 && (happened === 3 || happened === 4)) {
    return {
      result: 'STOP',
      ruleCount: 14,
      lockedActions: [
        'Immediate action required',
        'What to check before pivoting',
        'Recovery protocol if applicable',
        'Minimum wait time before retesting',
        'Which variable to change first'
      ],
      warningTease: 'Continuing without this decision costs more than stopping',
      emotionalNote: "This isn't failure — it's data. But only if you know what it means."
    };
  }
  
  if (changed === 4) {
    return {
      result: 'WAIT',
      ruleCount: 11,
      lockedActions: [
        'Which change to keep, which to revert',
        'How long to wait for clean data',
        'Isolation protocol for variables',
        'What counts as "enough" traffic now',
        'Decision tree for next checkpoint'
      ],
      warningTease: 'Multiple changes create a specific blind spot',
      emotionalNote: "You're not lost. You just need to isolate what's actually working."
    };
  }
  
  if (happened === 2) {
    return {
      result: 'PASS',
      ruleCount: 9,
      lockedActions: [
        'Validation threshold reached',
        'Next scaling decision point',
        'CPA calculation for your situation',
        'When to increase budget',
        'What to test next (specific)',
        'Retention signals to watch'
      ],
      warningTease: 'Changing the wrong thing now can break what works',
      emotionalNote: "You have proof. Most people quit right before this moment."
    };
  }
  
  // Default teaser
  return {
    result: 'WAIT',
    ruleCount: 10,
    lockedActions: [
      'Minimum traffic before any decision',
      'Which 2 signals to track now',
      'What to ignore until checkpoint',
      'Timeline for next evaluation',
      'Specific pass/fail criteria'
    ],
    warningTease: 'Acting too early has a specific cost',
    emotionalNote: "You're gathering data. The system will tell you when you have enough."
  };
};

const DecisionSystemDemo = () => {
  const [inputs, setInputs] = useState<InputState>({
    traffic: null,
    changed: null,
    happened: null,
    duration: null,
    goal: null
  });
  
  const [output, setOutput] = useState<TeaserOutput | null>(null);
  const [visibleActions, setVisibleActions] = useState<number[]>([]);

  const allInputsSelected = 
    inputs.traffic !== null && 
    inputs.changed !== null && 
    inputs.happened !== null && 
    inputs.duration !== null && 
    inputs.goal !== null;

  useEffect(() => {
    if (allInputsSelected) {
      const newOutput = getTeaserOutput(inputs);
      setOutput(newOutput);
      setVisibleActions([]);
      
      newOutput.lockedActions.forEach((_, idx) => {
        setTimeout(() => {
          setVisibleActions(prev => [...prev, idx]);
        }, idx * 120);
      });
    } else {
      setOutput(null);
      setVisibleActions([]);
    }
  }, [inputs, allInputsSelected]);

  const handleInputSelect = useCallback((category: keyof InputState, index: number) => {
    setInputs(prev => ({
      ...prev,
      [category]: index
    }));
  }, []);

  const inputGroups = [
    {
      key: 'traffic' as const,
      label: 'Traffic source',
      hint: 'Used differently depending on traffic intent',
      options: ['Ads', 'TikTok / Reels', 'SEO / Google', 'Influencers', 'Other']
    },
    {
      key: 'changed' as const,
      label: 'What you changed recently',
      hint: 'This affects how early is "too early"',
      options: ['Nothing yet', 'I changed the product', 'I changed the price', 'I changed the landing page', 'I changed multiple things']
    },
    {
      key: 'happened' as const,
      label: 'What happened so far',
      hint: 'Most people misread this stage',
      options: ['Visits but no sales', 'Add-to-carts but no sales', 'A few sales', 'Zero clicks', "I don't know"]
    },
    {
      key: 'duration' as const,
      label: 'How long sending traffic',
      hint: 'Time thresholds matter',
      options: ['Just started', '1–2 days', '3–7 days', 'Over a week']
    },
    {
      key: 'goal' as const,
      label: 'Your goal right now',
      hint: 'Different goals = different rules',
      options: ['Get my first sale', 'Test if product is worth it', "Scale what's working", 'I just want clarity']
    }
  ];

  const getResultStyles = (result: string) => {
    switch (result) {
      case 'PASS':
        return 'bg-primary text-primary-foreground';
      case 'STOP':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <section className="mb-14 animate-section">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          The First Traffic Checkpoint™ Decision System
        </h2>
        <p className="text-muted-foreground text-lg">
          See how the system responds to your situation.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-[45%_55%] gap-4 lg:gap-6 mb-8">
        
        {/* LEFT PANEL: INPUT SIMULATOR */}
        <div 
          className="rounded-2xl p-5 md:p-6 border border-white/10 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">
            Step 1: Tell us what you did
          </div>
          <p className="text-xs text-muted-foreground/70 mb-5">
            Select ONE option in each section to see what the system would decide next.
          </p>

          {inputGroups.map((group) => (
            <div key={group.key} className="mb-5 last:mb-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <Check className={`w-4 h-4 ${inputs[group.key] !== null ? 'text-green-500' : 'text-muted-foreground/30'}`} />
                  <span>{group.label}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">Choose one</span>
              </div>
              <p className="text-xs text-muted-foreground/60 mb-2.5 ml-6 italic">
                {group.hint}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option, idx) => (
                  <button
                    key={option}
                    onClick={() => handleInputSelect(group.key, idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer
                      ${inputs[group.key] === idx 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                        : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-white/5'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Arrow */}
        <div className="flex lg:hidden justify-center py-3">
          <div className="flex flex-col items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.15s' }}></span>
            <span className="text-primary text-xl">↓</span>
          </div>
        </div>

        {/* RIGHT PANEL: DECISION OUTPUT (TEASER) */}
        <div 
          className="rounded-2xl p-5 md:p-6 border border-primary/30 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary"></div>
          
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium sticky top-0 z-10 pb-2" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
            Step 2: Get your exact next move
          </div>

          {!output ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-sm">
                Select all options to preview your decision
              </p>
            </div>
          ) : (
            <>
              {/* Result Badge with Obscured Subtext */}
              <div className="mb-6">
                <span 
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_25px_rgba(255,213,0,0.3)] ${getResultStyles(output.result)}`}
                >
                  <Check className="w-4 h-4" />
                  RESULT: {output.result}
                </span>
                <p className="mt-2 text-xs text-muted-foreground/50 flex items-center gap-1.5 blur-[1px]">
                  <Lock className="w-3 h-3" />
                  Based on {output.ruleCount} internal rules
                </p>
              </div>

              {/* Locked Action Items */}
              <div className="mb-6">
                <div className="text-sm text-foreground mb-3 font-semibold">What to do next</div>
                <div className="space-y-2.5">
                  {output.lockedActions.map((action, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center gap-2.5 transition-all duration-200 ${
                        visibleActions.includes(idx) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                      }`}
                    >
                      <Check className="w-4 h-4 text-green-500/50 flex-shrink-0" />
                      <span className="text-muted-foreground/40 text-sm blur-[3px] select-none">
                        {action}
                      </span>
                      <Lock className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground/60 italic">
                  Full decision logic revealed after purchase
                </p>
              </div>

              {/* Partial Warning */}
              <div className="mb-6 border border-destructive/20 rounded-lg p-4 bg-destructive/5">
                <div className="flex items-center gap-2 text-sm text-foreground mb-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-destructive/70" />
                  What NOT to do
                </div>
                <p className="text-sm text-muted-foreground/70 flex items-center gap-2">
                  {output.warningTease}
                  <Lock className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                </p>
              </div>

              {/* Emotional Note */}
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="text-sm text-foreground mb-2 font-semibold">Why this is the answer</div>
                <p className="text-sm text-primary/90 italic leading-relaxed mb-2">
                  {output.emotionalNote}
                </p>
                <p className="text-xs text-muted-foreground/50 flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  The exact reason why is explained inside the checkpoint.
                </p>
              </div>

              {/* What You're Not Seeing Yet */}
              <div className="border-t border-white/10 pt-5 mb-6">
                <div className="text-sm text-foreground mb-3 font-semibold">
                  What the Full Decision System Actually Includes
                </div>
                <div className="space-y-2">
                  {[
                    'Multiple decision branches (not one rule)',
                    'Different thresholds based on traffic type',
                    'Separate logic for clicks vs add-to-carts',
                    'Rules that change after each checkpoint',
                    'Clear stop signals (so you don\'t waste money)'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground/70">
                      <ChevronRight className="w-3 h-3 text-primary/60 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground/50 italic">
                  This preview shows the structure. The purchase unlocks the rules.
                </p>
              </div>

              {/* Soft CTA */}
              <div className="pt-2">
                <a 
                  href="#cta"
                  className="w-full flex items-center justify-center text-center bg-primary text-primary-foreground font-bold py-3.5 px-6 rounded-lg hover:shadow-[0_0_30px_rgba(255,213,0,0.4)] transition-all duration-300"
                >
                  Unlock Your Exact Next Move
                </a>
                <p className="text-center text-xs text-muted-foreground/50 mt-2">
                  One-time decision system • Use on every store
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* EXPLANATION COPY */}
      <div className="text-center mb-8">
        <p className="text-lg text-foreground mb-4">
          You're not buying a guide.<br />
          <span className="font-medium">You're getting the First Traffic Checkpoint™ — a system that takes what you did and tells you the next step.</span>
        </p>
        <p className="text-muted-foreground">
          Most beginners quit because they don't know if results mean "early" or "failed."<br />
          <span className="text-foreground font-medium">This removes that doubt.</span>
        </p>
      </div>

      {/* DELIVERABLES ROW */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl p-5 text-center border border-white/10 hover:border-primary/40 transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <div className="text-lg font-bold text-foreground mb-1">Checkpoint Scorecard</div>
          <div className="text-xs text-primary mb-2 font-medium">(Downloadable)</div>
          <p className="text-sm text-muted-foreground">Print it or keep it open while you test.</p>
        </div>
        <div className="rounded-xl p-5 text-center border border-white/10 hover:border-primary/40 transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <div className="text-lg font-bold text-foreground mb-1">Pass / Wait / Stop Rules</div>
          <p className="text-sm text-muted-foreground">Simple rules that prevent emotional decisions.</p>
        </div>
        <div className="rounded-xl p-5 text-center border border-white/10 hover:border-primary/40 transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <div className="text-lg font-bold text-foreground mb-1">First Test Guardrails</div>
          <p className="text-sm text-muted-foreground">Exactly what you're allowed to change — and when.</p>
        </div>
      </div>

      {/* MICRO-CTA */}
      <div className="text-center">
        <p className="text-lg text-primary font-medium">
          Ready to run traffic without guessing?
        </p>
      </div>
    </section>
  );
};

export default DecisionSystemDemo;
