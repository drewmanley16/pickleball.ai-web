import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Terms of Use — pickleball.ai",
  description: "The terms that govern your use of pickleball.ai.",
};

const EFFECTIVE_DATE = "[PLACEHOLDER — set before launch]";
const SUPPORT_EMAIL = "[PLACEHOLDER — support email]";

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Use" effectiveDate={EFFECTIVE_DATE}>
      <p>
        Welcome to pickleball.ai (&quot;the App&quot;). These Terms of Use (&quot;Terms&quot;) are a legal
        agreement between you and pickleball.ai (&quot;we&quot;, &quot;us&quot;). By creating an account or using
        the App, you agree to these Terms. If you do not agree, do not use the App.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old to use the App. If you are under the age of majority where
        you live, you may only use the App with the involvement of a parent or guardian.
      </p>

      <h2>2. Your account</h2>
      <p>
        You sign in with your phone number and a one-time code. You are responsible for activity on
        your account and for keeping access to your phone number secure.
      </p>

      <h2>3. Content you post</h2>
      <p>
        You keep ownership of the sessions, comments, photos, and other content you post (&quot;Your
        Content&quot;). You grant us a non-exclusive, worldwide, royalty-free license to host, store, and
        display Your Content solely to operate and improve the App. You are responsible for Your
        Content and confirm you have the rights to share it.
      </p>

      <h2>4. Community rules — zero tolerance for objectionable content and abusive users</h2>
      <p>
        We have zero tolerance for objectionable content or abusive behavior. You agree not to post
        content or engage in conduct that is unlawful, harassing, bullying, threatening, hateful,
        defamatory, sexually explicit, violent, or that impersonates others, invades privacy, promotes
        cheating, or is spam. This is not an exhaustive list.
      </p>
      <p>
        We reserve the right, but are not obligated, to review content. When we receive a report of
        objectionable content or abusive behavior, we act on it — including removing the content and
        ejecting the user who provided it — generally within 24 hours. You can report content or users
        from within the App (tap the &quot;•••&quot; menu on a profile, post, or comment) and block users at
        any time.
      </p>

      <h2>5. Termination</h2>
      <p>
        We may suspend or terminate your access to the App at any time if you violate these Terms. You
        may stop using the App at any time and can permanently delete your account from Settings →
        Account.
      </p>

      <h2>6. Disclaimers</h2>
      <p>
        The App is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind. We do not
        guarantee that the App will be uninterrupted, secure, or error-free.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we will not be liable for any indirect, incidental,
        special, consequential, or punitive damages, or any loss of data, arising from your use of the
        App.
      </p>

      <h2>8. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. If we make material changes, we will notify you
        within the App or by other reasonable means. Continued use after changes take effect means you
        accept the updated Terms.
      </p>

      <h2>9. Apple App Store</h2>
      <p>
        These Terms are between you and us, not Apple. Apple is not responsible for the App or its
        content. Apple and its subsidiaries are third-party beneficiaries of these Terms and may
        enforce them against you. Apple has no obligation to provide support or maintenance for the
        App.
      </p>

      <h2>10. Contact</h2>
      <p>Questions about these Terms? Contact us at {SUPPORT_EMAIL}.</p>
    </LegalShell>
  );
}
