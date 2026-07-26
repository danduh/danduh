---
name: create-blog-post
description: >
  Scaffold a new blog post for the danduh.me Docusaurus site following this
  repo's conventions — file location, frontmatter, authors/tags, per-article
  image folders (static/img/<slug>/), the excerpt marker, mermaid diagrams, and
  canonical links for syndicated posts. Use whenever creating, adding, or
  drafting a blog post / article in this repo.
---

# Create a blog post (danduh.me)

The blog is a Docusaurus 3.8 blog living under `portfolio/`. Follow these
conventions so posts build cleanly and stay AI/SEO-friendly.

## 1. File location & naming

- Posts live in `portfolio/blog/`.
- One file per post: `portfolio/blog/YYYY-MM-DD-<slug>.mdx`
  - Use `.mdx` (not `.md`) so you can use `<Head>` / JSX (needed for canonical links).
  - The `YYYY-MM-DD` prefix sets ordering; the public URL comes from the `slug`
    frontmatter, so it's `/blog/<slug>`.

## 2. Frontmatter template

```yaml
---
title: "Your Title"
description: "One or two sentences — used for SEO and link previews."
slug: your-slug
authors: [danduh]            # must be defined in portfolio/blog/authors.yml
tags: [ai, architecture]     # must be defined in portfolio/blog/tags.yml
date: 2026-01-05
image: /img/your-slug/card.png   # optional social/link-preview card (absolute path)
keywords:
  - keyword one
  - keyword two
---
```

- **Authors** are defined once in `portfolio/blog/authors.yml`; **tags** in
  `portfolio/blog/tags.yml`. The build is configured with
  `onInlineAuthors: 'throw'` and `onInlineTags: 'throw'`, so any author/tag you
  reference **must already exist** in those files — add it there first.

## 3. Excerpt / "read more"

Put the truncation marker right after the intro. Everything above it is the
excerpt shown on the `/blog` list page.

- In `.mdx`: `{/* truncate */}`
- (In plain `.md` it would be `<!-- truncate -->`, but we use `.mdx`.)

## 4. Images — one folder per article

- Store a post's images in **`portfolio/static/img/<slug>/`** (folder named after
  the post `slug`). Create it if it doesn't exist.
- Reference them with an **absolute path** from the site root:

  ```md
  ![Alt text](/img/<slug>/my-image.png)
  ```

- The `image:` social card uses the same scheme: `image: /img/<slug>/card.png`.
- Example: post `ai-amnesia-graphrag` → images in
  `portfolio/static/img/ai-amnesia-graphrag/`, used as
  `/img/ai-amnesia-graphrag/foo.png`.
- Why absolute paths / `static/`: they render into the **static HTML**, so
  JS-less AI crawlers (GPTBot, ClaudeBot, PerplexityBot) actually see them.

## 5. Diagrams (mermaid)

- ```` ```mermaid ```` fenced blocks render as diagrams (`@docusaurus/theme-mermaid`
  is enabled via `markdown.mermaid: true`).
- Caveat: mermaid renders **client-side only**, so the diagram is **not** in the
  static HTML and JS-less crawlers won't see it. For a diagram you want crawlable,
  export it to an image and embed it from `static/img/<slug>/` instead.

## 6. Canonical / syndication (only if published elsewhere too)

- **Original posts:** do nothing — Docusaurus emits a self-canonical to
  `danduh.me`, which is correct.
- **Syndicated posts** (also published on Medium etc., where that copy is
  canonical): add this at the top of the `.mdx`, right after the frontmatter:

  ```mdx
  import Head from '@docusaurus/Head';

  <Head>
    <link rel="canonical" href="https://medium.com/@danduh/…" />
  </Head>
  ```

  This overrides the default and produces a **single** canonical → the other URL.
  Verify with: `grep -c 'rel="canonical"' build/blog/<slug>/index.html` (expect `1`).

## 7. Verify before shipping

```bash
cd portfolio
npm run build      # throws on broken links and undefined authors/tags
npm start          # preview /blog and /blog/<slug>; toggle light/dark
```

Feeds are generated automatically at `/blog/rss.xml` and `/blog/atom.xml`.

## Quick steps

1. Add any new author to `blog/authors.yml` and new tags to `blog/tags.yml`.
2. Create `portfolio/static/img/<slug>/` for the post's images.
3. Create `portfolio/blog/YYYY-MM-DD-<slug>.mdx` with the frontmatter above.
4. Write the intro, add `{/* truncate */}`, then the body; reference images as
   `/img/<slug>/…`.
5. Add the canonical `<Head>` block only if the post is canonical elsewhere.
6. `npm run build` + preview, then open a PR.
