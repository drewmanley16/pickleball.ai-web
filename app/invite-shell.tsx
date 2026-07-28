import Link from "next/link";
import type { ReactNode } from "react";

const APP_STORE_URL = "https://apps.apple.com/app/id6790183272";

/**
 * Shared chrome for universal-link landing pages (/u/[id], /squad/[code]).
 * These render only when Universal Links didn't hand off to the installed
 * app — someone without piclr yet, or an edge case where the OS didn't
 * match the Associated Domains entitlement. `openURL` retries the
 * pickleballai:// custom scheme (works if the app is installed but the
 * universal-link match failed); "Get the App" always falls back to the
 * App Store listing.
 */
export function InviteShell({
  kicker,
  title,
  subtitle,
  openURL,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  openURL: string;
  children?: ReactNode;
}) {
  return (
    <main className="invite">
      <nav className="invite-nav">
        <Link href="/" className="wordmark">
          picl<span>r</span>
        </Link>
      </nav>
      <div className="invite-card">
        <p className="invite-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="invite-subtitle">{subtitle}</p>
        {children}
        <div className="invite-actions">
          <a className="invite-cta invite-cta-primary" href={APP_STORE_URL}>
            Get the App
          </a>
          <a className="invite-cta invite-cta-secondary" href={openURL}>
            Open in piclr
          </a>
        </div>
      </div>
    </main>
  );
}
