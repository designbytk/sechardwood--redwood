# Oxygen 6 / WordPress handoff

This is a locally runnable design prototype, not an Oxygen import package or a WordPress installation. The current hierarchy has 17 pages: five main destinations, three Services children, and nine posts. Use the current routes and `SITE-STRUCTURE.md`; the older `../EXISTING-PAGES.txt` inventory predates the third service page. Build the final site with editable Oxygen elements and WordPress content, using this HTML as a structural reference.

## Design specification

`DESIGN.md` documents the current SEC Hardwood Services design. Match the local HTML and `assets/site.css`: warm paper and sand surfaces, brown text, rust buttons, orange branding and quote banners, and hardwood-led photography. Use Georama for body text (400, 90% stretch, 18px/1.5) and H3 headings. Use Georama at weight 500 and 110% stretch for all link and button text, including navigation, the linked header brand, card titles, footer links, breadcrumbs, category controls, and form submission. The header wordmark’s strong text is an exception: use the H1 family and weight (Clash Display, 600) at normal width with the existing responsive brand sizes. Apply uppercase styling to navbar links, including the Services submenu. Use Clash Display for H1/H2 (600), non-link footer text, category labels, and form fields (generally 300, with bold treatments at 600). Both active families load locally; the other font files are not a list of required production fonts.

The header brand combines an inline hexagon SVG, SEC lettering, and a Hardwood Services descriptor. The footer uses `assets/svg/sec-hardwood-services-logo-2-2clr.svg` at 160px wide. The current homepage hero layers that logo with `assets/svg/wood-texture.svg` in a desktop panel; both assets exist. The old “LOGO” placeholder and `assets/images/logo.webp` reference are commented out. See `DESIGN.md` for the current hero layout and responsive behavior.

## Global setup

Transfer tokens from `assets/site.css` to your global styles. Use the named classes consistently rather than applying per-element overrides. The prototype uses a maximum width of 1800px, fluid gutters, and layout changes at 1200px (header only), 1100px, 1000px and 760px. Treat these as design targets when setting Oxygen breakpoints. Preserve visible keyboard focus, skip navigation, label associations, image alt text, and reduced-motion behavior.

## Components and templates

| Prototype structure | Suggested Oxygen structure |
| --- | --- |
| `.contact-strip`, `.site-header`, `.site-brand` | Shared header; sticky header region and responsive navigation |
| `.home-hero` | Full-width image, dark gradient, title and CTA; one H1; resolve the unfinished logo block described above |
| `.services-overview__grid` / `.service-card` | Three service categories with images; three columns on desktop and tablet, stacked on mobile |
| `.company-introduction` | Centered company statement |
| `.service-feature` / `.service-feature--reversed` | Reusable image-and-copy component; alternating desktop order and image-first mobile order |
| `.company-values` | Four compact trust statements; 4 / 2 column grid |
| `.homeowner-advice__grid` / `.advice-card` | Three illustrated article teasers, stacked on mobile |
| `.company-links` / `.company-links__grid` | Company, services and contact links |
| `.quote-banner` | Shared call-to-action component |
| `.site-footer` | Shared footer with five main navigation links |
| `.service-detail`, `.service-scope` | Repeated service layout; ordinary Pages can share a template |
| `.article-grid`, `.article-card` | WordPress post loop and article component |
| `.article`, `.article__body` | Single-post template with dynamic title, featured image and content |
| System 404 | WordPress 404 template; not a separate content page |

Use reusable components for repeated structures and shared classes for repeated styles. The mappings above are rebuild guidance; no Oxygen components or templates are included in this repository.

## Content and interactions

Upload the used images to WordPress Media Library and bind image elements to those attachments so WordPress can provide responsive variants. Create the five main Pages and set Services as the WordPress parent of Hardwood Flooring Installation, Dustless Refinishing, and Additions & Remodeling. Articles retain `/post/<slug>/`. Follow the URL and redirect mapping in `SITE-STRUCTURE.md`. The original service/article drafts are carried forward and still need editorial approval before launch. The hexagon-and-SEC wordmark is a design treatment; substitute approved branding during production if needed.

Use WordPress posts and categories for the journal. Category controls in the prototype filter the rendered cards; use a production query/filter implementation for dynamic posts.

The Contact form uses browser validation for first name, last name, phone, email, city/ZIP, and service, then opens an email draft addressed to `jeff@secservices.net` and displays a copyable fallback. Its submit button reads “Prepare email.” No server receives or stores these inquiries. In WordPress, connect an appropriate form integration to validated server-side handling and email delivery, then change the button to “Request a quote” only after delivery and error handling have been tested. Keep a visible phone and email alternative.

The CSS contains broad element rules appropriate to this standalone prototype. Map those to intentional global settings or scope them to the rebuilt site; do not paste all broad rules into an existing WordPress installation without checking other pages. Keep `assets/site.js` only for features reproduced with the same classes/data attributes; do not duplicate native navigation handlers.

## Before launch

Replace relative static URLs with WordPress permalinks. Keep staging noindex until launch, then configure production metadata, canonical URLs, sitemap, and indexing through WordPress. Confirm contact information, credentials, source image usage, and draft article copy with the owner. Test form delivery, mobile menu, keyboard navigation, category filtering, Services navigation, and layouts in the actual Oxygen installation. This prototype does not certify production integration.

## Consolidated inquiries and services

Use Contact as the sole inquiry destination, with an `inquiry` anchor on the form. Dustless Refinishing is a separate child Page under Services, ordered second. Kitchen, bathroom, cabinetry, tile, and addition topics are anchored sections on Additions & Remodeling, not separate Pages. Register the three Services children in the primary dropdown and include their parent in breadcrumbs. Configure production redirects from the old routes listed in `SITE-STRUCTURE.md`; this prototype supplies destination links, not server redirects.

## Hardwood-first direction

Hardwood installation and dustless refinishing lead the homepage imagery, service choices, feature stories, and featured articles. Services lists those offerings first, followed by the Additions & Remodeling row. About and Contact reinforce the hardwood focus. The 17-page architecture and all nine blog topics remain intact. Use plain text links and buttons without decorative diagonal arrows.

Section labels use descriptive text without numbered prefixes. Do not add decorative numbering to feature or trust sections.

Headings use normal letter spacing. Preserve positive tracking on small labels; do not add negative tracking to Clash Display.

The company name is **SEC Hardwood Services**. Use it consistently in visible branding, page copy, accessible labels, metadata, and copyright text.

Set H1 and H2 to Clash Display, font-weight 600 (Semibold), throughout the site.

Clash Display uses normal width, with inherited Georama stretch reset; do not apply percentage stretch to it. Clash Display must never exceed font-weight 600. Use 600 for bold Clash Display headings; retain lighter weights where specified. The header wordmark’s strong text matches H1 (Clash Display, 600, normal width); the footer uses the logo image instead of a wordmark. The font file supports 700, but the design does not use it.

Current service order: Hardwood Flooring Installation; Dustless Refinishing; Additions & Remodeling. Each has a dedicated Services subpage. Total: five main pages, three service subpages, nine blog posts (17 pages).

## Heading and label policy

Follow the project rule at the top of `DESIGN.md`. Section components must not include a kicker/eyebrow slot by default. Use direct headings. Enable a contextual label only where it supplies distinct category or navigation information; the current exceptions are article taxonomy and footer navigation groups. Do not restore removed homepage, service, quote-banner, photo, or exploration-card labels during the Oxygen rebuild.

## Header social links

Use the inline SVG Instagram, Facebook, and Google icons from the header, with accessible link names and visible keyboard focus. The Google destination is the owner-supplied https://maps.app.goo.gl/d3suTGsGArxADjLW6 . On mobile the icons appear in the expanded primary menu.

## Stylesheet maintenance

`assets/site.css` is consolidated into local font faces, global/component styles, and responsive/motion rules. Edit an existing selector in its applicable context rather than appending another override. Keep the single global `body` definition; its wide-screen media-query adjustment is intentional. Separate `@font-face` blocks represent distinct families/weights, not duplicates.

## Source workflow and verification

The 17 HTML pages, `assets/site.css`, and `assets/site.js` are maintained directly. The obsolete prototype importer and its class-normalization helper were removed because they no longer reproduced the current site. No build step or sibling source directory is required. Run `npm start` for the local Node preview and `npm stop` to stop it.

The prototype includes noindex metadata and a `robots.txt` that disallows crawling. `sitemap.xml` lists the content routes; it does not make this staging build indexable. There is no standalone search page or static 404 page.

With a local server on port 8766, `scripts/verify.py` checks the 17 pages at 1440, 768, and 390px, local links and anchors, image loading, horizontal overflow, JavaScript errors, menu behavior, category filtering, and the email-draft fallback. It writes reports and screenshots to `qa/`. Existing QA artifacts are snapshots, not evidence that subsequent manual edits pass.
