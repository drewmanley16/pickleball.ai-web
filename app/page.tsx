"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

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
  thumb: (
    <>
      <path d="M7 10v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
      <path d="M7 10l4.5-7a2 2 0 0 1 2.8 2.4L13 10h5.2a2 2 0 0 1 2 2.4l-1.3 6A2 2 0 0 1 16.9 22H7" />
    </>
  ),
  comment: <path d="M4 5h16v11H9l-5 4z" />,
  share: (
    <>
      <path d="M12 15V4" />
      <path d="M8 8l4-4 4 4" />
      <path d="M5 12v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
    </>
  ),
  repost: (
    <>
      <path d="M4 9l3-3 3 3" />
      <path d="M7 6v8a2 2 0 0 0 2 2h8" />
      <path d="M20 15l-3 3-3-3" />
      <path d="M17 18v-8a2 2 0 0 0-2-2H7" />
    </>
  ),
  dots: (
    <>
      <circle cx="5" cy="12" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="19" cy="12" r="1.4" />
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
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
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
      strokeWidth="1.7"
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

function WaitlistForm({ light = false, id = "email" }: { light?: boolean; id?: string }) {
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
      if (!response.ok) throw new Error();
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success")
    return (
      <div className={`success-message ${light ? "light" : ""}`} role="status">
        You&apos;re on the list. We&apos;ll email your invite when a spot opens.
      </div>
    );

  return (
    <div className="signup-wrap">
      <form className={`signup-form ${light ? "light" : ""}`} onSubmit={submit}>
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Get early access"}
          <span aria-hidden="true">↗</span>
        </button>
      </form>
      {status === "error" && (
        <p className="form-error" role="alert">
          Couldn&apos;t join yet. Try again.
        </p>
      )}
    </div>
  );
}

/* ————————————————————————————————————————————————
   App screens — mirrors the real iOS app (true black,
   optic-green accent, soft squircle cards, social feed).
   ———————————————————————————————————————————————— */

function FeedCard({
  name,
  handle,
  when,
  title,
  meta,
  team,
  teamScore,
  opp,
  oppScore,
  result,
  takeaway,
  likes,
  comments,
}: {
  name: string;
  handle: string;
  when: string;
  title: string;
  meta: string;
  team: string;
  teamScore: number;
  opp: string;
  oppScore: number;
  result: "win" | "loss";
  takeaway: string;
  likes: number;
  comments: number;
}) {
  return (
    <div className="feed-card">
      <div className="feed-head">
        <i className="feed-avatar" />
        <div className="feed-id">
          <b>{name}</b>
          <small>
            @{handle} · {when}
          </small>
        </div>
        <span className="feed-dots">
          <Ic n="dots" />
        </span>
      </div>
      <div className="feed-title">{title}</div>
      <div className="feed-meta">{meta}</div>
      <div className="scorecard">
        <div className={`score-row ${result}`}>
          <i className="rail" />
          <span className="dots-pile">
            <em />
            <em />
          </span>
          <span className="score-names">{team}</span>
          <b>{teamScore}</b>
        </div>
        <div className="score-row muted">
          <i className="rail" />
          <span className="dots-pile">
            <em />
            <em />
          </span>
          <span className="score-names">{opp}</span>
          <b>{oppScore}</b>
        </div>
      </div>
      <p className="feed-takeaway">{takeaway}</p>
      <div className="feed-actions">
        <span>
          <Ic n="thumb" /> {likes}
        </span>
        <span>
          <Ic n="comment" /> {comments}
        </span>
        <span>
          <Ic n="share" />
        </span>
        <span className="repost">
          <Ic n="repost" /> Repost
        </span>
      </div>
    </div>
  );
}

function AppScreen({ active }: { active: number }) {
  if (active === 0)
    return (
      <div className="ios-screen feed" key="home">
        <div className="ios-header">
          <b>Home</b>
          <span className="ios-head-icons">
            <Ic n="bell" />
            <Ic n="personadd" />
          </span>
        </div>
        <FeedCard
          name="Drew Manley"
          handle="drewmanley"
          when="2h"
          title="Tuesday Night at Riverside"
          meta="Third-shot drops · 1h 12m"
          team="You, Wes"
          teamScore={11}
          opp="Omar, Jordan"
          oppScore={9}
          result="win"
          takeaway="Drops finally landing at the kitchen line."
          likes={12}
          comments={3}
        />
        <FeedCard
          name="Wes Davison"
          handle="wesd"
          when="5h"
          title="Lunch rally"
          meta="Singles · 48m"
          team="Wes"
          teamScore={8}
          opp="You"
          oppScore={11}
          result="loss"
          takeaway="Rematch tomorrow. This isn't over."
          likes={7}
          comments={5}
        />
      </div>
    );

  if (active === 1)
    return (
      <div className="ios-screen ios-modal" key="match">
        <div className="ios-modal-head">
          <span className="cancel">Cancel</span>
          <b>Match</b>
          <span className="spacer" />
        </div>
        <div className="ios-score">
          <div className="ios-score-side win">
            <small>YOU</small>
            <b>11</b>
            <div className="ios-steppers">
              <i>−</i>
              <i>+</i>
            </div>
          </div>
          <span className="ios-score-dash">–</span>
          <div className="ios-score-side">
            <small>THEM</small>
            <b>9</b>
            <div className="ios-steppers">
              <i>−</i>
              <i>+</i>
            </div>
          </div>
          <div className="ios-win-bar">Win</div>
        </div>
        <p className="ios-field-label">Partners</p>
        <div className="ios-field">
          <div className="none">None yet</div>
          <div className="add">
            <Ic n="personadd" /> Add partner
          </div>
        </div>
        <p className="ios-field-label">Opponents</p>
        <div className="ios-field">
          <div className="none">None yet</div>
          <div className="add">
            <Ic n="personadd" /> Add opponent
          </div>
        </div>
        <div className="ios-save">Save</div>
      </div>
    );

  return (
    <div className="ios-screen" key="profile">
      <div className="ios-header">
        <b>drewmanley</b>
        <span className="ios-head-icons">
          <Ic n="share" />
          <Ic n="gear" />
        </span>
      </div>
      <div className="ios-profile-row">
        <i className="ios-avatar" />
        <div>
          <small>Sessions</small>
          <b>19</b>
        </div>
        <div>
          <small>Followers</small>
          <b>34</b>
        </div>
        <div>
          <small>Following</small>
          <b>28</b>
        </div>
      </div>
      <div className="ios-record">
        <div className="ios-record-head">
          <b>Record</b>
          <span>Details ›</span>
        </div>
        <div className="ios-record-stats">
          <div>
            <b>15–3</b>
            <small>Win–Loss</small>
          </div>
          <div>
            <b>83%</b>
            <small>Win rate</small>
          </div>
          <div>
            <b>W4</b>
            <small>Streak</small>
          </div>
        </div>
        <h5>BEST PARTNERS</h5>
        <div className="ios-mini-row">
          <i>WD</i>
          <b>Wes Davison</b>
          <span>6–2</span>
        </div>
        <div className="ios-mini-row">
          <i>O</i>
          <b>Omar</b>
          <span>4–1</span>
        </div>
      </div>
      <div className="ios-record">
        <div className="ios-record-head">
          <b>
            <Ic n="flame" fill /> Rivals
          </b>
          <span>See all ›</span>
        </div>
        <div className="ios-rival">
          <i>WD</i>
          <div>
            <b>Wes Davison</b>
            <small>You W4 · last 4h ago</small>
          </div>
          <span>4–0</span>
        </div>
      </div>
    </div>
  );
}

function PhoneUI({ active }: { active: number }) {
  return (
    <>
      <div className="dynamic-island" />
      <div className="phone-status">
        <span>9:41</span>
        <span>▮▮ ◒ ▰</span>
      </div>
      <AppScreen active={active} />
      <div className="app-tabs">
        <span className={active === 0 ? "selected" : ""}>
          <Ic n="home" fill />
          <small>Home</small>
        </span>
        <span className={active === 1 ? "selected" : ""}>
          <Ic n="play" fill />
          <small>Play</small>
        </span>
        <span className={active === 2 ? "selected" : ""}>
          <Ic n="user" fill />
          <small>Profile</small>
        </span>
      </div>
      <div className="home-indicator" />
    </>
  );
}

function Phone({ active, className }: { active: number; className?: string }) {
  return (
    <div className={`phone ${className ?? ""}`}>
      <i className="side-button side-one" />
      <i className="side-button side-two" />
      <i className="side-button side-three" />
      <div className="phone-screen">
        <PhoneUI active={active} />
      </div>
    </div>
  );
}

const SHOWCASE = [
  {
    active: 0,
    tag: "HOME",
    title: "A feed of your crew's matches",
    copy: "Every session your friends log lands in one feed — scores, streaks, and rivalries. Like, comment, and repost the wins.",
  },
  {
    active: 1,
    tag: "LOG A MATCH",
    title: "Score in seconds",
    copy: "Tap in the score, add partners and opponents, mark the win. One shared record, so nobody argues about who won.",
  },
  {
    active: 2,
    tag: "PROFILE",
    title: "Watch your record grow",
    copy: "Win rate, streaks, best partners, and the rivals you keep chasing — your whole game in one profile.",
  },
];

export default function Home() {
  useReveal();

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav">
          <a className="wordmark" href="#top">
            picl<span>r</span>
          </a>
          <a className="nav-cta" href="#join">
            Join the beta <span>↗</span>
          </a>
        </nav>
        <div className="hero-content">
          <h1>
            <span>Every match</span>
            <span>
              has a <em>story.</em>
            </span>
          </h1>
          <p className="hero-copy">
            The app for logging pickleball with your crew — scores, rivalries, and stats that actually
            mean something. Log a match in seconds; everyone leaves with the same record.
          </p>
          <WaitlistForm id="hero-email" />
          <p className="hero-proof">
            <a href="#tour">See how it works ↓</a>
          </p>
        </div>
        <div className="hero-app-preview" aria-label="Preview of the piclr app">
          <Phone active={2} className="phone-side phone-left" />
          <Phone active={0} className="phone-center" />
          <Phone active={1} className="phone-side phone-right" />
        </div>
      </section>

      <section className="showcase" id="tour">
        <h2 data-reveal>
          Pickleball is better<br />when it&apos;s <em>personal.</em>
        </h2>
        <p className="showcase-lede" data-reveal>
          Not another stat sheet. A living record of the people, places, wins, and wildly disputed line
          calls that make your game yours.
        </p>
        <div className="showcase-grid">
          {SHOWCASE.map((item) => (
            <div className="showcase-item" data-reveal key={item.active}>
              <div className="showcase-phone">
                <Phone active={item.active} />
              </div>
              <span className="showcase-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta" id="join">
        <div data-reveal>
          <h2>
            Bring your crew.<br />
            <em>We&apos;ll keep score.</em>
          </h2>
          <p>Join the private beta and be first on the court.</p>
        </div>
        <div data-reveal>
          <WaitlistForm light id="footer-email" />
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">
          picl<span>r</span>
        </a>
        <p>Made for matches that matter.</p>
        <p>
          <a className="footer-legal-link" href="/terms">
            Terms
          </a>{" "}
          ·{" "}
          <a className="footer-legal-link" href="/privacy">
            Privacy
          </a>
          <br />© 2026 piclr
        </p>
      </footer>
    </main>
  );
}
