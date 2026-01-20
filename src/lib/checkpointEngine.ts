// Traffic Checkpoint Decision Engine
// Deterministic ruleset for generating decisions based on user inputs

export type TrafficType = 'paid' | 'organic' | 'influencers' | 'mixed';
export type Stage = 'not-started' | '0-24h' | '2-3d' | '4-7d' | '8-14d' | '15+d';
export type Situation = 'no-clicks' | 'clicks-no-atc' | 'atc-no-purchase' | 'few-purchases' | 'confused';
export type Change = 'nothing' | 'product' | 'price' | 'offer' | 'page' | 'creative' | 'targeting' | 'bunch';
export type Goal = 'first-sale' | 'validate-product' | 'improve-conversions' | 'scale' | 'stop-waste';

export interface CheckpointInputs {
  trafficType: TrafficType | null;
  stage: Stage | null;
  situation: Situation | null;
  changes: Change[];
  goal: Goal | null;
  numbers: {
    clicks: number;
    addToCarts: number;
    purchases: number;
    spend: number;
    sessions: number;
  };
  hasNumbers: boolean;
}

export type Decision = 'SEND' | 'HOLD' | 'FIX' | 'SWITCH';

export interface DecisionOutput {
  decision: Decision;
  decisionLabel: string;
  confidence: 'High' | 'Medium' | 'Low';
  primaryReason: string;
  signals: string[];
  steps: StepPlan[];
  doNotTouch: string[];
  triggers: TriggerRule[];
  trafficPlan: TrafficPlanOutput;
}

export interface StepPlan {
  number: number;
  title: string;
  content: string;
  checklist?: string[];
  timeWindow?: string;
  threshold?: string;
  expanded?: boolean;
}

export interface TriggerRule {
  condition: string;
  action: string;
}

export interface TrafficPlanOutput {
  type: 'free' | 'paid';
  title: string;
  actions: string[];
  doNotTouch: string[];
  budgetGuidance?: string;
}

const DECISION_LABELS: Record<Decision, string> = {
  SEND: 'SEND TRAFFIC (Controlled Push)',
  HOLD: 'HOLD & OBSERVE (Action Required)',
  FIX: 'FIX THE BOTTLENECK (Before more traffic)',
  SWITCH: 'SWITCH (Stop wasting time/money)'
};

export function generateDecision(inputs: CheckpointInputs): DecisionOutput | null {
  if (!inputs.trafficType || !inputs.stage || !inputs.situation || !inputs.goal) {
    return null;
  }

  const { trafficType, stage, situation, changes, goal, numbers, hasNumbers } = inputs;
  
  let decision: Decision;
  let primaryReason: string;
  let signals: string[] = [];
  
  // Core decision logic
  if (situation === 'few-purchases') {
    decision = 'SEND';
    primaryReason = 'You have purchase signals. Time to scale carefully with controlled traffic increases.';
    signals = [
      'Purchase conversion detected — product has market fit signal',
      'Revenue path confirmed — optimize before scaling',
      'Data quality sufficient for next phase decisions'
    ];
  } else if (situation === 'no-clicks' && stage !== 'not-started' && stage !== '0-24h') {
    decision = 'FIX';
    primaryReason = 'Traffic is reaching your store but not engaging. The attention layer needs work.';
    signals = [
      'Click-through rate below viable threshold',
      'Creative/offer not stopping the scroll',
      'Targeting may be misaligned with product'
    ];
  } else if (situation === 'clicks-no-atc') {
    decision = 'FIX';
    primaryReason = 'People are clicking but not adding to cart. Your product page isn\'t converting interest into intent.';
    signals = [
      'Click-to-ATC ratio critically low',
      'Product-page friction detected',
      'Offer clarity or trust gap likely'
    ];
  } else if (situation === 'atc-no-purchase') {
    if (stage === '0-24h' || stage === '2-3d') {
      decision = 'HOLD';
      primaryReason = 'Add-to-carts exist but need more time to see purchase patterns. Don\'t panic yet.';
      signals = [
        'Intent signals present (ATC activity)',
        'Sample size still building',
        'Checkout abandonment needs monitoring'
      ];
    } else {
      decision = 'FIX';
      primaryReason = 'People want to buy but something stops them at checkout. Fix the conversion bottleneck.';
      signals = [
        'Checkout abandonment rate high',
        'Price/shipping friction likely',
        'Trust indicators may be missing'
      ];
    }
  } else if (changes.includes('bunch') || changes.length >= 4) {
    decision = 'HOLD';
    primaryReason = 'Too many variables changed at once. You need a clean test to know what\'s actually working.';
    signals = [
      'Variable contamination detected',
      'Cannot isolate cause/effect',
      'Reset and run controlled test required'
    ];
  } else if (stage === '15+d' && (situation === 'no-clicks' || situation === 'clicks-no-atc' || situation === 'confused')) {
    decision = 'SWITCH';
    primaryReason = 'Extended timeline with no traction. It\'s time to test a different product or angle.';
    signals = [
      'Time investment exceeds reasonable test period',
      'No viable signals after sustained effort',
      'Opportunity cost too high to continue'
    ];
  } else if (stage === 'not-started') {
    decision = 'SEND';
    primaryReason = 'You haven\'t sent traffic yet. Nothing to analyze — it\'s time to start your first test.';
    signals = [
      'No data available for analysis',
      'Store is ready for initial traffic',
      'First traffic batch will establish baseline'
    ];
  } else if (situation === 'confused') {
    decision = 'HOLD';
    primaryReason = 'Clarity first. Let\'s establish what metrics actually matter before making changes.';
    signals = [
      'Decision fatigue detected',
      'Metric focus needed',
      'Baseline establishment required'
    ];
  } else {
    decision = 'HOLD';
    primaryReason = 'Current data needs more time to show patterns. Hold steady and observe.';
    signals = [
      'Sample size still building',
      'Pattern not yet clear',
      'Premature changes would contaminate data'
    ];
  }

  // Calculate confidence
  let confidence: 'High' | 'Medium' | 'Low' = 'Medium';
  if (hasNumbers && numbers.clicks > 50) {
    confidence = 'High';
  } else if (!hasNumbers) {
    confidence = 'Low';
  }

  // Generate step-by-step plan
  const steps = generateSteps(decision, inputs);
  
  // Generate do-not-touch list
  const doNotTouch = generateDoNotTouch(decision, situation, changes);
  
  // Generate triggers
  const triggers = generateTriggers(decision, situation);
  
  // Generate traffic plan
  const trafficPlan = generateTrafficPlan(trafficType, decision);

  return {
    decision,
    decisionLabel: DECISION_LABELS[decision],
    confidence,
    primaryReason,
    signals,
    steps,
    doNotTouch,
    triggers,
    trafficPlan
  };
}

function generateSteps(decision: Decision, inputs: CheckpointInputs): StepPlan[] {
  const { situation, stage, trafficType, goal } = inputs;
  const isPaid = trafficType === 'paid';
  
  const situationMap: Record<Situation, string> = {
    'no-clicks': 'No attention — traffic sees your store but doesn\'t engage',
    'clicks-no-atc': 'Interest without intent — clicks exist but no add-to-carts',
    'atc-no-purchase': 'Intent without commitment — add-to-carts but no purchases',
    'few-purchases': 'Early traction — purchases happening, time to optimize',
    'confused': 'Unclear signals — need to establish metric focus'
  };

  const stageMap: Record<Stage, string> = {
    'not-started': 'Pre-launch phase',
    '0-24h': 'First 24 hours (initial signal window)',
    '2-3d': 'Days 2-3 (early pattern detection)',
    '4-7d': 'Days 4-7 (trend confirmation window)',
    '8-14d': 'Week 2 (extended test period)',
    '15+d': 'Beyond 2 weeks (decision threshold reached)'
  };

  const steps: StepPlan[] = [];

  // Step 1: Situation summary
  steps.push({
    number: 1,
    title: 'Your situation in one line',
    content: `${situationMap[situation!]} — ${stageMap[stage!]}. ${decision === 'SEND' ? 'Green light to proceed.' : decision === 'FIX' ? 'Bottleneck identified.' : decision === 'SWITCH' ? 'Time to pivot.' : 'Observation period active.'}`,
    expanded: true
  });

  // Step 2: What NOT to change
  const doNotChangeItems = decision === 'SEND' 
    ? ['Don\'t change pricing until you have 10+ orders', 'Don\'t redesign pages that are converting', 'Don\'t pause what\'s working to "test something new"']
    : decision === 'FIX'
    ? ['Don\'t change the product itself yet', 'Don\'t adjust targeting before fixing the page', 'Don\'t increase spend until the bottleneck is resolved']
    : ['Don\'t make ANY changes for the next 48 hours', 'Don\'t touch pricing, offers, or creative', 'Don\'t panic-add new products'];

  steps.push({
    number: 2,
    title: 'What NOT to change (critical)',
    content: 'Changing the wrong thing now will contaminate your data and waste time/money.',
    checklist: doNotChangeItems,
    expanded: true
  });

  // Step 3: Next 48 hours
  let next48Actions: string[] = [];
  let timeWindow = 'Next 48 hours';
  
  if (decision === 'SEND') {
    next48Actions = isPaid 
      ? ['Increase daily budget by 20% (not more)', 'Duplicate your best-performing ad set', 'Keep all other variables unchanged', 'Check results at 24h and 48h marks']
      : ['Post 2 new pieces of content using winning format', 'Engage with comments for 30 min/day', 'Add store link to 2 new placements', 'Track which content type drives clicks'];
  } else if (decision === 'FIX') {
    if (situation === 'no-clicks') {
      next48Actions = isPaid
        ? ['Create 3 new hook variations for your ad', 'Test a different thumbnail/first frame', 'Try one new audience angle', 'Run for 24h before evaluating']
        : ['Film 3 new hooks using trending sounds', 'Test different posting times', 'Study top-performing content in your niche', 'Post minimum 2x/day'];
    } else if (situation === 'clicks-no-atc') {
      next48Actions = ['Add trust badges above the fold', 'Simplify your product description', 'Add a clear "What you get" section', 'Test a different hero image'];
    } else {
      next48Actions = ['Add shipping time/cost clarity', 'Add payment trust icons', 'Simplify checkout to minimum fields', 'Add order bump or upsell to offset shipping'];
    }
  } else if (decision === 'SWITCH') {
    next48Actions = ['Pause all active campaigns/content', 'Document what didn\'t work and why', 'Research 3 alternative products', 'Set up new test store structure'];
  } else {
    next48Actions = ['Log current metrics as baseline', 'Set 3 check-in times per day', 'Do NOT make any changes', 'Prepare contingency actions (don\'t execute)'];
  }

  steps.push({
    number: 3,
    title: 'Exact actions for the next 48 hours',
    content: `Your ${isPaid ? 'paid' : 'organic'} traffic action plan:`,
    checklist: next48Actions,
    timeWindow,
    expanded: false
  });

  // Step 4: What to track
  const metricsToTrack = situation === 'no-clicks'
    ? ['CTR (Click-through rate) — target: >1%', 'Impressions vs Clicks ratio', 'Thumb-stop rate (if available)']
    : situation === 'clicks-no-atc'
    ? ['Sessions to ATC rate — target: >3%', 'Time on page — target: >45 seconds', 'Bounce rate — target: <70%']
    : situation === 'atc-no-purchase'
    ? ['ATC to Purchase rate — target: >20%', 'Checkout abandonment step', 'Cart value vs shipping cost ratio']
    : ['Purchase value and frequency', 'Customer acquisition cost (CAC)', 'Return on ad spend (ROAS) if paid'];

  steps.push({
    number: 4,
    title: 'What to track (only these metrics)',
    content: 'Ignore everything else. These 2-3 numbers are the only ones that matter right now:',
    checklist: metricsToTrack,
    threshold: decision === 'SEND' ? 'Watch for 48h minimum sample' : 'Check every 12 hours',
    expanded: false
  });

  // Step 5: Decision triggers
  const triggerPoints = decision === 'SEND'
    ? ['If ROAS drops below 1.5x → reduce budget by 30%', 'If conversion rate drops >25% → pause and investigate', 'If 3 consecutive days profitable → increase budget 25%']
    : decision === 'FIX'
    ? ['If CTR improves >50% after fix → graduate to HOLD', 'If ATC appears after page fix → extend test 48h', 'If no improvement after 3 attempts → consider SWITCH']
    : decision === 'SWITCH'
    ? ['If new product shows clicks in first 24h → continue test', 'If same pattern emerges → pivot to different niche', 'If nothing works after 3 products → reassess strategy']
    : ['If any purchase occurs → shift to SEND (controlled)', 'If metrics worsen → shift to FIX', 'If 72h no change → initiate one variable test'];

  steps.push({
    number: 5,
    title: 'The trigger that changes this decision',
    content: 'Your decision shifts from ' + decision + ' when:',
    checklist: triggerPoints,
    timeWindow: 'Re-evaluate at 48h mark',
    expanded: false
  });

  // Step 6: Branching
  const branchingRules = situation === 'no-clicks'
    ? [
        { if: 'Clicks improve but ATC stays zero', then: 'Move to FIX (product page focus)' },
        { if: 'New creative gets 3x the clicks', then: 'Kill old ads, scale winner' },
        { if: 'Nothing improves after 5 creatives', then: 'Consider SWITCH' }
      ]
    : situation === 'clicks-no-atc'
    ? [
        { if: 'ATC appears after page changes', then: 'Extend test 48h, watch checkout' },
        { if: 'Bounce rate drops but still no ATC', then: 'Test different product angle/offer' },
        { if: 'First purchase happens', then: 'Shift to SEND (carefully)' }
      ]
    : situation === 'atc-no-purchase'
    ? [
        { if: 'First purchase happens', then: 'Document what changed, scale carefully' },
        { if: 'Cart abandonment at shipping', then: 'Add free shipping threshold or reduce price' },
        { if: 'No improvement after checkout fixes', then: 'Test dramatically different price point' }
      ]
    : [
        { if: 'Metrics improve after action', then: 'Continue and monitor 48h more' },
        { if: 'Metrics stay flat after action', then: 'Try next variable on the list' },
        { if: 'Metrics worsen after action', then: 'Revert immediately and reassess' }
      ];

  steps.push({
    number: 6,
    title: 'If X happens, do Y (branching logic)',
    content: 'Your decision isn\'t static. Here\'s how to adapt:',
    checklist: branchingRules.map(r => `IF ${r.if} → ${r.then}`),
    expanded: false
  });

  return steps;
}

function generateDoNotTouch(decision: Decision, situation: Situation | null, changes: Change[]): string[] {
  const base = [
    'Product pricing (until you have 10+ data points)',
    'Store theme/layout (cosmetic changes waste time)',
    'Adding new products (focus on current test)'
  ];

  if (decision === 'HOLD') {
    return [
      'ANY setting for the next 48 hours',
      'Ad creative or targeting',
      'Product page copy or images',
      'Checkout flow or pricing'
    ];
  }

  if (decision === 'FIX' && situation === 'clicks-no-atc') {
    return [
      'Ad creative (it\'s working — people are clicking)',
      'Targeting/audience (traffic quality seems fine)',
      'Price (until page converts better)'
    ];
  }

  if (decision === 'FIX' && situation === 'atc-no-purchase') {
    return [
      'Product page (intent is there)',
      'Ad creative or content',
      'Product itself'
    ];
  }

  return base;
}

function generateTriggers(decision: Decision, situation: Situation | null): TriggerRule[] {
  if (decision === 'SEND') {
    return [
      { condition: 'ROAS drops below 1.5x for 48h', action: 'Reduce budget 30% and monitor' },
      { condition: 'Conversion rate drops 25%+', action: 'Pause and investigate cause' },
      { condition: '3 profitable days in a row', action: 'Scale budget by 25%' }
    ];
  }

  if (decision === 'HOLD') {
    return [
      { condition: 'First purchase occurs', action: 'Shift to SEND (controlled)' },
      { condition: 'Metrics worsen 20%+', action: 'Shift to FIX immediately' },
      { condition: '72 hours no change', action: 'Run single variable test' }
    ];
  }

  if (decision === 'FIX') {
    return [
      { condition: 'Target metric improves 50%+', action: 'Graduate to HOLD for 48h' },
      { condition: 'No improvement after 3 fixes', action: 'Consider SWITCH' },
      { condition: 'First purchase/ATC appears', action: 'Extend test before celebrating' }
    ];
  }

  return [
    { condition: 'New product shows engagement in 24h', action: 'Continue test' },
    { condition: 'Same pattern emerges', action: 'Pivot to different niche' },
    { condition: 'Third product fails', action: 'Deep strategy reassessment' }
  ];
}

function generateTrafficPlan(trafficType: TrafficType | null, decision: Decision): TrafficPlanOutput {
  const isOrganic = trafficType === 'organic' || trafficType === 'influencers';
  
  if (isOrganic) {
    return {
      type: 'free',
      title: 'Free Traffic Plan (Next 48 Hours)',
      actions: [
        'Post 2-3 pieces of content per day minimum',
        'Use trending sounds/formats in your niche',
        'Add store link in bio + pinned comment',
        'Engage 30 min/day in comments of similar accounts',
        'Repurpose best performer into 3 variations',
        'Track which content type drives most profile visits'
      ],
      doNotTouch: [
        'Don\'t delete underperforming posts (algorithm data)',
        'Don\'t change your posting schedule mid-test',
        'Don\'t spam links in comments'
      ]
    };
  }

  return {
    type: 'paid',
    title: 'Paid Traffic Plan (Safe Mode)',
    actions: [
      'Set daily budget: $10-20/day for testing phase',
      'Run 2-3 ad variations per ad set',
      'Test creative first, then audience',
      'Use broad targeting initially (let algorithm learn)',
      'Check results at 24h mark, not before',
      'Don\'t touch for 48-72h minimum'
    ],
    doNotTouch: [
      'Don\'t increase budget more than 20% at once',
      'Don\'t pause ads before 500 impressions',
      'Don\'t change multiple variables at once'
    ],
    budgetGuidance: 'Testing: $10-20/day | Scaling: Add 20% every 48h if profitable'
  };
}

export function getCompletionPercentage(inputs: CheckpointInputs): number {
  let completed = 0;
  const total = 6;
  
  if (inputs.trafficType) completed++;
  if (inputs.stage) completed++;
  if (inputs.situation) completed++;
  if (inputs.changes.length > 0) completed++;
  if (inputs.goal) completed++;
  if (inputs.hasNumbers) completed++;
  
  return Math.round((completed / total) * 100);
}
