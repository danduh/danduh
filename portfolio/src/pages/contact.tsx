import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useEnhancedAnalyticsPageTracking, AnalyticsLink, Analytics } from "../components/Analytics";

export default function Contact(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  // Enhanced analytics tracking for contact page (high-value conversion page)
  const analyticsComponents = useEnhancedAnalyticsPageTracking();

  // Track contact page as conversion goal
  React.useEffect(() => {
    Analytics.trackEvent('conversion_goal', {
      event_category: 'conversions',
      event_label: 'contact_page_reached',
      custom_parameter_2: 'lead_funnel',
      value: 4,
    });
  }, []);

  return (
    <Layout
      title="Contact"
      description="Get in touch with Daniel Ostrovsky">
      {analyticsComponents}
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <div className="container">
            <h1 className="portfolio-title">Get in Touch</h1>
            <p className="portfolio-description">
              I'm always interested in new opportunities and collaborations.
              Feel free to reach out if you'd like to work together or just say hello!
            </p>
            <div className="portfolio-buttons">
              <AnalyticsLink
                href="mailto:danduh@gmail.com"
                className="portfolio-button-primary"
                isExternal={true}
                trackingData={{
                  category: 'conversions',
                  label: 'email_click',
                  value: 5,
                }}
                onClick={() => {
                  Analytics.trackEvent('lead_generation', {
                    event_category: 'conversions',
                    event_label: 'email_initiated',
                    custom_parameter_2: 'direct_contact',
                    value: 5,
                  });
                }}
              >
                Send Email
              </AnalyticsLink>
              <AnalyticsLink
                href="https://linkedin.com/in/danduh"
                className="portfolio-button-secondary"
                isExternal={true}
                trackingData={{
                  category: 'conversions',
                  label: 'linkedin_click',
                  value: 3,
                }}
                onClick={() => {
                  Analytics.trackEvent('social_conversion', {
                    event_category: 'conversions',
                    event_label: 'linkedin_contact',
                    custom_parameter_2: 'social_contact',
                    value: 3,
                  });
                }}
              >
                LinkedIn
              </AnalyticsLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
