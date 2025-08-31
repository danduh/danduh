import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Conferences(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Conferences"
      description="My conference talks and presentations">
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <div className="container">
            <h1 className="portfolio-title">Conferences</h1>
            <p className="portfolio-description">
              See my speaking engagements and conference presentations.
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
