# Owner approval list — must review before publishing

The original source is the eight-page **M&S PACKAGES 2025–26** PDF supplied by the business owner.

- [ ] **Payment policy:** Source PDF says **50% advance**. Owner's newer request says **100% of the booking amount before confirmation**. Current draft `src/data/site.ts` uses **100%**, but `advancePercentApproved` remains `false`. Decide the approved rule; update policies/FAQs/quotes so customers never see contradictory information. A legal review is strongly recommended.
- [ ] **Delivery timelines:** Source FAQ says raw files in two weeks and complete deliveries within ten weeks of selections; PDF terms specify raw 10–15 days after full payment, edited photos 6–8 weeks after selections, album production about six weeks after approval, video 2–3 months. Newer discussions requested data in 2–4 weeks and albums in 3–5 weeks after selections. Confirm exact stage-by-stage commitments before making promises.
- [ ] **Photo booth duplicate pricing:** The PDF lists 100 and 200 prints **both at PKR 60,000**. This is preserved and flagged in the calculator.
- [ ] **Studio name:** PDF branding uses MS Studio / M&S Studio; Maps uses M&S STUDIO. Confirm approved trading and SEO names.
- [ ] **Image rights:** Six gallery crops and the homepage hero were extracted from the supplied company brochure. Confirm photographer rights and each client's consent to publish, or replace these with authorized original photographs before deployment.
- [ ] **Founder and team content:** Founder photo and biography are missing; real member names and portraits need to be supplied.
- [ ] **Albums:** PDF package albums specify ten pages. Separately priced add-on albums specify photo counts. Confirm that these are different products and how extra sheets are calculated.
- [ ] **Signature daylight coverage:** PDF marketing line mentions daylight coverage; full details do not independently list a daylight shoot. Confirm inclusion.
- [ ] **Coverage duration:** PDF states coverage depends on the package but does not specify hours. Confirm scope.
- [ ] **Drone permissions:** Review venue approvals, aviation restrictions, and indoor/outdoor flight permission. Do not promise unconditional flights.
- [ ] **Taxes / outstation charges:** No fixed tax or travel rates were supplied; confirm final quotation wording.
- [ ] **Google listing and social URLs:** Open each link and confirm ownership and correct public details.
- [ ] **Client reviews:** Do not invent or automatically scrape testimonials; add approved quotes only.
- [ ] **Legal review:** Liability, cancellation, image use, and non-refundable booking clauses are derived from the PDF; confirm legality and enforceability.
- [ ] **Netlify URL:** Domain is a placeholder until your newly created site is named and deployed.
- [ ] **Test production build:** Run `npm install`, `npm test`, `npm run build` in an online Node 22 environment or GitHub/Netlify. **Not completed in the offline sandbox.**
- [ ] **Test enquiries:** Submit one test `booking-enquiry` and one `quote-enquiry` on the actual deployed Netlify site and verify they appear in Forms dashboard.

- [ ] **Google indexing:** `src/data/site.ts` → `site.launchApproved` is `false` while pending approvals. Switch it to `true` only after all launch checks are done.
