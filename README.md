# Personal Academic Homepage

An Astro-powered personal academic homepage with a clean layout, dark mode, MDX, mathematical notation, citations, and article export tools.

This repository is adapted from [MaoSong2022/astro-blog-template](https://github.com/MaoSong2022/astro-blog-template), which is based on Thibaud Frere's [research-article-template](https://huggingface.co/spaces/tfrere/research-article-template).

## Local development

Node.js 20 or newer is required.

```bash
npm ci
npm run dev
```

Open <http://localhost:4321>. Use `npm run build` to generate `dist/`, or `npm run preview` to preview the production build on port 8080.

## Content locations

Personal information in this repository is limited to the public introduction, contact links, publications, news, and academic service shown on the current site.

| Content | Edit this file |
| --- | --- |
| Name, site title, metadata description, email, and Scholar link | `src/consts.ts` |
| Production URL (normally supplied automatically by GitHub Actions) | `site.config.mjs` |
| Avatar | `public/avatar.png` |
| Homepage introduction, research interests, and email/Scholar icons | `src/pages/index.astro` |
| Homepage academic service | `src/data/services.ts` |
| Publications list, displayed on the separate Publications page | `src/data/publications.ts` |
| Homepage News & Updates | `src/data/site-news.ts` |
| First research blog (English) | `src/content/rethinking-weight-decay/article.mdx` |
| First research blog (中文) | `src/content/rethinking-weight-decay-zh/article.mdx` |
| Bibliography | `src/content/bibliography.bib` |
| Site icons | `public/favicon.svg`, `public/favicon.ico` |

### Adding a blog post

Create `src/content/<post-name>/article.mdx` with frontmatter containing `title`, `description`, and `published`, followed by the article content. The directory name becomes the `/blog/<post-name>/` URL. Blog, Browse, RSS, and the sitemap discover posts automatically. The homepage shows the introduction, News & Updates, and Services.

Posts support formulas, code blocks, citations, and the reusable `Note` component. Authors default to `SITE_AUTHOR`, or can be specified in the frontmatter with `authors`.

The first research post is available at `/blog/rethinking-weight-decay/`, with a Chinese translation at `/blog/rethinking-weight-decay-zh/`. Each version declares `language`, `translationUrl`, and `translationLabel` in its frontmatter; the Chinese translation also uses `hiddenFromIndex: true` so Blog, Browse, RSS, and the sitemap list the English post only. Use the same pattern for future translations.

For citations, write `[@key]` in the MDX and add the matching entry to `src/content/bibliography.bib`. The article footer then generates linked author-year citations, the reference list, backreferences, and a copyable BibTeX record automatically. Set `citationKey` in frontmatter when a stable citation key is preferred.

Use `[@key1; @key2]` for one grouped parenthetical citation, or `@key` for a narrative citation such as “Author (year).” The formatter supplies names and parentheses; do not add another pair around `[@key]` or manually repeat the author name. Put equation and theorem numbers in the surrounding prose. The weight-decay post uses LaTeX pseudocode images: edit the `.tex` sources under `public/blog/rethinking-weight-decay/algorithms/`, compile them, and render the matching `.png` files at 450 dpi or higher. Keep intermediate PDFs and build files in ignored `reference/`; both language versions share the images and link to the editable source. For other posts, the optional `src/components/Algorithm.astro` wrapper supports numbered MDX steps and LaTeX math.

The complete `rethinking_weight_decay_release_20261011.zip` bundle is extracted under `reference/` for local reference. The archive and directory are ignored by Git. Only the web article and its linked figure exports are kept in the public site, so raw experiment files do not enter commits by accident.

Every new MD/MDX post uses `src/layouts/ArticlePage.astro` and the shared reading styles in `src/styles/_article.css`. The article column grows with the window up to `--article-reading-width` (44 rem by default), with responsive outer gutters, font size, and heading spacing. On wide screens, introductory/body paragraphs are justified; on phones and narrow tablets, they use natural left alignment. Write paragraphs normally without adding manual line breaks to fit one screen.

Images scale down to the article column. Long URLs and inline code can wrap; code blocks preserve their indentation, and wide tables and display equations scroll within their own blocks. The table of contents becomes a drawer below 1100 px, with its button at the bottom left so it does not cover the navigation. The optional `banner.html` header appears only when that embed exists. The Blog index has its own responsive spacing in `src/styles/_site-pages.css`.

### Adding a publication

Add an object to the array in `src/data/publications.ts` with `title`, `authors`, `category`, `date`, `venue`, and `links`:

```ts
{
  title: "Paper title",
  authors: ["Your Name", "Coauthor Name"],
  category: "preprint", // "conference" or "preprint"
  date: "2026-08", // YYYY-MM: conference month or first public preprint release
  venue: "arXiv preprint",
  links: [{ label: "arXiv", url: "https://arxiv.org/abs/your-paper-id" }],
}
```

Conference Papers appear before Preprints; each group is sorted by `date` from newest to oldest. Entries from the same month retain their array order. Author names matching `SITE_AUTHOR` are bold automatically, including names with an equal-contribution asterisk. Add OpenReview, arXiv, Code, or Project links as available; use `links: []` when no public link exists.

The visible email address is stored in an obfuscated form in `SITE_EMAIL_DISPLAY`. `SITE_EMAIL_HREF` derives a standard `mailto:` link from it, so clicking Email opens the visitor's configured mail client.

The homepage uses a left profile sidebar (avatar, name, affiliation, Email, Google Scholar) and a wider introduction column on the right. It switches to a single column on small screens. The Email and Google Scholar icons are direct links. The introduction, research interests, News & Updates, and Services live on the homepage; Publications and Blog have their own pages. There is no separate About page or stored private profile timeline.

### Adjusting the homepage layout and updates

In the `.home-layout` style block in `src/pages/index.astro`, `--home-column-gap: clamp(1.25rem, 3vw, 2.5rem)` scales the column gap with the window width, within a 20–40 px range at the default font size. The sidebar fits its content using `fit-content(var(--home-sidebar-width))`; `--home-sidebar-width` is its preferred upper limit (14 rem), while the university name remains on one line. The overall homepage width and responsive outer padding are set by `.site-page--home` in `src/styles/_site-pages.css`.

Text size and section spacing also scale within small limits. Introductory paragraphs use justified text on wider screens and natural left alignment below 48 rem, where the profile and content stack vertically. Text in the introduction can wrap at normal spaces. News dates move above their text below 30 rem so the links have enough room.

With `npm run dev` running, saving a change updates the local preview automatically.

Edit News & Updates in `src/data/site-news.ts`; `src/components/NewsList.astro` sorts the items newest first. Dates may use `YYYY-MM` or `YYYY-MM-DD`, and month-only dates display without an invented day. Each item's `content` is an array of plain text and individual links, so several papers or resources can have their own destinations:

```ts
{
  date: "2026-08",
  content: [
    "A new preprint: ",
    { text: "Paper title", href: "https://arxiv.org/abs/your-paper-id" },
    ". See the ",
    { text: "code", href: "https://github.com/username/project" },
    ".",
  ],
}
```

Keep spaces and punctuation in the plain text strings. Academic service is maintained in `ACADEMIC_SERVICES` in `src/data/services.ts` and rendered by `src/components/ServiceList.astro`.

### Optional tools

The upstream PDF, LaTeX, image export, Notion import, and LaTeX conversion scripts remain available: `export:pdf`, `export:latex`, `export:images`, `notion:import`, and `latex:convert`. Their detailed options are documented in `scripts/`; they were not all exercised during this homepage setup.

The `sync:template*` commands synchronize from the older research-article-template upstream and may overwrite local changes. Commit or back up your work first, and run `npm run sync:template:dry` before applying a synchronization.

## Deployment

Repository: [doodlext/doodlext.github.io](https://github.com/doodlext/doodlext.github.io)  
Website: [https://doodlext.github.io/](https://doodlext.github.io/)

The local repository uses `main` and the SSH remote `git@github.com:doodlext/doodlext.github.io.git`. It starts with clean history; required upstream attribution remains in this README, `NOTICE`, `LICENSE`, and the site footers.

### First publication

1. Review the files, create your first commit, and push from this project folder:

   ```bash
   git status
   git add -A
   git commit -m "Set up personal academic homepage"
   git push -u origin main
   ```

2. Open [Settings → Pages](https://github.com/doodlext/doodlext.github.io/settings/pages). Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open [Actions → Deploy Astro to GitHub Pages](https://github.com/doodlext/doodlext.github.io/actions/workflows/deploy.yml) and wait for the build and deployment to succeed. If the first run started before Pages was enabled, select **Re-run all jobs** or **Run workflow**.
4. Visit [https://doodlext.github.io/](https://doodlext.github.io/) after deployment succeeds.

The workflow builds pushes to `main` and obtains the production URL from GitHub Pages. Canonical tags, social metadata, RSS, sitemap, and `robots.txt` use that URL. Local builds default to `https://doodlext.github.io`; set `SITE_URL` only to override it:

```bash
npm run build
npm run preview
```

These steps follow [GitHub's custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). For future updates, edit your content, then commit and push:

```bash
git add -A
git commit -m "Update homepage content"
git push
```

This configuration supports a personal Pages repository at the domain root. Project sites under `/REPOSITORY/` require additional Astro `base` and link/asset changes. For a custom domain, configure DNS and **Settings → Pages**, and add `public/CNAME` containing that domain. The workflow will use the Pages URL for the next build.

### Keeping local files private

`.gitignore` excludes local environment files, private keys, importer page IDs and output, local editor settings, backups, dependencies, and build output. It also excludes the retired About/profile files and the `private/` and `local-only/` directories to help prevent accidental reintroduction. Safe importer examples remain available in `scripts/notion-importer/`; copy and customize them locally when needed. Keep unpublished personal details outside this repository and review `git diff --cached` before committing new content. The current public introduction, publications, and working email link are intentionally included. An ignore rule does not remove information from existing commits.

## Credits

- This site is based on [MaoSong2022/astro-blog-template](https://github.com/MaoSong2022/astro-blog-template). Thank you to MaoSong2022 for the blog template.
- That template is derived from Thibaud Frere's [research-article-template](https://huggingface.co/spaces/tfrere/research-article-template). The research-article components, math and citation processing, and export tooling come from that upstream project.
- The project uses [Astro](https://astro.build/), [MDX](https://mdxjs.com/), [KaTeX](https://katex.org/), [rehype-citation](https://github.com/timlrx/rehype-citation), [Mermaid](https://mermaid.js.org/), and [Shiki](https://shiki.style/).

### This adaptation

The blog template has been organized as an academic homepage. The original showcase article and the placeholder research note were replaced with a bilingual research blog; showcase-only charts, datasets, and media were removed; a separate Publications page was added; the homepage contains the personal introduction, research interests, three news updates, and academic service; the redundant About page was removed; and the default third-party analytics script was removed. The two-level upstream credit and license information remain in the page footers and repository files.

## License

The original template and its adapted portions are licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). The full license is preserved in [LICENSE](./LICENSE), and the attribution and modification record is in [NOTICE](./NOTICE).

Please retain the source attribution, license link, and modification notice. The site and article footers include the required attribution. Your own articles may use a separate license; `SITE_LICENSE` is empty by default and does not automatically apply an upstream article license to your writing.
