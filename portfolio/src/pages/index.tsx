import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="UI & AI Architect specializing in crafting intuitive user interfaces and intelligent systems"
    >
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
              <Link className="portfolio-button-primary" to="/projects">
                View Projects
              </Link>
              <Link className="portfolio-button-secondary" to="/contact">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
