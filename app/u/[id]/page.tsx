import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InviteShell } from "../../invite-shell";

// Profile data is auth-gated server-side (RLS: profiles_read requires an
// authenticated, non-blocked viewer — see private.can_view_profile in
// supabase/migrations/20260714043658_user_control_and_safety.sql), so this
// page can't preview the profile itself; it only hands off to the app.
export const metadata: Metadata = {
  title: "piclr",
  description: "See this player's matches on piclr.",
};

export default async function ProfileInvitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(id)) notFound();

  return (
    <InviteShell
      kicker="PLAYER PROFILE"
      title="See their matches on piclr"
      subtitle="Every match has a story. Get the app to see this player's record, or open it now if you already have piclr installed."
      openURL={`pickleballai://u/${id}`}
    />
  );
}
