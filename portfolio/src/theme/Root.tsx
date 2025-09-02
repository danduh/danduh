import React from 'react';
import { AnalyticsProvider } from '../components/Analytics/AnalyticsProvider';

// Root component that wraps the entire app with analytics
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
      {children}
    </AnalyticsProvider>
  );
}