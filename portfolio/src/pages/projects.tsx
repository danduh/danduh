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
  /** Shown large at the top of the page, with its image. */
  featured?: boolean;
  image?: string;
  imageAlt?: string;
}

function track(project: Project) {
  Analytics.trackContentInteraction('project', project.name, 'click');
}

function FeaturedProject({project}: {project: Project}): ReactNode {
  return (
    <a
      className="project-feature"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(project)}>
      {project.image && (
        <div className="project-feature__media">
          <img
            src={project.image}
            alt={project.imageAlt ?? ''}
            width={1200}
            height={750}
            loading="eager"
          />
        </div>
      )}
      <div className="project-feature__body">
        <span className="home-eyebrow">{project.tag}</span>
        <h2 className="project-feature__name">{project.name}</h2>
        <p className="project-feature__tagline">{project.tagline}</p>
        <p className="project-feature__desc">{project.description}</p>
        <span className="project-feature__cta">{project.cta} →</span>
      </div>
    </a>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  return (
    <a
      className="project-row"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(project)}>
      <span className="project-row__index">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="project-row__main">
        <h3 className="project-row__name">{project.name}</h3>
        <p className="project-row__tagline">{project.tagline}</p>
        <p className="project-row__desc">{project.description}</p>
      </div>
      <div className="project-row__side">
        <span className="project-row__tag">{project.tag}</span>
        <span className="project-row__cta">{project.cta} →</span>
      </div>
    </a>
  );
}

export default function Projects(): ReactNode {
  useEnhancedAnalyticsPageTracking();
  const projects = projectsData as Project[];
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => p !== featured);
  return (
    <Layout
      title="Projects"
      description="Things I've built: interactive 3D agent patterns, browser-native AI, developer tooling, and Chrome extensions.">
      {/* "home" supplies the editorial tokens (fonts, colors, dark mode) */}
      <main className="home projects-page">
        <header className="projects-head">
          <span className="home-eyebrow">Side projects</span>
          <h1 className="projects-head__title">Things I've built</h1>
          <p className="projects-head__lead">
            Interactive agent patterns, browser-native AI, and small extensions
            that scratch a real itch.
          </p>
        </header>

        {featured && (
          <section className="projects-featured" aria-label="Featured project">
            <FeaturedProject project={featured} />
          </section>
        )}

        <section className="projects-list" aria-label="More projects">
          <h2 className="projects-list__title">More projects</h2>
          <div className="projects-list__items">
            {others.map((project, i) => (
              <ProjectRow key={project.url} project={project} index={i} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
