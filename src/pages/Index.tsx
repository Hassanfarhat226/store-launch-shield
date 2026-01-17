import WarningBox from "@/components/WarningBox";
import ChecklistItem from "@/components/ChecklistItem";
import MistakeItem from "@/components/MistakeItem";
import BenefitItem from "@/components/BenefitItem";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Your Store Is Ready. <span className="text-muted-foreground">Most People Fail in the Next Step.</span>
          </h1>
          
          <div className="space-y-1 mb-8">
            <p className="text-lg md:text-xl text-foreground">You didn't buy a store problem.</p>
            <p className="text-lg md:text-xl text-muted-foreground">You bought a traffic decision problem — and this closes the gap.</p>
          </div>
        </section>

        {/* Mechanism Visual Callout */}
        <section className="mb-14">
          <div className="border-2 border-primary rounded-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              The Traffic Readiness Gap
            </h2>
            <p className="text-lg text-foreground mb-4">
              The short window between a store being built<br />
              and traffic being sent — where most beginners lose momentum, money, or confidence.
            </p>
            <p className="text-muted-foreground">
              This is not about ads vs organic.<br />
              It's about sending any traffic the right way, the first time.
            </p>
          </div>

          {/* Visual Timeline */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mt-8 text-sm md:text-base">
            <div className="bg-card border border-border rounded-lg px-4 py-2 text-center">
              <span className="text-foreground font-medium">Store Built</span>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-center font-bold">
              Traffic Readiness Gap
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="bg-card border border-border rounded-lg px-4 py-2 text-center">
              <span className="text-foreground font-medium">Scale</span>
            </div>
          </div>
        </section>

        {/* Section 1: What Goes Wrong */}
        <section className="mb-14">
          <h2 className="section-heading">Where Things Break — Even With a Good Store</h2>
          
          <div className="space-y-4">
            <p className="body-text">
              Most beginners don't fail because their store is bad.
            </p>
            <p className="body-text">
              They fail because they don't know how to interpret what happens after traffic hits.
            </p>
            <p className="body-text">They don't know:</p>
            <ul className="space-y-2 ml-4 mb-4">
              <li className="body-text">• What numbers matter</li>
              <li className="body-text">• What's noise vs signal</li>
              <li className="body-text">• When to wait vs change something</li>
            </ul>
            <p className="body-text">
              So they either panic… or stall.
            </p>
            <p className="text-foreground font-medium mt-6">
              Both kill momentum.
            </p>
          </div>
        </section>

        {/* Section 2: The Checklist */}
        <section className="mb-14">
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

        {/* Section 3: Mistake Amplification */}
        <section className="mb-14">
          <h2 className="section-heading">The 3 Mistakes That Waste the First Traffic Window</h2>
          
          <ul className="mb-6">
            <MistakeItem>Treating the first traffic like a verdict instead of data</MistakeItem>
            <MistakeItem>Changing things before enough signals exist</MistakeItem>
            <MistakeItem>Mixing strategies instead of following one clear rule-set</MistakeItem>
          </ul>
          
          <p className="body-text">
            Store Launch Protection exists to protect this window — once it's gone, momentum is harder to recover.
          </p>
        </section>

        {/* Section 4: Value Ladder Context */}
        <section className="mb-14">
          <h2 className="section-heading">Where This Fits in the Bigger Picture</h2>
          
          <p className="body-text mb-6">This is the missing piece.</p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-primary">✔</span>
              <div>
                <span className="text-foreground">You already have:</span>
                <span className="text-muted-foreground ml-2">A professionally built store</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">✔</span>
              <div>
                <span className="text-foreground">This gives you:</span>
                <span className="text-muted-foreground ml-2">Clarity on your first traffic decisions</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-muted-foreground">
              <span>→</span>
              <div>
                <span>Later comes:</span>
                <span className="ml-2">Scaling · Testing angles · Speed and leverage</span>
              </div>
            </div>
          </div>
          
          <p className="text-foreground font-medium">
            This step exists so you don't sabotage the foundation.
          </p>
        </section>

        {/* Section 5: What They Get */}
        <section className="mb-14">
          <h2 className="section-heading">What This Actually Gives You</h2>
          
          <ul className="mb-6">
            <BenefitItem>A traffic decision framework (ads or organic)</BenefitItem>
            <BenefitItem>Clear launch rules for the first test window</BenefitItem>
            <BenefitItem>One proven static ad + one UGC script (optional use)</BenefitItem>
            <BenefitItem>Exact signals that tell you "continue" vs "change"</BenefitItem>
          </ul>
          
          <p className="text-foreground">
            No hype. No guessing. Just correct decisions at the most sensitive stage.
          </p>
        </section>

        {/* Price Justification */}
        <section className="mb-14">
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
        <section className="text-center">
          <button className="cta-button mb-4">
            Protect My First Traffic Decisions
          </button>
          
          <p className="micro-text mb-6">
            One-time add-on · Instant access · No subscription
          </p>
          
          <p className="text-sm text-muted-foreground italic">
            Skipping this doesn't break the store — it risks misreading what happens next.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Index;
