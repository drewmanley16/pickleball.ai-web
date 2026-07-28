// iOS Universal Links: declares which paths on this host open the installed
// app instead of Safari. Matched against the app's
// com.apple.developer.associated-domains entitlement
// (applinks:piclr.vercel.app — see PickleballAI.entitlements). Must be
// served at exactly this path, over HTTPS, with no redirects — Apple's
// fetcher does not follow them, so this must be reachable directly on
// piclr.vercel.app (the project's primary domain; pickleball-ai-web.vercel.app
// redirects here and would silently break Universal Links if used instead).
const association = {
  applinks: {
    apps: [] as string[],
    details: [
      {
        appID: "X9H68STU8F.com.pickleball.ai",
        paths: ["/u/*", "/squad/*"],
      },
    ],
  },
};

export function GET() {
  return Response.json(association, {
    headers: { "content-type": "application/json" },
  });
}
