import { policy } from './site';
// Source: PDF Terms & Conditions (12 sections). Wording preserved; subject to legal and owner review.
export const termsSections = [
  { h: 'Booking & Confirmation', p: [
    'A booking is considered confirmed only after receipt of the agreed booking payment and written confirmation from the studio.',
    `The current requested booking payment is ${policy.advancePercent}% (pending final owner approval before public launch).`,
    ...(policy.advancePercent === 100 ? ['The confirmed booking amount must be paid in full before the event is booked, subject to owner approval of the updated policy.'] : ['The remaining balance must be cleared before the first deliverable is shared.']),
    'Advance payments are non-refundable and non-transferable under all circumstances.',
    'Event dates are blocked strictly on a first-come, first-served basis upon payment.'] },
  { h: 'Payment Policy', p: [
    'All prices are quoted in Pakistani Rupees (PKR) unless stated otherwise.',
    'Any applicable taxes will be added to the final invoice.',
    'In case of delayed or incomplete payments, M&S Studio reserves the right to withhold deliverables.',
    'Proof of payment must be maintained and provided by the client when required.'] },
  { h: 'Package Customisation & Add-Ons', p: [
    "All packages can be customised according to the client's requirements using available add-ons.",
    'Add-on services must be confirmed prior to the event date.',
    'Last-minute add-ons on the event day are subject to availability and are not guaranteed.',
    'Payment for all add-ons must be cleared before the event.'] },
  { h: 'Event Coverage & Working Hours', p: [
    'Coverage duration is determined by the selected package.',
    'Any extension in coverage time will incur additional charges.',
    'M&S Studio shall not be held responsible for delays caused by: late venue access; delayed rituals or schedule changes; restrictions imposed by venue management or organizers.'] },
  { h: 'Travel & Outstation Events', p: [
    'M&S Studio provides services across Pakistan and internationally.',
    'For events outside Lahore, the client is responsible for accommodation and daily expenses of the team.',
    'Travel arrangements will be managed by M&S Studio.',
    'Any additional outstation costs will be added to the final invoice.'] },
  { h: 'Data Delivery & Storage', p: [
    'All digital files are shared via a downloadable online link.',
    'USB delivery is available upon request at an additional cost.',
    'Clients are advised to back up their data immediately upon receipt.',
    `M&S Studio retains client data for up to ${policy.dataRetentionMonths} months after delivery only.`,
    'After this period, M&S Studio shall not be liable for any data loss.'] },
  { h: 'Delivery Timeline', p: [
    `Raw images: ${policy.delivery.rawFiles}.`,
    `Edited photographs: ${policy.delivery.editedPhotos}.`,
    `Albums: ${policy.delivery.albumDesign}; production ${policy.delivery.albumProduction}.`,
    `Video editing: ${policy.delivery.fullFilm}.`,
    'Song selection must be provided by the client in a timely manner to avoid delays.'] },
  { h: 'Revisions & Change Requests', p: [
    `${policy.revisionsIncluded} revision for albums and videos is included at no additional cost.`,
    'Any further revisions will be charged separately.',
    'Song change requests are entertained within one month of delivery only.'] },
  { h: 'Lighting & Venue Conditions', p: [
    'M&S Studio is not responsible for compromised image or video quality caused by poor lighting arrangements, excessive or improper LED lighting, or venue-imposed restrictions.',
    'Clients are strongly advised to coordinate lighting details with their event planner in advance.',
    'Drone coverage is subject to venue permission, applicable regulations, safety assessment and operational feasibility.'] },
  { h: 'Data Loss, Damage & Liability', p: [
    "In the unlikely event of data loss due to equipment malfunction, theft, or unforeseen circumstances, M&S Studio's liability is limited to the refund of the amount paid for the affected service only.",
    'M&S Studio shall not be liable for any indirect or consequential losses.'] },
  { h: 'Cancellation Policy', p: [
    'In case of cancellation by the client, the advance payment shall remain non-refundable.',
    'Booking payments cannot be transferred to another date or event.'] },
  { h: 'Marketing & Public Display Rights', p: [
    'M&S Studio reserves the right to use photographs and videos captured during the event for portfolio, marketing, and promotional purposes.',
    'If the client wishes to opt out of public usage, written notification must be provided prior to the event date.'] },
];
