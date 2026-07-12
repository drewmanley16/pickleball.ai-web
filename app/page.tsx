"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const stories = [
  { score: "11–8", title: "Log the match", kicker: "You & Will beat Alex & Sam", detail: "Riverside Courts · 3 games", accent: "W" },
  { score: "🔥 4", title: "Keep the rivalry alive", kicker: "Four straight against Alex", detail: "Rematch requested for Friday", accent: "VS" },
  { score: "+42", title: "See your game grow", kicker: "Minutes played this month", detail: "8 sessions · 63% win rate", accent: "UP" },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function ScrollBall() {
  const ball = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const x = 50 + Math.sin(progress * Math.PI * 6.2) * 38;
      const y = 14 + progress * 70 + Math.abs(Math.sin(progress * Math.PI * 10)) * -8;
      ball.current?.style.setProperty("transform", `translate3d(${x}vw, ${y}vh, 0) rotate(${progress * 1200}deg)`);
      ball.current?.style.setProperty("opacity", progress < 0.03 || progress > 0.96 ? "0" : "1");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ball} className="scroll-ball" aria-hidden="true"><i /><i /><i /><i /><i /></div>;
}

function WaitlistForm({ dark = true }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error();
      setEmail(""); setStatus("success");
    } catch { setStatus("error"); }
  }

  if (status === "success") return <div className={`success-message ${dark ? "" : "light"}`} role="status">You&apos;re in. See you on the court.</div>;
  return (
    <div className="signup-wrap">
      <form className={`signup-form ${dark ? "" : "light"}`} onSubmit={submit}>
        <label className="sr-only" htmlFor={dark ? "hero-email" : "footer-email"}>Email address</label>
        <input id={dark ? "hero-email" : "footer-email"} type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining..." : "Get early access"}<span aria-hidden="true">↗</span></button>
      </form>
      {status === "error" && <p className="form-error" role="alert">Couldn&apos;t join yet. Try again.</p>}
    </div>
  );
}

function ProductCarousel() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % stories.length), 4800);
    return () => window.clearInterval(interval);
  }, []);

  const move = (direction: number) => setActive((current) => (current + direction + stories.length) % stories.length);
  const story = stories[active];

  return (
    <div className="carousel-shell" onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={(e) => {
      if (touchStart.current === null) return;
      const distance = e.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
      touchStart.current = null;
    }}>
      <div className="phone-stage">
        <div className="phone-glow" />
        <div className="phone">
          <div className="phone-status"><span>9:41</span><span>●●●</span></div>
          <div className="app-head"><strong>{active === 0 ? "Home" : active === 1 ? "Rivalries" : "Profile"}</strong><span className="app-avatar">DM</span></div>
          <div className="story-screen" key={active}>
            <span className="story-accent">{story.accent}</span>
            <p>{story.title}</p>
            <strong>{story.score}</strong>
            <h3>{story.kicker}</h3>
            <small>{story.detail}</small>
            <div className="mini-chart"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="app-tabs"><span>Home</span><b>＋</b><span>Profile</span></div>
        </div>
      </div>

      <div className="carousel-copy">
        <p className="eyebrow">One app. Every match.</p>
        <div className="slide-number">0{active + 1} <span>/ 03</span></div>
        <h2>{story.title}<br /><em>with your crew.</em></h2>
        <p>{active === 0 ? "Scores, partners, opponents, and courts. One shared record for everyone who played." : active === 1 ? "Head-to-head history turns friendly competition into the reason you book the next court." : "Sessions, trends, gear, and milestones make improvement feel visible without turning play into homework."}</p>
        <div className="carousel-controls">
          <button onClick={() => move(-1)} aria-label="Previous feature">←</button>
          <div className="carousel-dots">{stories.map((_, index) => <button key={index} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show feature ${index + 1}`} />)}</div>
          <button onClick={() => move(1)} aria-label="Next feature">→</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useReveal();

  return (
    <main>
      <ScrollBall />
      <section className="hero" id="top">
        <nav className="nav"><a className="wordmark" href="#top">pickleball<span>.ai</span></a><a className="nav-cta" href="#join">Join the beta <span>↗</span></a></nav>
        <div className="hero-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">The social logbook for pickleball</p>
          <h1><span>Every match</span><span>has a <em>story.</em></span></h1>
          <p className="hero-copy">Log the score. Tag your crew. Track the rivalries that keep you coming back.</p>
          <WaitlistForm />
          <p className="form-note">Private beta for iPhone · No spam, ever</p>
        </div>
        <div className="hero-badge"><span>63%</span><small>crew win rate</small></div>
        <a className="scroll-cue" href="#ticker"><span>Scroll to rally</span><b>↓</b></a>
      </section>

      <section className="ticker" id="ticker" aria-label="Match activity">
        <div className="ticker-track">
          {[0, 1].map((copy) => <div className="ticker-set" key={copy} aria-hidden={copy === 1}><span>DREW &amp; WILL WON 11–8</span><b>●</b><span>REMATCH FRIDAY</span><b>●</b><span>8 MATCHES THIS WEEK</span><b>●</b><span>RIVERSIDE CREW</span><b>●</b></div>)}
        </div>
      </section>

      <section className="manifesto">
        <p className="eyebrow" data-reveal>The group chat, upgraded.</p>
        <h2 data-reveal>Pickleball is better<br />when it&apos;s <em>personal.</em></h2>
        <div className="manifesto-grid">
          <p data-reveal>Not another stat sheet. A living record of the people, places, wins, and wildly disputed line calls that make your game yours.</p>
          <div className="orbit" data-reveal aria-hidden="true"><span>PLAY</span><span>LOG</span><span>SHARE</span><i /></div>
        </div>
      </section>

      <section className="carousel-section" data-reveal><ProductCarousel /></section>

      <section className="numbers">
        <div data-reveal><span>01</span><strong>One shared match</strong><p>No duplicate logging. Everyone leaves with the same score.</p></div>
        <div data-reveal><span>02</span><strong>Real friend stats</strong><p>Know your best partner, toughest rival, and longest streak.</p></div>
        <div data-reveal><span>03</span><strong>Always social</strong><p>Your crew&apos;s wins, sessions, and rematches live in one feed.</p></div>
      </section>

      <section className="quote-strip">
        <div className="quote-photo" role="img" aria-label="Friends reviewing a match on a pickleball court" />
        <blockquote data-reveal>“Wait, what was<br />the score?”<span>Never again.</span></blockquote>
      </section>

      <section className="final-cta" id="join">
        <div className="final-orbit" aria-hidden="true"><span>JOIN THE CREW · JOIN THE CREW · </span></div>
        <div data-reveal><p className="eyebrow">First serve is yours</p><h2>Bring your crew.<br /><em>We&apos;ll keep score.</em></h2><p>Join the private beta and be first on the court.</p></div>
        <div data-reveal><WaitlistForm dark={false} /></div>
      </section>

      <footer><a className="wordmark" href="#top">pickleball<span>.ai</span></a><p>Made for matches that matter.</p><p>© 2026 pickleball.ai</p></footer>
    </main>
  );
}
