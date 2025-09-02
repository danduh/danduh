import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Analytics, useEnhancedAnalyticsPageTracking, AnalyticsLink } from "../components/Analytics";

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
      description="UI & AI Architect specializing in crafting intuitive user interfaces and intelligent systems"
    >
      {analyticsComponents}
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <div className="container">
            <div className="portfolio-avatar">
            </div>
            <h1 className="portfolio-title">{siteConfig.title}</h1>
            <h1 className="portfolio-subtitle">{siteConfig.tagline}</h1>
            <h2>AI is at the heart of what I do.</h2>
            <p className="portfolio-description">
              I design and build systems where artificial intelligence isn’t
              just a buzzword - it actually powers real workflows. From
              Generative UI (user intent → adaptive interfaces) to AI-powered
              testing tools, I explore how AI can change the way we code,
              design, and ship products.
            </p>
            <p className="portfolio-description">
              I’m also building cool things around the Model Context Protocol
              (MCP), creating smarter ways for AI agents to plug into
              development, design systems, and everyday engineering tasks. My
              focus is on making AI practical, scalable, and part of the
              developer’s toolbox.{" "}
            </p>
            <p className="portfolio-description">
              Along the way, I’ve led large frontend modernizations with
              micro-frontends, React, TypeScript, and design systems. I speak at
              international conferences, write about the future of web and AI,
              and hack on side projects like Chrome extensions and
              prompt-management tools.{" "}
            </p>
            <p className="portfolio-description">
              When I’m not busy pushing AI into the frontend world, you’ll
              probably find me sailing at sunrise or sharing ideas with the tech
              community.{" "}
            </p>
            <div className="portfolio-buttons">
              <AnalyticsLink
                href="/projects"
                className="portfolio-button-primary"
                trackingData={{
                  category: 'homepage_cta',
                  label: 'view_projects',
                  value: 2,
                }}
                onClick={() => handleHeroInteraction('click')}
              >
                View Projects
              </AnalyticsLink>
              <AnalyticsLink
                href="/contact"
                className="portfolio-button-secondary"
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
        </section>
      </main>
    </Layout>
  );
}
