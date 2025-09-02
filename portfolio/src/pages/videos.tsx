import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import videosData from '@site/src/data/videos.json';
import styles from '../css/videos.module.css';
import { Analytics, useEnhancedAnalyticsPageTracking, AnalyticsLink } from "../components/Analytics";

interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  // Categories: manually assigned based on video content
  category?: 'talks' | 'tutorials' | 'demos';
}

type FilterCategory = 'all' | 'talks' | 'tutorials' | 'demos';

// Function to assign categories based on title keywords
const getCategoryFromTitle = (title: string): 'talks' | 'tutorials' | 'demos' => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('conference') || lowerTitle.includes('talk') || lowerTitle.includes('panel')) {
    return 'talks';
  } else if (lowerTitle.includes('tutorial') || lowerTitle.includes('guide') || lowerTitle.includes('how to')) {
    return 'tutorials';
  } else {
    return 'demos';
  }
};

export default function Videos(): React.ReactNode {
  // Enhanced analytics tracking for videos page
  const analyticsComponents = useEnhancedAnalyticsPageTracking();

  const videos: Video[] = useMemo(() => {
    return (videosData as Video[]).map(video => ({
      ...video,
      category: getCategoryFromTitle(video.title)
    }));
  }, []);
  
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Track filter usage
  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter);
    Analytics.trackEvent('filter_change', {
      event_category: 'videos',
      event_label: filter,
      custom_parameter_2: 'videos',
      value: 1,
    });
  };

  // Filter videos based on the active filter
  const filteredVideos = useMemo(() => {
    if (activeFilter === 'all') {
      return videos;
    }
    return videos.filter(video => video.category === activeFilter);
  }, [videos, activeFilter]);

  return (
    <Layout
      title="Videos"
      description="Watch my latest videos, talks, and tutorials">
      {analyticsComponents}
      <main className={styles['videos-page']}>
        <div className={styles['videos-container']}>
          <div className={styles['videos-header']}>
            <h1 className={styles['videos-title']}>Talks & Tutorials</h1>
            <p className={styles['videos-subtitle']}>
              A collection of my talks, tutorials, and project demos.
            </p>
          </div>

          <div className={styles['filter-container']}>
            <div className={styles['filter-buttons']}>
              <button 
                className={`${styles['filter-button']} ${activeFilter === 'all' ? styles.active : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button 
                className={`${styles['filter-button']} ${activeFilter === 'talks' ? styles.active : ''}`}
                onClick={() => handleFilterChange('talks')}
              >
                Talks
              </button>
              <button 
                className={`${styles['filter-button']} ${activeFilter === 'tutorials' ? styles.active : ''}`}
                onClick={() => handleFilterChange('tutorials')}
              >
                Tutorials
              </button>
              <button 
                className={`${styles['filter-button']} ${activeFilter === 'demos' ? styles.active : ''}`}
                onClick={() => handleFilterChange('demos')}
              >
                Project Demos
              </button>
            </div>
          </div>

          <div className={styles['video-grid']}>
            {filteredVideos.map((video) => (
              <div key={video.id} className={styles['video-card']}
                onClick={() => {
                  Analytics.trackContentInteraction('video', video.title, 'view');
                  Analytics.trackEvent('video_engagement', {
                    event_category: 'videos',
                    event_label: video.title,
                    custom_parameter_2: video.category || 'uncategorized',
                    value: 2,
                  });
                }}
              >
                <div className={styles['video-wrapper']}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={styles['video-iframe']}
                    onLoad={() => {
                      Analytics.trackEvent('video_load', {
                        event_category: 'performance',
                        event_label: video.title,
                        custom_parameter_2: 'video_performance',
                      });
                    }}
                  ></iframe>
                </div>
                <div className={styles['video-info']}>
                  <h3 className={styles['video-title']}>{video.title}</h3>
                  <p className={styles['video-description']}>
                    {video.description || 'No description available'}
                  </p>
                  <p className={styles['video-date']}>
                    {new Date(video.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
