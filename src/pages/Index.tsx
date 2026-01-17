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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-6">
            Before You Run Ads, Read This <span className="text-muted-foreground">(Most Beginners Ignore It)</span>
          </h1>
          
          <div className="space-y-1 mb-8">
            <p className="text-lg md:text-xl text-foreground">You already bought the store.</p>
            <p className="text-lg md:text-xl text-muted-foreground">This makes sure you don't break it with traffic.</p>
          </div>

          <WarningBox title="Important">
            Running ads without a launch safeguard is the #1 reason beginners lose money and quit — even with a good store.
          </WarningBox>
        </section>

        {/* Section 1: The Fear Anchor */}
        <section className="mb-14">
          <h2 className="section-heading">What Usually Happens After This Point</h2>
          
          <div className="space-y-4">
            <p className="body-text">Most people do one of two things next.</p>
            <p className="body-text">
              They either rush into ads without knowing what to check — or they overthink everything and never launch at all.
            </p>
            <p className="body-text">
              Both lead to the same outcome: wasted money, confusion, and blaming the store.
            </p>
          </div>
        </section>

        {/* Section 2: The Checklist */}
        <section className="mb-14">
          <h2 className="section-heading">Do NOT Run Ads Until These Are Checked</h2>
          
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <ChecklistItem>Pixel installed and firing correctly</ChecklistItem>
            <ChecklistItem>Product page passes basic trust test</ChecklistItem>
            <ChecklistItem>Shipping expectations won't trigger refunds</ChecklistItem>
            <ChecklistItem>Offer math actually makes sense</ChecklistItem>
            <ChecklistItem>You know exactly what result means "working"</ChecklistItem>
          </div>
          
          <p className="text-foreground font-medium">
            If even one of these is wrong, ads won't fail quietly — they fail expensively.
          </p>
        </section>

        {/* Section 3: Mistake Amplification */}
        <section className="mb-14">
          <h2 className="section-heading">The 3 Mistakes That Burn Most Beginners</h2>
          
          <ul className="mb-6">
            <MistakeItem>Editing ads too early because of emotions</MistakeItem>
            <MistakeItem>Testing too many products at once</MistakeItem>
            <MistakeItem>Copying random TikTok advice with no system</MistakeItem>
          </ul>
          
          <p className="body-text">
            Store Launch Protection exists so you don't learn these lessons the hard way.
          </p>
        </section>

        {/* Section 4: What They Get */}
        <section className="mb-14">
          <h2 className="section-heading">What This Actually Gives You</h2>
          
          <ul className="mb-6">
            <BenefitItem>A pass/fail launch checklist (no guessing)</BenefitItem>
            <BenefitItem>Exact first ad setup (objective, budget, structure)</BenefitItem>
            <BenefitItem>One proven static ad + one UGC script</BenefitItem>
            <BenefitItem>Clear rules for when to stop, keep going, or scale</BenefitItem>
          </ul>
          
          <p className="text-foreground">
            Nothing extra. Nothing theoretical. Just what prevents mistakes.
          </p>
        </section>

        {/* Price Justification */}
        <section className="mb-14">
          <div className="comparison-block">
            <p className="text-lg text-foreground mb-2">
              Most beginners burn $200–$500 in ads learning this the hard way.
            </p>
            <p className="text-muted-foreground">
              This exists so you don't.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <button className="cta-button mb-4">
            Protect My Store Before I Run Ads
          </button>
          
          <p className="micro-text mb-6">
            One-time add-on · Instant access · No subscription
          </p>
          
          <p className="text-sm text-muted-foreground italic">
            You can skip this — just understand you'll be testing ads without a safety net.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Index;
