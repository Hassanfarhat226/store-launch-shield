import { useState, useEffect } from 'react';

const DecisionSystemDemo = () => {
  const [activeInputs, setActiveInputs] = useState({
    traffic: 0,
    changed: 0,
    happened: 0,
    duration: 0,
    goal: 3
  });
  const [showOutput, setShowOutput] = useState(false);
  const [outputLines, setOutputLines] = useState<number[]>([]);

  // Auto-cycle through inputs for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInputs(prev => ({
        traffic: (prev.traffic + 1) % 5,
        changed: (prev.changed + 1) % 5,
        happened: (prev.happened + 1) % 5,
        duration: (prev.duration + 1) % 4,
        goal: (prev.goal + 1) % 4
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show output with staggered animation
  useEffect(() => {
    setShowOutput(true);
    const lines = [0, 1, 2, 3, 4];
    lines.forEach((line, index) => {
      setTimeout(() => {
        setOutputLines(prev => [...prev, line]);
      }, index * 200);
    });
  }, []);

  const trafficOptions = ['Ads', 'TikTok / Reels', 'SEO / Google', 'Influencers', 'Other'];
  const changedOptions = ['Nothing yet', 'I changed the product', 'I changed the price', 'I changed the landing/product page', 'I changed multiple things'];
  const happenedOptions = ['I got visits but no sales', 'I got add-to-carts but no sales', 'I got a few sales', 'I got zero clicks / attention', "I don't know (I'm confused)"];
  const durationOptions = ['Just started', '1–2 days', '3–7 days', 'Over a week'];
  const goalOptions = ['Just get my first sale', 'See if this product is worth continuing', "Scale what's working", 'I just want clarity'];

  return (
    <section className="mb-14 animate-section">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          The First Traffic Checkpoint™ Decision System
        </h2>
        <p className="text-muted-foreground text-lg">
          A simple input → output system that tells you what to do next without guessing.
        </p>
      </div>

      {/* Two-Column System */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
        
        {/* LEFT CARD: INPUT */}
        <div className="input-card bg-card border-2 border-border rounded-xl p-5 md:p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
          
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-medium">
            Step 1: Tell us what you did
          </div>

          {/* Traffic Source */}
          <div className="mb-5">
            <div className="text-sm text-foreground mb-2 font-medium">✅ Traffic source</div>
            <div className="flex flex-wrap gap-2">
              {trafficOptions.map((option, idx) => (
                <span
                  key={option}
                  className={`input-chip px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-default
                    ${idx === activeInputs.traffic 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'bg-secondary text-muted-foreground'
                    }`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          {/* What you changed */}
          <div className="mb-5">
            <div className="text-sm text-foreground mb-2 font-medium">✅ What you changed recently</div>
            <div className="flex flex-wrap gap-2">
              {changedOptions.map((option, idx) => (
                <span
                  key={option}
                  className={`input-chip px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-default
                    ${idx === activeInputs.changed 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'bg-secondary text-muted-foreground'
                    }`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          {/* What happened */}
          <div className="mb-5">
            <div className="text-sm text-foreground mb-2 font-medium">✅ What happened so far</div>
            <div className="flex flex-wrap gap-2">
              {happenedOptions.map((option, idx) => (
                <span
                  key={option}
                  className={`input-chip px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-default
                    ${idx === activeInputs.happened 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'bg-secondary text-muted-foreground'
                    }`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-5">
            <div className="text-sm text-foreground mb-2 font-medium">✅ How long you've been sending traffic</div>
            <div className="flex flex-wrap gap-2">
              {durationOptions.map((option, idx) => (
                <span
                  key={option}
                  className={`input-chip px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-default
                    ${idx === activeInputs.duration 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'bg-secondary text-muted-foreground'
                    }`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <div className="text-sm text-foreground mb-2 font-medium">✅ Your goal right now</div>
            <div className="flex flex-wrap gap-2">
              {goalOptions.map((option, idx) => (
                <span
                  key={option}
                  className={`input-chip px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-default
                    ${idx === activeInputs.goal 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'bg-secondary text-muted-foreground'
                    }`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CONNECTOR ARROW (Desktop only) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="connector-arrow flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>

        {/* Mobile Arrow */}
        <div className="flex md:hidden justify-center py-2">
          <div className="flex flex-col items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></span>
            <span className="text-primary text-xl">↓</span>
          </div>
        </div>

        {/* RIGHT CARD: OUTPUT */}
        <div className="output-card bg-card border-2 border-primary rounded-xl p-5 md:p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
          
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-medium">
            Step 2: Get your exact next move
          </div>

          {/* Result Pill */}
          <div className={`inline-block mb-5 transition-all duration-500 ${showOutput ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <span className="result-pill bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 shadow-lg shadow-primary/40">
              <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></span>
              RESULT: WAIT ✅
            </span>
          </div>

          {/* What to do next */}
          <div className="mb-5">
            <div className="text-sm text-foreground mb-3 font-medium">"What to do next"</div>
            <div className="space-y-2">
              {[
                'Do NOT change anything for the next 48 hours',
                'Send traffic until you hit the checkpoint minimum',
                'Only track these 2 signals (ignore the rest)',
                'If X happens → do Y',
                'If Z happens → stop and switch'
              ].map((instruction, idx) => (
                <div 
                  key={idx}
                  className={`flex items-start gap-2 transition-all duration-300 ${
                    outputLines.includes(idx) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <span className="text-primary font-bold">✅</span>
                  <span className="text-muted-foreground text-sm">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What NOT to do */}
          <div className="mb-5 bg-destructive/10 border border-destructive/30 rounded-lg p-3">
            <div className="text-sm text-foreground mb-1 font-medium">"What NOT to do"</div>
            <p className="text-sm text-muted-foreground">
              Do not change the product or page yet — that creates false results.
            </p>
          </div>

          {/* Why this is the answer */}
          <div className="border-t border-border pt-4">
            <div className="text-sm text-foreground mb-1 font-medium">"Why this is the answer"</div>
            <p className="text-sm text-primary italic">
              Right now you're still in the early data window, not failure.
            </p>
          </div>
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
        <div className="deliverable-card bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
          <div className="text-lg font-bold text-foreground mb-1">Checkpoint Scorecard</div>
          <div className="text-xs text-primary mb-2">(Downloadable)</div>
          <p className="text-sm text-muted-foreground">"Print it or keep it open while you test."</p>
        </div>
        <div className="deliverable-card bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
          <div className="text-lg font-bold text-foreground mb-1">Pass / Wait / Stop Rules</div>
          <p className="text-sm text-muted-foreground">"Simple rules that prevent emotional decisions."</p>
        </div>
        <div className="deliverable-card bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
          <div className="text-lg font-bold text-foreground mb-1">First Test Guardrails</div>
          <p className="text-sm text-muted-foreground">"Exactly what you're allowed to change — and when."</p>
        </div>
      </div>

      {/* MICRO-CTA */}
      <div className="text-center">
        <p className="text-lg text-primary font-medium mb-4">
          Ready to run traffic without guessing?
        </p>
      </div>
    </section>
  );
};

export default DecisionSystemDemo;
