import Header from '@/components/landing-page/Header';
import Hero from '@/components/landing-page/Hero';
import Mission from '@/components/landing-page/Mission';
import Features from '@/components/landing-page/Features';
import Pricing from '@/components/landing-page/Pricing';
import Faq from '@/components/landing-page/Faq';
import Cta from '@/components/landing-page/Cta';
import Footer from '@/components/landing-page/Footer';

const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Mission />
      <Features />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
};

export default LandingPage;