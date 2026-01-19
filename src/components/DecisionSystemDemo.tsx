import { useState, useCallback, useEffect } from 'react';
import { Check, AlertTriangle } from 'lucide-react';

// Types for the decision system
interface InputState {
  traffic: number | null;
  changed: number | null;
  happened: number | null;
  duration: number | null;
  goal: number | null;
}

interface DecisionOutput {
  result: 'WAIT' | 'PASS' | 'STOP';
  actions: string[];
  warning: string;
  explanation: string;
}

// Deterministic decision logic
const getDecisionOutput = (inputs: InputState): DecisionOutput => {
  const { duration, happened, changed } = inputs;
  
  // Scenario 1: Just started / early stage - WAIT
  if (duration === 0 || duration === 1) {
    return {
      result: 'WAIT',
      actions: [
        'Do NOT change anything for the next 48 hours',
        'Send traffic until you hit the checkpoint minimum',
        'Only track these 2 signals: clicks and add-to-carts',
        'If you get 3+ add-to-carts → continue sending traffic',
        'If you get zero engagement after 100 clicks → evaluate the offer'
      ],
      warning: 'Do not change the product or page yet — that creates false results.',
      explanation: "Right now you're still in the early data window — not failure."
    };
  }
  
  // Scenario 2: Some traction, mid-stage - could be WAIT or PASS
  if (duration === 2 && (happened === 1 || happened === 2)) {
    return {
      result: 'PASS',
      actions: [
        'Your early signals are positive — keep the current setup',
        'Continue sending traffic for 3 more days minimum',
        'Track conversion rate and cost per add-to-cart',
        'If sales continue → begin scaling slowly',
        'If add-to-carts stop → test a price adjustment only'
      ],
      warning: 'Do not add new products or change your ad creative yet.',
      explanation: "You have real data showing interest. This is the green light to continue."
    };
  }
  
  // Scenario 3: Over a week with no results or confusion - STOP
  if (duration === 3 && (happened === 3 || happened === 4)) {
    return {
      result: 'STOP',
      actions: [
        'Pause all traffic immediately',
        'Review your product-market fit before continuing',
        'Check if your offer is clear within 3 seconds',
        'Consider testing a completely different product',
        'Do not spend more money until you identify the core issue'
      ],
      warning: 'Continuing to send traffic without changes will only burn budget.',
      explanation: "The data is clear — this setup isn't working. Pivoting now saves you money."
    };
  }
  
  // Scenario 4: Changed multiple things - WAIT (need to isolate)
  if (changed === 4) {
    return {
      result: 'WAIT',
      actions: [
        'Stop making changes for at least 72 hours',
        'You changed too many variables — data is now unclear',
        'Pick ONE thing you changed and keep only that',
        'Revert other changes to the original version',
        'Wait for 50+ new visitors before drawing conclusions'
      ],
      warning: 'Multiple changes at once make it impossible to know what worked.',
      explanation: "You need clean data. One change at a time is how you learn what actually moves the needle."
    };
  }
  
  // Scenario 5: Got a few sales - PASS
  if (happened === 2) {
    return {
      result: 'PASS',
      actions: [
        'You have proof of concept — the product can sell',
        'Calculate your cost per acquisition (CPA)',
        'If CPA is profitable → increase daily budget by 20%',
        'If CPA is too high → test a higher price point first',
        'Document what traffic source is performing best'
      ],
      warning: 'Do not switch products. Optimize what is already working.',
      explanation: "Sales mean validation. Most beginners quit right before this moment."
    };
  }
  
  // Default: WAIT
  return {
    result: 'WAIT',
    actions: [
      'Continue sending traffic to reach checkpoint minimum',
      'Track clicks, add-to-carts, and time on page',
      'Do not change anything until you have 100+ visitors',
      'If no engagement after 3 days → evaluate the hook',
      'Stay patient — early data is often noisy'
    ],
    warning: 'Avoid making emotional decisions based on small sample sizes.',
    explanation: "You're gathering data. The checkpoint will tell you when you have enough to decide."
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
  
  const [output, setOutput] = useState<DecisionOutput | null>(null);
  const [visibleActions, setVisibleActions] = useState<number[]>([]);

  // Check if all inputs are selected
  const allInputsSelected = 
    inputs.traffic !== null && 
    inputs.changed !== null && 
    inputs.happened !== null && 
    inputs.duration !== null && 
    inputs.goal !== null;

  // Update output when inputs change
  useEffect(() => {
    if (allInputsSelected) {
      const newOutput = getDecisionOutput(inputs);
      setOutput(newOutput);
      setVisibleActions([]);
      
      // Stagger the action items
      newOutput.actions.forEach((_, idx) => {
        setTimeout(() => {
          setVisibleActions(prev => [...prev, idx]);
        }, idx * 150);
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
      options: ['Ads', 'TikTok / Reels', 'SEO / Google', 'Influencers', 'Other']
    },
    {
      key: 'changed' as const,
      label: 'What you changed recently',
      options: ['Nothing yet', 'I changed the product', 'I changed the price', 'I changed the landing page', 'I changed multiple things']
    },
    {
      key: 'happened' as const,
      label: 'What happened so far',
      options: ['I got visits but no sales', 'I got add-to-carts but no sales', 'I got a few sales', 'I got zero clicks', "I don't know (confused)"]
    },
    {
      key: 'duration' as const,
      label: 'How long sending traffic',
      options: ['Just started', '1–2 days', '3–7 days', 'Over a week']
    },
    {
      key: 'goal' as const,
      label: 'Your goal right now',
      options: ['Get my first sale', 'See if product is worth it', "Scale what's working", 'I just want clarity']
    }
  ];

  const getResultStyles = (result: string) => {
    switch (result) {
      case 'PASS':
        return 'bg-primary text-primary-foreground shadow-[0_0_30px_rgba(255,213,0,0.4)]';
      case 'STOP':
        return 'bg-destructive text-destructive-foreground shadow-[0_0_30px_rgba(239,68,68,0.4)]';
      default:
        return 'bg-primary text-primary-foreground shadow-[0_0_30px_rgba(255,213,0,0.4)]';
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
          Click your situation. Get your exact next move.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-[45%_55%] gap-4 lg:gap-6 mb-8">
        
        {/* LEFT PANEL: INPUT SIMULATOR */}
        <div 
          className="rounded-2xl p-5 md:p-6 border border-white/10 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium">
            Step 1: Tell us what you did
          </div>

          {inputGroups.map((group) => (
            <div key={group.key} className="mb-5 last:mb-0">
              <div className="flex items-center gap-2 text-sm text-foreground mb-2.5 font-medium">
                <Check className="w-4 h-4 text-green-500" />
                <span>{group.label}</span>
              </div>
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

        {/* RIGHT PANEL: DECISION OUTPUT */}
        <div 
          className="rounded-2xl p-5 md:p-6 border border-primary/30 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary"></div>
          
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium lg:sticky lg:top-0 lg:bg-inherit lg:z-10 lg:pb-2">
            Step 2: Get your exact next move
          </div>

          {!output ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-4">
                <span className="text-2xl text-muted-foreground/50">?</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Select all options on the left to see your decision
              </p>
            </div>
          ) : (
            <>
              {/* Result Badge */}
              <div className="mb-6">
                <span 
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${getResultStyles(output.result)}`}
                >
                  <Check className="w-4 h-4" />
                  RESULT: {output.result}
                </span>
              </div>

              {/* What to do next */}
              <div className="mb-6">
                <div className="text-sm text-foreground mb-3 font-semibold">What to do next</div>
                <div className="space-y-2.5">
                  {output.actions.map((action, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-start gap-2.5 transition-all duration-200 ${
                        visibleActions.includes(idx) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                      }`}
                    >
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What NOT to do */}
              <div className="mb-6 border border-destructive/30 rounded-lg p-4 bg-destructive/5">
                <div className="flex items-center gap-2 text-sm text-foreground mb-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  What NOT to do
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {output.warning}
                </p>
              </div>

              {/* Why this is the answer */}
              <div className="border-t border-white/10 pt-4">
                <div className="text-sm text-foreground mb-2 font-semibold">Why this is the answer</div>
                <p className="text-sm text-primary italic leading-relaxed">
                  {output.explanation}
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
