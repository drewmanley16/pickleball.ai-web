import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InviteShell } from "../../invite-shell";

// Squad rows are member-only under RLS (squads_read requires
// private.is_squad_member — see supabase/migrations/20260727100000_squads.sql),
// so this page can't preview the squad's name; it only hands off to the app,
// which redeems the code itself once signed in.
export const metadata: Metadata = {
  title: "piclr",
  description: "You've been invited to a squad on piclr.",
};

const codePattern = /^[A-Z2-9]{4,12}$/i;

export default async function SquadInvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  if (!codePattern.test(code)) notFound();

  return (
    <InviteShell
      kicker="SQUAD INVITE"
      title="You're invited to a squad"
      subtitle="Join to see the roster and squad leaderboard on piclr."
      openURL={`pickleballai://squad/${code}`}
    >
      <p className="invite-code">{code.toUpperCase()}</p>
    </InviteShell>
  );
}
