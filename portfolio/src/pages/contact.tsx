import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Contact(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Contact"
      description="Get in touch with Daniel Ostrovsky">
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <div className="container">
            <h1 className="portfolio-title">Get in Touch</h1>
            <p className="portfolio-description">
              I'm always interested in new opportunities and collaborations.
              Feel free to reach out if you'd like to work together or just say hello!
            </p>
            <div className="portfolio-buttons">
              <a
                className="portfolio-button-primary"
                href="mailto:daniel@example.com">
                Send Email
              </a>
              <a
                className="portfolio-button-secondary"
                href="https://linkedin.com/in/danielostrovsky"
                target="_blank"
                rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
