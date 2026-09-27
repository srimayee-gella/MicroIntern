import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { StatsSection } from '../components/landing/StatsSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { FeaturedProjectsSection } from '../components/landing/FeaturedProjectsSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { CTASection } from '../components/landing/CTASection';

export const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturedProjectsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};
