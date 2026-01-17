const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        
        {/* 1️⃣ HERO — ORIENTATION */}
        <section className="mb-12 animate-section animate-delay-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Your Store Is Built.<br />
            <span className="text-muted-foreground">This Is the Checkpoint Most Beginners Skip.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Before you send any traffic — ads, TikTok, SEO, or influencers —<br />
            this makes sure you don't misread the results and quit too early.
          </p>

          {/* Price Anchor - Visible Immediately */}
          <div className="inline-block bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-full text-base md:text-lg">
            One-Time Store Launch Protection — $37
          </div>
        </section>

        {/* 2️⃣ MECHANISM EXPLANATION */}
        <section className="mb-14 animate-section animate-delay-2">
          <div className="checkpoint-box">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                The First Traffic Checkpoint™
              </h2>
            </div>
            
            <p className="text-lg text-foreground mb-4">
              This is the moment after your store is built<br />
              but before traffic hits it.
            </p>
            <p className="text-muted-foreground mb-5">
              Most beginners lose money or confidence here —<br />
              not because the store is bad,<br />
              but because they don't know what the first results actually mean.
            </p>
            <p className="text-foreground text-lg font-bold">
              This checkpoint makes sure your first traffic gives you answers — not confusion.
            </p>
          </div>
        </section>

        {/* 3️⃣ WHERE THEY ARE RIGHT NOW */}
        <section className="mb-14 animate-section">
          <div className="flex flex-col items-center gap-3 text-sm md:text-base">
            {/* Step 1 */}
            <div className="bg-card border border-border rounded-lg px-5 py-3 text-center">
              <span className="text-foreground font-medium">Store Built ✅</span>
            </div>
            
            <div className="text-muted-foreground text-xl">↓</div>
            
            {/* Step 2 - YOU ARE HERE */}
            <div className="you-are-here bg-primary text-primary-foreground rounded-lg px-5 py-4 text-center font-bold border-2 border-primary shadow-lg shadow-primary/20">
              <div className="text-xs uppercase tracking-wider mb-1 opacity-80">YOU ARE HERE</div>
              <div className="text-base md:text-lg">First Traffic Checkpoint ⚠️</div>
            </div>
            
            <div className="text-muted-foreground text-xl">↓</div>
            
            {/* Step 3 */}
            <div className="bg-card border border-border rounded-lg px-5 py-3 text-center">
              <span className="text-foreground font-medium">Traffic → Data → Scale</span>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground mt-8 text-base md:text-lg">
            Skipping this step doesn't stop traffic —<br />
            it just makes the results misleading.
          </p>
        </section>

        {/* MECHANISM DEFINITION BOX */}
        <section className="mb-14 animate-section">
          <div className="bg-card border-2 border-primary/50 rounded-lg p-5 md:p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
              The First Traffic Checkpoint™
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">
              A single decision system that tells you whether to keep going, wait, or stop —<br />
              before emotions, opinions, or random advice take over.
            </p>
          </div>
        </section>

        {/* WHAT YOU'RE ACTUALLY GETTING ACCESS TO */}
        <section className="mb-14 animate-section">
          <h2 className="section-heading">What You're Actually Getting Access To</h2>
          
          <div className="bg-card border border-primary rounded-lg p-5 md:p-6 mb-6">
            <p className="text-lg md:text-xl font-bold text-primary mb-2">
              The First Traffic Checkpoint™
            </p>
            <p className="text-foreground">
              A simple, step-by-step decision system you follow after traffic hits your store.
            </p>
            <p className="text-muted-foreground mt-3">
              This checkpoint tells you:<br />
              <span className="text-foreground">what result matters,</span><br />
              <span className="text-foreground">what doesn't matter yet,</span><br />
              <span className="text-foreground">and what not to touch so you don't ruin momentum.</span>
            </p>
            <p className="text-foreground font-medium mt-4 italic">
              Then — and this is important — everything below becomes obvious.
            </p>
          </div>
          
          <ul className="space-y-5 mb-8">
            <li className="pain-bullet">
              <p className="text-lg">
                <span className="text-primary font-semibold">A clear "pass / wait / stop" decision</span><br />
                <span className="text-muted-foreground">so you're never guessing what to do next.</span>
              </p>
            </li>
            <li className="pain-bullet">
              <p className="text-lg">
                <span className="text-primary font-semibold">Rules for what you are NOT allowed to change yet</span><br />
                <span className="text-muted-foreground">so you don't sabotage a product too early.</span>
              </p>
            </li>
            <li className="pain-bullet">
              <p className="text-lg">
                <span className="text-primary font-semibold">A definition of what "too early" actually means</span><br />
                <span className="text-muted-foreground">so you don't mistake normal early results for failure.</span>
              </p>
            </li>
            <li className="pain-bullet">
              <p className="text-lg">
                <span className="text-primary font-semibold">One calm decision point</span><br />
                <span className="text-muted-foreground">instead of reacting emotionally after every click.</span>
              </p>
            </li>
          </ul>
          
          <p className="text-foreground text-lg font-medium">
            You're not buying information.<br />
            You're buying a checkpoint that tells you what to do — and when.
          </p>
        </section>

        {/* WHAT THE CHECKPOINT PREVENTS */}
        <section className="mb-14 animate-section bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            What the First Traffic Checkpoint™ Prevents
          </h2>
          
          <div className="space-y-5 mb-8">
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Thinking your store is broken</span><br />
                <span className="text-muted-foreground">because you didn't pass the checkpoint yet</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Changing products before enough data exists</span><br />
                <span className="text-muted-foreground">because you didn't know you were still early</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Stopping after a few clicks</span><br />
                <span className="text-muted-foreground">because you didn't know what "normal" looks like at the start</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Mixing advice from YouTube, TikTok, and Reddit</span><br />
                <span className="text-muted-foreground">because you had no single rule-set to follow</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Wasting your first traffic opportunity</span><br />
                <span className="text-muted-foreground">and losing confidence before momentum ever forms</span>
              </p>
            </div>
          </div>
          
          <div className="border-t border-border pt-6">
            <p className="text-lg text-foreground">
              Your store is professionally built.<br />
              <span className="font-medium">The First Traffic Checkpoint™ makes sure you don't misinterpret what happens next and quit before the store ever has a chance to work.</span>
            </p>
          </div>
        </section>

        {/* URGENCY + CTA */}
        <section className="text-center animate-section">
          {/* Urgency Line */}
          <p className="text-muted-foreground mb-6">
            This is a one-time add-on shown only right after your store is built.
          </p>

          {/* CTA Button */}
          <button className="cta-button mb-4">
            Pass the First Traffic Checkpoint — $37
          </button>
          
          <p className="micro-text mb-5">
            One-time · Instant access · No subscription
          </p>
          
          <p className="text-sm text-muted-foreground">
            Skipping this means interpreting results on your own.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Index;
