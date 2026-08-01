import React, {useState, type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Analytics} from '@site/src/components/Analytics';

interface Props {
  title: string;
  permalink: string;
}

const XIcon = (): ReactNode => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = (): ReactNode => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const LinkIcon = (): ReactNode => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export default function ShareButtons({title, permalink}: Props): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const url = `${siteConfig.url}${permalink}`;
  const [copied, setCopied] = useState(false);

  const track = (network: string): void => {
    try {
      Analytics.trackContentInteraction('blog', title, `share_${network}`);
    } catch {
      /* analytics is best-effort */
    }
  };

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url,
  )}`;

  const copyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track('copy');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <div className="blog-share">
      <span className="blog-share__label">Share this post</span>
      <div className="blog-share__buttons">
        <a
          className="share-btn"
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on X"
          onClick={() => track('x')}>
          <XIcon />
          <span>X</span>
        </a>
        <a
          className="share-btn"
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on LinkedIn"
          onClick={() => track('linkedin')}>
          <LinkedInIcon />
          <span>LinkedIn</span>
        </a>
        <button
          className="share-btn"
          type="button"
          onClick={copyLink}
          title="Copy link">
          <LinkIcon />
          <span>{copied ? 'Copied!' : 'Copy link'}</span>
        </button>
      </div>
    </div>
  );
}
