import { useEffect } from 'react';
import { Analytics } from './index';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export function PerformanceTracker() {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
        
        // Cumulative Layout Shift
        onCLS((metric: WebVital) => {
          Analytics.trackEvent('web_vitals', {
            event_category: 'performance',
            event_label: 'CLS',
            value: Math.round(metric.value * 1000), // Convert to milliseconds
            custom_parameter_1: metric.rating,
            custom_parameter_2: 'core_web_vital',
          });
        });

        // Interaction to Next Paint (replaces FID in newer web-vitals)
        onINP((metric: WebVital) => {
          Analytics.trackEvent('web_vitals', {
            event_category: 'performance',
            event_label: 'INP',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
            custom_parameter_2: 'core_web_vital',
          });
        });

        // First Contentful Paint
        onFCP((metric: WebVital) => {
          Analytics.trackEvent('web_vitals', {
            event_category: 'performance',
            event_label: 'FCP',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
            custom_parameter_2: 'core_web_vital',
          });
        });

        // Largest Contentful Paint
        onLCP((metric: WebVital) => {
          Analytics.trackEvent('web_vitals', {
            event_category: 'performance',
            event_label: 'LCP',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
            custom_parameter_2: 'core_web_vital',
          });
        });

        // Time to First Byte
        onTTFB((metric: WebVital) => {
          Analytics.trackEvent('web_vitals', {
            event_category: 'performance',
            event_label: 'TTFB',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
            custom_parameter_2: 'core_web_vital',
          });
        });

      } catch (error) {
        console.warn('Web Vitals library not available:', error);
        // Fallback to basic performance tracking
        trackBasicPerformance();
      }
    };

    trackWebVitals();
  }, []);

  return null; // This is a tracking-only component
}

// Fallback performance tracking without web-vitals library
function trackBasicPerformance() {
  if (typeof window === 'undefined' || !window.performance) return;

  // Track basic navigation timing
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // Page Load Time
        const pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
        Analytics.trackEvent('performance_timing', {
          event_category: 'performance',
          event_label: 'page_load_time',
          value: Math.round(pageLoadTime),
          custom_parameter_2: 'basic_performance',
        });

        // DOM Content Loaded
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        Analytics.trackEvent('performance_timing', {
          event_category: 'performance',
          event_label: 'dom_content_loaded',
          value: Math.round(domContentLoaded),
          custom_parameter_2: 'basic_performance',
        });

        // Time to First Byte
        const ttfb = navigation.responseStart - navigation.requestStart;
        Analytics.trackEvent('performance_timing', {
          event_category: 'performance',
          event_label: 'ttfb_basic',
          value: Math.round(ttfb),
          custom_parameter_2: 'basic_performance',
        });
      }
    }, 1000);
  });

  // Track resource loading performance
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        
        // Track slow resources
        if (resourceEntry.duration > 1000) { // Resources taking more than 1 second
          Analytics.trackEvent('slow_resource', {
            event_category: 'performance',
            event_label: resourceEntry.name.split('/').pop() || 'unknown',
            value: Math.round(resourceEntry.duration),
            custom_parameter_2: 'resource_performance',
          });
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
}

// User engagement tracking
export function useEngagementTracking() {
  useEffect(() => {
    let startTime = Date.now();
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    let interactionCount = 0;

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepth = Math.round((scrollTop / documentHeight) * 100);
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track significant scroll milestones
        if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
          Analytics.trackEngagement('scroll', { scroll_depth: '25%' });
        } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
          Analytics.trackEngagement('scroll', { scroll_depth: '50%' });
        } else if (maxScrollDepth >= 75) {
          Analytics.trackEngagement('scroll', { scroll_depth: '75%' });
        }
      }
    };

    // Track user interactions
    const handleInteraction = () => {
      interactionCount++;
      if (interactionCount === 1) {
        Analytics.trackEngagement('interaction', { first_interaction: true });
      }
    };

    // Track time on page
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      Analytics.trackEngagement('time_on_page', {
        time_seconds: Math.round(timeOnPage / 1000),
        max_scroll_depth: maxScrollDepth,
        interaction_count: interactionCount,
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

export default PerformanceTracker;