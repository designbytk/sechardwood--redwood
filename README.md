# SEC - redwood

A static website prototype for SEC Hardwood Services, organized around the current site content and implementation. It includes the Home, About, Services, Blog, and Contact pages, three focused service pages, and nine articles. Shared HTML patterns, the local design system in `assets/site.css`, and progressive enhancements in `assets/site.js` support the responsive navigation, service links, article filters, and inquiry email-draft flow. Images, fonts, styles, and scripts are stored in the project.

## Preview

With Node.js 22 or newer installed, start a local preview from the project root. No dependency installation is needed:

```sh
npm start
```

Visit http://localhost:8766. All 17 pages and their image assets live in this folder. `npm run dev` runs the same server. Stop it with Ctrl+C, or run this from another terminal in the project root:

```sh
npm stop
```

The Node server (`scripts/serve.mjs`) serves local files with caching disabled; refresh the browser after edits. It binds to the local machine only. To use another port, run `PORT=8767 npm start` and stop it with `PORT=8767 npm stop`; the verification script expects the default port 8766. The stop command identifies this project and does not kill arbitrary processes using the port. Servers started before the stop command was added need to be stopped with Ctrl+C once and restarted.

## Editing and verification

The site is maintained directly in its HTML files, `assets/site.css`, and `assets/site.js`; no build step is required. The old prototype importer was removed because its templates no longer matched the current site.

The preview server uses Node. The optional verification script still uses Python with BeautifulSoup and Playwright (including its Chromium browser).

With the preview server running, `python3 scripts/verify.py` uses Playwright to check every route at 1440, 768 and 390px, local links/assets, image loading, JavaScript errors, mobile navigation, journal filtering, Services navigation and the email-draft form. Results and homepage screenshots are saved in `qa/`.

See `OXYGEN-HANDOFF.md` for component mapping, content migration, and production integration work. The form prepares an email draft; it does not submit to a backend. The prototype is intentionally noindex.

## Page architecture

See `SITE-STRUCTURE.md`: five main pages, three nested Services pages, nine blog posts. Service topics are grouped within Hardwood Flooring Installation, Dustless Refinishing, and Additions & Remodeling; all quote CTAs lead to Contact. `sitemap.xml` contains exactly those 17 content URLs.

## Hardwood-first direction

Hardwood installation and dustless refinishing lead the homepage imagery, service choices, feature stories, and featured articles. Services lists those offerings first, followed by a clearly separated additional-services section. About and Contact reinforce the hardwood focus. The 17-page architecture and all nine blog topics remain intact. Use plain text links and buttons without decorative diagonal arrows.

Current service order: Hardwood Flooring Installation; Dustless Refinishing; Additions & Remodeling. Each has a dedicated Services subpage. Total: five main pages, three service subpages, nine blog posts (17 pages).

## CSS class conventions

Name classes for contractor content and reusable components. Use lowercase kebab-case for components, `component__element` for their parts, and `component--modifier` for variants. Keep common utilities (`skip-link`, `sr-only`) and interaction states (`is-open`) separate.

- Homepage: `home-hero`, `services-overview`, `service-card`, `company-introduction`, `service-feature`, `company-values`, `homeowner-advice`, and `company-links`.
- Shared layout: `contact-strip`, `site-header`, `site-brand`, `site-nav__toggle`, `site-nav__services`, `quote-banner`, and `site-footer`.
- Content: `service-row__content`, `service-row--reversed`, `company-credentials`, `article-grid`, `article-card`, and `related-articles`.
- Inquiries: `inquiry-form__fields`, `inquiry-form__submit`, `inquiry-form__status`, and `inquiry-form__email-draft`.

Use these names in HTML, CSS, JavaScript, and QA selectors together. New markup uses the component names directly.
