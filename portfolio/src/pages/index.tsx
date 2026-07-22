import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Analytics, useEnhancedAnalyticsPageTracking, AnalyticsLink } from "../components/Analytics";
import eventsData from "../data/events.json";
import mediumArticles from "../data/medium.json";

interface EventItem {
  name: string;
  eventStartDate: string;
}

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danduh/" },
  { label: "GitHub", href: "https://github.com/danduh" },
  { label: "Medium", href: "https://medium.com/@danduh" },
  { label: "YouTube", href: "https://www.youtube.com/@danduh81" },
];

function cleanArticleLink(link: string): string {
  // Strip RSS tracking params so hrefs stay clean
  return link.split("?")[0];
}

function articlePlatform(link: string): string {
  if (link.includes("itnext.io")) return "ITNEXT";
  if (link.includes("plainenglish.io")) return "JS in Plain English";
  if (link.includes("design-bootcamp") || link.includes("bootcamp.uxdesign"))
    return "Design Bootcamp";
  if (link.includes("medium.com")) return "Medium";
  return "Blog";
}

function shortDate(dateString: string): string {
  const date = new Date(dateString);
  // Pin timeZone so SSR (build, usually UTC) and client render identically.
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Real, data-driven content for the new editorial sections.
const recentConferences = [...(eventsData as EventItem[])]
  .sort(
    (a, b) =>
      new Date(b.eventStartDate).getTime() - new Date(a.eventStartDate).getTime()
  )
  .slice(0, 5);

const latestArticles = [...(mediumArticles as MediumArticle[])]
  .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  .slice(0, 3);

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  // Enhanced analytics tracking for homepage
  const analyticsComponents = useEnhancedAnalyticsPageTracking();

  // Track homepage engagement
  const handleHeroInteraction = (action: string) => {
    Analytics.trackContentInteraction('project', 'homepage_hero', action as any);
  };

  return (
    <Layout
      title={siteConfig.title}
      description="AI Architect building multi-agent systems, model fine-tuning, and production AI platforms at scale."
    >
      {analyticsComponents}
      <main className="home">
        {/* ============ HERO ============ */}
        <section className="home-hero">
          <div className="home-hero__inner">
            <div className="home-hero__lead">
              <span className="home-eyebrow">AI Architect</span>
              <h1 className="home-hero__title">{siteConfig.title}</h1>
              <p className="home-hero__subtitle">
                I build AI platforms that run in production.
              </p>
              <div className="home-hero__cta">
                <AnalyticsLink
                  href="/projects"
                  className="home-btn home-btn--primary"
                  trackingData={{
                    category: 'homepage_cta',
                    label: 'view_projects',
                    value: 2,
                  }}
                  onClick={() => handleHeroInteraction('click')}
                >
                  View Projects →
                </AnalyticsLink>
                <AnalyticsLink
                  href="/contact"
                  className="home-btn home-btn--ghost"
                  trackingData={{
                    category: 'homepage_cta',
                    label: 'get_in_touch',
                    value: 3,
                  }}
                  onClick={() => handleHeroInteraction('click')}
                >
                  Get in Touch
                </AnalyticsLink>
              </div>
            </div>
            <aside className="home-hero__aside">
              <div
                className="home-avatar"
                role="img"
                aria-label="Daniel Ostrovsky"
              />
              <div className="home-socials">
                {SOCIAL_LINKS.map((social) => (
                  <AnalyticsLink
                    key={social.label}
                    href={social.href}
                    className="home-social"
                    isExternal={true}
                    trackingData={{
                      category: 'homepage_social',
                      label: `social_${social.label.toLowerCase()}`,
                      value: 1,
                    }}
                    onClick={() => handleHeroInteraction('click')}
                  >
                    {social.label}
                  </AnalyticsLink>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="home-stats">
          <div className="home-stat">
            <div className="home-stat__value">25+</div>
            <div className="home-stat__label">Years in dev</div>
          </div>
          <div className="home-stat">
            <div className="home-stat__value">30+</div>
            <div className="home-stat__label">Conferences</div>
          </div>
          <div className="home-stat">
            <div className="home-stat__value">Agents</div>
            <div className="home-stat__label">Live in production</div>
          </div>
          <div className="home-stat">
            <div className="home-stat__value">AI-SDLC</div>
            <div className="home-stat__label">Current focus</div>
          </div>
        </section>

        {/* ============ SPOKE AT ============ */}
        <section className="home-spokeat">
          <span className="home-spokeat__label">Spoke at</span>
          <div className="home-spokeat__list">
            {recentConferences.map((conf) => (
              <span key={conf.name} className="home-spokeat__item">
                {conf.name}
              </span>
            ))}
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section className="home-about">
          <p className="home-about__text">
            I’ve been writing code for 25+ years. The last few I’ve spent on a
            single problem: getting AI out of demos and into production — and
            keeping it there.
          </p>
          <p className="home-about__text">
            As AI Architect at Payoneer, I own the AI platform strategy for a
            domain of ~600 engineers: architecture, model selection, and
            infrastructure. That means multi-agent systems on AWS Bedrock
            AgentCore and Azure AI Foundry, a GraphRAG knowledge base with
            ~2.5B tokens indexed, and the MCP/LLM gateways that keep agents
            compliant in a regulated fintech — DORA, the EU AI Act, CPS 230,
            audit trails, and the kill switch.
          </p>
          <p className="home-about__text">
            On the model side, I work with fine-tuning — LoRA, QLoRA, DPO — on
            Azure AI Foundry and open-source models. Not because it’s always
            the answer, but because knowing when it is is half the job.
          </p>
          <p className="home-about__text">
            I’m also co-author of Payoneer’s AI-SDLC framework: redesigning the
            whole development cycle around AI agents, with humans in the loop
            where it matters. Building the platform is the easy part — getting
            600 engineers to change how they work is the real one.
          </p>
        </section>

        {/* ============ LATEST WRITING ============ */}
        <section className="home-writing">
          <div className="home-writing__head">
            <h2 className="home-writing__title">Latest writing</h2>
            <AnalyticsLink
              href="/articles"
              className="home-writing__all"
              trackingData={{
                category: 'homepage_cta',
                label: 'all_articles',
                value: 2,
              }}
              onClick={() => handleHeroInteraction('click')}
            >
              All articles →
            </AnalyticsLink>
          </div>
          <div className="home-writing__list">
            {latestArticles.map((article) => (
              <AnalyticsLink
                key={article.link}
                href={cleanArticleLink(article.link)}
                className="home-article"
                isExternal={true}
                trackingData={{
                  category: 'articles',
                  label: `home_article_${article.title}`,
                  value: 2,
                }}
                onClick={() => handleHeroInteraction('click')}
              >
                <span className="home-article__date">
                  {shortDate(article.pubDate)}
                </span>
                <span className="home-article__title">{article.title}</span>
                <span className="home-article__platform">
                  {articlePlatform(article.link)}
                </span>
              </AnalyticsLink>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
