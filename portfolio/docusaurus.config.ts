import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Daniel Ostrovsky',
  tagline: 'UI & AI Architect',
  favicon: 'img/favicon.ico',

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
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
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
        // {
        //   to: '/projects',
        //   label: 'GitHub Projects',
        //   position: 'left',
        // },
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
              label: 'GitHub Projects',
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
              href: 'https://twitter.com/danielostrovsky',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/danielostrovsky',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/danielostrovsky',
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
  } satisfies Preset.ThemeConfig,
  plugins: [
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
  ],

};

export default config;
