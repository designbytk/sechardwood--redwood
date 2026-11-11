# SEC Hardwood Services design system

This document describes the local SEC Hardwood Services prototype. Use the current HTML, `assets/site.css`, and `assets/site.js` as the implementation reference. `OXYGEN-HANDOFF.md` covers the WordPress rebuild. The directory name is a project identifier, not a design reference.

## Direction and page flow

Lead with hardwood installation and dustless refinishing, followed by Additions & Remodeling. Use warm neutral and soft green surfaces, brown headings, dark green body copy, rust buttons, orange accents, large flooring photographs, and direct headings. Links and buttons do not use decorative diagonal arrows or numbered section markers. The hero CTA cards use horizontal right arrows, and service-feature links use small right-pointing triangle markers.

The homepage contains a photographic hero with two CTA cards and a desktop wood-texture/logo panel, three service cards, a centered company introduction, two alternating image-and-copy service features, four trust statements, three hardwood advice cards, and three company exploration links. A quote banner and footer follow the main content. The shared header contains a hexagon-and-SEC wordmark, navigation, a Services submenu, social icons, and a quote link; the contact strip sits above the sticky header.

## Colors

| CSS token | Value | Current use |
| --- | --- | --- |
| `--paper` | `#f4f0e9` | Page and header background; light button text |
| `--ink` | `#5c2c18` | Default text and headings, borders, dark buttons |
| `--muted` | `#715b50` | Secondary copy |
| `--red` | `#a43218` | Primary buttons, link hover, focus outlines, service titles |
| `--green` | `#30392f` | Paragraph text, contact-strip background, dark hero CTA |
| `--sage` | `#647961` | Thick text-link underline |
| `--soft` | `#d0d3c6` | Company introduction, company links, About introduction, contact details, article asides |
| `--orange` | `#f4572f` | Wordmark, text links, accent hero CTA and quote-banner background |
| `--pink` | `#f8a793` | Declared token; no current component usage |
| `--line` | `#d7beb2` | Borders |

Additional component colors include `#e9e0d7` for the reversed service feature, `#faf9f5` for form fields, and `#34190d` for quote-banner text. The hero uses white text over photography with a dark gradient.

## Typography

- Body: local **Georama**, `assets/fonts/georama-latin-wdth-normal.woff2`, weight 400, stretch 90%, 18px size, line-height 1.5.
- H1 and H2: local **Clash Display**, `assets/fonts/ClashDisplay-Variable.woff2`, weight 600. The font supports 200–700; the design caps Clash Display at 600. Clash Display uses normal width; reset inherited Georama stretch rather than applying a percentage.
- H3: Georama, with component-specific sizing. Linked H3 titles inherit weight 500; other H3 headings use the browser heading default.
- Links and buttons use Georama, including navigation, the linked brand, footer links, breadcrumbs, card links, category controls, and form submission. Link and button text generally uses weight 500 and stretch 110%, including linked H3 card titles. `.text-link` overrides the weight to 700 and uses uppercase orange text, `.1ch` tracking, and a 6px sage bottom border. Hero CTA titles and eyebrows override the family to Clash Display and weight to 600. The footer brand is the `assets/svg/sec-hardwood-services-logo-2-2clr.svg` logo image, displayed at 160px wide. The header wordmark’s strong text is an exception: it matches H1 in Clash Display, weight 600, and normal width, while retaining its responsive brand sizes. Navbar links, including Services submenu links, are uppercase through CSS.
- Category labels, form fields, and the footer default to Clash Display, generally weight 300. Footer company/address paragraphs and copyright explicitly use Georama; company/address paragraphs inherit the footer text color. Strong/bold text outside links and footer headings use 600.
- Global H1: `clamp(48px, 6.6vw, 100px)`; H2: `clamp(34px, 4vw, 62px)`; H3: 28px. Components override these sizes: the homepage H1 is `clamp(55px, 5.8vw, 88px)`, changing to `clamp(48px, 10.5vw, 76px)` at 760px and below.
- Heading tracking is normal. Small contextual labels retain positive tracking. Use the component rules for exact line heights and sizes.

Other local font faces remain declared in the stylesheet, but they are not assigned to current components. Do not treat the asset inventory as the typography specification.

## Layout and responsive behavior

The body is centered and capped at 1800px. Horizontal gutters use `clamp(22px, 4.2vw, 76px)`. Sections have individual padding rules, commonly 55–80px on desktop and 40–55px on mobile; `--space` is declared but currently unused.

- At 1100px and below, service features use equal columns and several gaps/image heights shrink.
- At 1000px and below, the article grid and footer use two columns; navigation spacing and branding become smaller. The hero becomes a single column with an absolutely positioned background photo, a vertical dark gradient, and no wood-texture/logo panel. Hero copy has vertical padding of `clamp(64px, 10vw, 96px)`.
- From 761px through 1200px, the header hides the brand descriptor and tightens navigation/social-link spacing. Additional header adjustments apply through 1000px.
- At 760px and below, the menu expands below the brand, with social icons inside it. Hero CTA cards, service cards, advice cards, company links, article cards, and major content splits stack. Hero copy uses 56px top and 40px bottom padding. Homepage service features place the image first. Trust statements and contact details remain two columns; form fields also retain two columns, with location and service spanning both.

The desktop hero uses `aspect-ratio: 3 / 1` and a `2fr 1fr` grid, with no active fixed-height or minimum-height rule. Its background photo is `assets/images/hardwood-floor-hero-option-3.webp`; image crops use `object-fit: cover`. The first content block aligns copy to the bottom and uses the standard left gutter with 20% right padding. The second layers `assets/svg/wood-texture.svg` and `assets/svg/sec-hardwood-services-logo-2-2clr.svg`; the logo has an 80% maximum width and a negative left margin that overlaps the copy side. At 1000px and below, the hero drops its aspect ratio and sizes to its content.

The two `.hero-cta` cards link to Hardwood Flooring Installation and Contact’s inquiry form. They sit in equal columns with a 16px gap, a 640px maximum group width on desktop, and a `-2rem` bottom margin. Desktop cards have a 210px minimum height; mobile cards remove that minimum and use a 12px gap. The flooring card is dark green and the quote card orange, both with paper-colored text. Hover/focus changes the cards to paper with brown text and shifts their arrows 5px right. CTA titles use `clamp(24px, 2.2vw, 34px)` and balanced wrapping.

## Project rule: headings and contextual labels

This user-authored rule governs new and revised components.

- **Default: omit** eyebrow text, kickers, overlines, and small uppercase labels above headings.
- **Exception:** use a label only when it provides a distinct, factual category or navigation context that the heading does not already communicate.
- Before adding a label, ask: “What useful information would disappear if this label were removed?” If the answer is decoration, visual balance, emphasis, a paraphrase, or nothing, omit it.
- Never invent a category or label to fill visual space. Do not duplicate the page title, service name, company name, or adjacent description.
- Do not repeat an eyebrow–heading–description composition across every section. Let headings, images, links, and content establish the hierarchy; use a contextual label selectively.
- Prefer a clear heading over a vague heading that needs a kicker to explain its subject.
- Do not replace removed labels with numbered markers, decorative captions, or empty spacer elements. Adjust spacing around the actual content.
- Keep useful breadcrumbs, form labels, genuine article categories, and footer navigation group labels. These must serve orientation, filtering, or accessibility—not decoration.

### Applied heading and label decisions

For new or revised components, omit promotional overlines from the homepage, service pages, company introduction, and repeated quote banner. Omit decorative image captions and the introductory labels on exploration cards. Service headings name their offering directly. Retain actual blog categories where they provide taxonomy context, and footer group labels where they identify navigation or contact information. Do not apply this exception automatically to every new section or card. The current hero CTA cards contain “Our services” and “Contact us” eyebrows above their titles; these are existing deviations from the default-omit rule, not a general pattern to copy.

## Interaction and accessibility

Preserve the skip link, one H1 per page, visible focus outlines, descriptive image alt text, associated form labels, and accessible names for icon links. Menus expose `aria-expanded` and close on Escape or an outside click. Without JavaScript, navigation remains available. Blog category buttons filter existing cards and announce the result count.

The Contact form uses browser validation, prepares a `mailto:` draft, and exposes a read-only textarea for copying the details. It does not send or store inquiries. General link/button color and background transitions are enabled only when the visitor has no reduced-motion preference. Hero CTA card/arrow transitions are explicitly disabled for reduced motion, although the hover/focus arrow offset still applies immediately. Service-feature triangle markers currently retain their `.2s` transform transition under reduced motion; this is an implementation gap.

## Current implementation caveats

The active second hero content block contains the wood-texture and logo SVGs described above, and both assets exist. Literal “LOGO” text and the missing `assets/images/logo.webp` reference now occur only in HTML comments; they are not rendered content or an active missing-image dependency.

The obsolete prototype importer and its class-normalization helper have been removed. Current HTML, CSS, and JavaScript are maintained directly; no regeneration step is required. Use these files as the source for the Oxygen rebuild. The current CSS relies on two hero content blocks for its first/last-of-type layout selectors.

The hero scroll-driven slide-out animation is commented out in `assets/site.css` and is not active behavior. Other unused selectors and font faces remain in the stylesheet; verify their presence in current HTML before treating them as components.
