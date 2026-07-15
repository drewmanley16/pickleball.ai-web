import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — pickleball.ai",
  description: "How pickleball.ai collects and uses your information.",
};

const EFFECTIVE_DATE = "July 15, 2026";
const SUPPORT_EMAIL = "drewmanley16@gmail.com";

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" effectiveDate={EFFECTIVE_DATE}>
      <p>
        This Privacy Policy explains what pickleball.ai (&quot;we&quot;, &quot;us&quot;) collects and how we use it.
        By using the App you agree to this policy.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Phone number</strong> — used to create and sign in to your account (via SMS one-time
          code).
        </li>
        <li>
          <strong>Profile information</strong> — display name, username, skill/rating, home court, and
          any photo you choose to add.
        </li>
        <li>
          <strong>Content</strong> — sessions, comments, likes, and other content you create.
        </li>
        <li>
          <strong>Contacts</strong> — if you choose to find friends, we match your contacts&apos; phone
          numbers once to look for existing users. Contacts are matched in the moment and are not
          stored.
        </li>
        <li>
          <strong>Device tokens</strong> — if you enable notifications, we store a push token to
          deliver them.
        </li>
        <li>Basic usage/diagnostic data needed to operate the service.</li>
      </ul>

      <h2>2. How we use information</h2>
      <p>
        We use your information to operate the App: to authenticate you, show your feed and profile,
        deliver notifications, enable social features (follows, comments, contact matching), and to
        keep the community safe (handling reports, blocks, and abuse).
      </p>

      <h2>3. How information is shared</h2>
      <p>
        We share information with service providers who help us run the App, including our backend host
        (Supabase), our SMS provider (Twilio, to send your login code), and Apple Push Notification
        service (to deliver notifications). We do not sell your personal information. We may disclose
        information if required by law.
      </p>

      <h2>4. Data retention and deletion</h2>
      <p>
        We keep your information for as long as your account is active. You can permanently delete your
        account and associated content at any time from Settings → Account → Delete Account.
      </p>

      <h2>5. Your choices</h2>
      <p>
        You control your profile information, whether to grant Contacts and Notifications permissions,
        and can block or report other users at any time.
      </p>

      <h2>6. Children</h2>
      <p>
        The App is not intended for children under 13, and we do not knowingly collect information from
        them.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        We may update this policy from time to time and will notify you of material changes within the
        App or by other reasonable means.
      </p>

      <h2>8. Contact</h2>
      <p>Questions about privacy? Contact us at {SUPPORT_EMAIL}.</p>
    </LegalShell>
  );
}
