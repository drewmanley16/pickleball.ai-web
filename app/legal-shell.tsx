import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared chrome for legal pages (Terms of Use, Privacy Policy). Keeps the
 * hosted copies consistent with the in-app copies bundled in the iOS app
 * (LegalText in PickleballAI/ProfileSheets.swift). The iOS sign-up gate and
 * Settings link here via Legal.termsURL / Legal.privacyURL.
 */
export function LegalShell({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <main className="legal">
      <nav className="legal-nav">
        <Link href="/" className="wordmark">
          pickleball<span>.ai</span>
        </Link>
        <Link href="/" className="legal-back">
          ← Back
        </Link>
      </nav>
      <article className="legal-body">
        <h1>{title}</h1>
        <p className="legal-date">Effective date: {effectiveDate}</p>
        {children}
      </article>
    </main>
  );
}
