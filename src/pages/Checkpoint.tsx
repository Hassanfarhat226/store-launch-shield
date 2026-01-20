import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Zap, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InputsWizard } from '@/components/checkpoint/InputsWizard';
import { OutputPanel } from '@/components/checkpoint/OutputPanel';
import { 
  generateDecision, 
  getCompletionPercentage,
  type CheckpointInputs 
} from '@/lib/checkpointEngine';

const INITIAL_INPUTS: CheckpointInputs = {
  trafficType: null,
  stage: null,
  situation: null,
  changes: [],
  goal: null,
  numbers: {
    clicks: 0,
    addToCarts: 0,
    purchases: 0,
    spend: 0,
    sessions: 0
  },
  hasNumbers: false
};

export default function Checkpoint() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasAccess = searchParams.get('access') === 'paid';
  
  const [inputs, setInputs] = useState<CheckpointInputs>(INITIAL_INPUTS);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [output, setOutput] = useState<ReturnType<typeof generateDecision>>(null);

  const completionPercentage = getCompletionPercentage(inputs);
  const requiredComplete = inputs.trafficType && inputs.stage && inputs.situation && inputs.changes.length > 0 && inputs.goal;

  // Calculate completed sections for wizard
  const completedSections = [
    inputs.trafficType,
    inputs.stage,
    inputs.situation,
    inputs.changes.length > 0,
    inputs.goal,
    inputs.hasNumbers
  ].filter(Boolean).length;

  useEffect(() => {
    if (requiredComplete && !output) {
      setIsEvaluating(true);
      const timer = setTimeout(() => {
        setOutput(generateDecision(inputs));
        setIsEvaluating(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [requiredComplete]);

  const handleUpdate = (updates: Partial<CheckpointInputs>) => {
    const newInputs = { ...inputs, ...updates };
    setInputs(newInputs);
    
    // Regenerate output if already shown
    if (output) {
      setIsEvaluating(true);
      setTimeout(() => {
        setOutput(generateDecision(newInputs));
        setIsEvaluating(false);
      }, 800);
    }
  };

  const handleReset = () => {
    setInputs(INITIAL_INPUTS);
    setOutput(null);
    setIsEvaluating(false);
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white/40" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Access Required</h1>
          <p className="text-white/60 mb-6">
            The Traffic Checkpoint™ system is available to customers who have unlocked the full plan.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-primary text-black font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back & Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Traffic Checkpoint™</h1>
                <p className="text-sm text-white/50">Answer questions. Get your plan.</p>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/50">Setup</span>
                <span className="text-sm font-medium text-primary">{completedSections} of 6</span>
                <span className="text-sm text-white/50">completed</span>
              </div>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Mobile progress */}
          <div className="sm:hidden mt-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/50">Progress</span>
              <span className="text-primary">{completedSections}/6 sections</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Inputs */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="font-semibold text-white">Input Your Situation</h2>
                  <p className="text-sm text-white/50">Complete all required sections</p>
                </div>
              </div>
              
              <InputsWizard 
                inputs={inputs}
                onUpdate={handleUpdate}
                completedSections={completedSections}
              />

              {!inputs.hasNumbers && inputs.goal && (
                <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                  <p className="text-sm text-primary">
                    💡 Fill in your numbers (Section F) to improve accuracy from Medium to High confidence.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <OutputPanel 
              output={output}
              inputs={inputs}
              isEvaluating={isEvaluating}
              onReset={handleReset}
            />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Decision (when output exists) */}
      {output && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4 z-40">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
              output.decision === 'SEND' ? "bg-emerald-500/20 text-emerald-400" :
              output.decision === 'FIX' ? "bg-orange-500/20 text-orange-400" :
              output.decision === 'SWITCH' ? "bg-red-500/20 text-red-400" :
              "bg-primary/20 text-primary"
            )}>
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white">{output.decision}</div>
              <div className="text-sm text-white/50 truncate">{output.primaryReason}</div>
            </div>
            <a 
              href="#output"
              className="px-4 py-2 bg-primary text-black font-medium rounded-lg text-sm"
            >
              View Plan
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
