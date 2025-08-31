import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Projects(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="GitHub Projects"
      description="Explore my open source projects and contributions">
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <div className="container">
            <h1 className="portfolio-title">GitHub Projects</h1>
            <p className="portfolio-description">
              Check out my open source projects and contributions on GitHub.
            </p>
            <div className="portfolio-buttons">
              <Link
                className="portfolio-button-primary"
                to="/">
                Back to Home
              </Link>
              <a
                className="portfolio-button-secondary"
                href="https://github.com/danielostrovsky"
                target="_blank"
                rel="noopener noreferrer">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
