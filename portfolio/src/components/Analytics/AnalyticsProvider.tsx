import React, { createContext, useContext, useEffect, useState } from 'react';
import { CookieConsent, PrivacyAnalytics } from './CookieConsent';
import { PerformanceTracker, useEngagementTracking } from './PerformanceTracker';
import { Analytics } from './index';

interface AnalyticsContextType {
  isEnabled: boolean;
  enableAnalytics: () => void;
  disableAnalytics: () => void;
  trackEvent: (name: string, params?: any) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize privacy analytics
  useEffect(() => {
    PrivacyAnalytics.init();
    setIsEnabled(PrivacyAnalytics.hasConsent());
    setIsInitialized(true);
  }, []);

  // Track user engagement
  useEngagementTracking();

  const enableAnalytics = () => {
    setIsEnabled(true);
    PrivacyAnalytics.setConsent(true);
    
    // Track analytics enablement
    Analytics.trackEvent('privacy_consent', {
      event_category: 'privacy',
      event_label: 'analytics_enabled',
      value: 1,
    });
  };

  const disableAnalytics = () => {
    setIsEnabled(false);
    PrivacyAnalytics.setConsent(false);
  };

  const trackEvent = (name: string, params: any = {}) => {
    if (isEnabled) {
      PrivacyAnalytics.trackEvent(name, params);
    }
  };

  const contextValue: AnalyticsContextType = {
    isEnabled,
    enableAnalytics,
    disableAnalytics,
    trackEvent,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
      {isInitialized && (
        <>
          <CookieConsent 
            onAccept={enableAnalytics} 
            onDecline={disableAnalytics} 
          />
          {isEnabled && <PerformanceTracker />}
        </>
      )}
    </AnalyticsContext.Provider>
  );
}

// Enhanced page tracking hook with user behavior analysis
export function useAdvancedPageTracking(pageCategory?: string) {
  const { isEnabled, trackEvent } = useAnalytics();

  useEffect(() => {
    if (!isEnabled) return;

    const startTime = Date.now();
    let hasScrolled = false;
    let hasInteracted = false;

    // Track page entry
    trackEvent('page_enter', {
      event_category: 'navigation',
      event_label: window.location.pathname,
      custom_parameter_2: pageCategory || 'unknown',
    });

    // Track first scroll
    const handleFirstScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true;
        trackEvent('first_scroll', {
          event_category: 'engagement',
          event_label: window.location.pathname,
          engagement_time_msec: Date.now() - startTime,
        });
      }
    };

    // Track first interaction
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        hasInteracted = true;
        trackEvent('first_interaction', {
          event_category: 'engagement',
          event_label: window.location.pathname,
          engagement_time_msec: Date.now() - startTime,
        });
      }
    };

    // Track page exit
    const handlePageExit = () => {
      const timeOnPage = Date.now() - startTime;
      trackEvent('page_exit', {
        event_category: 'navigation',
        event_label: window.location.pathname,
        engagement_time_msec: timeOnPage,
        custom_parameter_1: hasInteracted ? 'engaged' : 'passive',
        custom_parameter_2: pageCategory || 'unknown',
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleFirstScroll, { once: true, passive: true });
    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('beforeunload', handlePageExit);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('beforeunload', handlePageExit);
    };
  }, [isEnabled, trackEvent, pageCategory]);
}

// User session quality tracker
export function useSessionQualityTracking() {
  const { isEnabled, trackEvent } = useAnalytics();

  useEffect(() => {
    if (!isEnabled) return;

    let pagesVisited = 1;
    let sessionStartTime = Date.now();
    let lastInteractionTime = Date.now();

    // Track session quality metrics
    const trackSessionMetrics = () => {
      const sessionDuration = Date.now() - sessionStartTime;
      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      
      trackEvent('session_quality', {
        event_category: 'user_behavior',
        event_label: 'session_metrics',
        value: pagesVisited,
        engagement_time_msec: sessionDuration,
        custom_parameter_1: timeSinceLastInteraction > 30000 ? 'inactive' : 'active',
        custom_parameter_2: 'session_analysis',
      });
    };

    // Update interaction time on user activity
    const updateInteractionTime = () => {
      lastInteractionTime = Date.now();
    };

    // Track page navigation within session
    const handleNavigation = () => {
      pagesVisited++;
    };

    // Add event listeners
    window.addEventListener('click', updateInteractionTime, { passive: true });
    window.addEventListener('keydown', updateInteractionTime, { passive: true });
    window.addEventListener('scroll', updateInteractionTime, { passive: true });
    window.addEventListener('popstate', handleNavigation);

    // Track session quality every 30 seconds
    const sessionInterval = setInterval(trackSessionMetrics, 30000);

    // Track final session quality on page unload
    window.addEventListener('beforeunload', trackSessionMetrics);

    // Cleanup
    return () => {
      clearInterval(sessionInterval);
      window.removeEventListener('click', updateInteractionTime);
      window.removeEventListener('keydown', updateInteractionTime);
      window.removeEventListener('scroll', updateInteractionTime);
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('beforeunload', trackSessionMetrics);
    };
  }, [isEnabled, trackEvent]);
}

export default AnalyticsProvider;