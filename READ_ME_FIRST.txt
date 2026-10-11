MS STUDIO — LOCAL SEO + CHATGPT SEARCH DISCOVERY UPDATE

UPLOAD TWO FILES ONLY:
1) src/layouts/Base.astro — replacement for your existing Base.astro
2) public/robots.txt — replacement for your existing robots.txt

GitHub: https://github.com/umairkhanofficial28-projects/ms-studio-weddings/upload/main
Extract this ZIP. Upload the src and public folders so the directory structure is preserved.
Commit message: Improve Lahore SEO and AI search discovery
Wait for the Cloudflare Pages deployment green tick.

TEST:
- https://ms-studio-weddings.pages.dev/robots.txt
- https://ms-studio-weddings.pages.dev/sitemap-index.xml
- https://validator.schema.org/ (paste your page URL and inspect JSON-LD)
- Google Search Console > URL Inspection > Test live URL
- Google Rich Results Test: https://search.google.com/test/rich-results

NOTES:
- This patch keeps your logo, dark mode, cinematic intro, navigation and booking features unchanged.
- It creates no reviews, rankings, awards, opening hours or invented street address.
- It only improves machine-readable site information; it cannot guarantee rankings or ChatGPT recommendations.
- Cloudflare security rules may still block crawlers even when robots.txt permits them.
- LocalBusiness schema enrichments use the known business city, country, phone and Google Maps listing.
- This ZIP is a partial patch, NOT an entire website project.
- Custom domain migration later requires updating src/data/site.ts, astro.config.mjs, sitemap files, and social profiles.
