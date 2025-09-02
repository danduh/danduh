import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { EnhancedMeasurement, ConversionTracker } from './EnhancedMeasurement';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date | object | 'default' | 'update',
      config?: object
    ) => void;
  }
}

interface AnalyticsEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameter_1?: string;
  custom_parameter_2?: string;
  engagement_time_msec?: number;
  page_title?: string;
  page_location?: string;
}

export class Analytics {
  private static trackingId = 'G-55HQHJK170';

  // Track page views with enhanced data
  static trackPageView(
    page_path: string,
    page_title?: string,
    custom_parameters?: Record<string, any>
  ): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.trackingId, {
        page_path,
        page_title: page_title || document.title,
        custom_map: {
          custom_parameter_1: 'user_engagement_score',
          custom_parameter_2: 'content_category',
        },
        ...custom_parameters,
      });
    }
  }

  // Track custom events with enhanced parameters
  static trackEvent(
    event_name: string,
    parameters: AnalyticsEventParams = {}
  ): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event_name, {
        event_category: parameters.event_category || 'engagement',
        event_label: parameters.event_label,
        value: parameters.value,
        custom_parameter_1: parameters.custom_parameter_1,
        custom_parameter_2: parameters.custom_parameter_2,
        engagement_time_msec: parameters.engagement_time_msec,
        page_title: parameters.page_title || document.title,
        page_location: parameters.page_location || window.location.href,
      });
    }
  }

  // Track user engagement events
  static trackEngagement(
    engagement_type: 'scroll' | 'time_on_page' | 'interaction',
    details?: Record<string, any>
  ): void {
    this.trackEvent('user_engagement', {
      event_category: 'engagement',
      event_label: engagement_type,
      custom_parameter_1: 'high_engagement',
      ...details,
    });
  }

  // Track external link clicks
  static trackExternalLink(url: string, link_text?: string): void {
    this.trackEvent('click', {
      event_category: 'external_link',
      event_label: url,
      custom_parameter_2: 'external_navigation',
      value: 1,
    });
  }

  // Track internal navigation
  static trackInternalNavigation(
    page_name: string,
    source_page?: string
  ): void {
    this.trackEvent('page_view', {
      event_category: 'navigation',
      event_label: page_name,
      custom_parameter_2: 'internal_navigation',
      custom_parameter_1: source_page || 'direct',
    });
  }

  // Track content interaction
  static trackContentInteraction(
    content_type: 'video' | 'article' | 'project' | 'contact',
    content_title: string,
    interaction_type: 'view' | 'click' | 'share' | 'download'
  ): void {
    this.trackEvent('content_interaction', {
      event_category: content_type,
      event_label: `${interaction_type}_${content_title}`,
      custom_parameter_2: content_type,
      value: interaction_type === 'view' ? 1 : 2,
    });
  }

  // Track performance metrics
  static trackPerformance(metrics: {
    page_load_time?: number;
    dom_content_loaded?: number;
    first_contentful_paint?: number;
  }): void {
    if (metrics.page_load_time) {
      this.trackEvent('timing_complete', {
        event_category: 'performance',
        event_label: 'page_load_time',
        value: Math.round(metrics.page_load_time),
        custom_parameter_1: 'performance_metric',
      });
    }

    if (metrics.first_contentful_paint) {
      this.trackEvent('timing_complete', {
        event_category: 'performance',
        event_label: 'first_contentful_paint',
        value: Math.round(metrics.first_contentful_paint),
        custom_parameter_1: 'performance_metric',
      });
    }
  }

  // Track user session quality
  static trackSessionQuality(session_data: {
    pages_visited: number;
    time_on_site: number;
    bounce_rate: boolean;
  }): void {
    this.trackEvent('session_quality', {
      event_category: 'user_behavior',
      event_label: session_data.bounce_rate ? 'bounce' : 'engaged',
      value: session_data.pages_visited,
      engagement_time_msec: session_data.time_on_site * 1000,
      custom_parameter_1: session_data.bounce_rate ? 'low_engagement' : 'high_engagement',
    });
  }

  // Custom dimensions for user segmentation
  static setUserDimensions(dimensions: {
    user_type?: 'new' | 'returning' | 'frequent';
    traffic_source?: string;
    device_category?: 'mobile' | 'tablet' | 'desktop';
    user_engagement_level?: 'low' | 'medium' | 'high';
    content_preference?: 'videos' | 'articles' | 'projects' | 'mixed';
  }): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.trackingId, {
        custom_map: {
          custom_parameter_1: 'user_engagement_level',
          custom_parameter_2: 'content_preference',
          custom_parameter_3: 'user_type',
          custom_parameter_4: 'device_category',
        },
      });

      // Set custom dimensions
      if (dimensions.user_type) {
        window.gtag('event', 'custom_dimension', {
          custom_parameter_3: dimensions.user_type,
        });
      }

      if (dimensions.user_engagement_level) {
        window.gtag('event', 'custom_dimension', {
          custom_parameter_1: dimensions.user_engagement_level,
        });
      }

      if (dimensions.content_preference) {
        window.gtag('event', 'custom_dimension', {
          custom_parameter_2: dimensions.content_preference,
        });
      }

      if (dimensions.device_category) {
        window.gtag('event', 'custom_dimension', {
          custom_parameter_4: dimensions.device_category,
        });
      }
    }
  }

  // Enhanced user segmentation based on behavior
  static analyzeAndSetUserSegment(): void {
    const visitCount = this.getVisitCount();
    const pageViews = this.getSessionPageViews();
    const timeOnSite = this.getTimeOnSite();
    
    // Determine user type
    let userType: 'new' | 'returning' | 'frequent' = 'new';
    if (visitCount > 5) userType = 'frequent';
    else if (visitCount > 1) userType = 'returning';

    // Determine engagement level
    let engagementLevel: 'low' | 'medium' | 'high' = 'low';
    if (timeOnSite > 300 && pageViews > 3) engagementLevel = 'high';
    else if (timeOnSite > 120 || pageViews > 1) engagementLevel = 'medium';

    // Determine device category
    const deviceCategory = this.getDeviceCategory();

    // Determine content preference based on page visits
    const contentPreference = this.getContentPreference();

    this.setUserDimensions({
      user_type: userType,
      user_engagement_level: engagementLevel,
      device_category: deviceCategory,
      content_preference: contentPreference,
    });
  }

  // Helper methods for user segmentation
  private static getVisitCount(): number {
    const visits = localStorage.getItem('analytics_visit_count');
    const count = visits ? parseInt(visits, 10) : 0;
    localStorage.setItem('analytics_visit_count', (count + 1).toString());
    return count + 1;
  }

  private static getSessionPageViews(): number {
    const views = sessionStorage.getItem('session_page_views');
    return views ? parseInt(views, 10) : 1;
  }

  private static getTimeOnSite(): number {
    const startTime = sessionStorage.getItem('session_start_time');
    if (!startTime) {
      sessionStorage.setItem('session_start_time', Date.now().toString());
      return 0;
    }
    return (Date.now() - parseInt(startTime, 10)) / 1000;
  }

  private static getDeviceCategory(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private static getContentPreference(): 'videos' | 'articles' | 'projects' | 'mixed' {
    const pageHistory = JSON.parse(localStorage.getItem('page_visit_history') || '[]');
    const videosVisits = pageHistory.filter((page: string) => page.includes('/videos')).length;
    const articlesVisits = pageHistory.filter((page: string) => page.includes('/articles')).length;
    const projectsVisits = pageHistory.filter((page: string) => page.includes('/projects')).length;
    
    const total = videosVisits + articlesVisits + projectsVisits;
    if (total < 2) return 'mixed';
    
    if (videosVisits > articlesVisits && videosVisits > projectsVisits) return 'videos';
    if (articlesVisits > projectsVisits) return 'articles';
    if (projectsVisits > 0) return 'projects';
    return 'mixed';
  }
}

// React hook for automatic page tracking with enhanced features
export function useAnalyticsPageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    // Update page visit history for content preference analysis
    const pageHistory = JSON.parse(localStorage.getItem('page_visit_history') || '[]');
    pageHistory.push(location.pathname);
    if (pageHistory.length > 50) pageHistory.shift(); // Keep last 50 pages
    localStorage.setItem('page_visit_history', JSON.stringify(pageHistory));

    // Update session page views
    const currentViews = parseInt(sessionStorage.getItem('session_page_views') || '0', 10);
    sessionStorage.setItem('session_page_views', (currentViews + 1).toString());

    // Analyze and set user segments
    Analytics.analyzeAndSetUserSegment();

    // Track page view with enhanced data
    Analytics.trackPageView(location.pathname, document.title, {
      custom_parameter_2: getContentCategory(location.pathname),
    });

    // Track performance metrics
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        setTimeout(() => {
          Analytics.trackPerformance({
            page_load_time: perfData.loadEventEnd - perfData.loadEventStart,
            dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            first_contentful_paint: getFirstContentfulPaint(),
          });
        }, 1000);
      }
    }
  }, [location.pathname]);
}

// Enhanced analytics page tracking with all features
export function useEnhancedAnalyticsPageTracking(): React.ReactElement {
  const location = useLocation();
  
  // Use the standard page tracking
  useAnalyticsPageTracking();

  return (
    <>
      <EnhancedMeasurement />
      <ConversionTracker />
    </>
  );
}

// Helper function to categorize content
function getContentCategory(pathname: string): string {
  if (pathname.includes('/videos')) return 'videos';
  if (pathname.includes('/articles')) return 'articles';
  if (pathname.includes('/conferences')) return 'conferences';
  if (pathname.includes('/projects')) return 'projects';
  if (pathname.includes('/contact')) return 'contact';
  return 'homepage';
}

// Helper function to get First Contentful Paint
function getFirstContentfulPaint(): number | undefined {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const paintEntries = window.performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry?.startTime;
  }
  return undefined;
}

// Enhanced Link component with analytics tracking
export function AnalyticsLink({
  href,
  children,
  className,
  isExternal = false,
  trackingData,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
  trackingData?: {
    category?: string;
    label?: string;
    value?: number;
  };
  [key: string]: any;
}) {
  const handleClick = () => {
    if (isExternal) {
      Analytics.trackExternalLink(href, typeof children === 'string' ? children : href);
    } else {
      Analytics.trackInternalNavigation(href, window.location.pathname);
    }

    if (trackingData) {
      Analytics.trackEvent('link_click', {
        event_category: trackingData.category || 'navigation',
        event_label: trackingData.label || href,
        value: trackingData.value || 1,
      });
    }
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

// Export all analytics components and utilities
export { default as AnalyticsProvider } from './AnalyticsProvider';
export { CookieConsent, PrivacyAnalytics } from './CookieConsent';
export { default as PerformanceTracker, useEngagementTracking } from './PerformanceTracker';
export { EnhancedMeasurement, ConversionTracker } from './EnhancedMeasurement';
export { default as AnalyticsDashboard } from './AnalyticsDashboard';
export { GA_CONFIG, initializeAnalytics, trackingHelpers } from './config';

export default Analytics;