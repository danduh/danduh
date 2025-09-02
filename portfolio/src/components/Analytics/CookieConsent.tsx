import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('analytics-consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      onAccept();
    }
  }, [onAccept]);

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'accepted');
    setIsVisible(false);
    onAccept();
    
    // Track consent acceptance
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('analytics-consent', 'declined');
    setIsVisible(false);
    onDecline();
    
    // Track consent decline
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieConsent}>
      <div className={styles.cookieContent}>
        <div className={styles.cookieText}>
          <h3>🍪 We value your privacy</h3>
          <p>
            We use analytics cookies to understand how you interact with our website. 
            This helps us improve your experience. You can choose to accept or decline.
          </p>
        </div>
        <div className={styles.cookieButtons}>
          <button 
            className={styles.acceptButton} 
            onClick={handleAccept}
            aria-label="Accept analytics cookies"
          >
            Accept Analytics
          </button>
          <button 
            className={styles.declineButton} 
            onClick={handleDecline}
            aria-label="Decline analytics cookies"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

// Privacy-focused analytics manager
export class PrivacyAnalytics {
  private static consentGiven = false;

  static init(): void {
    // Initialize consent state
    const consent = localStorage.getItem('analytics-consent');
    this.consentGiven = consent === 'accepted';

    // Set initial consent state
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'default', {
        analytics_storage: this.consentGiven ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500,
      });
    }
  }

  static setConsent(granted: boolean): void {
    this.consentGiven = granted;
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }

  static hasConsent(): boolean {
    return this.consentGiven;
  }

  // Privacy-safe event tracking
  static trackEvent(eventName: string, parameters: any = {}): void {
    if (!this.consentGiven) return;

    if (typeof window !== 'undefined' && window.gtag) {
      // Remove any PII from parameters
      const sanitizedParams = this.sanitizeParameters(parameters);
      window.gtag('event', eventName, sanitizedParams);
    }
  }

  private static sanitizeParameters(params: any): any {
    // Remove or hash any potential PII
    const sanitized = { ...params };
    
    // Remove email addresses, phone numbers, etc.
    Object.keys(sanitized).forEach(key => {
      const value = sanitized[key];
      if (typeof value === 'string') {
        // Remove email patterns
        if (value.includes('@')) {
          sanitized[key] = '[email_redacted]';
        }
        // Remove phone patterns
        if (/\d{3}[-.]?\d{3}[-.]?\d{4}/.test(value)) {
          sanitized[key] = '[phone_redacted]';
        }
      }
    });

    return sanitized;
  }
}

export default CookieConsent;