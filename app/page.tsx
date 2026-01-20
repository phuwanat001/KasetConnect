import { HeroSection } from "./components/landing/HeroSection";
import { ProblemSolutionSection } from "./components/landing/ProblemSolutionSection";
import { FeaturesSection } from "./components/landing/FeaturesSection";
import { HowItWorksSection } from "./components/landing/HowItWorksSection";
import { CategoriesSection } from "./components/landing/CategoriesSection";
import { FeaturedProductsSection } from "./components/landing/FeaturedProductsSection";
import { ReturningUserSection } from "./components/landing/ReturningUserSection";
import { TrustSection } from "./components/landing/TrustSection";
import { TestimonialsSection } from "./components/landing/TestimonialsSection";
import { CTASection } from "./components/landing/CTASection";
import landingPageData from "./mock/landing-page.json";

export default function Home() {
  const { hero, features, featuredProducts, categories } = landingPageData;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Strong value proposition with SEO-optimized headings */}
      <HeroSection
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        ctaText={hero.ctaText}
        ctaLink={hero.ctaLink}
        secondaryCtaText={hero.secondaryCtaText}
        secondaryCtaLink={hero.secondaryCtaLink}
        backgroundImage={hero.backgroundImage}
      />

      {/* 2. Problem → Solution Section - User pain points and platform solutions */}
      <ProblemSolutionSection />

      {/* 3. Features & Benefits Section - User-focused benefits */}
      <FeaturesSection features={features} />

      {/* 4. How It Works Section - 3-step process */}
      <HowItWorksSection />

      {/* 5. Categories Section - Browse by category */}
      <CategoriesSection categories={categories} />

      {/* 6. Featured Products Section - Popular machinery */}
      <FeaturedProductsSection products={featuredProducts} />

      {/* 7. For Current Users Section - Login/Dashboard CTAs */}
      <ReturningUserSection />

      {/* 8. Trust & Credibility Section - Stats, badges, ratings */}
      <TrustSection />

      {/* 9. Testimonials Section - Real user reviews */}
      <TestimonialsSection />

      {/* 10. Final CTA Section - High-conversion call to action */}
      <CTASection />
    </div>
  );
}
