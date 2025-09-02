import { useEffect } from 'react';
import { Analytics } from './index';

// Enhanced measurement for portfolio-specific goals
export function EnhancedMeasurement() {
  useEffect(() => {
    // Track outbound link clicks automatically
    const trackOutboundLinks = () => {
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const link = target.closest('a');
        
        if (link && link.href) {
          const url = new URL(link.href, window.location.origin);
          
          // Check if it's an external link
          if (url.origin !== window.location.origin) {
            Analytics.trackEvent('click', {
              event_category: 'outbound_link',
              event_label: url.hostname,
              custom_parameter_2: 'external_navigation',
              value: 1,
            });

            // Track specific social media platforms
            if (url.hostname.includes('linkedin.com')) {
              Analytics.trackEvent('social_click', {
                event_category: 'social_media',
                event_label: 'linkedin',
                custom_parameter_2: 'professional_networking',
                value: 2,
              });
            } else if (url.hostname.includes('github.com')) {
              Analytics.trackEvent('social_click', {
                event_category: 'social_media',
                event_label: 'github',
                custom_parameter_2: 'code_repository',
                value: 2,
              });
            } else if (url.hostname.includes('youtube.com')) {
              Analytics.trackEvent('social_click', {
                event_category: 'social_media',
                event_label: 'youtube',
                custom_parameter_2: 'video_content',
                value: 2,
              });
            } else if (url.hostname.includes('medium.com')) {
              Analytics.trackEvent('social_click', {
                event_category: 'social_media',
                event_label: 'medium',
                custom_parameter_2: 'blog_content',
                value: 2,
              });
            }
          }
        }
      }, { passive: true });
    };

    // Track file downloads
    const trackFileDownloads = () => {
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const link = target.closest('a');
        
        if (link && link.href) {
          const url = link.href;
          const fileExtensions = ['.pdf', '.doc', '.docx', '.zip', '.rar', '.exe', '.dmg', '.pkg'];
          
          if (fileExtensions.some(ext => url.toLowerCase().includes(ext))) {
            const fileName = url.split('/').pop() || 'unknown_file';
            Analytics.trackEvent('file_download', {
              event_category: 'downloads',
              event_label: fileName,
              custom_parameter_2: 'file_interaction',
              value: 3,
            });
          }
        }
      }, { passive: true });
    };

    // Track form interactions (for contact page)
    const trackFormInteractions = () => {
      // Track form field focus
      document.addEventListener('focusin', (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          Analytics.trackEvent('form_interaction', {
            event_category: 'forms',
            event_label: 'field_focus',
            custom_parameter_2: 'user_engagement',
            value: 1,
          });
        }
      }, { passive: true });

      // Track form submissions
      document.addEventListener('submit', (event) => {
        const form = event.target as HTMLFormElement;
        if (form) {
          Analytics.trackEvent('form_submit', {
            event_category: 'conversions',
            event_label: 'contact_form',
            custom_parameter_2: 'lead_generation',
            value: 5,
          });
        }
      }, { passive: true });
    };

    // Track search interactions (if any)
    const trackSearchInteractions = () => {
      document.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        if (target.type === 'search' || target.placeholder?.toLowerCase().includes('search')) {
          // Debounce search tracking
          setTimeout(() => {
            if (target.value.length > 2) {
              Analytics.trackEvent('search', {
                event_category: 'site_search',
                event_label: 'search_query',
                custom_parameter_2: 'content_discovery',
                value: 1,
              });
            }
          }, 1000);
        }
      }, { passive: true });
    };

    // Track video engagement (YouTube embeds)
    const trackVideoEngagement = () => {
      // Listen for YouTube API messages
      window.addEventListener('message', (event) => {
        if (event.origin !== 'https://www.youtube.com') return;
        
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'video-progress') {
            Analytics.trackEvent('video_progress', {
              event_category: 'video_engagement',
              event_label: `${Math.round(data.info.currentTime)}s`,
              custom_parameter_2: 'video_consumption',
              value: Math.round(data.info.currentTime),
            });
          }
        } catch (e) {
          // Ignore parsing errors
        }
      });
    };

    // Track page visibility changes
    const trackPageVisibility = () => {
      let visibilityStartTime = Date.now();
      
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          const visibleTime = Date.now() - visibilityStartTime;
          Analytics.trackEvent('page_visibility', {
            event_category: 'engagement',
            event_label: 'page_hidden',
            engagement_time_msec: visibleTime,
            custom_parameter_2: 'attention_tracking',
          });
        } else {
          visibilityStartTime = Date.now();
          Analytics.trackEvent('page_visibility', {
            event_category: 'engagement',
            event_label: 'page_visible',
            custom_parameter_2: 'attention_tracking',
          });
        }
      });
    };

    // Track device and browser information
    const trackDeviceInfo = () => {
      const deviceInfo = {
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        device_pixel_ratio: window.devicePixelRatio,
        connection_type: (navigator as any).connection?.effectiveType || 'unknown',
        user_agent: navigator.userAgent,
      };

      Analytics.trackEvent('device_info', {
        event_category: 'technical',
        event_label: 'device_characteristics',
        custom_parameter_1: deviceInfo.connection_type,
        custom_parameter_2: 'device_analysis',
      });
    };

    // Initialize all tracking
    trackOutboundLinks();
    trackFileDownloads();
    trackFormInteractions();
    trackSearchInteractions();
    trackVideoEngagement();
    trackPageVisibility();
    trackDeviceInfo();

    // Track user preferences
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    Analytics.trackEvent('user_preferences', {
      event_category: 'preferences',
      event_label: isDarkMode ? 'dark_mode' : 'light_mode',
      custom_parameter_2: 'ui_preferences',
    });

  }, []);

  return null;
}

// Conversion tracking for portfolio goals
export function ConversionTracker() {
  useEffect(() => {
    // Track high-value actions
    const trackConversions = () => {
      // Track when users reach contact page
      if (window.location.pathname === '/contact') {
        Analytics.trackEvent('conversion', {
          event_category: 'conversions',
          event_label: 'contact_page_visit',
          custom_parameter_2: 'lead_funnel',
          value: 3,
        });
      }

      // Track when users view projects
      if (window.location.pathname === '/projects') {
        Analytics.trackEvent('conversion', {
          event_category: 'conversions',
          event_label: 'projects_page_visit',
          custom_parameter_2: 'portfolio_engagement',
          value: 2,
        });
      }

      // Track social media clicks as micro-conversions
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const link = target.closest('a');
        
        if (link && link.href) {
          const socialPlatforms = ['linkedin', 'github', 'medium', 'youtube', 'twitter'];
          const matchedPlatform = socialPlatforms.find(platform => 
            link.href.toLowerCase().includes(platform)
          );
          
          if (matchedPlatform) {
            Analytics.trackEvent('conversion', {
              event_category: 'micro_conversions',
              event_label: `${matchedPlatform}_click`,
              custom_parameter_2: 'social_engagement',
              value: 1,
            });
          }
        }
      }, { passive: true });
    };

    trackConversions();
  }, []);

  return null;
}

export default EnhancedMeasurement;