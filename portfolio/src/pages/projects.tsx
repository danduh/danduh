import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import projectsData from '../data/projects.json';
import {useEnhancedAnalyticsPageTracking, Analytics} from '../components/Analytics';

interface Project {
  name: string;
  tag: string;
  tagline: string;
  description: string;
  url: string;
  cta: string;
}

function ProjectCard({project}: {project: Project}): ReactNode {
  return (
    <a
      className="project-card"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        Analytics.trackContentInteraction('project', project.name, 'click')
      }>
      <span className="project-card__tag">{project.tag}</span>
      <h2 className="project-card__name">{project.name}</h2>
      <p className="project-card__tagline">{project.tagline}</p>
      <p className="project-card__desc">{project.description}</p>
      <span className="project-card__cta">{project.cta} →</span>
    </a>
  );
}

export default function Projects(): ReactNode {
  useEnhancedAnalyticsPageTracking();
  const projects = projectsData as Project[];
  return (
    <Layout
      title="Projects"
      description="Things I've built — browser-native AI, developer tooling, and Chrome extensions.">
      <main className="portfolio-hero">
        <section className="portfolio-section">
          <h1 className="portfolio-title">Projects</h1>
          <p className="portfolio-description" style={{textAlign: 'center'}}>
            A few things I've built — browser-native AI, developer tooling, and
            small extensions that scratch a real itch.
          </p>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.url} project={project} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
