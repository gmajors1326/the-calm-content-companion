"use client";

import { useEffect, useState } from 'react';

// Define colors based on image analysis and layout.tsx background
const COLORS = {
  DARK_GREEN: '#1c3125', // Matches body background in layout.tsx
  LIGHT_CREAM: '#fffaf0', // Background for content sections in image (Warmer Cream)
  ACCENT_YELLOW: '#f5c300', // Highlight color from pricing tag and 'Growth'
  TEXT_DARK: '#111827', // Near-black for primary text on light backgrounds
  TEXT_LIGHT: '#e5e7eb', // Light text color for dark backgrounds
};

const ROTATING_WORDS = [
    'Unrushed',
    'Sustainable',
    'Steady',
    'Intentional',
    'Grounded',
    'Simple',
    'Consistent'
];
const FALLBACK_WORD = 'Sustainable';
const ROTATION_TIMING = {
    fadeInMs: 500,
    holdMs: 1800,
    fadeOutMs: 400,
    gapMs: 200
};
const ROTATION_TOTAL_MS =
    ROTATION_TIMING.fadeInMs +
    ROTATION_TIMING.holdMs +
    ROTATION_TIMING.fadeOutMs +
    ROTATION_TIMING.gapMs;

export default function PromotoLandingPage() {
    const [wordIndex, setWordIndex] = useState(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => setPrefersReducedMotion(media.matches);
        updatePreference();

        if (media.addEventListener) {
            media.addEventListener('change', updatePreference);
            return () => media.removeEventListener('change', updatePreference);
        }

        media.addListener(updatePreference);
        return () => media.removeListener(updatePreference);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        }, ROTATION_TOTAL_MS);

        return () => clearInterval(intervalId);
    }, [prefersReducedMotion]);
    
    // --- Component for the main Hero Section ---
    const HeroSection = () => (
      <section style={{ 
          backgroundColor: COLORS.LIGHT_CREAM, 
          padding: '70px 24px 80px 24px', 
          textAlign: 'center',
          color: COLORS.TEXT_DARK
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ 
                fontSize: '52px', 
                fontWeight: '700', 
                lineHeight: '1.2',
                marginBottom: '14px',
                color: '#059669' // Darker green for H2 text
            }}>A{' '}
                {prefersReducedMotion ? (
                    <span style={{ display: 'inline-block' }}>{FALLBACK_WORD}</span>
                ) : (
                    <span
                        key={wordIndex}
                        className="rotating-word"
                        style={{ animationDuration: `${ROTATION_TOTAL_MS}ms` }}
                    >
                        {ROTATING_WORDS[wordIndex]}
                    </span>
                )}{' '}
                Way to Show Up <span style={{ fontFamily: '"Bigtime", "Poppins", sans-serif' }}>Online.</span></h2>
            <p style={{
                color: '#111827',
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '1.6',
                maxWidth: '680px',
                margin: '0 auto 24px auto'
            }}>
                Start with the Calm Content Companion — a simple, gentle guide that helps you know what to post (even when life is full).
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button style={{
                    backgroundColor: COLORS.DARK_GREEN,
                    color: '#fdfaf3',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '16px',
                    transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = '#2f4a3a';
                }}
                onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = COLORS.DARK_GREEN;
                }}>Start Your Free Trial</button>
            </div>
        </div>
        
        {/* Placeholder for image/stats block below hero text, structured similarly to image */}
        <div style={{ marginTop: '120px', display: 'flex', justifyContent: 'center', gap: '25px', maxWidth: '1300px', margin: '120px auto 0 auto', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, backgroundColor: '#fff', padding: '30px 20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                <p style={{ fontSize: '56px', fontWeight: '700', color: '#111', margin: 0 }}>5M</p>
                <p style={{ fontSize: '16px', color: '#6b7280', margin: '4px 0 0 0' }}>revenue last year</p>
                <div style={{ marginTop: '20px', fontSize: '24px', color: '#9ca3af' }}>Clover</div>
            </div>

            <div style={{ flex: 1, backgroundColor: '#fff', padding: '30px 20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                <p style={{ fontSize: '16px', color: '#0f766e', margin: '0 0 5px 0' }}>Analytics + Conversion Goals</p>
                <p style={{ fontSize: '56px', fontWeight: '700', color: '#059669', margin: 0 }}>2.5M <span style={{ fontSize: '22px', color: '#10b981' }}>+88.4%</span></p>
                <div style={{ marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
                        <li>• One-click integration</li>
                        <li>• Personalized Automation</li>
                        <li>• Complete data sync</li>
                        <li>• 24/7 expert support</li>
                        <li>• Easy migration</li>
                    </ul>
                </div>
            </div>
            <div style={{ flex: 1, minWidth: '240px', backgroundColor: '#fff', padding: '24px 20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111', margin: 0 }}>Placeholder Card</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>Short supporting copy goes here.</p>
            </div>
            <div style={{ flex: 1, minWidth: '240px', backgroundColor: '#fff', padding: '24px 20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111', margin: 0 }}>Tools Placeholder</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>Short supporting copy goes here.</p>
            </div>
            <div style={{ flex: 1, minWidth: '240px', backgroundColor: '#fff', padding: '24px 20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111', margin: 0 }}>Placeholder Card</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>Short supporting copy goes here.</p>
            </div>
            <div style={{ flex: 1, minWidth: '240px', backgroundColor: '#fff', padding: '24px 20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111', margin: 0 }}>Placeholder Card</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>Short supporting copy goes here.</p>
            </div>
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
        <GrowthSection /> 
        <PricingSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    );
}
