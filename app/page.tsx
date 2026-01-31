"use client";

import { useState } from 'react';

// Define colors based on image analysis and layout.tsx background
const COLORS = {
  DARK_GREEN: '#1c3125', // Matches body background in layout.tsx
  LIGHT_CREAM: '#fffaf0', // Background for content sections in image (Warmer Cream)
  ACCENT_YELLOW: '#f5c300', // Highlight color from pricing tag and 'Growth'
  TEXT_DARK: '#111827', // Near-black for primary text on light backgrounds
  TEXT_LIGHT: '#e5e7eb', // Light text color for dark backgrounds
};

const TOOL_CARDS = [
    {
        icon: 'sparkles',
        title: 'Hook Clarity Analyzer',
        description: 'Know if your hook makes sense — before you post.',
        bestFor: 'first lines, Reel openers, captions'
    },
    {
        icon: 'message',
        title: 'Message Positioning Builder',
        description: 'Get clear on what you’re actually about.',
        bestFor: 'niche clarity, bio direction, confidence'
    },
    {
        icon: 'compass',
        title: 'Content Direction Planner',
        description: 'Stop guessing what to post.',
        bestFor: 'weekly planning, low-energy weeks'
    },
    {
        icon: 'signal',
        title: 'Engagement Signal Interpreter',
        description: 'Understand what your posts are telling you.',
        bestFor: 'improving engagement calmly'
    },
    {
        icon: 'leaf',
        title: 'Weekly Content Reflection',
        description: 'Grow without burning out.',
        bestFor: 'consistency, confidence, momentum'
    }
];

export default function PromotoLandingPage() {
    
    // --- Component for the main Hero Section ---
    const HeroSection = () => (
      <section className="w-full bg-[#FAF9F6] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <header className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#143226] sm:text-[60px]">
              The Calm Content Guide
            </h1>
            <h2 className="mt-3 text-[22px] font-medium text-[#143226]/80">
              A gentle guide to simplify your content, find a sustainable posting rhythm, and grow without burnout.
            </h2>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div className="text-left">
              <div className="text-base leading-7 text-[#143226]/85">
                <p className="text-[22px] font-bold text-[#143226]">Welcome</p>
              </div>
              <div className="mt-4 space-y-4 text-base leading-7 text-[#143226]/85">
                <p>
                  If you’re here, there’s a good chance content has started to
                  feel heavier than it should.
                </p>

                <p>
                  Maybe you know you want to show up — but every time you open
                  your phone, you feel overwhelmed by advice, trends, and
                  pressure to do more.
                </p>

                <p>
                  I created <em>The Calm Content Guide</em> because I’ve been
                  there too.
                </p>

                <p>
                  I didn’t struggle because I wasn’t capable. I struggled
                  because content had become noisy, complicated, and exhausting.
                </p>

                <p>
                  What changed everything wasn’t learning more.{" "}
                  <strong>It was learning how to simplify.</strong>
                </p>
              </div>

              <div className="mt-8 flex justify-center md:justify-start">
                <a
                  href="/view-the-guide/next"
                  className="inline-flex w-full max-w-md items-center justify-center rounded-md bg-[#143226] px-6 py-3 text-base font-medium text-white shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#143226] focus:ring-offset-2 sm:w-auto sm:max-w-sm"
                >
                  Continue reading
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[650px]">
                <img
                  src="/images/guide-laptop.png"
                  alt="The Calm Content Guide displayed on a laptop screen"
                  className="h-auto w-full shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );

    const ToolsSection = () => (
      <section style={{ backgroundColor: COLORS.LIGHT_CREAM, padding: '0 24px 100px 24px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
          {TOOL_CARDS.map((card) => (
            <div key={card.title} style={{ flex: 1, minWidth: '240px', backgroundColor: '#fff', padding: '24px 20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'left' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '16px', backgroundColor: '#f1f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                {card.icon === 'sparkles' && (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2f5d46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9.813 15.904L9 18l-.813-2.096a4.5 4.5 0 00-2.832-2.832L3 12l2.355-.813a4.5 4.5 0 002.832-2.832L9 6l.813 2.355a4.5 4.5 0 002.832 2.832L15 12l-2.355.813a4.5 4.5 0 00-2.832 2.832z" />
                    <path d="M18 7l.375 1.08A2.25 2.25 0 0019.92 9.625L21 10l-1.08.375a2.25 2.25 0 00-1.545 1.545L18 13l-.375-1.08a2.25 2.25 0 00-1.545-1.545L15 10l1.08-.375a2.25 2.25 0 001.545-1.545L18 7z" />
                  </svg>
                )}
                {card.icon === 'message' && (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2f5d46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 6h14a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 4v-4H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                )}
                {card.icon === 'compass' && (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2f5d46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8l3 4-4 3 1-7z" />
                  </svg>
                )}
                {card.icon === 'signal' && (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2f5d46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12v6" />
                    <path d="M12 9v9" />
                    <path d="M19 6v12" />
                  </svg>
                )}
                {card.icon === 'leaf' && (
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2f5d46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 18c6 0 10-4 10-10 0 0-4 0-7 3-2 2-3 5-3 7z" />
                    <path d="M10 14c1-2 3-3 6-4" />
                  </svg>
                )}
              </div>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#111', margin: 0 }}>{card.title}</p>
              <p style={{ fontSize: '14px', color: '#374151', margin: '8px 0 0 0', lineHeight: '1.5' }}>{card.description}</p>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '10px 0 0 0' }}>Best for: {card.bestFor}</p>
            </div>
          ))}
        </div>
      </section>
    );

    // --- Component for Proven Growth Results Section ---
    const GrowthSection = () => (
        <section style={{ padding: '100px 24px', backgroundColor: COLORS.DARK_GREEN, color: COLORS.TEXT_LIGHT, textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '15px' }}>Proven <span style={{ color: COLORS.ACCENT_YELLOW, fontFamily: 'Georgia, serif' }}>Growth</span> Results</h2>
            <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto 60px auto' }}>
                How Promoto helps businesses grow faster, boost engagement, and achieve measurable results.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', color: COLORS.ACCENT_YELLOW, margin: 0 }}>&#128187;</p> {/* Data & Integration Icon */}
                    <p style={{ fontSize: '16px', fontWeight: '600', marginTop: '10px' }}>Data & integration</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', color: COLORS.ACCENT_YELLOW, margin: 0 }}>&#128075;</p> {/* Journeys Icon */}
                    <p style={{ fontSize: '16px', fontWeight: '600', marginTop: '10px' }}>Journeys</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', color: COLORS.ACCENT_YELLOW, margin: 0 }}>&#128200;</p> {/* Insights & Analytics Icon */}
                    <p style={{ fontSize: '16px', fontWeight: '600', marginTop: '10px' }}>Insights & analytics</p>
                </div>
            </div>
        </section>
    );

    // --- Component for Pricing Section ---
    const PricingSection = () => (
      <section style={{ padding: '100px 24px', backgroundColor: COLORS.LIGHT_CREAM, color: COLORS.TEXT_DARK, textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>Rated 4.9 <span style={{ color: '#10b981' }}>from 700 reviews</span></h2>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '60px' }}>Affordable plans tailored for startups, teams, and enterprises.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {/* Plan Card: Free */}
              <div style={{ flex: 1, minWidth: '300px', maxWidth: '350px', backgroundColor: '#fff', borderRadius: '12px', padding: '30px', borderTop: '4px solid transparent', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '5px' }}>Free</p>
                  <p style={{ fontSize: '40px', fontWeight: '700', marginBottom: '15px' }}>$0.<sub style={{ fontSize: '16px', fontWeight: '400' }}>00<span style={{ fontSize: '12px', color: '#6b7280' }}>/month</span></sub></p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '30px' }}>Best for individuals or small teams exploring automation for the first time.</p>
                  <button style={{ width: '100%', backgroundColor: '#fff', color: COLORS.TEXT_DARK, padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', cursor: 'pointer', fontWeight: '600' }}>Start with free</button>
                  
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginTop: '30px', lineHeight: '2' }}>
                      {['Email & SMS automation', 'Basic segmentation', 'Up to 1,000 contacts', 'Integrations with popular tools', 'Community support'].map((item, i) => (
                          <li key={i} style={{ color: '#4b5563', fontSize: '14px' }}>• {item}</li>
                      ))}
                  </ul>
              </div>
              
              {/* Plan Card: Professional (Most popular) */}
              <div style={{ flex: 1, minWidth: '300px', maxWidth: '350px', backgroundColor: '#fff', borderRadius: '12px', padding: '30px', borderTop: `4px solid ${COLORS.ACCENT_YELLOW}`, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                      <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>Professional</p>
                      <span style={{ backgroundColor: COLORS.ACCENT_YELLOW, color: COLORS.TEXT_DARK, fontSize: '12px', padding: '2px 8px', borderRadius: '9999px', fontWeight: '700' }}>Most popular</span>
                  </div>
                  <p style={{ fontSize: '40px', fontWeight: '700', marginBottom: '15px' }}>$99.<sub style={{ fontSize: '16px', fontWeight: '400' }}>00<span style={{ fontSize: '12px', color: '#6b7280' }}>/month</span></sub></p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '30px' }}>Ideal for growing businesses ready to scale campaigns and boost performance.</p>
                  <button style={{ width: '100%', backgroundColor: COLORS.ACCENT_YELLOW, color: COLORS.TEXT_DARK, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Upgrade to professional</button>
                  
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginTop: '30px', lineHeight: '2' }}>
                      {['Everything in Free', 'Advanced workflows & triggers', 'A/B testing & analytics', 'Up to 10,000 contacts', 'Priority support'].map((item, i) => (
                          <li key={i} style={{ color: '#4b5563', fontSize: '14px' }}>• {item}</li>
                      ))}
                  </ul>
              </div>

              {/* Plan Card: Enterprise */}
              <div style={{ flex: 1, minWidth: '300px', maxWidth: '350px', backgroundColor: '#fff', borderRadius: '12px', padding: '30px', borderTop: '4px solid transparent', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '5px' }}>Enterprise</p>
                  <p style={{ fontSize: '30px', fontWeight: '700', marginBottom: '15px' }}>Custom Pricing</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '30px' }}>Designed for large organizations with complex marketing needs.</p>
                  <button style={{ width: '100%', backgroundColor: COLORS.TEXT_DARK, color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Contact us</button>
                  
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginTop: '30px', lineHeight: '2' }}>
                      {['Everything in Professional', 'Unlimited contacts', 'Dedicated account manager', 'Custom integrations', 'Advanced security & compliance'].map((item, i) => (
                          <li key={i} style={{ color: '#4b5563', fontSize: '14px' }}>• {item}</li>
                      ))}
                  </ul>
              </div>
          </div>
      </section>
    );

    // --- Component for Trusted Logos ---
    const TrustSection = () => (
        <section style={{ padding: '60px 24px', backgroundColor: COLORS.LIGHT_CREAM, textAlign: 'center' }}>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '40px' }}>
              Trusted by 600+ brands worldwide to deliver data-powered communication daily.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
              <span style={{ color: '#6b7280', fontSize: '20px', fontWeight: 'bold' }}>Logoipsum</span>
              <span style={{ color: '#f59e0b', fontSize: '20px', fontWeight: 'bold' }}>Logoipsum</span>
              <span style={{ color: '#10b981', fontSize: '20px', fontWeight: 'bold' }}>Logoipsum</span>
              <span style={{ color: '#3b82f6', fontSize: '20px', fontWeight: 'bold' }}>Logoipsum</span>
              <span style={{ color: '#a855f7', fontSize: '20px', fontWeight: 'bold' }}>Logoipsu</span>
          </div>
        </section>
    );

    // --- Component for FAQ Section ---
    const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
        <div style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 0' }}>
            <button 
                onClick={onClick}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', textAlign: 'left', fontSize: '16px', padding: 0, cursor: 'pointer', color: COLORS.TEXT_DARK }}
            >
                <span>{question}</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <p style={{ color: '#6b7280', paddingTop: '10px', fontSize: '14px' }}>{answer}</p>}
        </div>
    );

    const FAQSection = () => {
        const [openIndex, setOpenIndex] = useState<number | null>(null);
        
        const faqs = [
            { q: "Is there a free plan available?", a: "No credit card is required to start with the Free plan. You can upgrade anytime as your needs grow." },
            { q: "Do I need a credit card to sign up?", a: "No credit card is required to start with the Free plan. You can upgrade anytime as your needs grow." },
            { q: "Can I change or cancel my plan anytime?", a: "Yes, plans can be changed or canceled through your account settings at any time." },
            { q: "What types of businesses use Promoto?", a: "Promoto is used by startups, mid-sized businesses, and large enterprises across various industries." },
            { q: "Do you integrate with other tools I already use?", a: "Yes, we integrate with popular marketing, sales, and CRM tools. Check our integrations page for details." },
            { q: "What kind of support do you provide?", a: "We offer priority support for paid plans and community support for free users." }
        ];

        return (
            <section style={{ padding: '100px 24px', backgroundColor: COLORS.LIGHT_CREAM, textAlign: 'center' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '700', color: COLORS.TEXT_DARK, marginBottom: '40px' }}>Frequently Asked Questions</h2>
                <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    {faqs.map((faq, index) => (
                        <FAQItem 
                            key={index}
                            question={faq.q}
                            answer={faq.a}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </section>
        );
    };
    
    // --- Component for CTA Block ---
    const CTASection = () => (
        <section style={{ padding: '100px 24px', backgroundColor: COLORS.LIGHT_CREAM, textAlign: 'center' }}>
            <div style={{ 
                backgroundColor: '#1f2937', // Dark gray block for CTA card
                padding: '60px', 
                borderRadius: '20px', 
                display: 'inline-block',
                maxWidth: '800px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}>
                <h3 style={{ fontSize: '36px', fontWeight: '700', color: 'white', marginBottom: '10px' }}>One-Click Automation</h3>
                <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '30px' }}>Engage them smarter with automation powered by data.</p>
                <button style={{
                    backgroundColor: COLORS.ACCENT_YELLOW,
                    color: COLORS.TEXT_DARK,
                    padding: '14px 30px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '16px'
                }}>Book a Demo</button>
            </div>
        </section>
    );
    
    // --- Component for Footer ---
    const Footer = () => (
        <footer style={{ backgroundColor: COLORS.DARK_GREEN, color: COLORS.TEXT_LIGHT, padding: '60px 24px 30px 24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', gap: '30px' }}>
                <div style={{ minWidth: '150px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'white' }}>Main Page</h4>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                        {['Home', 'About', 'Features', 'Blog', 'Contact', 'Pricing'].map(item => (
                            <li key={item} style={{ fontSize: '14px', color: '#9ca3af' }}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div style={{ minWidth: '150px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'white' }}>Inner page</h4>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                        {['Blog details', 'Privacy policy', 'Terms & conditions', 'Refund policy', 'Change log'].map(item => (
                            <li key={item} style={{ fontSize: '14px', color: '#9ca3af' }}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div style={{ minWidth: '150px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'white' }}>Utility page</h4>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                        {['License', 'Style Guide', 'Password'].map(item => (
                            <li key={item} style={{ fontSize: '14px', color: '#9ca3af' }}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div style={{ minWidth: '150px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: 'white' }}>Social</h4>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                        {['Facebook', 'LinkedIn', 'Instagram', 'Twitter (X)'].map(item => (
                            <li key={item} style={{ fontSize: '14px', color: '#9ca3af' }}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid #374151', paddingTop: '20px', fontSize: '12px', color: '#6b7280' }}>
                <p>Copyright ©Promoto, All right reserved</p>
                <p style={{ marginTop: '5px' }}>Designed by: Flowze | Powered by: Webflow</p>
            </div>
        </footer>
    );

    // --- The main Page structure assembly ---
    return (
      <div style={{ fontFamily: 'Arial, sans-serif' }}> {/* Default font as a fallback */}
        <HeroSection />
        <ToolsSection />
        <GrowthSection /> 
        <PricingSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    );
}
