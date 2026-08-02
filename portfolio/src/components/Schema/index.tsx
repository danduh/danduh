import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// schema.org JSON-LD helpers for the Courses section. Emitting structured data
// helps search engines surface the course as rich results and gives AI crawlers
// an explicit, machine-readable description of each page.
//
// Registered globally in src/theme/MDXComponents.tsx, so pages use them as
// <CourseSchema .../> and <LessonSchema .../> with no import.

const AUTHOR = {
  '@type': 'Person',
  name: 'Daniel Ostrovsky',
  url: 'https://danduh.me',
} as const;

const PROVIDER = {
  '@type': 'Organization',
  name: 'danduh.me',
  url: 'https://danduh.me',
} as const;

function useAbsoluteUrl(path: string): string {
  const {
    siteConfig: {url},
  } = useDocusaurusContext();
  return `${url}${path.startsWith('/') ? path : `/${path}`}`;
}

export interface CourseSchemaProps {
  /** Course title. */
  name: string;
  /** One–two sentence course description. */
  description: string;
  /** Site-root-relative path of the course home, e.g. '/courses/chrome-built-in-ai'. */
  path: string;
}

/** schema.org/Course — put on a course home page. */
export function CourseSchema({
  name,
  description,
  path,
}: CourseSchemaProps): ReactNode {
  const url = useAbsoluteUrl(path);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    author: AUTHOR,
    provider: PROVIDER,
    inLanguage: 'en',
    isAccessibleForFree: true,
  };
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}

export interface LessonSchemaProps {
  /** Lesson/page title. */
  name: string;
  /** One–two sentence page description. */
  description: string;
  /** Site-root-relative path of the page, e.g. '/courses/chrome-built-in-ai/prompt-api'. */
  path: string;
}

/** schema.org/LearningResource — put on an individual course page. */
export function LessonSchema({
  name,
  description,
  path,
}: LessonSchemaProps): ReactNode {
  const url = useAbsoluteUrl(path);
  const courseUrl = useAbsoluteUrl('/courses/chrome-built-in-ai');
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    description,
    url,
    author: AUTHOR,
    provider: PROVIDER,
    inLanguage: 'en',
    isAccessibleForFree: true,
    learningResourceType: 'Tutorial',
    isPartOf: {
      '@type': 'Course',
      name: "Chrome's Built-in AI",
      url: courseUrl,
    },
  };
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
