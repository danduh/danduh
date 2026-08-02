import React, {useState, useEffect, type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Analytics} from '@site/src/components/Analytics';

interface Props {
  title: string;
  permalink: string;
  placement?: 'top' | 'bottom';
}

const XIcon = (): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const BlueskyIcon = (): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.829.624-5.79.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
  </svg>
);

const LinkedInIcon = (): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const RedditIcon = (): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0Zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const HackerNewsIcon = (): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M0 0v24h24V0H0Zm12.99 12.53v4.72h-1.98v-4.72L6.9 4.6h2.29l3.03 6.02 3.03-6.02h2.19l-4.45 7.93Z" />
  </svg>
);

const LinkIcon = (): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CheckIcon = (): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ShareNativeIcon = (): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export default function ShareButtons({
  title,
  permalink,
  placement = 'bottom',
}: Props): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const url = `${siteConfig.url}${permalink}`;
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  const track = (network: string): void => {
    try {
      // GA4 recommended "share" event. Use the generic trackEvent (not
      // trackContentInteraction, whose content_type/interaction_type unions
      // don't cover blog shares) so we keep the target network.
      Analytics.trackEvent('share', {
        event_category: 'blog',
        event_label: `${network}_${title}`,
        custom_parameter_2: network,
        value: 1,
      });
    } catch {
      /* analytics is best-effort */
    }
  };

  const enc = encodeURIComponent;
  const links: Record<string, string> = {
    x: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
    bluesky: `https://bsky.app/intent/compose?text=${enc(`${title} ${url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    reddit: `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title)}`,
    hn: `https://news.ycombinator.com/submitlink?u=${enc(url)}&t=${enc(title)}`,
  };

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

  const nativeShare = async (): Promise<void> => {
    try {
      await navigator.share({title, url});
      track('native');
    } catch {
      /* user cancelled or unsupported */
    }
  };

  const NetworkButton = ({
    network,
    href,
    label,
    Icon,
  }: {
    network: string;
    href: string;
    label: string;
    Icon: () => ReactNode;
  }): ReactNode => (
    <a
      className="share-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      onClick={() => track(network)}>
      <Icon />
    </a>
  );

  return (
    <div className={`blog-share blog-share--${placement}`}>
      <span className="blog-share__label">
        {placement === 'top' ? 'Share' : 'Share this post'}
      </span>
      <div className="blog-share__buttons">
        {canNativeShare && (
          <button
            className="share-btn"
            type="button"
            title="Share…"
            aria-label="Share"
            onClick={nativeShare}>
            <ShareNativeIcon />
          </button>
        )}
        <NetworkButton network="x" href={links.x} label="Share on X" Icon={XIcon} />
        <NetworkButton network="bluesky" href={links.bluesky} label="Share on Bluesky" Icon={BlueskyIcon} />
        <NetworkButton network="linkedin" href={links.linkedin} label="Share on LinkedIn" Icon={LinkedInIcon} />
        <NetworkButton network="reddit" href={links.reddit} label="Share on Reddit" Icon={RedditIcon} />
        <NetworkButton network="hn" href={links.hn} label="Share on Hacker News" Icon={HackerNewsIcon} />
        <button
          className="share-btn"
          type="button"
          title={copied ? 'Copied!' : 'Copy link'}
          aria-label="Copy link"
          onClick={copyLink}>
          {copied ? <CheckIcon /> : <LinkIcon />}
        </button>
      </div>
    </div>
  );
}
