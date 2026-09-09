# Folio — Your Second Brain

**Stop losing ideas you WhatsApp'd yourself.**

You scatter brilliant thoughts across a dozen apps every day. Folio brings them all together, organises them with AI, and resurfaces the right one exactly when you need it.

!\[Folio hero](./assets/screenshot-hero.png)

> Status: Active development (Phase 4 — Build the Folio web app (User Dashboard)) · Built solo by \\\[@iamhammaaduddin](https://github.com/iamhammaaduddin)

\---

## The problem

Your best ideas are already captured — you just can't find them. Every day you scatter fragments of brilliant thinking across a dozen apps. None of them talk to each other. None of them remind you. You end up rediscovering your own ideas six months too late.

**73% of self-sent notes are never looked at again** — not because they weren't valuable, but because they were unfindable.

!\[The problem Folio solves](./assets/screenshot-problem.png)

## How it works

Three steps. One second brain. No new habits required — Folio works around how you already think.

1. **Capture from anywhere** — Forward an email. Share from WhatsApp. Drop a voice memo. Paste a link. Folio ingests everything without changing a single habit.
2. **AI organises silently** — Every item is auto-tagged by topic, intent, and urgency. Long articles get a three-line summary. Voice memos are transcribed and filed instantly.
3. **Resurfaces at the right moment** — Starting a new project? Folio surfaces related notes you forgot you had. A daily digest shows you what's actually worth your attention today.

## Features

!\[Folio feature grid](./assets/screenshot-features.png)

* **Universal Inbox** — One place for ideas from WhatsApp, email, voice, screenshots and links. Every source. Zero friction.
* **AI Tagging \& Summaries** — Every note auto-tagged by topic, intent, and priority. Long articles become three-line summaries. Voice notes transcribed the moment they arrive.
* **Natural Language Search** — Ask "what did I want to buy last month?" and Folio finds it, even if you don't remember the exact words you used.
* **Smart Resurface** — Read-later items surface on your commute. Buy items reappear before payday.
* **Connection Engine** — Folio spots when two notes captured months apart are related, and connects them before you realise you needed it.
* **Private by Default** — End-to-end encrypted. Never used to train AI models. Never sold to advertisers.

## Tech stack

|Layer|Choice|Why|
|-|-|-|
|Frontend / Framework|Next.js (App Router)|Fast iteration, server components for AI calls|
|Database / Auth|Supabase (Mumbai region)|Low-latency for India-first user base|
|AI — primary|Groq (Llama 3.3 70B)|Speed for real-time capture parsing|
|AI — fallback|Google Gemini|Redundancy when primary API is unavailable|
|Payments|Razorpay|India-market-first, replaced Stripe for local support|

## Architecture (high level)

```
Input sources (WhatsApp / Voice / Email / Links)
        │
        ▼
  Capture layer (Next.js API routes)
        │
        ▼
  AI parsing \\\& structuring (Groq → Gemini fallback)
        │
        ▼
  Supabase (storage + auth)
        │
        ▼
  Resurfacing engine → Web app
```

## Roadmap

* \[x] Phase 1 — Project Foundation setup
* \[x] Phase 2 — Built WhatsApp webhook
* \[x] Phase 3 — Connect Twilio WhatsApp
* \[ ] Phase 4 — Build the Folio web app (User Dashboard) *(in progress)*
* \[ ] Phase 5 — Monetization (Razorpay integration) 
* \[ ] Phase 6 — Multi-source contextual resurfacing at scale

## Getting started

```bash
git clone https://github.com/iamhammaaduddin/folio.git
cd folio
npm install
cp .env.example .env.local   # add your Supabase, Groq, and Gemini keys
npm run dev
```

### Environment variables

```
NEXT\\\_PUBLIC\\\_SUPABASE\\\_URL=
NEXT\\\_PUBLIC\\\_SUPABASE\\\_ANON\\\_KEY=
GROQ\\\_API\\\_KEY=
GEMINI\\\_API\\\_KEY=
RAZORPAY\\\_KEY\\\_ID=
RAZORPAY\\\_KEY\\\_SECRET=
```

## About this project

Folio started from a simple pain point: sending myself things I never came back to. It's built solo, end to end — product, design, and implementation — and was submitted to Google Gemini's **Fund My Crazy 2026** contest (Education category), framed as a city-scale shared learning memory layer.

## License

All rights reserved. This code is shared publicly for portfolio and demonstration purposes only. No permission is granted to copy, modify, or redistribute without explicit consent.



