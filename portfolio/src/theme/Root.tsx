import React from 'react';
import { AnalyticsProvider } from '../components/Analytics/AnalyticsProvider';

// @docusaurus/plugin-google-gtag registers a client runtime that calls
// `window.gtag('set', ...)` / `window.gtag('event', 'page_view')` on every
// client-side route change (production builds only). `window.gtag` is normally
// defined by the plugin's injected inline <script> in <head>. If that inline
// script is ever missing, blocked (CSP / privacy extension / ad blocker), or
// runs late, the route handler throws "window.gtag is not a function".
//
// Define the standard Google dataLayer stub as soon as the client bundle loads,
// so gtag is always callable. In the normal case the real gtag defined earlier
// in <head> already exists and this is a no-op; otherwise events queue harmlessly
// into dataLayer and are picked up if/when the real gtag script loads.
if (typeof window !== 'undefined') {
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer ?? [];
  if (typeof w.gtag !== 'function') {
    w.gtag = function gtag() {
      // Match Google's snippet: push the raw arguments object into dataLayer.
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
}

// Root component that wraps the entire app with analytics
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
      {children}
    </AnalyticsProvider>
  );
}
