# Folio

**An AI-native second brain** — capture ideas the moment you have them, wherever you have them, and let AI resurface them when they're actually useful.

> Status: Active development (Phase 4 — monetization) · Built solo by [@yourhandle](https://github.com/yourhandle)

---

## The problem

Good ideas show up at the worst times — mid-conversation on WhatsApp, as a voice memo while walking, buried in an email thread, or in a link you send yourself and never open again. They get lost because capturing them is friction, and even when captured, nothing brings them back at the right moment.

## What Folio does

Folio is a lightweight capture layer that sits across the places you already think out loud:

- **Capture from anywhere** — WhatsApp messages, voice memos, email, and shared links feed into one place
- **AI-structured, not just stored** — content is parsed and organized automatically instead of dumped into a flat notes list
- **Contextual resurfacing** — Folio brings ideas back when they're relevant, instead of leaving them to rot in a search bar
- **Built for actually re-reading, not just archiving**

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend / Framework | Next.js (App Router) | Fast iteration, server components for AI calls |
| Database / Auth | Supabase (Mumbai region) | Low-latency for India-first user base |
| AI — primary | Groq (Llama 3.3 70B) | Speed for real-time capture parsing |
| AI — fallback | Google Gemini | Redundancy when primary API is unavailable |
| Payments | Razorpay | India-market-first, replaced Stripe for local support |

## Architecture (high level)

```
Input sources (WhatsApp / Voice / Email / Links)
        │
        ▼
  Capture layer (Next.js API routes)
        │
        ▼
  AI parsing & structuring (Groq → Gemini fallback)
        │
        ▼
  Supabase (storage + auth)
        │
        ▼
  Resurfacing engine → Web app
```

## Roadmap

- [x] Phase 1 — Landing page & waitlist
- [x] Phase 2 — MVP web app
- [x] Phase 3 — Mobile-first capture flow
- [ ] Phase 4 — Monetization (Razorpay integration) *(in progress)*
- [ ] Phase 5 — Multi-source contextual resurfacing at scale

## Getting started

```bash
git clone https://github.com/yourhandle/folio.git
cd folio
npm install
cp .env.example .env.local   # add your Supabase, Groq, and Gemini keys
npm run dev
```

### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GROQ_API_KEY=
GEMINI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

## About this project

Folio started from a simple pain point: sending myself things I never came back to. It's built solo, end to end — product decisions, architecture, and implementation — and was submitted to Google Gemini's **Fund My Crazy 2026** contest (Education category), framed as a city-scale shared learning memory layer.

## License

MIT (or update to your preference)
