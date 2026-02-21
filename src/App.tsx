import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { createAIServiceFromEnv } from '@/services/ai';
import AnnouncementBanner from '@/sections/AnnouncementBanner';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import TrustedCompanies from '@/sections/TrustedCompanies';
import AIFeatures from '@/sections/AIFeatures';
import EnterpriseCTA from '@/sections/EnterpriseCTA';
import G2Badges from '@/sections/G2Badges';
import SoftwareSuite from '@/sections/SoftwareSuite';
import HumanAIComparison from '@/sections/HumanAIComparison';
import Pricing from '@/sections/Pricing';
import Stats from '@/sections/Stats';
import FAQ from '@/sections/FAQ';
import Footer from '@/sections/Footer';
import ROICalculator from '@/sections/ROICalculator';
import CookieConsent from '@/components/CookieConsent';
import ChatWidget from '@/components/ChatWidget';

// Pages
import AgentPage from '@/pages/AgentPage';
import UseCasePage from '@/pages/UseCasePage';
import BlogPage from '@/pages/BlogPage';
import ResumeScreenerPage from '@/pages/ResumeScreenerPage';
import CodingInterviewerPage from '@/pages/CodingInterviewerPage';
import MCQInterviewerPage from '@/pages/MCQInterviewerPage';
import SystemDesignInterviewerPage from '@/pages/SystemDesignInterviewerPage';
import EnglishProficiencyPage from '@/pages/EnglishProficiencyPage';
import PhoneScreenerPage from '@/pages/PhoneScreenerPage';
import ResourcesListPage from '@/pages/ResourcesListPage';
import CodeOfConductPage from '@/pages/CodeOfConductPage';
import RemoteWorkPolicyPage from '@/pages/RemoteWorkPolicyPage';
import SocialMediaPolicyPage from '@/pages/SocialMediaPolicyPage';
import LeavePolicyPage from '@/pages/LeavePolicyPage';
import TravelExpensePolicyPage from '@/pages/TravelExpensePolicyPage';
import ComparePage from '@/pages/ComparePage';
import ROICalculatorPage from '@/pages/ROICalculatorPage';
import CreditsCalculatorPage from '@/pages/CreditsCalculatorPage';
import HelpCentrePage from '@/pages/HelpCentrePage';
import PricingPage from '@/pages/PricingPage';
import ContactUsPage from '@/pages/ContactUsPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage';

const HomePage = () => (
  <main>
    <Hero />
    <TrustedCompanies />
    <AIFeatures />
    <EnterpriseCTA />
    <G2Badges />
    <SoftwareSuite />
    <HumanAIComparison />
    <Pricing />
    <Stats />
    <ROICalculator />
    <FAQ />
  </main>
);

function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Initialize AI service on app mount
  useEffect(() => {
    const aiService = createAIServiceFromEnv();
    if (aiService) {
      console.log('AI Service initialized successfully');
    } else {
      console.log('No AI API key found. Chat will use fallback mode.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBanner />
      <Navigation />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai-agents/:agentId" element={<AgentPage />} />
        <Route path="/use-cases/:industryId" element={<UseCasePage />} />
        <Route path="/resources/blog" element={<BlogPage />} />
        
        {/* New Pages */}
        <Route path="/ai-resume-screener" element={<ResumeScreenerPage />} />
        <Route path="/ai-coding-interviewer" element={<CodingInterviewerPage />} />
        <Route path="/ai-mcq-interviewer" element={<MCQInterviewerPage />} />
        <Route path="/ai-system-design-interview" element={<SystemDesignInterviewerPage />} />
        <Route path="/english-proficiency-test" element={<EnglishProficiencyPage />} />
        <Route path="/ai-phone-screener" element={<PhoneScreenerPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />

        {/* Resource Routes */}
        <Route path="/resources/compare" element={<ComparePage />} />
        <Route path="/resources/compare/:competitorId" element={<ComparePage />} />
        <Route path="/resources/roi-calculator" element={<ROICalculatorPage />} />
        <Route path="/resources/credits-calculator" element={<CreditsCalculatorPage />} />
        <Route path="/resources/help-centre" element={<HelpCentrePage />} />

        {/* Policy Pages */}
        <Route path="/resources/code-of-conduct" element={<CodeOfConductPage />} />
        <Route path="/resources/remote-work-policy" element={<RemoteWorkPolicyPage />} />
        <Route path="/resources/social-media-policy" element={<SocialMediaPolicyPage />} />
        <Route path="/resources/leave-policy" element={<LeavePolicyPage />} />
        <Route path="/resources/travel-expense-policy" element={<TravelExpensePolicyPage />} />
        
        {/* Generic Resource List Route (policies, letters, glossary, etc.) */}
        <Route path="/resources/:resourceId" element={<ResourcesListPage />} />

        {/* Fallback route - could be 404 */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />
      <CookieConsent />
      <ChatWidget />
    </div>
  );
}

export default App;
