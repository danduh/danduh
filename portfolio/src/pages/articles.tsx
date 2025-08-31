import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Articles(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Articles"
      description="Read my latest articles and blog posts">
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <div className="container">
            <h1 className="portfolio-title">Articles</h1>
            <p className="portfolio-description">
              Read my thoughts on UI design, AI, and technology.
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
