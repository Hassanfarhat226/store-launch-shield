import { useState } from 'react';
import { ChevronDown, Check, Zap, Clock, Eye, Edit3, Target, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TrafficType, Stage, Situation, Change, Goal, CheckpointInputs } from '@/lib/checkpointEngine';

interface InputsWizardProps {
  inputs: CheckpointInputs;
  onUpdate: (inputs: Partial<CheckpointInputs>) => void;
  completedSections: number;
}

type Section = 'traffic' | 'stage' | 'situation' | 'changes' | 'goal' | 'numbers';

const TRAFFIC_OPTIONS: { value: TrafficType; label: string; desc: string }[] = [
  { value: 'paid', label: 'Paid Ads', desc: 'Meta, TikTok, Google Ads' },
  { value: 'organic', label: 'Organic', desc: 'TikTok, Reels, SEO' },
  { value: 'influencers', label: 'Influencers', desc: 'Paid or gifted partnerships' },
  { value: 'mixed', label: 'Mixed / Not sure', desc: 'Multiple sources or unsure' }
];

const STAGE_OPTIONS: { value: Stage; label: string; desc: string }[] = [
  { value: 'not-started', label: 'Haven\'t sent traffic yet', desc: 'Store ready, no visitors' },
  { value: '0-24h', label: '0-24 hours', desc: 'Just started' },
  { value: '2-3d', label: '2-3 days', desc: 'Early signals' },
  { value: '4-7d', label: '4-7 days', desc: 'First week' },
  { value: '8-14d', label: '8-14 days', desc: 'Extended test' },
  { value: '15+d', label: '15+ days', desc: 'Long-term test' }
];

const SITUATION_OPTIONS: { value: Situation; label: string; desc: string }[] = [
  { value: 'no-clicks', label: 'No clicks / no attention', desc: 'Traffic isn\'t engaging' },
  { value: 'clicks-no-atc', label: 'Clicks but no add-to-carts', desc: 'People visit but don\'t want' },
  { value: 'atc-no-purchase', label: 'Add-to-carts but no purchases', desc: 'Intent but no conversion' },
  { value: 'few-purchases', label: 'A few purchases (inconsistent)', desc: 'Some sales happening' },
  { value: 'confused', label: 'I\'m confused / don\'t know', desc: 'Need clarity' }
];

const CHANGE_OPTIONS: { value: Change; label: string }[] = [
  { value: 'nothing', label: 'Nothing' },
  { value: 'product', label: 'Product' },
  { value: 'price', label: 'Price' },
  { value: 'offer', label: 'Offer (bundles/discounts)' },
  { value: 'page', label: 'Page/theme/layout' },
  { value: 'creative', label: 'Ad creative' },
  { value: 'targeting', label: 'Targeting / audience' },
  { value: 'bunch', label: 'I changed a bunch' }
];

const GOAL_OPTIONS: { value: Goal; label: string; desc: string }[] = [
  { value: 'first-sale', label: 'Get first sale', desc: 'Haven\'t made money yet' },
  { value: 'validate-product', label: 'Confirm product is viable', desc: 'Test if it can work' },
  { value: 'improve-conversions', label: 'Improve conversions', desc: 'Getting traffic, want more sales' },
  { value: 'scale', label: 'Scale what\'s working', desc: 'Ready to grow' },
  { value: 'stop-waste', label: 'Stop wasting money', desc: 'Cut losses' }
];

export function InputsWizard({ inputs, onUpdate, completedSections }: InputsWizardProps) {
  const [openSection, setOpenSection] = useState<Section>('traffic');

  const toggleSection = (section: Section) => {
    setOpenSection(openSection === section ? section : section);
  };

  const handleTrafficSelect = (value: TrafficType) => {
    onUpdate({ trafficType: value });
    setTimeout(() => setOpenSection('stage'), 300);
  };

  const handleStageSelect = (value: Stage) => {
    onUpdate({ stage: value });
    setTimeout(() => setOpenSection('situation'), 300);
  };

  const handleSituationSelect = (value: Situation) => {
    onUpdate({ situation: value });
    setTimeout(() => setOpenSection('changes'), 300);
  };

  const handleChangeToggle = (value: Change) => {
    const current = inputs.changes;
    if (value === 'nothing') {
      onUpdate({ changes: ['nothing'] });
    } else {
      const filtered = current.filter(c => c !== 'nothing');
      if (filtered.includes(value)) {
        onUpdate({ changes: filtered.filter(c => c !== value) });
      } else {
        onUpdate({ changes: [...filtered, value] });
      }
    }
  };

  const handleGoalSelect = (value: Goal) => {
    onUpdate({ goal: value });
    setTimeout(() => setOpenSection('numbers'), 300);
  };

  const handleNumberChange = (key: keyof CheckpointInputs['numbers'], value: number) => {
    onUpdate({
      numbers: { ...inputs.numbers, [key]: value },
      hasNumbers: true
    });
  };

  const sectionComplete = (section: Section): boolean => {
    switch (section) {
      case 'traffic': return !!inputs.trafficType;
      case 'stage': return !!inputs.stage;
      case 'situation': return !!inputs.situation;
      case 'changes': return inputs.changes.length > 0;
      case 'goal': return !!inputs.goal;
      case 'numbers': return inputs.hasNumbers;
    }
  };

  const SectionHeader = ({ 
    section, 
    icon: Icon, 
    title, 
    required = true 
  }: { 
    section: Section; 
    icon: React.ComponentType<{ className?: string }>; 
    title: string; 
    required?: boolean;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-lg transition-all",
        "hover:bg-white/5",
        openSection === section ? "bg-white/5" : "bg-transparent",
        sectionComplete(section) ? "border border-primary/30" : "border border-white/10"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          sectionComplete(section) ? "bg-primary text-black" : "bg-white/10 text-white/60"
        )}>
          {sectionComplete(section) ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
        </div>
        <div className="text-left">
          <span className="font-medium text-white">{title}</span>
          {required && !sectionComplete(section) && (
            <span className="ml-2 text-xs text-primary/80">Required</span>
          )}
        </div>
      </div>
      <ChevronDown className={cn(
        "w-5 h-5 text-white/60 transition-transform",
        openSection === section && "rotate-180"
      )} />
    </button>
  );

  const OptionButton = ({ 
    selected, 
    onClick, 
    label, 
    desc 
  }: { 
    selected: boolean; 
    onClick: () => void; 
    label: string; 
    desc?: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-3 rounded-lg border text-left transition-all",
        selected 
          ? "border-primary bg-primary/10 text-white" 
          : "border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10"
      )}
    >
      <div className="font-medium">{label}</div>
      {desc && <div className="text-sm text-white/50 mt-0.5">{desc}</div>}
    </button>
  );

  const MultiOptionButton = ({ 
    selected, 
    onClick, 
    label 
  }: { 
    selected: boolean; 
    onClick: () => void; 
    label: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg border text-sm transition-all",
        selected 
          ? "border-primary bg-primary/10 text-white" 
          : "border-white/10 bg-white/5 text-white/80 hover:border-white/20"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-3">
      {/* Section A: Traffic Type */}
      <div>
        <SectionHeader section="traffic" icon={Zap} title="A. Traffic Type" />
        {openSection === 'traffic' && (
          <div className="mt-3 ml-11 space-y-2">
            <p className="text-sm text-white/50 mb-3">Choose one</p>
            {TRAFFIC_OPTIONS.map(opt => (
              <OptionButton
                key={opt.value}
                selected={inputs.trafficType === opt.value}
                onClick={() => handleTrafficSelect(opt.value)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section B: Stage */}
      <div>
        <SectionHeader section="stage" icon={Clock} title="B. Stage + Time Window" />
        {openSection === 'stage' && (
          <div className="mt-3 ml-11 space-y-2">
            <p className="text-sm text-white/50 mb-3">Choose one</p>
            {STAGE_OPTIONS.map(opt => (
              <OptionButton
                key={opt.value}
                selected={inputs.stage === opt.value}
                onClick={() => handleStageSelect(opt.value)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section C: Situation */}
      <div>
        <SectionHeader section="situation" icon={Eye} title="C. What You're Seeing" />
        {openSection === 'situation' && (
          <div className="mt-3 ml-11 space-y-2">
            <p className="text-sm text-white/50 mb-3">Choose one</p>
            {SITUATION_OPTIONS.map(opt => (
              <OptionButton
                key={opt.value}
                selected={inputs.situation === opt.value}
                onClick={() => handleSituationSelect(opt.value)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section D: Changes */}
      <div>
        <SectionHeader section="changes" icon={Edit3} title="D. What You Changed" />
        {openSection === 'changes' && (
          <div className="mt-3 ml-11">
            <p className="text-sm text-white/50 mb-3">Choose all that apply</p>
            <div className="flex flex-wrap gap-2">
              {CHANGE_OPTIONS.map(opt => (
                <MultiOptionButton
                  key={opt.value}
                  selected={inputs.changes.includes(opt.value)}
                  onClick={() => handleChangeToggle(opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
            {inputs.changes.length > 0 && (
              <button
                onClick={() => setOpenSection('goal')}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Continue →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Section E: Goal */}
      <div>
        <SectionHeader section="goal" icon={Target} title="E. Your Goal Right Now" />
        {openSection === 'goal' && (
          <div className="mt-3 ml-11 space-y-2">
            <p className="text-sm text-white/50 mb-3">Choose one</p>
            {GOAL_OPTIONS.map(opt => (
              <OptionButton
                key={opt.value}
                selected={inputs.goal === opt.value}
                onClick={() => handleGoalSelect(opt.value)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section F: Numbers */}
      <div>
        <SectionHeader section="numbers" icon={Hash} title="F. Quick Numbers" required={false} />
        {openSection === 'numbers' && (
          <div className="mt-3 ml-11 space-y-4">
            <p className="text-sm text-white/50 mb-3">Optional but improves accuracy</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/70 mb-2 block">Clicks so far</label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={inputs.numbers.clicks}
                  onChange={(e) => handleNumberChange('clicks', parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="text-sm text-white/50 mt-1">{inputs.numbers.clicks} clicks</div>
              </div>

              <div>
                <label className="text-sm text-white/70 mb-2 block">Add-to-carts</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={inputs.numbers.addToCarts}
                  onChange={(e) => handleNumberChange('addToCarts', parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="text-sm text-white/50 mt-1">{inputs.numbers.addToCarts} ATCs</div>
              </div>

              <div>
                <label className="text-sm text-white/70 mb-2 block">Purchases</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={inputs.numbers.purchases}
                  onChange={(e) => handleNumberChange('purchases', parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="text-sm text-white/50 mt-1">{inputs.numbers.purchases} purchases</div>
              </div>

              {inputs.trafficType === 'paid' && (
                <div>
                  <label className="text-sm text-white/70 mb-2 block">Spend ($)</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={inputs.numbers.spend}
                    onChange={(e) => handleNumberChange('spend', parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="text-sm text-white/50 mt-1">${inputs.numbers.spend} spent</div>
                </div>
              )}

              {(inputs.trafficType === 'organic' || inputs.trafficType === 'influencers') && (
                <div>
                  <label className="text-sm text-white/70 mb-2 block">Sessions</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={inputs.numbers.sessions}
                    onChange={(e) => handleNumberChange('sessions', parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="text-sm text-white/50 mt-1">{inputs.numbers.sessions} sessions</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
