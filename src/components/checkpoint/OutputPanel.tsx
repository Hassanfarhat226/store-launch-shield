import { useState, useEffect } from 'react';
import { 
  Zap, Shield, AlertTriangle, XCircle, 
  ChevronDown, Check, Copy, Download, RotateCcw,
  TrendingUp, Clock, Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DecisionOutput, StepPlan, CheckpointInputs } from '@/lib/checkpointEngine';

interface OutputPanelProps {
  output: DecisionOutput | null;
  inputs: CheckpointInputs;
  isEvaluating: boolean;
  onReset: () => void;
}

const DECISION_STYLES = {
  SEND: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/50',
    text: 'text-emerald-400',
    icon: Zap,
    glow: 'shadow-emerald-500/20'
  },
  HOLD: {
    bg: 'bg-primary/20',
    border: 'border-primary/50',
    text: 'text-primary',
    icon: Clock,
    glow: 'shadow-primary/20'
  },
  FIX: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/50',
    text: 'text-orange-400',
    icon: AlertTriangle,
    glow: 'shadow-orange-500/20'
  },
  SWITCH: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-400',
    icon: XCircle,
    glow: 'shadow-red-500/20'
  }
};

export function OutputPanel({ output, inputs, isEvaluating, onReset }: OutputPanelProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1, 2]);
  const [copied, setCopied] = useState(false);

  const toggleStep = (stepNum: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepNum) 
        ? prev.filter(n => n !== stepNum)
        : [...prev, stepNum]
    );
  };

  const copyPlan = () => {
    if (!output) return;
    
    const text = `
TRAFFIC CHECKPOINT™ - Your Custom Plan
=====================================

DECISION: ${output.decisionLabel}
Confidence: ${output.confidence}

${output.primaryReason}

TOP SIGNALS:
${output.signals.map(s => `• ${s}`).join('\n')}

STEP-BY-STEP PLAN:
${output.steps.map(s => `
${s.number}. ${s.title}
${s.content}
${s.checklist ? s.checklist.map(c => `  ☐ ${c}`).join('\n') : ''}
`).join('\n')}

DO NOT TOUCH:
${output.doNotTouch.map(d => `• ${d}`).join('\n')}

DECISION TRIGGERS:
${output.triggers.map(t => `• IF ${t.condition} → ${t.action}`).join('\n')}

TRAFFIC PLAN (${output.trafficPlan.type.toUpperCase()}):
${output.trafficPlan.title}
${output.trafficPlan.actions.map(a => `• ${a}`).join('\n')}
${output.trafficPlan.budgetGuidance ? `\nBudget: ${output.trafficPlan.budgetGuidance}` : ''}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isEvaluating) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-8">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
            <Zap className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-medium">Evaluating your inputs...</p>
            <p className="text-white/50 text-sm animate-pulse">
              {Math.random() > 0.5 ? 'Checking your stage...' : 'Detecting bottleneck...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Complete the inputs</h3>
          <p className="text-white/50 text-sm max-w-xs">
            Answer the required questions on the left to generate your custom traffic plan.
          </p>
        </div>
      </div>
    );
  }

  const style = DECISION_STYLES[output.decision];
  const Icon = style.icon;

  return (
    <div className="space-y-6">
      {/* Decision Badge */}
      <div className={cn(
        "rounded-xl p-6 border-2",
        style.bg,
        style.border,
        "shadow-lg",
        style.glow
      )}>
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0",
            style.bg,
            "border",
            style.border
          )}>
            <Icon className={cn("w-7 h-7", style.text)} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={cn("text-xl font-bold", style.text)}>
                {output.decision}
              </span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                output.confidence === 'High' ? 'bg-emerald-500/20 text-emerald-400' :
                output.confidence === 'Medium' ? 'bg-primary/20 text-primary' :
                'bg-white/10 text-white/60'
              )}>
                {output.confidence} Confidence
              </span>
            </div>
            <p className="text-sm text-white/70">{output.decisionLabel}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-white">{output.primaryReason}</p>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs text-white/50 uppercase tracking-wide">Top Signals</p>
          {output.signals.map((signal, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-white/70">
              <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
              <span>{signal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Based on Your Inputs */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-xs text-white/50 uppercase tracking-wide mb-3">Based on your inputs</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-white/50">Traffic:</span> <span className="text-white">{inputs.trafficType}</span></div>
          <div><span className="text-white/50">Stage:</span> <span className="text-white">{inputs.stage}</span></div>
          <div><span className="text-white/50">Situation:</span> <span className="text-white">{inputs.situation}</span></div>
          <div><span className="text-white/50">Goal:</span> <span className="text-white">{inputs.goal}</span></div>
        </div>
        <p className="mt-3 text-xs text-white/40 italic">
          This plan is tailored to your stage — not generic advice.
        </p>
      </div>

      {/* Step-by-Step Plan */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Your Step-by-Step Plan
          </h3>
        </div>
        
        <div className="divide-y divide-white/5">
          {output.steps.map((step) => (
            <StepAccordion
              key={step.number}
              step={step}
              isExpanded={expandedSteps.includes(step.number)}
              onToggle={() => toggleStep(step.number)}
            />
          ))}
        </div>
      </div>

      {/* Do Not Touch */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
        <h4 className="font-semibold text-red-400 flex items-center gap-2 mb-3">
          <XCircle className="w-5 h-5" />
          Do NOT Touch
        </h4>
        <ul className="space-y-2">
          {output.doNotTouch.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-red-400">✕</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Decision Triggers */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h4 className="font-semibold text-white flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-primary" />
          Decision Triggers
        </h4>
        <p className="text-sm text-white/50 mb-3">Your decision changes when:</p>
        <ul className="space-y-2">
          {output.triggers.map((trigger, i) => (
            <li key={i} className="text-sm">
              <span className="text-primary">IF</span>{' '}
              <span className="text-white/70">{trigger.condition}</span>{' '}
              <span className="text-primary">→</span>{' '}
              <span className="text-white">{trigger.action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Traffic Plan */}
      <div className={cn(
        "rounded-xl p-4 border",
        output.trafficPlan.type === 'free' 
          ? "bg-emerald-500/10 border-emerald-500/30" 
          : "bg-blue-500/10 border-blue-500/30"
      )}>
        <h4 className={cn(
          "font-semibold flex items-center gap-2 mb-3",
          output.trafficPlan.type === 'free' ? "text-emerald-400" : "text-blue-400"
        )}>
          {output.trafficPlan.type === 'free' ? '🌱' : '💰'}
          {output.trafficPlan.title}
        </h4>
        
        <ul className="space-y-2 mb-4">
          {output.trafficPlan.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/80">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              {action}
            </li>
          ))}
        </ul>

        {output.trafficPlan.budgetGuidance && (
          <div className="bg-black/20 rounded-lg p-3 mb-4">
            <p className="text-xs text-white/50 mb-1">Budget Guidance</p>
            <p className="text-sm text-white">{output.trafficPlan.budgetGuidance}</p>
          </div>
        )}

        <div className="pt-3 border-t border-white/10">
          <p className="text-xs text-white/50 mb-2">Don't touch:</p>
          <ul className="space-y-1">
            {output.trafficPlan.doNotTouch.map((item, i) => (
              <li key={i} className="text-xs text-white/60 flex items-center gap-1">
                <span className="text-red-400">✕</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={copyPlan}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all",
            copied 
              ? "bg-emerald-500 text-white" 
              : "bg-primary text-black hover:bg-primary/90"
          )}
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Copied!' : 'Copy My Plan'}
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/20 text-white/70 hover:bg-white/5 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>
    </div>
  );
}

function StepAccordion({ 
  step, 
  isExpanded, 
  onToggle 
}: { 
  step: StepPlan; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
          {step.number}
        </div>
        <span className="flex-1 text-left font-medium text-white">{step.title}</span>
        <ChevronDown className={cn(
          "w-5 h-5 text-white/40 transition-transform",
          isExpanded && "rotate-180"
        )} />
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 pl-16 space-y-3">
          <p className="text-sm text-white/70">{step.content}</p>
          
          {step.checklist && (
            <ul className="space-y-2">
              {step.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div className="w-4 h-4 rounded border border-white/30 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {step.timeWindow && (
            <div className="flex items-center gap-2 text-xs text-primary">
              <Clock className="w-3 h-3" />
              {step.timeWindow}
            </div>
          )}

          {step.threshold && (
            <div className="text-xs text-white/50 bg-white/5 rounded px-2 py-1 inline-block">
              📊 {step.threshold}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
