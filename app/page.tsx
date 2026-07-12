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

function AppScreen({ active }: { active: number }) {
  if (active === 0) {
    return <div className="ios-screen" key="home">
      <div className="ios-header"><b>Home⌄</b><span>⌕　♢</span></div>
      <div className="ios-feed-card"><div className="ios-person"><i>DM</i><div><b>Drew Manley</b><small>@drewbydoo · 2h</small></div></div><h4>Saturday crew session</h4><div className="ios-chips"><span>Third-shot drops</span><span>90 min</span></div><p>Finally found the soft reset from transition.</p><div className="ios-actions">♡ 12　◯ 4　↗</div></div>
      <div className="ios-feed-card"><div className="ios-person"><i>AK</i><div><b>Alex Kim</b><small>@alexk · 5h</small></div></div><h4>Riverside rematch</h4><div className="ios-chips"><span>Dinks</span><span>60 min</span></div><p>Friday cannot come soon enough.</p></div>
    </div>;
  }
  if (active === 1) {
    return <div className="ios-screen" key="workout">
      <div className="ios-header"><b>Workout</b><span className="ios-plus">＋</span></div>
      <div className="ios-log-card"><i>◉</i><div><b>Log a session</b><small>Track today&apos;s play and share it</small></div><span>›</span></div>
      <h5>YOUR SESSIONS</h5>
      <div className="ios-session"><i>PB</i><div><b>Saturday crew session</b><small>90 min · Riverside Courts</small></div><span>2h</span></div>
      <div className="ios-session"><i>PB</i><div><b>Kitchen work</b><small>45 min · Eastside Club</small></div><span>2d</span></div>
      <div className="ios-session"><i>PB</i><div><b>Friday rematch</b><small>75 min · Riverside Courts</small></div><span>5d</span></div>
    </div>;
  }
  return <div className="ios-screen" key="profile">
    <div className="ios-header"><b>drewbydoo</b><span>↗　⚙</span></div>
    <div className="ios-profile-row"><i>DM</i><div><small>Sessions</small><b>8</b></div><div><small>Followers</small><b>24</b></div><div><small>Following</small><b>18</b></div></div>
    <div className="ios-activity"><div><b>3.5</b><small> hours this week</small></div><div className="ios-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="ios-toggle"><b>Duration</b><span>Sessions</span></div></div>
    <h5>DASHBOARD</h5><div className="ios-dashboard"><span>↗ Statistics</span><span>▣ Gear</span><span>♙ Measures</span></div>
  </div>;
}

function HeroPhone({ active, className }: { active: number; className: string }) {
  return <div className={`hero-phone ${className}`}>
    <div className="hero-phone-screen">
      <div className="dynamic-island" />
      <div className="phone-status"><span>9:41</span><span>▮▮　◒　▰</span></div>
      <AppScreen active={active} />
      <div className="app-tabs"><span className={active===0?"selected":""}>⌂<small>Home</small></span><span className={active===1?"selected":""}>◎<small>Workout</small></span><span className={active===2?"selected":""}>●<small>Profile</small></span></div>
      <div className="home-indicator" />
    </div>
  </div>;
}

function ScrollStory() {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!section.current) return;
      const rect = section.current.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(0.999, -rect.top / distance));
      setActive(Math.min(2, Math.floor(progress * 3)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <section ref={section} className="scroll-story">
      <div className="scroll-story-sticky">
      <div className="phone-stage">
        <div className="phone-glow" />
        <div className="iphone-device">
          <i className="side-button side-one"/><i className="side-button side-two"/><i className="side-button side-three"/>
          <div className="iphone-screen">
            <div className="dynamic-island" />
            <div className="phone-status"><span>9:41</span><span>▮▮　◒　▰</span></div>
            <AppScreen active={active} />
            <div className="app-tabs"><span className={active===0?"selected":""}>⌂<small>Home</small></span><span className={active===1?"selected":""}>◎<small>Workout</small></span><span className={active===2?"selected":""}>●<small>Profile</small></span></div>
            <div className="home-indicator" />
          </div>
        </div>
      </div>

      <div className="scroll-story-copy">
        <div className="story-progress"><strong>{active + 1}</strong><span>/ 3</span><div>{stories.map((_,index)=><i key={index} className={index<=active?"filled":""}/>)}</div></div>
        <div className="story-copy-swap" key={active}>
          <span>{active === 0 ? "HOME" : active === 1 ? "WORKOUT" : "PROFILE"}</span>
          <h2>{active === 0 ? "Your crew, in one feed." : active === 1 ? "Log every session." : "See your game grow."}</h2>
          <p>{active === 0 ? "Follow friends, celebrate their sessions, and keep every rematch in the same place." : active === 1 ? "Track duration, focus, location, and the one takeaway you want to remember next time." : "Activity, stats, gear, measures, and your full session history — all unmistakably yours."}</p>
        </div>
      </div>
      <span className="keep-scrolling">Keep scrolling <b>↓</b></span>
      </div>
    </section>
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
          <h1><span>Every match</span><span>has a <em>story.</em></span></h1>
          <p className="hero-copy">Log the score. Tag your crew. Track the rivalries that keep you coming back.</p>
          <div className="hero-actions">
            <a className="app-store-link" href="https://apps.apple.com/" target="_blank" rel="noreferrer" aria-label="Download pickleball.ai on the App Store">
              <span className="apple-mark" aria-hidden="true"></span><span><small>Download on the</small><strong>App Store</strong></span>
            </a>
            <a className="early-access-link" href="#join">Join early access <span>↘</span></a>
          </div>
        </div>
        <div className="hero-app-preview" aria-label="Preview of the pickleball.ai app">
          <HeroPhone active={0} className="hero-phone-left" />
          <HeroPhone active={1} className="hero-phone-center" />
          <HeroPhone active={2} className="hero-phone-right" />
        </div>
      </section>

      <section className="manifesto">
        <h2 data-reveal>Pickleball is better<br />when it&apos;s <em>personal.</em></h2>
        <div className="manifesto-grid"><p data-reveal>Not another stat sheet. A living record of the people, places, wins, and wildly disputed line calls that make your game yours.</p></div>
      </section>

      <ScrollStory />

      <section className="numbers">
        <div data-reveal><span>01</span><strong>One shared match</strong><p>No duplicate logging. Everyone leaves with the same score.</p></div>
        <div data-reveal><span>02</span><strong>Real friend stats</strong><p>Know your best partner, toughest rival, and longest streak.</p></div>
        <div data-reveal><span>03</span><strong>Always social</strong><p>Your crew&apos;s wins, sessions, and rematches live in one feed.</p></div>
      </section>

      <section className="quote-strip">
        <div className="court-panel" aria-hidden="true"><span /><span /><i /></div>
        <blockquote data-reveal>“Wait, what was<br />the score?”<span>Never again.</span></blockquote>
      </section>

      <section className="final-cta" id="join">
        <div className="final-orbit" aria-hidden="true"><span>JOIN THE CREW · JOIN THE CREW · </span></div>
        <div data-reveal><h2>Bring your crew.<br /><em>We&apos;ll keep score.</em></h2><p>Join the private beta and be first on the court.</p></div>
        <div data-reveal><WaitlistForm dark={false} /></div>
      </section>

      <footer><a className="wordmark" href="#top">pickleball<span>.ai</span></a><p>Made for matches that matter.</p><p>© 2026 pickleball.ai</p></footer>
    </main>
  );
}
