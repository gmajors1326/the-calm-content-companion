"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    bestFor: 'first lines, Reel openers, captions',
    href: '/tools/hook-clarity-analyzer',
    cta: '👉 Try This Tool'
  },
  {
    icon: 'message',
    title: 'Message Positioning Builder',
    description: 'Get clear on what you’re actually about.',
    bestFor: 'niche clarity, bio direction, confidence',
    href: '/tools/message-positioning-builder',
    cta: '👉 Try This Tool'
  },
  {
    icon: 'compass',
    title: 'Content Direction Planner',
    description: 'Stop guessing what to post.',
    bestFor: 'weekly planning, low-energy weeks',
    cta: '👉 Try This Tool',
    href: '/tools/content-direction-planner'
  },
  {
    icon: 'signal',
    title: 'Engagement Signal Interpreter',
    description: 'Understand what your posts are telling you.',
    bestFor: 'improving engagement calmly',
    cta: '👉 Try This Tool',
    href: '/tools/engagement-signal-interpreter'
  },
  {
    icon: 'leaf',
    title: 'Weekly Content Reflection',
    description: 'Grow without burning out.',
    bestFor: 'consistency, confidence, momentum',
    cta: '👉 Try This Tool',
    href: '/tools/weekly-content-reflection'
  }
];

export default function PromotoLandingPage() {

  // --- Component for the main Hero Section ---
  const HeroSection = () => (
    <section
      className="relative w-full py-16 sm:py-20"
      style={{
        backgroundColor: '#b35c3d',
        minHeight: '60vh',
        fontFamily: '"Poster", "Poppins", sans-serif'
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/bg1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.95
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#ffffff] sm:text-[60px]">
            𝐓𝐡𝐞 𝐂𝐚𝐥𝐦 𝐂𝐨𝐧𝐭𝐞𝐧𝐭 𝐆𝐮𝐢𝐝𝐞
          </h1>
          <h2 className="text-[22px] font-medium leading-[26px] text-[#ffffff]" style={{ marginTop: '18px' }}>
            A gentle guide to simplify your content, find a sustainable posting rhythm, and grow without&nbsp;burnout.
          </h2>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div className="text-left md:pl-6">
            <div className="text-base leading-7 text-[#ffffff]">
              <p className="text-[22px] font-bold text-[#ffffff]">Welcome</p>
            </div>
            <div className="mt-3 space-y-4 text-base leading-7 text-[#ffffff]">
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
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[850px]">
              <Image
                src="/images/guide-laptop.png"
                alt="The Calm Content Guide displayed on a laptop screen"
                width={850}
                height={500}
                priority
                className="h-auto w-full"
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
            {card.href ? (
              <Link
                href={card.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginTop: '14px',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  backgroundColor: '#143226',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: '0 6px 14px rgba(20,50,38,0.18)'
                }}
              >
                {card.cta || '👉 Try This Tool'}
              </Link>
            ) : (
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginTop: '14px',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  backgroundColor: '#143226',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'not-allowed',
                  opacity: 0.6,
                  boxShadow: '0 6px 14px rgba(20,50,38,0.18)'
                }}
                disabled
              >
                {card.cta || '👉 Try This Tool'}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  // --- Component for Proven Growth Results Section ---
  const GrowthSection = () => (
    <section style={{ padding: '100px 24px', backgroundColor: COLORS.DARK_GREEN, color: COLORS.TEXT_LIGHT, textAlign: 'center' }}>
      <h2 style={{ fontSize: '44px', fontWeight: '500', margin: 0, lineHeight: '1.2', fontFamily: '"Palmyra", serif', fontStyle: 'italic' }}>
        Take a breath.
        <br />
        You’re exactly where you need to be.
      </h2>
    </section>
  );

  const ChecklistIcon = () => (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" fill={COLORS.DARK_GREEN} stroke={COLORS.DARK_GREEN} strokeWidth="1" />
      <path d="M7 12.5l3 3 7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // --- Component for Intro Section (Image Left, Text Right) ---
  const IntroSection = () => (
    <section style={{ padding: '90px 24px', backgroundColor: COLORS.LIGHT_CREAM, color: COLORS.TEXT_DARK }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <Image
            src="/images/guide-laptop.png"
            alt="Placeholder guide preview"
            width={620}
            height={420}
            className="h-auto w-full"
            style={{ borderRadius: '16px', boxShadow: '0 14px 30px rgba(0,0,0,0.12)' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: '280px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px', color: COLORS.TEXT_DARK }}>
            Start Here
          </h2>
          <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p>For $27, you will have this comprehensive guide about how to create content without burnout.</p>
            <p>This guide is for you if:</p>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
                <span>Posting feels overwhelming or draining</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
                <span>You want to grow online without burnout</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
                <span>You don't want to chase trends or perform for the algorithm</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
                <span>You want a calm, repeatable way to show up consistently</span>
              </li>
            </ul>
            <p>Inside this guide, you won't find hype, hustle, or pressure.</p>
          </div>
        </div>
      </div>
    </section>
  );

  const SecondaryIntroSection = () => (
    <section style={{ padding: '90px 24px', backgroundColor: COLORS.LIGHT_CREAM, color: COLORS.TEXT_DARK }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <Image
            src="/images/guide-laptop.png"
            alt="Placeholder guide preview"
            width={620}
            height={420}
            className="h-auto w-full"
            style={{ borderRadius: '16px', boxShadow: '0 14px 30px rgba(0,0,0,0.12)' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: '280px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '700', marginBottom: '16px', color: COLORS.TEXT_DARK }}>
            A Calm, Clear Path Forward
          </h2>
          <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
                <span>Communicate clearly without sounding salesy</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
                <span>Choose a posting rhythm that fits your energy and life</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
                <span>Reuse simple messages without feeling repetitive</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
                <span>Grow through calm consistency, not constant effort</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  const OutcomeSection = () => (
    <section style={{ padding: '90px 24px', backgroundColor: COLORS.LIGHT_CREAM, color: COLORS.TEXT_DARK }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <Image
            src="/images/guide-laptop.png"
            alt="Guide preview"
            width={620}
            height={420}
            className="h-auto w-full"
            style={{ borderRadius: '16px', boxShadow: '0 14px 30px rgba(0,0,0,0.12)' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: '280px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '700', marginBottom: '16px', color: COLORS.TEXT_DARK }}>
            By the time you finish this guide, you'll walk away with:
          </h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#374151', fontSize: '16px', lineHeight: '1.8' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
              <span>A clear message you know how to repeat</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
              <span>A posting rhythm you can actually sustain</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
              <span>A simple engagement routine that supports growth</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ marginTop: '4px', display: 'inline-flex' }}><ChecklistIcon /></span>
              <span>And the confidence to create content without overthinking</span>
            </li>
          </ul>
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
      {isOpen && (
        <p
          style={{ color: '#6b7280', paddingTop: '10px', fontSize: '14px' }}
          dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br />') }}
        />
      )}
    </div>
  );

  const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
      {
        q: "What comes with The Calm Content Guide?",
        a: "The full Guide plus 5 runs per tool per day unlimited! It's to help you apply the system. No subscription required. <br>What is a run? Our FAQ's explain it."
      },
      {
        q: "Do I need to start with Pro or Elite?",
        a: "Not at all.\n\nMany people start with the Guide, try the tools, and upgrade only if it feels helpful.\n\nYou're not meant to rush."
      },
      {
        q: "What's the difference between the Guide, Pro, and Elite?",
        a: "The Guide teaches the system.\nPro gives you unlimited access to the tools.\nElite adds guidance, interpretation, and direction so you don't have to figure everything out yourself."
      },
      {
        q: "Can I try the tools before paying?",
        a: "Yes.\nGuests can run each tool once to see how it works.\n\nNo email required. No pressure."
      },
      {
        q: "What's a \"run\"?",
        a: "A run is one completed result from a tool.\n\nYou can tweak your inputs and run again when you're ready."
      },
      {
        q: "How many runs do I get before upgrading?",
        a: "Guests: 1 run per tool\n\nGuide owners: 5 runs per tool\n\nPro & Elite: Unlimited runs\n\nYou're never rushed. Use them when it feels helpful."
      },
      {
        q: "Do my runs reset each month?",
        a: "No.\n\nGuide runs are one-time and don't reset.\nIf you want ongoing access, Pro removes limits entirely."
      },
      {
        q: "What happens when I use all my runs?",
        a: "Nothing dramatic.\n\nYou'll simply see an option to upgrade if you want continued access.\nYou can also keep using the Guide without the tools."
      },
      {
        q: "Are the tools limited in Pro?",
        a: "No.\nPro includes unlimited access to all tools.\n\nNo run limits. No timers. No stress."
      },
      {
        q: "What's the difference between Pro and Elite in practice?",
        a: "Pro gives you full access to the tools.\nElite helps you decide what to focus on and what to ignore.\n\nElite adds interpretation, pattern recognition, and direction so you're not left wondering what the results mean."
      },
      {
        q: "Is Elite coaching or a mastermind?",
        a: "No.\nThere are no calls, groups, or pressure.\n\nElite is calm, private, and designed to reduce mental load - not add to it."
      },
      {
        q: "Is Elite for advanced creators only?",
        a: "No.\nElite is for people who are tired of second-guessing - not people chasing advanced tactics.\n\nYou don't need a big audience to benefit."
      },
      {
        q: "Is this another growth-hack system?",
        a: "No.\n\nThis is a calm, sustainable approach to content that prioritizes clarity, consistency, and mental space.\n\nIf you're looking for viral tricks or daily posting pressure, this probably isn't a fit."
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes.\n\nPro and Elite are monthly.\nYou can cancel, upgrade, or downgrade whenever you want.\n\nNo penalties. No awkward emails."
      },
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
        <div style={{ marginTop: '24px' }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 18px',
              borderRadius: '999px',
              backgroundColor: '#143226',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 6px 14px rgba(20,50,38,0.18)'
            }}
          >
            Need more help?
          </Link>
        </div>
      </section>
    );
  };

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
      <IntroSection />
      <SecondaryIntroSection />
      <OutcomeSection />
      <GrowthSection />
      <ToolsSection />
      <PricingSection />
      <TrustSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
