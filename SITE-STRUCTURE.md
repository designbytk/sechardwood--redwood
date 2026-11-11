# Site structure

Authority: `../EXISTING-PAGES.txt` and the requested “5 Main pages, 2 subpages (under services), 9 blog posts/topics.” This supersedes the older inventory prose that mentions 14 pages and the conflicting `EXISTING-PAGES.md` hierarchy.

## Main pages

- Home: `/`
- About: `/about-us/`
- Services: `/services/`
  - Hardwood Flooring Installation: `/services/hardwood-flooring-installation/`
  - Dustless Refinishing: `/services/dustless-refinishing/`
  - Additions & Remodeling: `/services/remodeling-additions/`
- Blog: `/post/`
- Contact: `/contact/`

## Blog posts (9)

Existing slugs are preserved under `/post/`:

1. `cabinet-installation-tips-for-a-fresh-new-look/`
2. `comparing-ceramic-and-marble-which-flooring-option-suits-your-home/`
3. `converting-basements-into-functional-living-areas/`
4. `essential-tips-for-a-successful-kitchen-remodel/`
5. `flooring-fads-to-skip-in-2025-and-what-to-choose-instead/`
6. `maintaining-your-hardwood-floors-through-pittsburgh-s-seasons/`
7. `seasonal-home-maintenance-checklist-for-pittsburgh-residents/`
8. `the-benefits-of-dustless-hardwood-refinishing/`
9. `the-process-of-hardwood-refinishing-what-to-expect-from-start-to-finish/`

## Consolidation and production redirects

These are destination mappings for the WordPress migration, not implemented HTTP redirects in this static prototype. Configure 301 redirects in production where old URLs have been public.

| Previous prototype route | Destination |
| --- | --- |
| `/hardwood-flooring-installation/` | `/services/hardwood-flooring-installation/` |
| `/home-additions/` | `/services/remodeling-additions/#home-additions` |
| `/services/home-additions/` | `/services/remodeling-additions/` |
| `/dustless-refinishing/` | `/services/dustless-refinishing/` |
| `/custom-cabinetry/` | `/services/remodeling-additions/#custom-cabinetry` |
| `/kitchen-remodeling/` | `/services/remodeling-additions/#kitchen-remodeling` |
| `/bathroom-remodeling/` | `/services/remodeling-additions/#bathroom-remodeling` |
| `/ceramic-marble-installation/` | `/services/remodeling-additions/#ceramic-marble-installation` |
| `/get-a-quote/` | `/contact/#inquiry` |

Search and the standalone static 404 page are removed from this prototype's page inventory. WordPress can use its system 404 template without adding a content page. All five main destinations appear in the header and footer; the three child pages are exposed in the Services menu and have breadcrumbs. Homepage service tiles and the Contact service selector use the three service categories. Dustless Refinishing is its own service subpage, second in the service order. Other remodeling topics are sections of Additions & Remodeling. The Services landing page presents these three categories.

The three service categories reflect the latest user direction, superseding the original Home Additions label in `EXISTING-PAGES.txt`. The total remains 17 pages.

Current service order: Hardwood Flooring Installation; Dustless Refinishing; Additions & Remodeling. Each has a dedicated Services subpage. Total: five main pages, three service subpages, nine blog posts (17 pages).
