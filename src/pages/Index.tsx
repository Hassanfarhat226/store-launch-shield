import ChecklistItem from "@/components/ChecklistItem";
import BenefitItem from "@/components/BenefitItem";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        
        {/* Hero Section */}
        <section className="mb-10 animate-section animate-delay-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Your Store Is Built.<br />
            <span className="text-muted-foreground">This Is the Checkpoint Most Beginners Skip.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Before you send any traffic — ads, TikTok, SEO, or influencers —<br />
            this makes sure you don't misread what happens and quit too early.
          </p>

          {/* Price Anchor */}
          <div className="mb-8">
            <span className="price-pill">
              One-Time Store Launch Protection — $37
            </span>
          </div>
        </section>

        {/* Mechanism Hero Box */}
        <section className="mb-14 animate-section animate-delay-2">
          <div className="checkpoint-box">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
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
            <p className="text-muted-foreground mb-4">
              Most beginners lose money or confidence here —<br />
              not because the store is bad,<br />
              but because they don't know how to judge what's working.
            </p>
            <p className="text-foreground font-medium">
              This checkpoint makes sure your first traffic gives you answers — not confusion.
            </p>
          </div>

          {/* Visual Diagram */}
          <div className="mt-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm md:text-base">
              <div className="bg-card border border-border rounded-lg px-4 py-3 text-center">
                <span className="text-foreground font-medium">Store Built ✅</span>
              </div>
              <div className="text-muted-foreground rotate-90 md:rotate-0">→</div>
              <div className="you-are-here bg-primary text-primary-foreground rounded-lg px-4 py-3 text-center font-bold border-2 border-primary">
                <div className="text-xs uppercase tracking-wide mb-1 opacity-80">YOU ARE HERE</div>
                <div>First Traffic Checkpoint ⚠️</div>
              </div>
              <div className="text-muted-foreground rotate-90 md:rotate-0">→</div>
              <div className="bg-card border border-border rounded-lg px-4 py-3 text-center">
                <span className="text-foreground font-medium">Traffic → Data → Scale</span>
              </div>
            </div>
            
            <p className="text-center text-muted-foreground mt-6 text-sm md:text-base">
              Skipping this step doesn't stop traffic —<br />
              it just makes the results misleading.
            </p>
          </div>
        </section>

        {/* What This Actually Does */}
        <section className="mb-14 animate-section animate-delay-3">
          <h2 className="section-heading">What This Actually Does For You</h2>
          
          <ul className="space-y-3 mb-6">
            <BenefitItem>Tells you exactly what to look at after your first traffic</BenefitItem>
            <BenefitItem>Tells you what to ignore so you don't panic</BenefitItem>
            <BenefitItem>Tells you when to keep going vs stop</BenefitItem>
            <BenefitItem>Prevents changing things too early and killing momentum</BenefitItem>
          </ul>
          
          <p className="text-foreground font-medium">
            So instead of guessing, you know what the results actually mean.
          </p>
        </section>

        {/* The Checklist */}
        <section className="mb-14 animate-section animate-delay-4">
          <h2 className="section-heading">Before Sending Any Traffic, These Decisions Must Be Clear</h2>
          
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <ChecklistItem>You know what early success actually looks like</ChecklistItem>
            <ChecklistItem>You know what result means "keep going" vs "stop"</ChecklistItem>
            <ChecklistItem>You know what NOT to touch during the first test</ChecklistItem>
            <ChecklistItem>You know how much data is "enough" before changing anything</ChecklistItem>
            <ChecklistItem>You know how to avoid false negatives from organic or paid traffic</ChecklistItem>
          </div>
          
          <p className="text-foreground">
            The store is built.<br />
            <span className="font-medium">This makes sure you don't misread the results.</span>
          </p>
        </section>

        {/* Beginner Fears Section */}
        <section className="mb-14 animate-section">
          <h2 className="section-heading">Why Most $20 Stores Never Get Past This Step</h2>
          
          <div className="space-y-3 mb-6">
            <p className="fear-question">"I got clicks but no sales — is it broken?"</p>
            <p className="fear-question">"Should I change the product already?"</p>
            <p className="fear-question">"Maybe this doesn't work…"</p>
          </div>
          
          <p className="body-text mb-2">
            These questions aren't failures.
          </p>
          <p className="text-foreground font-medium">
            They're what happens without a checkpoint.
          </p>
        </section>

        {/* What This Prevents */}
        <section className="mb-14 animate-section bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            What This Prevents From Happening
          </h2>
          <p className="text-muted-foreground mb-8">
            Most beginners quit here — not because the store is bad, but because they misread the first results.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Thinking your store is broken</span><br />
                <span className="text-muted-foreground">when you simply didn't give it enough data yet.</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Changing products too early</span><br />
                <span className="text-muted-foreground">and never knowing if the first one could have worked.</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Stopping after a few clicks</span><br />
                <span className="text-muted-foreground">because you didn't know what "normal" looks like at the start.</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Mixing advice from YouTube, TikTok, and Reddit</span><br />
                <span className="text-muted-foreground">and accidentally canceling out your own progress.</span>
              </p>
            </div>
            <div className="pain-bullet">
              <p className="text-lg md:text-xl">
                <span className="text-primary font-semibold">Wasting your first traffic opportunity</span><br />
                <span className="text-muted-foreground">and losing confidence before you ever get momentum.</span>
              </p>
            </div>
          </div>
          
          <div className="border-t border-border pt-6">
            <p className="text-lg text-foreground">
              Your store is professionally built.<br />
              <span className="font-medium">This makes sure you don't misinterpret what happens next and quit before the store ever has a chance to work.</span>
            </p>
          </div>
        </section>

        {/* What You're Actually Buying */}
        <section className="mb-14 animate-section">
          <h2 className="section-heading">What You're Actually Buying for $37</h2>
          
          <ul className="space-y-3 mb-6">
            <BenefitItem>Knowing when to keep going vs stop</BenefitItem>
            <BenefitItem>Knowing what not to touch during the first test</BenefitItem>
            <BenefitItem>Knowing whether results mean "early" or "failed"</BenefitItem>
            <BenefitItem>Knowing you're not guessing</BenefitItem>
          </ul>
          
          <p className="text-foreground font-medium">
            So instead of reacting emotionally, you make one calm, correct decision.
          </p>
        </section>

        {/* Price Justification */}
        <section className="mb-14 animate-section">
          <div className="comparison-block">
            <p className="text-lg text-foreground mb-2">
              Most beginners lose weeks — or burn $200–$500 — sending traffic incorrectly.
            </p>
            <p className="text-muted-foreground">
              This exists so you don't.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center animate-section">
          {/* Urgency Bar */}
          <div className="urgency-bar">
            This is a one-time add-on shown only right after your store is built.
          </div>

          <button className="cta-button mb-4">
            Pass the First Traffic Checkpoint — $37
          </button>
          
          <p className="micro-text mb-6">
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
