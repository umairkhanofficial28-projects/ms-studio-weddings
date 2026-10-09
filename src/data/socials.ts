// Supplied by owner — verify each link before launch. Empty url = hidden automatically.
export const socials = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/weddingsbyumair/' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/weddingsbyumair' },
  { id: 'google', label: 'Google Business', url: 'https://www.google.com/maps/place/M%26S+STUDIO/@31.4720395,74.4415034,17z/data=!3m1!4b1!4m6!3m5!1s0x3919053b1dbb8fb1:0xab21263b7c628f80!8m2!3d31.4720395!4d74.4415034!16s%2Fg%2F11t66ww4rs' },
  { id: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/923134077777' },
  { id: 'behance', label: 'Behance', url: 'https://www.behance.net/artbyumairkhan' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/umair-khan-b36278270' },
].filter((s) => s.url);

export const googleMaps = {
  listingUrl: socials.find((s) => s.id === 'google')?.url ?? '',
  lat: 31.4720395,
  lng: 74.4415034,
  // Add the "Write a review" link here once you copy it from Google Business Profile.
  reviewUrl: '' as string,
};
export const mapsEmbedSrc = `https://www.google.com/maps?q=${googleMaps.lat},${googleMaps.lng}&z=17&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${googleMaps.lat},${googleMaps.lng}`;
