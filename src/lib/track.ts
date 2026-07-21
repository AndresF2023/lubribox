import { track as vercelTrack } from "@vercel/analytics";

export function track(event: string, properties?: Record<string, string>) {
  vercelTrack(event, properties);
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "event", event }),
  }).catch(() => {});
}
