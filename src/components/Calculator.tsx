import { useEffect, useMemo, useState } from 'react';
import { estimateMultiple, pkr, setQuantity, toggleAddon, type Selection } from '../lib/pricing';
import { packages } from '../data/packages';
import { addons, addonGroups } from '../data/addons';
import { site } from '../data/site';

const EVENTS = ['Nikkah', 'Mehndi', 'Baraat', 'Walima', 'Engagement', 'Reception', 'Couple Shoot', 'Other'];
const defaultEvent = (id: number, type = 'Walima', pkgId = 'signature'): EventConfig => ({ id, type, date: '', city: 'Lahore', venue: '', setting: 'Indoor', pkgId, sel: {} });
type EventConfig = { id: number; type: string; date: string; city: string; venue: string; setting: string; pkgId: string; sel: Selection };
type Info = { name: string; phone: string; email: string; notes: string };
const defaultInfo: Info = { name: '', phone: '', email: '', notes: '' };
const formAccessKey = (import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '').trim();

export default function Calculator() {
  const [events, setEvents] = useState<EventConfig[]>([defaultEvent(1)]);
  const [activeId, setActiveId] = useState(1);
  const [info, setInfo] = useState<Info>(defaultInfo);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('package');
    if (requested && [...packages.map(p => p.id), 'bespoke'].includes(requested)) {
      setEvents(prev => prev.map((event, index) => index === 0 ? { ...event, pkgId: requested } : event));
    }
  }, []);

  const active = events.find(e => e.id === activeId) ?? events[0];
  function updateActive(patch: Partial<EventConfig>) {
    setEvents(prev => prev.map(event => event.id === active.id ? { ...event, ...patch } : event));
  }
  function addEvent() {
    if (events.length >= 6) { setStatus('For more than six functions, please contact the studio for a custom quotation.'); return; }
    const id = Math.max(...events.map(e => e.id)) + 1;
    const nextType = ['Nikkah', 'Mehndi', 'Baraat', 'Walima'][events.length] ?? 'Other';
    setEvents(prev => [...prev, defaultEvent(id, nextType, 'bespoke')]);
    setActiveId(id);
    setStatus('');
  }
  function removeEvent(id: number) {
    if (events.length === 1) return;
    const rest = events.filter(e => e.id !== id);
    setEvents(rest);
    if (activeId === id) setActiveId(rest[0].id);
    setStatus('');
  }
  const records = useMemo(() => events.map(event => ({
    event,
    pkg: packages.find(p => p.id === event.pkgId) ?? null,
  })), [events]);
  const combined = useMemo(() => estimateMultiple(records.map(r => ({ pkg: r.pkg, sel: r.event.sel })), addons), [records]);
  const currentIndex = records.findIndex(r => r.event.id === active.id);
  const selectedPkg = records[currentIndex]?.pkg ?? null;
  const included = new Set(selectedPkg?.includedAddonIds ?? []);

  const quoteText = useMemo(() => {
    const lines = [
      '*MS Studio — Wedding Estimate*',
      `Client: ${info.name || 'Not provided'}`,
      `Phone: ${info.phone || 'Not provided'}`,
      ...(info.email ? [`Email: ${info.email}`] : []),
      `Functions: ${records.length}`,
    ];
    records.forEach(({ event, pkg }, i) => {
      const est = combined.breakdown[i];
      lines.push('', `*Function ${i + 1}: ${event.type}*`,
        `Date: ${event.date || 'To be confirmed'}`,
        `Venue: ${event.venue || 'To be confirmed'}, ${event.city || 'City to be confirmed'}`,
        `Location: ${event.setting}`,
        `Package: ${pkg ? `${pkg.name} — ${pkr(pkg.price)}` : 'Bespoke — base coverage to be quoted'}`);
      if (pkg) lines.push(`Team: ${pkg.photographers} photographer(s), ${pkg.videographers} videographer(s)`, `Included: ${pkg.includes.join('; ')}`);
      est.lines.forEach(line => lines.push(`+ ${line.label} ${line.qty > 1 ? `× ${line.qty}` : ''}: ${pkr(line.total)}`));
      lines.push(`${est.customQuoteRequired ? 'Priced services only' : 'Function subtotal'}: ${pkr(est.total)}`);
    });
    lines.push('', `*${combined.needsCustomQuote ? 'Combined priced subtotal (not final)' : 'Total estimated price'}: ${pkr(combined.pricedSubtotal)}*`);
    if (combined.needsCustomQuote) lines.push('Bespoke base coverage requires a separate quote.');
    if (info.notes) lines.push(`Notes: ${info.notes}`);
    lines.push('Taxes, outstation costs, venue restrictions and availability are subject to confirmation. This is not a confirmed booking.');
    return lines.join('\n');
  }, [records, combined, info]);
  const waUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(quoteText)}`;

  async function sendEnquiry() {
    if (sending) return;
    if (!formAccessKey) {
      setStatus('Email enquiries are not yet configured. Please send your quote using WhatsApp instead.');
      return;
    }
    if (!info.name.trim() || !info.phone.trim()) { setStatus('Please enter your name and phone / WhatsApp number first.'); return; }
    if (!consent) { setStatus('Please confirm your consent to be contacted.'); return; }
    setSending(true);
    setStatus('Sending your enquiry…');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: formAccessKey,
          subject: `New MS Studio wedding quotation — ${info.name.trim()}`,
          from_name: 'MS Studio Website',
          name: info.name.trim(),
          phone: info.phone.trim(),
          email: info.email.trim(),
          event_type: events.map(e => e.type).join(', '),
          event_date: events.map(e => e.date || 'TBC').join(', '),
          city: events.map(e => e.city).join(', '),
          venue: events.map(e => e.venue || 'TBC').join(', '),
          quotation: quoteText,
          consent: 'yes',
          botcheck: '',
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) throw new Error('Form submission not accepted');
      setStatus('Your enquiry was received. Our team will contact you; this does not confirm a booking.');
    } catch {
      setStatus('The email enquiry could not be delivered. Please use the WhatsApp button instead.');
    } finally { setSending(false); }
  }
  const field = 'field';
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-12">
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-3xl">01. Your details</h2><span className="text-xs text-charcoal/55">* Required for enquiries</span></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">Full name *<input className={field + ' mt-1'} autoComplete="name" value={info.name} onChange={e => setInfo(prev => ({ ...prev, name: e.target.value }))} /></label>
            <label className="text-sm">Phone / WhatsApp *<input className={field + ' mt-1'} autoComplete="tel" type="tel" value={info.phone} onChange={e => setInfo(prev => ({ ...prev, phone: e.target.value }))} /></label>
            <label className="text-sm sm:col-span-2">Email (optional)<input className={field + ' mt-1'} type="email" autoComplete="email" value={info.email} onChange={e => setInfo(prev => ({ ...prev, email: e.target.value }))} /></label>
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-3xl">02. Wedding functions</h2><p className="mt-2 text-sm text-charcoal/60">Each function has its own package, extras and price.</p></div><button type="button" className="btn !px-4 !py-2" onClick={addEvent}>+ Add function</button></div>
          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Wedding functions">
            {events.map((event, index) => <button type="button" key={event.id} role="tab" aria-selected={active.id === event.id} onClick={() => setActiveId(event.id)} className={`border px-4 py-3 text-xs uppercase tracking-wide ${active.id === event.id ? 'border-burgundy bg-burgundy text-white' : 'border-beige bg-white hover:border-burgundy'}`}>{index + 1}. {event.type}</button>)}
          </div>
          <div className="mt-4 border border-beige bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between"><h3 className="text-2xl">Function {currentIndex + 1}</h3>{events.length > 1 && <button type="button" className="text-xs underline" onClick={() => removeEvent(active.id)}>Remove this function</button>}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm">Event type<select className={field + ' mt-1'} value={active.type} onChange={e => updateActive({ type: e.target.value })}>{EVENTS.map(name => <option key={name}>{name}</option>)}</select></label>
              <label className="text-sm">Event date<input className={field + ' mt-1'} type="date" value={active.date} onChange={e => updateActive({ date: e.target.value })} /></label>
              <label className="text-sm">City<input className={field + ' mt-1'} value={active.city} onChange={e => updateActive({ city: e.target.value })} /></label>
              <label className="text-sm">Venue<input className={field + ' mt-1'} value={active.venue} onChange={e => updateActive({ venue: e.target.value })} /></label>
              <label className="text-sm sm:col-span-2">Setting<select className={field + ' mt-1'} value={active.setting} onChange={e => updateActive({ setting: e.target.value })}><option>Indoor</option><option>Outdoor</option><option>Both</option></select></label>
            </div>
          </div>
        </section>

        <section><h2 className="text-3xl">03. Choose a collection</h2>
          <p className="mt-2 text-sm text-charcoal/60">For {active.type}. A bespoke base requires a separate confirmed quote.</p>
          <div className="mt-5 grid gap-3">
            {[...packages.map(p => ({ id: p.id, label: p.name, price: pkr(p.price) })), { id: 'bespoke', label: 'Custom / Bespoke Coverage', price: 'Base quoted separately' }].map(p => (
              <label key={p.id} className={`flex cursor-pointer flex-wrap items-center justify-between gap-3 border p-4 ${active.pkgId === p.id ? 'border-burgundy bg-white' : 'border-beige'}`}>
                <span className="flex items-center gap-3"><input type="radio" checked={active.pkgId === p.id} onChange={() => updateActive({ pkgId: p.id })} name={`pkg-${active.id}`} /><span className="text-sm">{p.label}</span></span><span className="text-sm font-medium">{p.price}</span>
              </label>
            ))}
          </div>
          {selectedPkg && <details className="mt-4 border-l-2 border-burgundy bg-ivory p-4 text-sm" open><summary className="cursor-pointer font-medium">Included: {selectedPkg.photographers} photographer(s), {selectedPkg.videographers} videographer(s)</summary><ul className="mt-3 list-disc space-y-1 pl-5 text-charcoal/75">{selectedPkg.includes.map(text => <li key={text}>{text}</li>)}</ul></details>}
        </section>

        <section><h2 className="text-3xl">04. Add your extras</h2><p className="mt-2 text-sm text-charcoal/60">Extras below apply only to <strong>{active.type}</strong>. Switch function tabs to customize the next event.</p>
          {Object.entries(addonGroups).map(([group, heading]) => <fieldset key={group} className="mt-7"><legend className="mb-3 text-xs uppercase tracking-[.2em] text-burgundy">{heading}</legend>
            <div className="grid gap-3 sm:grid-cols-2">{addons.filter(a => a.group === group).map(a => {
              const isIncluded = included.has(a.id); const quantity = active.sel[a.id] ?? 0;
              return <div key={a.id} className={`border p-4 text-sm ${isIncluded ? 'border-beige bg-ivory' : quantity ? 'border-burgundy bg-white' : 'border-beige'}`}>
                <label className="flex cursor-pointer items-start gap-3"><input className="mt-1" type="checkbox" name={`addon-${active.id}-${a.exclusive ?? a.id}`} checked={!isIncluded && quantity > 0} disabled={isIncluded} onChange={e => updateActive({ sel: toggleAddon(active.sel, a, addons, e.target.checked) })} /><span><span className="block">{a.label}</span><span className="mt-1 block text-xs text-charcoal/65">{isIncluded ? 'Already included — no extra charge' : `${pkr(a.price)}${a.quantity ? ' each' : ''}`}</span></span></label>
                {a.note && <p className="mt-2 text-xs leading-5 text-charcoal/60">{a.note}</p>}
                {a.flag && <p className="mt-2 text-xs text-burgundy">Final options will be confirmed with your quotation</p>}
                {a.quantity && quantity > 0 && !isIncluded && <label className="mt-3 flex items-center gap-3 text-xs">Quantity<input className="w-20 border border-beige px-2 py-2" type="number" min={1} max={20} step={1} value={quantity} onChange={e => updateActive({ sel: setQuantity(active.sel, a, Number(e.target.value)) })} /></label>}
              </div>;
            })}</div>
          </fieldset>)}
        </section>
        <section><h2 className="text-3xl">05. Special requests</h2><textarea className={field + ' mt-4'} rows={4} value={info.notes} onChange={e => setInfo(prev => ({ ...prev, notes: e.target.value }))} placeholder="Tell us anything else about your celebrations, travel arrangements or vision." />
          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6"><input className="mt-1.5" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /> <span>I agree to be contacted about this enquiry. Read our <a className="underline" href="/privacy/">Privacy Policy</a>.</span></label>
        </section>
      </div>

      <aside className="h-fit min-w-0 border border-beige bg-white p-5 lg:sticky lg:top-24 lg:p-6" aria-live="polite">
        <p className="eyebrow">Your personalised quote</p><h2 className="mt-2 text-3xl">Live estimate</h2>
        <p className="mt-2 text-xs text-charcoal/60">{events.length} function{events.length === 1 ? '' : 's'} · All prices in PKR</p>
        {records.map(({ event, pkg }, i) => <div key={event.id} className="mt-5 border-t border-beige pt-4">
          <div className="flex justify-between gap-3 text-sm font-semibold"><span>{i + 1}. {event.type}</span><span>{pkr(combined.breakdown[i].total)}</span></div>
          <p className="mt-1 text-xs text-charcoal/60">{pkg ? pkg.name : 'Bespoke — base to be quoted'}</p>
          {combined.breakdown[i].lines.map(line => <div className="mt-1 flex justify-between gap-2 text-xs text-charcoal/70" key={line.id}><span>{line.label}{line.qty > 1 && ` × ${line.qty}`}</span><span className="shrink-0">{pkr(line.total)}</span></div>)}
          {combined.breakdown[i].customQuoteRequired && <p className="mt-2 text-xs text-burgundy">Base coverage not included in the displayed subtotal.</p>}
        </div>)}
        <div className="mt-6 flex flex-wrap justify-between gap-2 border-t border-charcoal pt-4 font-serif text-2xl"><span>{combined.needsCustomQuote ? 'Priced subtotal' : 'Estimated total'}</span><span>{pkr(combined.pricedSubtotal)}</span></div>
        {combined.needsCustomQuote && <p className="mt-3 text-xs leading-5 text-burgundy">At least one function requires a bespoke base coverage quote. The amount shown is not a final overall price.</p>}
        <p className="mt-3 text-xs leading-5 text-charcoal/65">Non-binding estimate. Availability, taxes, outstation costs and final terms are subject to confirmation.</p>
        <div className="mt-6 grid gap-2">
          <a className="btn btn-solid" href={waUrl} target="_blank" rel="noopener noreferrer">Send on WhatsApp →</a>
          <button type="button" className="btn" onClick={() => window.print()}>Print / Save as PDF</button>
          {formAccessKey ? <button type="button" className="btn" disabled={sending} onClick={sendEnquiry}>{sending ? 'Sending…' : 'Send Booking Enquiry by Email'}</button> : <p className="text-xs leading-5 text-charcoal/60">Email enquiry is being set up. For now, use WhatsApp to send your quote.</p>}
          <button type="button" className="mt-1 text-xs underline" onClick={() => { setInfo(defaultInfo); setEvents([defaultEvent(1)]); setActiveId(1); setConsent(false); setStatus('Calculator reset.'); }}>Start again</button>
        </div>
        {status && <p className="mt-3 text-sm" role="status">{status}</p>}
      </aside>

      <div className="print-sheet">
        <header><h1 style={{ fontSize: 28 }}>MS Studio — Weddings by Umair</h1><p>Wedding coverage estimate · Not a confirmed booking</p><p>{site.phoneDisplay} · Lahore, Pakistan</p></header>
        <hr />
        <p><strong>Client:</strong> {info.name || '—'} · {info.phone || '—'} {info.email ? `· ${info.email}` : ''}</p>
        {records.map(({ event, pkg }, i) => <section key={event.id}><h2 style={{ fontSize: 20 }}>{i + 1}. {event.type} — {event.date || 'Date TBC'}</h2>
          <p>Venue: {event.venue || 'TBC'}, {event.city || 'TBC'} · {event.setting}</p><p><strong>Package:</strong> {pkg ? `${pkg.name} — ${pkr(pkg.price)}` : 'Bespoke base to be quoted'}</p>
          {pkg && <ul>{pkg.includes.map(item => <li key={item}>{item}</li>)}</ul>}
          {combined.breakdown[i].lines.length > 0 && <table style={{ width: '100%' }}><tbody>{combined.breakdown[i].lines.map(line => <tr key={line.id}><td>{line.label}{line.qty > 1 ? ` × ${line.qty}` : ''}</td><td style={{ textAlign: 'right' }}>{pkr(line.total)}</td></tr>)}</tbody></table>}
          <p><strong>{combined.breakdown[i].customQuoteRequired ? 'Priced add-ons' : 'Function subtotal'}:</strong> {pkr(combined.breakdown[i].total)}</p>
        </section>)}
        <hr /><h2 style={{ fontSize: 22 }}>{combined.needsCustomQuote ? 'Combined priced subtotal' : 'Estimated total'}: {pkr(combined.pricedSubtotal)}</h2>
        {combined.needsCustomQuote && <p>Additional bespoke base coverage requires a confirmed quote.</p>}
        {info.notes && <p><strong>Special requests:</strong> {info.notes}</p>}
        <p style={{ marginTop: 20, fontSize: 11 }}>Subject to studio approval, availability and applicable taxes/outstation charges. This document does not reserve any event date. Review the approved Terms & Conditions before booking.</p>
      </div>
    </div>
  );
}
