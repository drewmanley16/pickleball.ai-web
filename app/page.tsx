"use client";

import { FormEvent, useState } from "react";

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Could not join waitlist");
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={`signup-wrap ${compact ? "compact" : ""}`}>
      {status === "success" ? (
        <div className="success-message" role="status">
          You&apos;re in. We&apos;ll see you on the court.
        </div>
      ) : (
        <form className="signup-form" onSubmit={submit}>
          <label className="sr-only" htmlFor={compact ? "email-bottom" : "email-hero"}>
            Email address
          </label>
          <input
            id={compact ? "email-bottom" : "email-hero"}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Joining..." : "Get early access"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="form-error" role="alert">Something went wrong. Try again.</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="pickleball.ai home">
            pickleball<span>.ai</span>
          </a>
          <a className="nav-cta" href="#join">Join the beta</a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">The social logbook for pickleball</p>
          <h1>Every match<br />has a story.</h1>
          <p className="hero-copy">
            Log the score. Tag your crew. Track the rivalries that keep you coming back.
          </p>
          <WaitlistForm />
          <p className="form-note">Private beta for iPhone. No spam, ever.</p>
        </div>

        <a className="scroll-cue" href="#product" aria-label="See the app">
          <span>See the app</span><span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="statement" id="product">
        <p className="eyebrow">Built for the group chat</p>
        <h2>Your crew. Your record.<br />Your game.</h2>
        <p>
          pickleball.ai turns every session into something worth remembering, from casual
          games with friends to the rematch everyone has been talking about.
        </p>
      </section>

      <section className="product-showcase">
        <div className="phone" aria-label="Preview of the pickleball.ai activity feed">
          <div className="phone-status"><span>9:41</span><span>●●●</span></div>
          <div className="app-head"><strong>Home</strong><span className="app-avatar">DM</span></div>
          <div className="week-label">THIS WEEK</div>
          <div className="app-stats">
            <div><b>8</b><span>Matches</span></div>
            <div><b>63%</b><span>Win rate</span></div>
          </div>
          <div className="feed-label">CREW ACTIVITY</div>
          <div className="feed-card">
            <div className="feed-avatar">DM</div>
            <div><b>Drew &amp; Will won</b><span>11–8, 7–11, 11–6</span><small>Riverside Courts · 2h</small></div>
          </div>
          <div className="feed-card muted-card">
            <div className="feed-avatar alt">AK</div>
            <div><b>Alex logged a session</b><span>Dinks &amp; third-shot drops</span><small>45 min · Today</small></div>
          </div>
          <div className="app-tabs"><span>Home</span><span>＋</span><span>Profile</span></div>
        </div>

        <div className="benefits">
          <div className="benefit"><span>01</span><h3>Log it together.</h3><p>Scores, partners, opponents, location. One shared match record for everyone who played.</p></div>
          <div className="benefit"><span>02</span><h3>Make it social.</h3><p>Follow friends, celebrate wins, and keep your crew&apos;s activity in one feed.</p></div>
          <div className="benefit"><span>03</span><h3>Watch your game grow.</h3><p>See sessions, trends, gear, and the people who bring out your best pickleball.</p></div>
        </div>
      </section>

      <section className="final-cta" id="join">
        <div>
          <p className="eyebrow">First serve is yours</p>
          <h2>Bring your crew.</h2>
          <p>Join the private beta and be first on the court.</p>
        </div>
        <WaitlistForm compact />
      </section>

      <footer>
        <a className="wordmark" href="#top">pickleball<span>.ai</span></a>
        <p>Made for matches that matter.</p>
        <p>© 2026 pickleball.ai</p>
      </footer>
    </main>
  );
}
