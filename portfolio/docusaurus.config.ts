import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Daniel Ostrovsky',
  tagline: 'AI Architect',
  favicon: 'img/favicon.ico',

  // Editorial fonts used by the homepage redesign.
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    // Load the Google Fonts stylesheet asynchronously so it doesn't block
    // first paint: preload it, then flip media from print→all once it lands.
    // A render-blocking <link rel="stylesheet"> here would delay FCP.
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        media: 'print',
        onload: "this.media='all';this.onload=null;",
      },
    },
  ],

  // Render ```mermaid code blocks as diagrams (used in blog posts).
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://danduh.me',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'danduh', // Usually your GitHub org/user name.
  projectName: 'danduh', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        // docs: {
        //   sidebarPath: './sidebars.ts',
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        blog: {
          path: 'blog',
          routeBasePath: '/blog',
          blogTitle: 'Blog — Daniel Ostrovsky',
          blogDescription:
            'Essays on AI architecture, multi-agent systems, LLMs, and building AI that runs in production.',
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'Daniel Ostrovsky — Blog',
            description:
              'Essays on AI architecture, agents, and production AI by Daniel Ostrovsky.',
            copyright: `Copyright © ${new Date().getFullYear()} Daniel Ostrovsky.`,
            xslt: true,
          },
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-55HQHJK170',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Daniel Ostrovsky',
      logo: {
        alt: 'Daniel Ostrovsky Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: '/courses',
          label: 'Courses',
          position: 'left',
        },
        {
          to: '/videos',
          label: 'Videos',
          position: 'left',
        },
        {
          to: '/articles',
          label: 'Articles',
          position: 'left',
        },
        {
          to: '/conferences',
          label: 'Conferences',
          position: 'left',
        },
        {
          to: '/projects',
          label: 'Projects',
          position: 'left',
        },
        {
          to: '/contact',
          label: 'Contact',
          position: 'left',
        },
        {
          href: 'https://www.linkedin.com/in/danduh/',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://medium.com/@danduh',
          label: 'Medium',
          position: 'right',
        },
        {
          href: 'https://github.com/danduh',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://linktr.ee/danduh',
          label: 'Linktree',
          position: 'right',
        },
        {
          href: 'https://www.youtube.com/@danduh81',
          label: 'YouTube',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Navigation',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Videos',
              to: '/videos',
            },
            {
              label: 'Articles',
              to: '/articles',
            },
            {
              label: 'Conferences',
              to: '/conferences',
            },
            {
              label: 'Projects',
              to: '/projects',
            },
            {
              label: 'Contact',
              to: '/contact',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Twitter',
              href: 'https://x.com/danduh81',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/danduh/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/danduh',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Daniel Ostrovsky. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Click-to-zoom (lightbox) for content images — handy for the diagrams.
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgba(20, 20, 25, 0.9)',
        dark: 'rgba(10, 10, 12, 0.95)',
      },
      config: {
        margin: 24,
      },
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    // Dedicated docs instance for long-form Courses (multi-page, sidebar,
    // prev/next, breadcrumbs, auto-sitemap). Kept separate from the (disabled)
    // default docs and the blog. Each course = a top-level category folder
    // under `courses/`.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'courses',
        path: 'courses',
        routeBasePath: 'courses',
        sidebarPath: './sidebarsCourses.ts',
        showLastUpdateTime: true,
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1280, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 3, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    'docusaurus-plugin-image-zoom',
  ],

};

export default config;
