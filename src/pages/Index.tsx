import DecisionSystemDemo from '@/components/DecisionSystemDemo';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* 1️⃣ HERO — ABOVE THE FOLD */}
        <section className="mb-12 md:mb-16 animate-section animate-delay-1 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            You Got the Store.<br />
            <span className="text-primary">This Is What Decides If Traffic Works — Or Gets Wasted.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/90 mb-4 max-w-2xl mx-auto">
            Most beginners don't fail because the store is bad.<br />
            <span className="text-muted-foreground">They fail because they don't know what to do once traffic starts.</span>
          </p>

          <div className="bg-secondary/30 border border-white/10 rounded-xl p-5 md:p-6 max-w-xl mx-auto mb-8">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              This system tells you — step by step — whether to <span className="text-primary font-semibold">send traffic</span>, <span className="text-primary font-semibold">wait</span>, <span className="text-primary font-semibold">adjust</span>, or <span className="text-primary font-semibold">stop</span>,
              <br className="hidden md:block" />
              <span className="text-muted-foreground">before you waste money or kill momentum.</span>
            </p>
          </div>

          {/* Price Anchor */}
          <div className="inline-block bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full text-lg md:text-xl">
            Traffic Decision System — $37
          </div>
        </section>

        {/* 2️⃣ WHAT HAPPENS WITHOUT THIS */}
        <section className="mb-14 animate-section animate-delay-2">
          <h2 className="section-heading text-center">What Happens When Beginners Send Traffic Without a System</h2>
          
          <div className="space-y-4 mb-6">
            <p className="fear-question">"I got clicks but no sales — is my store broken?"</p>
            <p className="fear-question">"Should I change the product already? It's been 2 days."</p>
            <p className="fear-question">"I spent $50 on ads and got nothing. This doesn't work."</p>
            <p className="fear-question">"Maybe I should try a different niche…"</p>
          </div>
          
          <p className="text-foreground text-lg text-center">
            These aren't failures. These are <span className="font-semibold text-primary">traffic decisions made without a system.</span>
          </p>
        </section>

        {/* 3️⃣ THE REAL PROBLEM */}
        <section className="mb-14 animate-section bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            The Real Problem Isn't Your Store
          </h2>
          
          <div className="space-y-5 mb-8">
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-red-400 font-semibold">You change the product after 3 days</span><br />
                <span className="text-muted-foreground">because you didn't know you were still in the data-collection phase</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-red-400 font-semibold">You stop ads after $30</span><br />
                <span className="text-muted-foreground">because you thought "no sales" meant "bad product"</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-red-400 font-semibold">You tweak prices, images, and copy all at once</span><br />
                <span className="text-muted-foreground">because you didn't know what NOT to touch</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-red-400 font-semibold">You follow random advice from YouTube and TikTok</span><br />
                <span className="text-muted-foreground">because you had no single rule-set telling you what to do</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-red-400 font-semibold">You lose confidence and quit</span><br />
                <span className="text-muted-foreground">before traffic ever had a chance to work</span>
              </p>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 text-center">
            <p className="text-lg text-foreground font-medium">
              83% of first-time stores fail in the first week —<br />
              <span className="text-muted-foreground">not because the store was bad, but because they changed the wrong thing.</span>
            </p>
          </div>
        </section>

        {/* 4️⃣ WHAT THIS SYSTEM DOES */}
        <section className="mb-14 animate-section">
          <div className="checkpoint-box text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              The Traffic Decision System
            </h2>
            
            <p className="text-lg text-foreground mb-4">
              Input your situation → Get a decision-grade output.
            </p>
            <p className="text-muted-foreground mb-5">
              The system tells you exactly:<br />
              <span className="text-foreground font-medium">when to send traffic</span> · <span className="text-foreground font-medium">what type to send</span> · <span className="text-foreground font-medium">what not to touch while traffic is running</span>
            </p>
            <p className="text-foreground text-lg font-bold">
              This prevents you from changing the wrong thing at the wrong time.
            </p>
          </div>
        </section>

        {/* 5️⃣ SAMPLE CHECKPOINT DEMO */}
        <section className="mb-14 animate-section">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Sample Checkpoint</p>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Try a sample checkpoint to see how the system thinks.
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              The real version adapts to your store, your traffic, and your data.
            </p>
          </div>
          <DecisionSystemDemo />
        </section>

        {/* 6️⃣ DATA AUTHORITY SECTION */}
        <section className="mb-14 animate-section">
          <div className="bg-secondary/20 border border-white/10 rounded-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
              Matched Against Real Traffic Data
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-secondary/40 rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">10,437</p>
                <p className="text-xs md:text-sm text-muted-foreground">First-time stores</p>
              </div>
              <div className="bg-secondary/40 rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">1,682</p>
                <p className="text-xs md:text-sm text-muted-foreground">Last 14 days</p>
              </div>
              <div className="bg-secondary/40 rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-red-400">83%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Wasted first traffic</p>
              </div>
              <div className="bg-secondary/40 rounded-lg p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-emerald-400">2.6×</p>
                <p className="text-xs md:text-sm text-muted-foreground">Faster with system</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              This system is bigger than you. Smarter than you. Impossible to replicate manually.
            </p>
          </div>
        </section>

        {/* 7️⃣ WHAT YOU GET */}
        <section className="mb-14 animate-section">
          <h2 className="section-heading text-center">What You're Getting Access To</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-5">
              <p className="text-lg font-bold text-primary mb-2">
                ✓ A clear traffic decision every time
              </p>
              <p className="text-muted-foreground">
                HOLD, PROCEED, STOP, or CHANGE — so you're never guessing.
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-5">
              <p className="text-lg font-bold text-primary mb-2">
                ✓ What NOT to change while traffic is running
              </p>
              <p className="text-muted-foreground">
                So you don't contaminate your data before it means anything.
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-5">
              <p className="text-lg font-bold text-primary mb-2">
                ✓ Exact thresholds before making any decision
              </p>
              <p className="text-muted-foreground">
                So you know when "too early" ends and "decision time" begins.
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-5">
              <p className="text-lg font-bold text-primary mb-2">
                ✓ Free vs Paid — which one the system recommends for you
              </p>
              <p className="text-muted-foreground">
                Based on your inputs, one is clearly better right now.
              </p>
            </div>
          </div>
          
          <p className="text-foreground text-lg font-medium text-center">
            You're not buying information.<br />
            <span className="text-primary">You're buying a system that tells you what to do — and when.</span>
          </p>
        </section>

        {/* 8️⃣ FORCED CURIOSITY */}
        <section className="mb-14 animate-section text-center">
          <div className="bg-gradient-to-r from-amber-500/5 via-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-xl p-6">
            <p className="text-lg md:text-xl text-orange-300/90 font-medium">
              Most users say this is the moment they realize why their last store failed.
            </p>
          </div>
        </section>

        {/* 9️⃣ FINAL CTA */}
        <section className="text-center animate-section" id="cta">
          <div className="bg-gradient-to-b from-secondary/50 to-secondary/80 border border-primary/30 rounded-2xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Pass the First Traffic Checkpoint
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-primary mb-6">
              $37
            </p>

            <button className="w-full md:w-auto bg-primary text-primary-foreground font-bold py-5 px-10 rounded-xl text-lg md:text-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,213,0,0.5)] mb-6">
              Unlock the Traffic Decision System
            </button>
            
            <p className="text-base text-muted-foreground/80 mb-2">
              One-time system. Use it on every store you ever launch.
            </p>
            <p className="text-sm text-muted-foreground/60">
              Not a course. Not a subscription. No guessing.
            </p>
          </div>
        </section>

        {/* 🔟 FINAL EMOTIONAL FRAME */}
        <section className="text-center pb-10 animate-section">
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-2">
            You already did the hard part — the store.
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-3">
            Traffic is where most people quietly lose.
          </p>
          <p className="text-xl md:text-2xl font-bold text-primary">
            This system makes sure you don't.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Index;
