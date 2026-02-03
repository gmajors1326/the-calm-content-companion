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
    title: 'Find Your Message',
    subline: 'Clarity before consistency.',
    description: 'Answer a few simple questions and walk away knowing what you’re trying to say — and who you’re saying it for.',
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
            𝐓𝐡𝐞 𝐂𝐚𝐥𝐦 𝐂𝐨𝐧𝐭𝐞𝐧𝐭 𝐌𝐞𝐭𝐡𝐨𝐝 𝐆𝐮𝐢𝐝𝐞
            <span style={{ fontSize: '18px', marginLeft: '6px' }}>(TM)</span>
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
                I created <em>The Calm Content Method Guide</em> because I’ve been
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
    <section style={{ backgroundColor: COLORS.LIGHT_CREAM, padding: '90px 24px 120px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto 42px auto', textAlign: 'center', fontFamily: '"Poster", "Poppins", sans-serif' }}>
        <h2
          className="text-4xl font-bold tracking-tight sm:text-[60px]"
          style={{
            color: '#355e3b',
            margin: '20px 0 8px 0'
          }}
        >
          𝐓𝐡𝐞 𝐂𝐚𝐥𝐦 𝐂𝐨𝐧𝐭𝐞𝐧𝐭 𝐂𝐨𝐦𝐩𝐚𝐧𝐢𝐨𝐧
          <span style={{ fontSize: '18px', marginLeft: '6px' }}>(TM)</span>
          <br />
          <br />
        </h2>
        <p style={{ fontSize: '18px', fontWeight: '600', color: COLORS.TEXT_DARK, margin: '0 0 10px 0' }}>
          Small tools that support the system helping you apply{' '}
          <span style={{ fontFamily: '"Glyph", "Poppins", sans-serif' }}>
            The Calm Content Guide
          </span>{' '}
          with clarity and confidence.
        </p>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px', alignItems: 'stretch', justifyItems: 'center' }}>
        {TOOL_CARDS.map((card) => (
          <div key={card.title} style={{ width: '100%', maxWidth: '270px', backgroundColor: '#fff', padding: '26px 22px', borderRadius: '18px', boxShadow: '0 12px 28px rgba(0,0,0,0.08)', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
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
            {card.subline && (
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', margin: '4px 0 0 0' }}>{card.subline}</p>
            )}
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
      <p
        style={{
          margin: '24px auto 0',
          maxWidth: '860px',
          fontSize: '18px',
          lineHeight: '1.7',
          fontFamily: '"Poppins", sans-serif',
          color: COLORS.TEXT_LIGHT,
          whiteSpace: 'pre-line',
          textAlign: 'left'
        }}
      >
        Once you understand the{' '}
        <span style={{ fontFamily: '"Palmyra", serif', fontStyle: 'italic', fontSize: '30px', color: COLORS.TEXT_LIGHT }}>
          Calm Content Method
        </span>
        , something important begins to shift. You stop questioning what to do and start noticing where you still hesitate. The uncertainty becomes quieter, but it doesn’t disappear entirely.
        <br />
        <br />
        You may still catch yourself thinking:{' '}
        <span style={{ fontFamily: '"Palmyra", serif', fontStyle: 'italic', fontSize: '30px', color: COLORS.TEXT_LIGHT }}>
          Does this hook actually make sense?
        </span>{' '}
        I know my message... but how do I express it today?{' '}
        <span style={{ fontFamily: '"Palmyra", serif', fontStyle: 'italic', fontSize: '30px', color: COLORS.TEXT_LIGHT }}>
          Why does this still feel harder than it should after every post?
        </span>
        <br />
        <br />
        <span style={{ fontFamily: '"Palmyra", serif', fontStyle: 'italic', fontSize: '30px', color: COLORS.TEXT_LIGHT }}>
          This isn’t a lack of clarity.
        </span>{' '}
        It’s the mental friction that shows up when you’re applying a system in real life. And that’s exactly why the
        next piece exists.
      </p>
    </section>
  );

  const FreebieSection = () => (
    <section
      style={{
        padding: '90px 24px',
        backgroundColor: COLORS.LIGHT_CREAM,
        color: COLORS.TEXT_DARK
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          alignItems: 'center',
          gap: '40px'
        }}
      >
        <div style={{ textAlign: 'left', fontFamily: '"Poppins", sans-serif' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: '#f1f5f0',
              color: '#2f5d46',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            Freebie Guide
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '14px 0 12px 0' }}>
            The Calm Content Starter
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151', margin: 0 }}>
            A gentle way to begin posting on Instagram without pressure. Start small, build clarity, and let your message
            grow at a pace that feels sustainable.
          </p>
          <ul style={{ margin: '18px 0 0 18px', padding: 0, color: '#374151', lineHeight: '1.8' }}>
            <li>Slow growth</li>
            <li>Clear messaging</li>
            <li>No pressure</li>
          </ul>
          <div style={{ marginTop: '22px' }}>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 18px',
                borderRadius: '999px',
                border: '1px solid #143226',
                backgroundColor: '#143226',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 6px 14px rgba(20,50,38,0.18)'
              }}
            >
              Get the Freebie
            </button>
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>Instant access.</p>
          </div>
        </div>
        <div />
      </div>
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

  const TOOLBOX_TOOLS = [
    'Hook Clarity Analyzer',
    'Message Positioning Builder',
    'Content Direction Planner',
    'Engagement Signal Interpreter',
    'Weekly Content Reflection'
  ];

  const PricingCard = ({
    badge,
    title,
    price,
    description,
    includes,
    toolboxLabel,
    cta,
    finePrint,
    highlight
  }: {
    badge: string;
    title: string;
    price: string;
    description: string;
    includes: string[];
    toolboxLabel: string;
    cta: string;
    finePrint: string;
    highlight?: boolean;
  }) => (
    <div
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)] ${
        highlight ? 'border-[#a3e635] shadow-[0_16px_32px_rgba(0,0,0,0.08)]' : 'border-[#e5e7eb]'
      }`}
      style={{
        fontFamily: '"Poppins", sans-serif',
        ...(highlight
          ? {
              border: '3px solid #00ff00',
              transform: 'translateY(-8px) scale(1.03)',
              boxShadow: '0 24px 44px rgba(15,42,30,0.22), 0 0 42px rgba(163,230,53,0.45)'
            }
          : {
              border: '2px solid #00ff00'
            })
      }}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#f1f5f0] px-3 py-1 text-xs font-semibold text-[#2f5d46]">
          {badge}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-[#143226]">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-[#111827]">{price}</p>
      <p className="mt-3 text-sm text-[#475569]">{description}</p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Includes</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#475569]">
          {includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-dashed border-[#e5e7eb] pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">{toolboxLabel}</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TOOLBOX_TOOLS.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center justify-center rounded-full border border-[#e5e7eb] bg-[#f8fafc] px-3 py-1 text-xs font-medium text-[#475569]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
            highlight
              ? 'bg-[#143226] text-white hover:bg-[#0f251c]'
              : 'border border-[#d1d5db] bg-white text-[#143226] hover:border-[#143226]'
          }`}
        >
          {cta}
        </button>
        <p className="mt-2 text-xs text-[#6b7280]">{finePrint}</p>
      </div>
    </div>
  );

  // --- Component for Pricing Section ---
  const PricingSection = () => (
    <section style={{ padding: '100px 24px', backgroundColor: COLORS.DARK_GREEN, color: COLORS.TEXT_LIGHT }}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center" style={{ fontFamily: '"Poppins", sans-serif' }}>
          <h2 className="font-semibold text-white" style={{ fontSize: '61px' }}>𝐏𝐫𝐢𝐜𝐢𝐧𝐠</h2>
          <p className="mt-3 text-[#e5e7eb]" style={{ fontSize: '20px', lineHeight: '26px' }}>
            Choose the level of support you want — start with the Guide, and upgrade only if it feels helpful.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PricingCard
            badge="Freebie"
            title="The Calm Content Starter"
            price="Free"
            description="A gentle way to begin posting on Instagram."
            includes={[
              'Slow growth',
              'Clear messaging',
              'No pressure'
            ]}
            toolboxLabel="Included in your starter kit:"
            cta="Get the Freebie"
            finePrint="Instant access."
          />
          <PricingCard
            badge="One-time"
            title="The Calm Content Guide"
            price="$27"
            description="A clear, grounded system to simplify your content and show up consistently without overwhelm."
            includes={[
              'Full access to The Calm Content Guide',
              'Personal account',
              '5 runs per tool to help you apply what you learn'
            ]}
            toolboxLabel="Toolbox access included (limited runs):"
            cta="Get the Guide"
            finePrint="No subscription required."
          />

          <PricingCard
            badge="Most Popular"
            title="Pro"
            price="$37 / month"
            description="The Guide plus unlimited access to the toolbox for steady, ongoing support — without pressure or noise."
            includes={[
              'Full access to The Calm Content Guide',
              'Unlimited runs on all tools',
              'Saved results history',
              'Built for consistent weekly use'
            ]}
            toolboxLabel="Includes the full Calm Content Toolbox:"
            cta="Start Pro"
            finePrint="Cancel anytime."
            highlight
          />

          <PricingCard
            badge="Guided"
            title="Elite"
            price="$147 / month"
            description="The Guide, unlimited tools, plus direction and interpretation so you don’t have to figure it all out alone."
            includes={[
              'Full access to The Calm Content Guide',
              'Everything in Pro',
              'Direction-first Elite home experience (not just a tool grid)',
              'Interpretation layer after tool results (“what it means”, “what to ignore”, “what to focus on”)',
              'Pattern insights across time (gentle, calm)'
            ]}
            toolboxLabel="Everything in the toolbox, plus guidance:"
            cta="Go Elite"
            finePrint="Cancel anytime."
          />
        </div>

        <div className="mt-12 rounded-2xl border border-[#e5e7eb] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">FAQ</p>
          <div className="mt-4 grid gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[#143226]">
                What do I get when I buy The Calm Content Guide?
              </h3>
              <p className="mt-1 text-sm text-[#475569]">
                You get full access to The Calm Content Guide plus 5 runs per tool to help you apply the system. No subscription required.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#143226]">What’s a “run”?</h3>
              <p className="mt-1 text-sm text-[#475569]">
                A run is one complete use of a tool — you enter your input and receive the insight.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#143226]">Can I try the tools before paying?</h3>
              <p className="mt-1 text-sm text-[#475569]">Yes. Guests can run each tool once.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#143226]">What do I get with Pro?</h3>
              <p className="mt-1 text-sm text-[#475569]">
                Pro includes The Calm Content Guide plus unlimited access to all five tools. It’s built for steady, ongoing support.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#143226]">
                If Pro is unlimited, what makes Elite different?
              </h3>
              <p className="mt-1 text-sm text-[#475569]">
                Pro gives you tools. Elite adds direction, interpretation, and pattern insights so you don’t have to second-guess what matters.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#143226]">
                Will there be more tools in the future, and will the Guide be updated?
              </h3>
              <p className="mt-1 text-sm text-[#475569]">
                Possibly. Tools are added carefully only when they support clarity. The Guide evolves over time, and updates are included with your purchase.
              </p>
            </div>
          </div>
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
        q: "Do I need to start with Pro or Elite?",
        a: "Not at all.\n\nMany people start with the Guide, try the tools, and upgrade only if it feels helpful.\n\nYou're not meant to rush."
      },
      {
        q: "What's the difference between the Guide, Pro, and Elite?",
        a: "The Guide teaches the system.\nPro gives you unlimited access to the tools.\nElite adds guidance, interpretation, and direction so you don't have to figure everything out yourself."
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
        q: "Will there be more tools available in the future?",
        a: "Possibly - but only if they genuinely support clarity and calm.\n\nNew tools aren't added to increase volume or chase trends.\nThey're added carefully, when they make the system simpler or more supportive.\n\nPro and Elite members automatically get access to new tools when they're released."
      },
      {
        q: "Will The Calm Content Guide be updated?",
        a: "Yes.\n\nThe Guide evolves as the system improves.\nWhen you purchase the Guide, you receive updates at no extra cost.\n\nThe core philosophy stays the same - clarity just gets sharper over time."
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
      <FreebieSection />
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
