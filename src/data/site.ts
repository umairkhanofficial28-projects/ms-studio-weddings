// ONE place for business details. Edit here; every page updates.
export const site = {
  name: 'MS Studio — Weddings by Umair',
  shortName: 'MS Studio',
  googleBusinessName: 'M&S STUDIO', // verify legal/trading name (see OWNER_APPROVAL_CHECKLIST.md)
  founder: 'Umair Khan',
  founderTitle: 'Founder & Creative Director',
  city: 'Lahore',
  country: 'Pakistan',
  launchApproved: false, // Flip to true ONLY after reviewing policies, image rights and forms. Enables Google indexing.
  url: 'https://ms-studio-weddings.pages.dev', // keep in sync with astro.config.mjs
  phoneDisplay: '+92 313 40 777 77',
  phoneTel: '+923134077777',
  whatsappNumber: '923134077777',
  tagline: 'Timeless photography. Cinematic storytelling. Beautiful memories crafted with passion.',
  heroHeadline: 'Every Love Story Deserves to Be Remembered Beautifully.',
  description:
    'Founder-led wedding photography and cinematography studio in Lahore, Pakistan — Nikkah, Mehndi, Baraat and Walima coverage, cinematic wedding films and albums.',
  // Do not add an address, rating, review count or hours until verified from the Google listing.
  address: '' as string,
  email: '' as string,
  serviceAreaNote: 'Based in Lahore. Available for weddings across Pakistan and internationally, subject to arrangements.',
};

// ---- Booking policy values: keep unapproved until owner explicitly confirms ----
export const policy = {
  // CONFLICT: PDF says 50% advance; newer owner instruction requests 100%. Draft set to 100%; do not launch before explicit approval.
  advancePercent: 100,
  advancePercentApproved: false,
  // CONFLICT: PDF Terms vs PDF FAQ vs newer targets differ. Values below are the PDF *Terms* wording. Edit once approved.
  delivery: {
    approved: false,
    rawFiles: 'approximately 10–15 days after full payment settlement',
    editedPhotos: 'approximately 6–8 weeks after final selections are submitted',
    eventHighlights: 'to be confirmed by the studio',
    fullFilm: 'up to approximately 2–3 months, depending on the event and season',
    albumDesign: 'layouts shared in PDF for approval before printing',
    albumProduction: 'approximately 6 weeks after final approval',
  },
  dataRetentionMonths: 2,
  revisionsIncluded: 1,
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
