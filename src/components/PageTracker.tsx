"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "pageview", path: pathname }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
