import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import videosData from '@site/src/data/videos.json';
import styles from '../css/videos.module.css';

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
  const videos: Video[] = useMemo(() => {
    return (videosData as Video[]).map(video => ({
      ...video,
      category: getCategoryFromTitle(video.title)
    }));
  }, []);
  
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

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
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`${styles['filter-button']} ${activeFilter === 'talks' ? styles.active : ''}`}
                onClick={() => setActiveFilter('talks')}
              >
                Talks
              </button>
              <button 
                className={`${styles['filter-button']} ${activeFilter === 'tutorials' ? styles.active : ''}`}
                onClick={() => setActiveFilter('tutorials')}
              >
                Tutorials
              </button>
              <button 
                className={`${styles['filter-button']} ${activeFilter === 'demos' ? styles.active : ''}`}
                onClick={() => setActiveFilter('demos')}
              >
                Project Demos
              </button>
            </div>
          </div>

          <div className={styles['video-grid']}>
            {filteredVideos.map((video) => (
              <div key={video.id} className={styles['video-card']}>
                <div className={styles['video-wrapper']}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={styles['video-iframe']}
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
