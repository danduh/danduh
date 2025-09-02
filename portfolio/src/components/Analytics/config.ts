// Google Analytics 4 Configuration for Maximum Optimization
export const GA_CONFIG = {
  // Main tracking ID
  TRACKING_ID: 'G-55HQHJK170',
  
  // Performance optimization settings
  PERFORMANCE: {
    // Use sendBeacon API for better performance
    transport_type: 'beacon',
    // Reduce initial load impact
    defer_loading: true,
    // Optimize for Core Web Vitals
    optimize_cwv: true,
    // Batch events for better performance
    batch_events: true,
    // Maximum events per batch
    max_batch_size: 10,
    // Batch timeout in milliseconds
    batch_timeout: 1000,
  },

  // Privacy settings
  PRIVACY: {
    // Anonymize IP addresses
    anonymize_ip: true,
    // Disable ad personalization
    allow_ad_personalization_signals: false,
    // Enable Google Signals for better insights (aggregated data)
    allow_google_signals: true,
    // Cookie settings
    cookie_expires: 63072000, // 2 years
    cookie_flags: 'SameSite=None;Secure',
    // Data retention
    data_retention: '26_months',
  },

  // Enhanced measurement configuration
  ENHANCED_MEASUREMENT: {
    scrolls: true,
    outbound_clicks: true,
    site_search: true,
    video_engagement: true,
    file_downloads: true,
    page_changes: true, // Important for SPAs
    form_interactions: true,
  },

  // Custom dimensions mapping
  CUSTOM_DIMENSIONS: {
    user_engagement_level: 'custom_parameter_1',
    content_category: 'custom_parameter_2',
    user_type: 'custom_parameter_3',
    device_category: 'custom_parameter_4',
    traffic_source_category: 'custom_parameter_5',
  },

  // Conversion goals and values
  CONVERSIONS: {
    email_click: { value: 5, category: 'lead_generation' },
    linkedin_click: { value: 3, category: 'social_engagement' },
    project_view: { value: 2, category: 'portfolio_engagement' },
    video_watch: { value: 2, category: 'content_consumption' },
    article_read: { value: 2, category: 'content_consumption' },
    share_action: { value: 1, category: 'content_sharing' },
  },

  // Event categories for consistent tracking
  EVENT_CATEGORIES: {
    NAVIGATION: 'navigation',
    ENGAGEMENT: 'engagement',
    CONVERSIONS: 'conversions',
    PERFORMANCE: 'performance',
    CONTENT: 'content',
    SOCIAL: 'social_media',
    TECHNICAL: 'technical',
    USER_BEHAVIOR: 'user_behavior',
  },

  // Content grouping
  CONTENT_GROUPS: {
    PRIMARY: 'Portfolio',
    SECONDARY: 'Technical Blog',
    TERTIARY: 'Professional Showcase',
  },

  // User timing categories
  TIMING_CATEGORIES: {
    PERFORMANCE: 'Performance',
    USER_INTERACTION: 'User Interaction',
    CONTENT_LOADING: 'Content Loading',
  },
};

// Analytics initialization configuration
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Set global configuration
    window.gtag('config', GA_CONFIG.TRACKING_ID, {
      // Performance settings
      transport_type: GA_CONFIG.PERFORMANCE.transport_type,
      
      // Privacy settings
      anonymize_ip: GA_CONFIG.PRIVACY.anonymize_ip,
      allow_ad_personalization_signals: GA_CONFIG.PRIVACY.allow_ad_personalization_signals,
      allow_google_signals: GA_CONFIG.PRIVACY.allow_google_signals,
      cookie_expires: GA_CONFIG.PRIVACY.cookie_expires,
      cookie_flags: GA_CONFIG.PRIVACY.cookie_flags,
      
      // Enhanced measurement
      enhanced_measurement: GA_CONFIG.ENHANCED_MEASUREMENT,
      
      // Custom dimensions mapping
      custom_map: GA_CONFIG.CUSTOM_DIMENSIONS,
      
      // Content grouping
      content_group1: GA_CONFIG.CONTENT_GROUPS.PRIMARY,
      content_group2: GA_CONFIG.CONTENT_GROUPS.SECONDARY,
      
      // Session configuration
      session_timeout: 1800, // 30 minutes
      engagement_time_msec: 100,
      
      // App information
      app_name: 'Daniel Ostrovsky Portfolio',
      app_version: '2.0',
      
      // Debug mode (disable in production)
      debug_mode: process.env.NODE_ENV === 'development',
    });

    // Set up consent mode
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });
  }
};

// Event tracking helpers
export const trackingHelpers = {
  // Track high-value user actions
  trackConversion: (conversionType: keyof typeof GA_CONFIG.CONVERSIONS, label?: string) => {
    const config = GA_CONFIG.CONVERSIONS[conversionType];
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: config.category,
        event_label: label || conversionType,
        value: config.value,
        custom_parameter_2: 'conversion_tracking',
      });
    }
  },

  // Track user journey through the portfolio
  trackUserJourney: (step: string, details?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'user_journey', {
        event_category: GA_CONFIG.EVENT_CATEGORIES.USER_BEHAVIOR,
        event_label: step,
        custom_parameter_1: 'journey_tracking',
        ...details,
      });
    }
  },

  // Track content performance
  trackContentPerformance: (contentType: string, contentId: string, metric: string, value: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'content_performance', {
        event_category: GA_CONFIG.EVENT_CATEGORIES.CONTENT,
        event_label: `${contentType}_${metric}`,
        value: Math.round(value),
        custom_parameter_2: contentType,
      });
    }
  },

  // Track technical metrics
  trackTechnicalMetric: (metric: string, value: number, category?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'technical_metric', {
        event_category: GA_CONFIG.EVENT_CATEGORIES.TECHNICAL,
        event_label: metric,
        value: Math.round(value),
        custom_parameter_1: category || 'general',
      });
    }
  },
};

export default GA_CONFIG;