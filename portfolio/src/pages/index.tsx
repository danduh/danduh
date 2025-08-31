import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="UI & AI Architect specializing in crafting intuitive user interfaces and intelligent systems">
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <div className="container">
            <div className="portfolio-avatar"></div>
            <h1 className="portfolio-title">{siteConfig.title}</h1>
            <p className="portfolio-subtitle">{siteConfig.tagline}</p>
            <p className="portfolio-description">
              I specialize in crafting intuitive user interfaces and intelligent systems.
              My work is at the intersection of design and artificial intelligence,
              creating seamless and engaging user experiences.
            </p>
            <div className="portfolio-buttons">
              <Link
                className="portfolio-button-primary"
                to="/projects">
                View Projects
              </Link>
              <Link
                className="portfolio-button-secondary"
                to="/contact">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
