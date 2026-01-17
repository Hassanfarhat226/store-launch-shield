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
            Before You Send Any Traffic, Read This <span className="text-muted-foreground">(Most Beginners Ignore It)</span>
          </h1>
          
          <div className="space-y-1 mb-8">
            <p className="text-lg md:text-xl text-foreground">You already bought the store.</p>
            <p className="text-lg md:text-xl text-muted-foreground">This makes sure you don't break it with traffic — paid or organic.</p>
          </div>

          <WarningBox title="Important">
            Whether traffic comes from ads, TikTok, Instagram, SEO, or influencers — sending traffic without a launch safeguard is the fastest way beginners lose money and quit.
          </WarningBox>
        </section>

        {/* Section 1: The Fear Anchor */}
        <section className="mb-14">
          <h2 className="section-heading">What Usually Happens After This Point</h2>
          
          <div className="space-y-4">
            <p className="body-text">Most people do one of two things next.</p>
            <p className="body-text">
              They start pushing traffic — ads, TikTok, reels, SEO — without knowing what actually needs to be checked first.
            </p>
            <p className="body-text">
              Or they overthink everything and never send traffic at all.
            </p>
            <p className="body-text">
              Both lead to the same outcome: wasted time, lost momentum, and blaming the store.
            </p>
            <p className="text-foreground font-medium mt-6">
              Traffic isn't the problem.<br />
              Sending traffic incorrectly is.
            </p>
          </div>
        </section>

        {/* Section 2: The Checklist */}
        <section className="mb-14">
          <h2 className="section-heading">Do NOT Send Traffic Until These Are Checked</h2>
          
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <ChecklistItem>Product page passes basic trust test</ChecklistItem>
            <ChecklistItem>Offer math makes sense for conversions</ChecklistItem>
            <ChecklistItem>Shipping expectations won't trigger refunds</ChecklistItem>
            <ChecklistItem>Tracking is set up (even for organic data)</ChecklistItem>
            <ChecklistItem>You know exactly what result means "working"</ChecklistItem>
          </div>
          
          <p className="text-foreground font-medium">
            If even one of these is wrong, traffic won't fail quietly — it fails expensively or invisibly.
          </p>
        </section>

        {/* Section 3: Mistake Amplification */}
        <section className="mb-14">
          <h2 className="section-heading">The 3 Mistakes That Kill Momentum Early</h2>
          
          <ul className="mb-6">
            <MistakeItem>Sending traffic before the store is actually ready</MistakeItem>
            <MistakeItem>Changing things randomly based on emotion</MistakeItem>
            <MistakeItem>Following mixed advice without a clear launch rule</MistakeItem>
          </ul>
          
          <p className="body-text">
            Store Launch Protection exists so you don't learn these lessons after wasting weeks or money.
          </p>
        </section>

        {/* Section 4: What They Get */}
        <section className="mb-14">
          <h2 className="section-heading">What This Actually Gives You</h2>
          
          <ul className="mb-6">
            <BenefitItem>A pass/fail launch checklist (works for ads and organic)</BenefitItem>
            <BenefitItem>Clear rules for sending your first traffic safely</BenefitItem>
            <BenefitItem>One proven static ad + one UGC script (optional use)</BenefitItem>
            <BenefitItem>Exact signals that tell you "this is working" vs "stop"</BenefitItem>
          </ul>
          
          <p className="text-foreground">
            Use ads. Use organic. Use both.<br />
            <span className="text-muted-foreground">This just makes sure you're not guessing.</span>
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
            Protect My Store Before Sending Traffic
          </button>
          
          <p className="micro-text mb-6">
            One-time add-on · Instant access · No subscription
          </p>
          
          <p className="text-sm text-muted-foreground italic">
            You can skip this — just understand you'll be sending traffic without a safety net.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Index;
