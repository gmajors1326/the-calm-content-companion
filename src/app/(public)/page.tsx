import Hero from "@/components/home/Hero";
import SocialProof from '@/components/home/SocialProof';
import HowItWorks from '@/components/home/HowItWorks';
import ToolsGrid from '@/components/home/ToolsGrid';
import FlagshipProduct from '@/components/home/FlagshipProduct';
import Pricing from '@/components/home/Pricing';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <ToolsGrid />
      <FlagshipProduct />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
