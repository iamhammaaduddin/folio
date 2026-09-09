"use client";

import { useEffect, useRef, useState } from "react";
import "./folio.css";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  // Close drawer on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Smooth-scroll with sticky-nav offset for in-page anchor links
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };
    root.addEventListener("click", handler);
    return () => root.removeEventListener("click", handler);
  }, []);

  // Fade-in on scroll for cards
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(
      ".step-card, .feat-card, .testi-card, .price-card"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(22px)";
      (el as HTMLElement).style.transition =
        "opacity .55s ease, transform .55s ease";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="folio-landing" ref={rootRef}>


<nav>
  <div className="container nav-inner">
    <a href="/" className="nav-logo">Folio<span>.</span></a>

    <ul className="nav-links">
      <li><a href="#how">How it works</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
    </ul>

    <div className="nav-actions">
      <a href="/signin" className="nav-signin">Sign in</a>
      <a href="/signup" className="btn btn-dark">Sign Up</a>
    </div>

    <div className="nav-hamburger" onClick={openDrawer} aria-label="Open menu">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>


<div className={`mobile-drawer${drawerOpen ? " open" : ""}`}>
  <div className="drawer-overlay" onClick={closeDrawer}></div>
  <div className="drawer-panel">
    <button className="drawer-close" onClick={closeDrawer}>✕</button>
    <a href="#how"      onClick={closeDrawer}>How it works</a>
    <a href="#features" onClick={closeDrawer}>Features</a>
    <a href="#pricing"  onClick={closeDrawer}>Pricing</a>
    <a href="/signin"   onClick={closeDrawer}>Sign in</a>
    <a href="/signup" className="btn btn-primary" style={{justifyContent: 'center'}}>Sign Up Free</a>
  </div>
</div>



<section className="hero">
  <div className="container hero-grid">

    <div className="hero-content">
      <span className="label-eyebrow">Your second brain, finally</span>
      <h1 className="section-title">
        Stop losing ideas you<br/>
        <em className="accent">WhatsApp'd</em> yourself
      </h1>
      <p className="hero-sub">
        You scatter brilliant thoughts across 11 apps every day. Folio brings them all together, organises them with AI, and resurfaces the right one exactly when you need it.
      </p>
      <div className="hero-actions">
        <a href="/signup" className="btn btn-primary btn-lg">Start for free</a>
        <a href="#pricing" className="btn btn-secondary btn-lg">View Pricing</a>
      </div>
      <p className="hero-note">No credit card required &nbsp;·&nbsp; 2-minute setup</p>
    </div>

    
    <div className="hero-visual">
      <div className="phone">
        <div className="phone-notch"></div>
        <div className="phone-label">Folio inbox</div>

        <div className="capture-item">
          <div className="ci-icon" style={{background: '#1a2e1a'}}>💬</div>
          <div className="ci-body">
            <div className="ci-source">WhatsApp · Saved Messages</div>
            <div className="ci-text">"What if we gamified the onboarding? Quest system that unlocks features."</div>
            <span className="ci-tag tag-idea">💡 Idea</span>
          </div>
        </div>

        <div className="capture-item">
          <div className="ci-icon" style={{background: '#2e1a1a'}}>✉️</div>
          <div className="ci-body">
            <div className="ci-source">Email · Myself</div>
            <div className="ci-text">Article: The science of deep work — save for weekend</div>
            <span className="ci-tag tag-read">📖 Read later</span>
          </div>
        </div>

        <div className="capture-item">
          <div className="ci-icon" style={{background: '#1a1e2e'}}>🎙️</div>
          <div className="ci-body">
            <div className="ci-source">Voice memo · 2 am</div>
            <div className="ci-text">"Build a tool for people who send notes to themselves…"</div>
            <span className="ci-tag tag-idea">💡 Idea</span>
          </div>
        </div>

        <div className="capture-item">
          <div className="ci-icon" style={{background: '#2a1e10'}}>🔗</div>
          <div className="ci-body">
            <div className="ci-source">Saved link · Safari</div>
            <div className="ci-text">Ergotron LX monitor arm — ₹18,500 Amazon</div>
            <span className="ci-tag tag-buy">🛒 Buy</span>
          </div>
        </div>

        <div className="phone-bar">
          <div className="pb-item"><span>📥</span><span>Inbox</span></div>
          <div className="pb-item"><span>🔍</span><span>Search</span></div>
          <div className="pb-item"><span>✨</span><span>Today</span></div>
          <div className="pb-item"><span>🗂</span><span>Topics</span></div>
        </div>
      </div>
    </div>

  </div>
</section>



<div className="proof-strip">
  <div className="container proof-inner">
    <div className="avatars">
      <div className="avatar" style={{background: '#D4522A'}}>R</div>
      <div className="avatar" style={{background: '#4A6FA5'}}>S</div>
      <div className="avatar" style={{background: '#2a7a4a'}}>A</div>
      <div className="avatar" style={{background: '#8B4A9E'}}>P</div>
      <div className="avatar" style={{background: '#C4882A'}}>M</div>
    </div>
    <p className="proof-text">Join <strong>2,400+ people</strong> building a second brain that actually works.</p>
    <div className="proof-divider"></div>
    <p className="proof-text">⭐️ <strong>4.9 / 5</strong> from early users</p>
    <div className="proof-divider"></div>
    <p className="proof-text">🚀 Loved by founders, writers &amp; PMs</p>
  </div>
</div>



<section className="problem">
  <div className="container">
    <span className="label-eyebrow">The problem</span>
    <h2 className="section-title">
      Your best ideas are<br/><em className="accent">already captured.</em><br/>You just can't find them.
    </h2>
    <p className="problem-sub">
      Every day you scatter fragments of brilliant thinking across a dozen apps. None of them talk to each other. None of them remind you. You end up rediscovering your own ideas six months too late.
    </p>

    <div className="scatter">
      <span className="scatter-tag">💬 <strong>WhatsApp</strong> Saved Messages</span>
      <span className="scatter-tag">✉️ <strong>Emails</strong> to yourself</span>
      <span className="scatter-tag">🎙️ <strong>Voice memos</strong> at 2 am</span>
      <span className="scatter-tag">📸 <strong>Screenshots</strong> of tweets</span>
      <span className="scatter-tag">🔖 <strong>Browser</strong> bookmarks</span>
    </div>

    <div className="problem-stat-block">
      <span className="problem-stat-n">73%</span>
      <span className="problem-stat-l">of self-sent notes are never looked at again.<br/>Not because they weren't valuable — because they were <em>unfindable.</em></span>
    </div>
  </div>
</section>



<section className="how" id="how">
  <div className="container">
    <div className="how-header">
      <span className="label-eyebrow">How it works</span>
      <h2 className="section-title">Three steps.<br/>One second brain.</h2>
      <p className="how-sub">No new habits required. Folio works around how you already think.</p>
    </div>

    <div className="steps-grid">
      <div className="step-card">
        <div className="step-num">01</div>
        <div className="step-icon">📡</div>
        <h3>Capture from anywhere</h3>
        <p>Forward an email. Share from WhatsApp. Drop a voice memo. Paste a link. Folio ingests everything without changing a single habit.</p>
      </div>
      <div className="step-card">
        <div className="step-num">02</div>
        <div className="step-icon">🧠</div>
        <h3>AI organises silently</h3>
        <p>Every item is auto-tagged by topic, intent, and urgency. Long articles get a three-line summary. Voice memos are transcribed and filed instantly.</p>
      </div>
      <div className="step-card">
        <div className="step-num">03</div>
        <div className="step-icon">⚡</div>
        <h3>Resurfaces at the right moment</h3>
        <p>Starting a new project? Folio surfaces related notes you forgot you had. A daily digest shows you what's actually worth your attention today.</p>
      </div>
    </div>
  </div>
</section>



<section className="features" id="features">
  <div className="container">
    <div className="features-header">
      <span className="label-eyebrow">Features</span>
      <h2 className="section-title">Everything your scattered notes<br/>wish they could do</h2>
    </div>

    <div className="features-grid">
      <div className="feat-card">
        <div className="feat-icon">🌐</div>
        <h3>Universal Inbox</h3>
        <p>One place for ideas from WhatsApp, email, voice, screenshots and links. Every source. Zero friction.</p>
      </div>
      <div className="feat-card">
        <div className="feat-icon">🤖</div>
        <h3>AI Tagging &amp; Summaries</h3>
        <p>Every note is auto-tagged by topic, intent, and priority. Long articles become three-line summaries. Voice notes are transcribed the moment they arrive.</p>
      </div>
      <div className="feat-card">
        <div className="feat-icon">🔍</div>
        <h3>Natural Language Search</h3>
        <p>Ask "what did I want to buy last month?" or "ideas about my startup" — Folio finds it even if you don't remember the exact words you used.</p>
      </div>
      <div className="feat-card">
        <div className="feat-icon">⏰</div>
        <h3>Smart Resurface</h3>
        <p>Read-later items surface on your commute. Buy items reappear before payday. Folio figures out when the moment is actually right.</p>
      </div>
      <div className="feat-card">
        <div className="feat-icon">🔗</div>
        <h3>Connection Engine</h3>
        <p>Folio spots when two notes captured months apart are related — and connects them before you even realise you needed to.</p>
      </div>
      <div className="feat-card">
        <div className="feat-icon">🔒</div>
        <h3>Private by Default</h3>
        <p>Your second brain is yours alone. End-to-end encrypted, never used to train AI models, never sold to advertisers. Full stop.</p>
      </div>
    </div>
  </div>
</section>



<section className="testimonials">
  <div className="container">
    <div className="testi-header">
      <span className="label-eyebrow">Early users</span>
      <h2 className="section-title">They stopped losing ideas.<br/>So will you.</h2>
    </div>

    <div className="testi-grid">
      <div className="testi-card">
        <div className="testi-stars">★★★★★</div>
        <p className="testi-quote">"I WhatsApp myself 5–8 times a day. My Saved Messages was 3,000 items deep and completely useless. Folio turned that black hole into the most useful thing on my phone."</p>
        <div className="testi-author">
          <strong>Rohan M.</strong>
          <span>Product Manager, Bangalore</span>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-stars">★★★★★</div>
        <p className="testi-quote">"I had the same startup idea three separate times before I found it buried in my old notes. Six months of thinking, wasted. Folio would have surfaced it on day two."</p>
        <div className="testi-author">
          <strong>Shreya K.</strong>
          <span>Founder, Mumbai</span>
        </div>
      </div>
      <div className="testi-card">
        <div className="testi-stars">★★★★★</div>
        <p className="testi-quote">"My best ideas happen at 2 am when my hands are busy. Voice memo into Folio, and it's tagged, summarised, and waiting for me when I sit down to write. This is the tool I didn't know I needed."</p>
        <div className="testi-author">
          <strong>Arjun T.</strong>
          <span>Writer, Delhi</span>
        </div>
      </div>
    </div>
  </div>
</section>



<section className="pricing" id="pricing">
  <div className="container">
    <div className="pricing-header">
      <span className="label-eyebrow">Pricing</span>
      <h2 className="section-title">Simple pricing.<br/>No brain tax.</h2>
      <p>Start free. Upgrade when your second brain gets serious.</p>
    </div>

    <div className="pricing-grid">

      
      <div className="price-card">
        <p className="price-plan">Free</p>
        <div className="price-amount">
          <span className="price-currency">₹</span>
          <span className="price-number">0</span>
        </div>
        <p className="price-period" style={{color: 'var(--muted)'}}>forever free</p>
        <ul className="price-features">
          <li>100 captures per month</li>
          <li>Whatsapp, Email &amp; link capture</li>
          <li>Basic AI tagging</li>
          <li>Standard search</li>
          <li>7-day resurface window</li>
          <li>End-to-end encryption</li>
        </ul>
        <a href="/signup" className="btn btn-secondary" style={{justifyContent: 'center'}}>Sign Up Free</a>
      </div>

      
      <div className="price-card featured">
        <div className="popular-badge">Most Popular</div>
        <p className="price-plan">Pro</p>
        <div className="price-amount">
          <span className="price-currency">₹</span>
          <span className="price-number" style={{color: 'var(--paper)'}}>299</span>
          <span className="price-period">/mo</span>
        </div>
        <p className="price-period">billed monthly · cancel anytime</p>
        <ul className="price-features">
          <li>Unlimited captures</li>
          <li>All sources incl. WhatsApp &amp; voice memos</li>
          <li>Full AI tagging, summaries &amp; connections</li>
          <li>Natural language AI search</li>
          <li>Smart resurface engine</li>
          <li>Infinite memory — nothing ever deleted</li>
          <li>End-to-end encryption</li>
        </ul>
        <a href="/signup?plan=pro" className="btn btn-primary" style={{justifyContent: 'center'}}>Start Pro Trial</a>
      </div>

    </div>
  </div>
</section>



<section className="final-cta">
  <div className="container" style={{textAlign: 'center'}}>
    <h2 className="section-title">
      Your next great idea<br/>deserves to <em className="accent">survive</em><br/>the morning.
    </h2>
    <p>Join 2,400+ people who stopped losing the thoughts that matter.</p>
    <a href="/signup" className="btn btn-primary btn-lg">Sign Up Now — It's Free</a>
  </div>
</section>



<footer>
  <div className="container footer-inner">
    <div className="footer-logo">Folio<span>.</span></div>
    <p className="footer-copy">© 2026 Folio. All rights reserved.</p>
    <div className="footer-links">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </div>
  </div>
</footer>

    </div>
  );
}
