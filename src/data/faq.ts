import { policy } from './site';
// Shared delivery details are read from the central policy configuration.
export const faq = [
  { q: 'Can I customise my package?', a: 'Absolutely. You can fully customise your package using our add-ons based on your event needs.' },
  { q: 'Do we need a meeting before booking?', a: 'Yes. We highly recommend a detailed call or in-person meeting to align expectations and build comfort.' },
  { q: 'When will I receive my pictures?', a: `Raw high-resolution pictures are typically shared ${policy.delivery.rawFiles}. We will confirm your delivery schedule in writing before booking.` },
  { q: 'How many edited photos & album selections?', a: 'Essential Love includes 150 selected edited pictures; Signature and Royal include 250. Album selections depend on your chosen package and album format. Our team will guide you through the selection process.' },
  { q: 'How long does final delivery take?', a: `Delivery times depend on the services booked. For reference, edited photographs take ${policy.delivery.editedPhotos}, album production ${policy.delivery.albumProduction}, and full films ${policy.delivery.fullFilm}. We will confirm the schedule with you before booking.` },
  { q: 'What if I want changes?', a: `${policy.revisionsIncluded === 1 ? 'One round' : policy.revisionsIncluded + ' rounds'} of revisions is included free of cost (albums/videos). Further revisions are charged separately.` },
  { q: 'Do you cover events outside Lahore?', a: 'Yes — nationwide and international coverage is available. Accommodation and daily expenses are client-borne; travel is managed by us. Outstation costs are quoted separately.' },
  { q: 'How do we book?', a: 'A date is reserved only after the studio confirms availability and receives the payment specified in the approved booking agreement.' },
];
