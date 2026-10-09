// Official packages — source: M&S PACKAGES 2025-26 PDF. Prices in PKR.
export interface Pkg {
  id: 'essential' | 'signature' | 'royal';
  name: string; price: number; badge?: string; photographers: number; videographers: number;
  includes: string[]; note?: string;
  includedAddonIds: string[]; // add-ons already inside the package (never charged twice)
}
export const packages: Pkg[] = [
  {
    id: 'essential', name: 'Essential Love Package', price: 50000, photographers: 1, videographers: 1,
    includes: ['01 Event Cinematic Highlights', 'Bride & Groom Portraits (Indoor)', 'Family Portraits & Candids',
      'Complete Event Coverage (Unlimited Captures)', 'Story Book Album (10 Pages)', 'Selected Edited Pictures (150)'],
    includedAddonIds: [],
  },
  {
    id: 'signature', name: 'Most Booked Signature Package', price: 100000, badge: 'Most Booked', photographers: 2, videographers: 2,
    includes: ['Cinematic Couple Teaser', '01 Event Cinematic Highlights', '01 Full Length Cinematic Wedding Film',
      'Bride & Groom Portraits (Indoor)', 'Family Portraits & Candids', 'Complete Event Coverage (Unlimited Captures)',
      '01 Story Book Album (10 Pages)', 'Selected Edited Pictures (250)'],
    note: 'The source PDF also says "Photography + Videography + Daylight Coverage" — exact daylight scope needs owner confirmation.',
    includedAddonIds: [],
  },
  {
    id: 'royal', name: 'Royal Wedding Experience', price: 185000, badge: 'Luxury Experience', photographers: 3, videographers: 2,
    includes: ['Daylight Couple Shoot (Couple Portraits + Cinematic Teaser)', '01 Event Cinematic Highlights',
      '01 Full Length Cinematic Wedding Film', 'Bride & Groom Portraits (Indoor)', 'Family Portraits & Candids',
      'Drone Coverage at Venue', 'Detailed Event Coverage Film', 'Complete Event Coverage (Unlimited Captures)',
      'Signature Album (10 Pages)', '01 Story Book Album (10 Pages)', 'Selected Edited Pictures (250)'],
    note: 'Designed for luxury weddings & premium clients.',
    includedAddonIds: ['drone'],
  },
];
