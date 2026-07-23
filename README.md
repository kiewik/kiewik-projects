# Kiewik Projects Website 2.0.0

Complete static replacement package for:

- Live URL: https://kiewik.github.io/kiewik-projects/
- Repository: `kiewik/kiewik-projects`

## Included

- Responsive bilingual EN/PL homepage
- Dedicated Horizon for Claude product page
- Five optimized real interface screenshots
- Kiewik Projects brand banner, avatar, favicons and Open Graph image
- Horizon privacy policy at the new path
- Legacy privacy path preserved at `/horizon-ai/privacy/`
- Website privacy page
- SEO metadata, Organization / WebSite / SoftwareApplication JSON-LD
- `sitemap.xml`, `robots.txt`, custom `404.html`, web manifest
- No analytics, external JavaScript frameworks or remote fonts

## Deployment — safest method

1. Download the current repository as a backup.
2. Remove the old published website files from the repository root.
3. Upload **the contents of this folder**, not the enclosing folder.
4. Commit to the branch currently used by GitHub Pages (usually `main`).
5. In **Settings → Pages**, keep the existing source.
6. Wait for the Pages deployment, then hard-refresh https://kiewik.github.io/kiewik-projects/

The empty `.nojekyll` file tells GitHub Pages to serve this as a plain static site.

## Important configuration

Edit `assets/js/site-config.js` to update public links. The Polish support URL is intentionally blank because no confirmed exact public URL was available. While blank, that support card remains hidden.

Current production Chrome Web Store ID is preserved in the configured URL:

`piagjdknagcocnfpblbbnokhjabimgcb`

## Post-deployment checks

- Homepage loads at the project path, not only at local root.
- EN/PL toggle changes the homepage copy.
- Theme toggle works and persists locally.
- All Chrome Web Store, Uneed, GitHub and support links open correctly.
- Screenshot lightbox opens and closes by button, backdrop and Escape.
- Legacy privacy URL still works: `https://kiewik.github.io/kiewik-projects/horizon-ai/privacy/`
- New privacy URL works: `https://kiewik.github.io/kiewik-projects/horizon-for-claude/privacy/`
- Run Lighthouse and Google Rich Results Test after deployment.
