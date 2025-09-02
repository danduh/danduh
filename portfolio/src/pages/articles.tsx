import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import mediumArticles from "../data/medium.json";
import { useEnhancedAnalyticsPageTracking, AnalyticsLink, Analytics } from "../components/Analytics";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  image: string;
  excerpt: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function cleanExcerpt(excerpt: string): string {
  // Remove HTML entities and "Continue reading on Medium" text
  return excerpt
    .replace(/&#x[\d\w]+;/g, "")
    .replace(/Continue reading on Medium.*$/g, "")
    .replace(/…$/, "")
    .trim();
}

function handleShare(title: string, url: string): void {
  // Track share action
  Analytics.trackContentInteraction('article', title, 'share');
  Analytics.trackEvent('content_share', {
    event_category: 'articles',
    event_label: title,
    custom_parameter_2: 'content_sharing',
    value: 2,
  });

  if (navigator.share) {
    navigator.share({
      title: title,
      url: url,
    });
  } else {
    // Fallback to copying to clipboard
    navigator.clipboard.writeText(url);
    // Track clipboard copy
    Analytics.trackEvent('clipboard_copy', {
      event_category: 'articles',
      event_label: 'share_fallback',
      custom_parameter_2: 'content_sharing',
    });
  }
}

function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}): ReactNode {
  const platformName = article.link.includes("medium.com")
    ? "Medium"
    : article.link.includes("itnext.io")
    ? "ITNEXT"
    : "Personal Blog";

  const isReverse = index % 2 === 1;

  return (
    <article className={`article-card ${isReverse ? "reverse" : ""}`}>
      <img
        src={article.image}
        alt={article.title}
        className="article-image"
        loading="lazy"
      />
      <div className="article-content">
        <div>
          <div className="article-meta">
            <span className="platform">Published on {platformName}</span>
            <div className="separator"></div>
            <span>{formatDate(article.pubDate)}</span>
          </div>

          <h2 className="article-title">
            <AnalyticsLink
              href={article.link}
              isExternal={true}
              trackingData={{
                category: 'articles',
                label: `title_click_${article.title}`,
                value: 2,
              }}
            >
              {article.title}
            </AnalyticsLink>
          </h2>

          <p className="article-excerpt">{cleanExcerpt(article.excerpt)}</p>
        </div>

        <div className="article-footer">
          <AnalyticsLink
            href={article.link}
            isExternal={true}
            className="read-more-btn"
            trackingData={{
              category: 'articles',
              label: `read_more_${article.title}`,
              value: 3,
            }}
            onClick={() => {
              Analytics.trackContentInteraction('article', article.title, 'click');
            }}
          >
            Read More
          </AnalyticsLink>
          <button
            className="share-btn"
            onClick={() => handleShare(article.title, article.link)}
            title="Share article"
          >
            Share
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Articles(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const articles: Article[] = mediumArticles;
  
  // Enhanced analytics tracking for articles page
  const analyticsComponents = useEnhancedAnalyticsPageTracking();

  return (
    <Layout
      title="Articles & Insights"
      description="A collection of my thoughts and writings on UI/UX design, artificial intelligence, and the future of technology."
    >
      {analyticsComponents}
      <main className="portfolio-hero">
        <div className="articles-container">
          <div className="articles-header">
            <h1>Articles & Insights</h1>
            <p>
              A collection of my thoughts and writings on UI/UX design,
              artificial intelligence, and the future of technology.
            </p>
          </div>

          <div className="articles-grid">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} index={index} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
