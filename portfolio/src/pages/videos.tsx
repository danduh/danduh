import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Videos(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Videos"
      description="Watch my latest videos and talks">
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <div className="container">
            <h1 className="portfolio-title">Videos</h1>
            <p className="portfolio-description">
              Check out my latest videos, talks, and presentations.
            </p>
            <div className="portfolio-buttons">
              <Link
                className="portfolio-button-primary"
                to="/">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
