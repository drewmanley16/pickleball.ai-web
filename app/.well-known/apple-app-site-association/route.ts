// iOS Universal Links: declares which paths on this host open the installed
// app instead of Safari. Matched against the app's
// com.apple.developer.associated-domains entitlement
// (applinks:pickleball-ai-web.vercel.app — see PickleballAI.entitlements).
// Must be served at exactly this path, over HTTPS, with no redirects.
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
