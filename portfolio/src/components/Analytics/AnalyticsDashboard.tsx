import React, { useState, useEffect } from 'react';
import { Analytics } from './index';

interface AnalyticsSummary {
  pageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: { page: string; views: number }[];
  deviceBreakdown: { mobile: number; tablet: number; desktop: number };
  userEngagement: { low: number; medium: number; high: number };
}

// Development-only analytics dashboard for testing and monitoring
export function AnalyticsDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      loadAnalyticsSummary();
    }
  }, []);

  const loadAnalyticsSummary = () => {
    // Mock analytics summary for development
    const mockSummary: AnalyticsSummary = {
      pageViews: parseInt(localStorage.getItem('dev_page_views') || '0'),
      uniqueVisitors: parseInt(localStorage.getItem('dev_unique_visitors') || '0'),
      averageSessionDuration: parseInt(localStorage.getItem('dev_avg_session') || '0'),
      bounceRate: parseFloat(localStorage.getItem('dev_bounce_rate') || '0'),
      topPages: JSON.parse(localStorage.getItem('dev_top_pages') || '[]'),
      deviceBreakdown: JSON.parse(localStorage.getItem('dev_device_breakdown') || '{"mobile":0,"tablet":0,"desktop":0}'),
      userEngagement: JSON.parse(localStorage.getItem('dev_user_engagement') || '{"low":0,"medium":0,"high":0}'),
    };
    setSummary(mockSummary);
  };

  const testAnalyticsEvent = (eventType: string) => {
    switch (eventType) {
      case 'pageview':
        Analytics.trackPageView('/test-page', 'Test Page View');
        break;
      case 'engagement':
        Analytics.trackEngagement('interaction', { test: true });
        break;
      case 'conversion':
        Analytics.trackEvent('test_conversion', {
          event_category: 'test',
          event_label: 'dashboard_test',
          value: 1,
        });
        break;
      case 'performance':
        Analytics.trackPerformance({
          page_load_time: 1500,
          first_contentful_paint: 800,
        });
        break;
    }
  };

  if (!isVisible || !summary) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 10000,
      maxWidth: '300px',
      fontFamily: 'monospace',
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#00ff00' }}>📊 Analytics Dashboard (Dev)</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Session Metrics:</strong>
        <div>Page Views: {summary.pageViews}</div>
        <div>Unique Visitors: {summary.uniqueVisitors}</div>
        <div>Avg Session: {Math.round(summary.averageSessionDuration)}s</div>
        <div>Bounce Rate: {(summary.bounceRate * 100).toFixed(1)}%</div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Test Events:</strong>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
          <button 
            onClick={() => testAnalyticsEvent('pageview')}
            style={{ fontSize: '10px', padding: '2px 5px', background: '#007acc', border: 'none', color: 'white', borderRadius: '3px', cursor: 'pointer' }}
          >
            PageView
          </button>
          <button 
            onClick={() => testAnalyticsEvent('engagement')}
            style={{ fontSize: '10px', padding: '2px 5px', background: '#28a745', border: 'none', color: 'white', borderRadius: '3px', cursor: 'pointer' }}
          >
            Engagement
          </button>
          <button 
            onClick={() => testAnalyticsEvent('conversion')}
            style={{ fontSize: '10px', padding: '2px 5px', background: '#dc3545', border: 'none', color: 'white', borderRadius: '3px', cursor: 'pointer' }}
          >
            Conversion
          </button>
          <button 
            onClick={() => testAnalyticsEvent('performance')}
            style={{ fontSize: '10px', padding: '2px 5px', background: '#ffc107', border: 'none', color: 'black', borderRadius: '3px', cursor: 'pointer' }}
          >
            Performance
          </button>
        </div>
      </div>

      <button 
        onClick={() => setIsVisible(false)}
        style={{ 
          position: 'absolute', 
          top: '5px', 
          right: '5px', 
          background: 'transparent', 
          border: 'none', 
          color: 'white', 
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ×
      </button>
    </div>
  );
}

export default AnalyticsDashboard;