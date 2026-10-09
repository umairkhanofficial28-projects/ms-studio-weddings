// Pure pricing logic (no framework imports) so it can be unit-tested.
export type Selection = Record<string, number>; // addonId -> quantity (absent = not selected)
interface A { id: string; label: string; price: number; quantity?: boolean; exclusive?: string }
interface P { id: string; name: string; price: number; includedAddonIds: string[] }

export function toggleAddon(sel: Selection, addon: A, all: A[], on: boolean): Selection {
  const next = { ...sel };
  if (!on) { delete next[addon.id]; return next; }
  if (addon.exclusive) for (const o of all) if (o.exclusive === addon.exclusive) delete next[o.id];
  next[addon.id] = 1;
  return next;
}
export function setQuantity(sel: Selection, addon: A, qty: number): Selection {
  const q = Math.max(0, Math.min(20, Math.floor(Number.isFinite(qty) ? qty : 0)));
  const next = { ...sel };
  if (q === 0) delete next[addon.id]; else next[addon.id] = q;
  return next;
}
export function estimate(pkg: P | null, addons: A[], sel: Selection) {
  const lines: { id: string; label: string; unit: number; qty: number; total: number }[] = [];
  const alreadyIncluded: string[] = [];
  for (const a of addons) {
    const qty = sel[a.id] ?? 0;
    if (qty <= 0) continue;
    if (pkg?.includedAddonIds.includes(a.id)) { alreadyIncluded.push(a.label); continue; }
    const q = a.quantity ? qty : 1;
    lines.push({ id: a.id, label: a.label, unit: a.price, qty: q, total: a.price * q });
  }
  const addonsTotal = lines.reduce((s, l) => s + l.total, 0);
  const basePrice = pkg ? pkg.price : 0;
  // Bespoke: total covers ONLY priced add-ons; base coverage needs a custom quote.
  return { basePrice, lines, alreadyIncluded, addonsTotal, total: basePrice + addonsTotal, customQuoteRequired: !pkg };
}
export const pkr = (n: number) => 'PKR ' + Math.round(n).toLocaleString('en-US');

/** Multiple functions have independent packages and add-ons; no assumed discounts or hidden package multipliers. */
export function estimateMultiple(events: { pkg: P | null; sel: Selection }[], addons: A[]) {
  const breakdown = events.map((event) => estimate(event.pkg, addons, event.sel));
  return {
    breakdown,
    pricedSubtotal: breakdown.reduce((sum, value) => sum + value.total, 0),
    needsCustomQuote: breakdown.some((value) => value.customQuoteRequired),
    eventsCount: events.length,
  };
}
