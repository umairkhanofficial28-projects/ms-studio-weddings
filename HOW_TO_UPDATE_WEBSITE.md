# Simple guide: update the MS Studio website

Keep all files in the same GitHub repository. After Netlify is connected, GitHub commits automatically trigger a new build. This consumes some platform credits. Do not change website source files in Netlify's dashboard; GitHub is the source of truth.

## A. Replace the homepage hero photograph

1. On your computer, crop your chosen **original** wedding photograph to a broad landscape frame (recommended 2000–2400px wide) and export as `hero.webp`.
2. In GitHub go to `src/assets/site/hero.webp`. Use GitHub's delete file/edit upload workflow to replace that one file with the new `hero.webp` at the **same path**, or use GitHub Desktop to replace it and push the commit.
3. New homepage photograph appears after a successful redeploy. Keep backup and client permission.

The current hero photograph was cropped from page 6 of your wedding package PDF for development preview.

## B. Add wedding photography to the portfolio

1. Choose a gallery category: `nikkah`, `mehndi`, `baraat`, `walima`, `bride-groom`, `daylight`, `candids`, `details`, `family`, or `wedding-stories`.
2. Add `.jpg`, `.jpeg`, `.png`, or `.webp` photographs to `src/assets/gallery/<category>/` using GitHub's upload workflow. Recommended: 1800–2500px long side; avoid huge raw files.
3. Commit the uploaded files. The gallery automatically discovers images by filename and category.
4. Optional titles/captions/featured homepage ordering: edit `src/data/gallery-meta.json`. Example:

```json
{
  "nikkah/beautiful-day.webp": {
    "title": "The Nikkah",
    "alt": "Bride and groom during their Nikkah ceremony",
    "caption": "Lahore",
    "featured": true,
    "order": 1
  }
}
```

**Important:** this JSON file already contains metadata for six brochure-derived previews. Keep the existing entries and add new entries using correct JSON commas, or remove those entries when you remove the photos. To avoid broken updates, check JSON validity.

## C. Replace or add team photographs

1. Upload images into `src/assets/team/`, e.g. `founder.webp`, `photographer.webp`.
2. In `src/data/founder.ts`, set `photo: 'founder.webp'`.
3. In `src/data/team.ts`, add `image: 'photographer.webp'` to each relevant member, with real name, job, bio and `visible: true`.
4. The team page only shows visible members. Omit fake biography details.

## D. Quick file guide

| Change | Edit this file |
|---|---|
| Package price and inclusions | `src/data/packages.ts` |
| Add-on prices and quantities | `src/data/addons.ts` |
| Phone, WhatsApp, city, hero headline | `src/data/site.ts` |
| Booking terms and delivery status | `src/data/site.ts`, `src/data/policies.ts`, `src/data/faq.ts` |
| Instagram, Facebook, Google/other links | `src/data/socials.ts` |
| Founder biography and portrait filename | `src/data/founder.ts` |
| Team members and photo filenames | `src/data/team.ts` |
| Films and real Vimeo/YouTube IDs | `src/data/films.ts` |
| Real, approved testimonials | `src/data/testimonials.ts` |
| General page copy | The matching file in `src/pages/` |

## E. Using the wedding calculator

- Each function has a different package and add-on list; use **Add function** for another wedding event.
- Selecting **Bespoke** does *not* provide a base price. The shown total covers priced extras only.
- WhatsApp sends the details to the studio's phone; **Save as PDF** uses your browser's print function.
- **Booking Enquiry** goes through Netlify Forms. The form must be tested on a deployed Netlify URL; local `npm run dev` doesn't process Netlify submissions.
- Enquiries do not reserve dates. There is no payment gateway.

## F. Google, social, and domain links

- Social links are in `src/data/socials.ts`; an empty URL hides that link.
- Confirm supplied business profile link and business name. Do not invent Google stars or reviews.
- Set the actual website URL in `src/data/site.ts`, `astro.config.mjs`, and `public/robots.txt` once Netlify allocates it.

## G. If a Netlify build fails

Review the deploy log. Common problems are missing files, an invalid JSON comma, or invalid TypeScript edits. Fix them in GitHub and commit again. Avoid generating repeated deployments unnecessarily; changes can be batched into one commit.
