"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
            <h1 className="text-3xl font-semibold text-[#143226]">Contact</h1>
            <p className="mt-2 text-sm text-[#475569]">
              Share your question and we will get back to you soon.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Thanks for reaching out. We will reply as soon as we can.
              </div>
            ) : (
              <form
                className="mt-6 grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <label className="text-sm font-medium text-[#143226]" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-[#d8e1d5] bg-white px-3 py-2 text-sm text-[#143226] focus:outline-none focus:ring-2 focus:ring-[#143226]"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#143226]" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-[#d8e1d5] bg-white px-3 py-2 text-sm text-[#143226] focus:outline-none focus:ring-2 focus:ring-[#143226]"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#143226]" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="mt-2 min-h-[140px] w-full rounded-lg border border-[#d8e1d5] bg-white px-3 py-2 text-sm text-[#143226] focus:outline-none focus:ring-2 focus:ring-[#143226]"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#143226] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
