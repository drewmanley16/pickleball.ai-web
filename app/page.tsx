"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

const storyDots = [0, 1, 2];

const ICONS: Record<string, ReactNode> = {
  home: (
    <>
      <path d="M4 11l8-6 8 6" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  play: <path d="M8 5v14l11-7z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  share: (
    <>
      <path d="M12 15V4" />
      <path d="M8 8l4-4 4 4" />
      <path d="M5 12v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
    </>
  ),
  personadd: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M18 8v6M15 11h6" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
  flame: (
    <path d="M12 2c1.2 3-2 4.2-2 7.2a2 2 0 0 0 4 0c0-.6-.2-1.1-.4-1.6 1.8 1 3.4 3 3.4 5.7A5 5 0 0 1 7 13.3C7 8 12 7 12 2z" />
  ),
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 4h11l-2.5 4L17 12H6" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M4 12h16" />
      <rect x="2" y="9" width="3" height="6" rx="1" />
      <rect x="19" y="9" width="3" height="6" rx="1" />
      <rect x="6" y="10.5" width="1.6" height="3" />
      <rect x="16.4" y="10.5" width="1.6" height="3" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.5 6-10a6 6 0 0 0-12 0c0 4.5 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
};

function Ic({ n, fill = false }: { n: string; fill?: boolean }) {
  return (
    <svg
      className="ic"
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[n]}
    </svg>
  );
}

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

  if (status === "success") return <div className={`success-message ${dark ? "" : "light"}`} role="status">You&apos;re on the list. We&apos;ll email your invite when a spot opens.</div>;
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
    return <div className="ios-screen" key="play">
      <div className="ios-header"><b>Play</b><span className="ios-plus">＋</span></div>
      <div className="ios-statbar"><div><b>19</b><small>sessions</small></div><div><b>5.2</b><small>hours</small></div><div><b>W1</b><small>streak</small></div></div>
      <div className="ios-live-card"><i><Ic n="play" fill /></i><div><b>Start a live session</b><small>Log matches and practice as you play</small></div><span>›</span></div>
      <div className="ios-log-grid">
        <div className="ios-log-tile primary"><i><Ic n="flag" /></i><b>Log a Match</b></div>
        <div className="ios-log-tile"><i><Ic n="dumbbell" /></i><b>Log Practice</b></div>
      </div>
      <div className="ios-invite-card"><i><Ic n="pin" /></i><div><b>Invite friends to play</b><small>Tag friends with a court and time, they RSVP</small></div><span>›</span></div>
      <h5>UPCOMING INVITES</h5>
      <div className="ios-invite-item"><i>O</i><div><b>Brentwood Neighborhood Park</b><small>Omar · Wed, Jul 22 at 10:45 PM</small></div><span className="rsvp">No</span></div>
    </div>;
  }
  if (active === 1) {
    return <div className="ios-screen ios-modal" key="match">
      <div className="ios-modal-head"><span className="cancel">Cancel</span><b>Match</b><span className="spacer" /></div>
      <div className="ios-score">
        <div className="ios-score-side win"><small>YOU</small><b>11</b><div className="ios-steppers"><i>−</i><i>+</i></div></div>
        <span className="ios-score-dash">–</span>
        <div className="ios-score-side"><small>THEM</small><b>9</b><div className="ios-steppers"><i>−</i><i>+</i></div></div>
        <div className="ios-win-bar">Win</div>
      </div>
      <p className="ios-field-label">Partners</p>
      <div className="ios-field"><div className="none">None yet</div><div className="add"><Ic n="personadd" /> Add partner</div></div>
      <p className="ios-field-label">Opponents</p>
      <div className="ios-field"><div className="none">None yet</div><div className="add"><Ic n="personadd" /> Add opponent</div></div>
      <div className="ios-save">Save</div>
    </div>;
  }
  return <div className="ios-screen" key="profile">
    <div className="ios-header"><b>drewmanley</b><span className="ios-head-icons"><Ic n="share" /><Ic n="personadd" /><Ic n="gear" /></span></div>
    <div className="ios-profile-row"><i className="ios-avatar" /><div><small>Sessions</small><b>19</b></div><div><small>Followers</small><b>3</b></div><div><small>Following</small><b>3</b></div></div>
    <div className="ios-record">
      <div className="ios-record-head"><b>Record</b><span>Details ›</span></div>
      <div className="ios-record-stats"><div><b>15–3</b><small>Win–Loss</small></div><div><b>83%</b><small>Win rate</small></div><div><b>W1</b><small>Streak</small></div></div>
      <h5>BEST PARTNERS</h5>
      <div className="ios-mini-row"><i>WD</i><b>Wesley Davison</b><span>4–2</span></div>
      <div className="ios-mini-row"><i>O</i><b>Omar</b><span>1–0</span></div>
    </div>
    <div className="ios-record">
      <div className="ios-record-head"><b><Ic n="flame" fill /> Rivals</b><span>See all ›</span></div>
      <div className="ios-rival"><i>WD</i><div><b>Wesley Davison</b><small>You W4 · last 4h ago</small></div><span>4–0</span></div>
    </div>
  </div>;
}

function PhoneUI({ active }: { active: number }) {
  return (
    <>
      <div className="dynamic-island" />
      <div className="phone-status"><span>9:41</span><span>▮▮　◒　▰</span></div>
      <AppScreen active={active} />
      <div className="app-tabs">
        <span><Ic n="home" /><small>Home</small></span>
        <span className={active < 2 ? "selected" : ""}><Ic n="play" fill /><small>Play</small></span>
        <span className={active === 2 ? "selected" : ""}><Ic n="user" /><small>Profile</small></span>
      </div>
      <div className="home-indicator" />
    </>
  );
}

function HeroPhone({ active, className }: { active: number; className: string }) {
  return <div className={`hero-phone ${className}`}><div className="hero-phone-screen"><PhoneUI active={active} /></div></div>;
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
    <section ref={section} className="scroll-story" id="tour">
      <div className="scroll-story-sticky">
      <div className="phone-stage">
        <div className="phone-glow" />
        <div className="iphone-device">
          <i className="side-button side-one"/><i className="side-button side-two"/><i className="side-button side-three"/>
          <div className="iphone-screen"><PhoneUI active={active} /></div>
        </div>
      </div>

      <div className="scroll-story-copy">
        <div className="story-progress"><strong>{active + 1}</strong><span>/ 3</span><div>{storyDots.map((index)=><i key={index} className={index<=active?"filled":""}/>)}</div></div>
        <div className="story-copy-swap" key={active}>
          <span>{active === 0 ? "PLAY" : active === 1 ? "LOG A MATCH" : "PROFILE"}</span>
          <h2>{active === 0 ? "Start a session, rally your crew." : active === 1 ? "Log the score in seconds." : "Watch your record grow."}</h2>
          <p>{active === 0 ? "Kick off a live session, log as you go, and invite friends to a court and time — they RSVP in a tap." : active === 1 ? "Tap in the score, add partners and opponents, mark the win. One shared record, so nobody argues about who won." : "Win rate, streaks, best partners, and the rivals you keep chasing — your whole game in one profile."}</p>
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
          <span className="hero-eyebrow">Private beta · iOS</span>
          <h1><span>Every match</span><span>has a <em>story.</em></span></h1>
          <p className="hero-copy">The app for logging pickleball matches with your crew — scores, rivalries, and stats that actually mean something. Log a match in seconds; everyone leaves with the same record.</p>
          <WaitlistForm />
          <p className="hero-proof">Join the private beta · Launching on iOS · No spam — just one email when your invite is ready. <a href="#tour">See how it works ↓</a></p>
        </div>
        <div className="hero-app-preview" aria-label="Preview of the pickleball.ai app">
          <HeroPhone active={0} className="hero-phone-left" />
          <HeroPhone active={2} className="hero-phone-center" />
          <HeroPhone active={1} className="hero-phone-right" />
        </div>
      </section>

      <section className="manifesto">
        <h2 data-reveal>Pickleball is better<br />when it&apos;s <em>personal.</em></h2>
        <div className="manifesto-grid"><p data-reveal>Not another stat sheet. A living record of the people, places, wins, and wildly disputed line calls that make your game yours.</p></div>
      </section>

      <ScrollStory />

      <section className="numbers">
        <div data-reveal><span>01</span><strong>One score, no arguments</strong><p>Log a match once and everyone&apos;s record matches. No more he-said-she-said about the final score.</p></div>
        <div data-reveal><span>02</span><strong>Know who you actually beat</strong><p>Real win rate, best partners, and the rivals you keep chasing — tracked automatically.</p></div>
        <div data-reveal><span>03</span><strong>Your crew in one place</strong><p>Invites, sessions, and streaks live together instead of scattered across five group chats.</p></div>
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

      <footer><a className="wordmark" href="#top">pickleball<span>.ai</span></a><p>Made for matches that matter.</p><p><a className="footer-legal-link" href="/terms">Terms</a> · <a className="footer-legal-link" href="/privacy">Privacy</a><br />© 2026 pickleball.ai</p></footer>
    </main>
  );
}
