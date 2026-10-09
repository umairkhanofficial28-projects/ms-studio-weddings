import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateMultiple } from '../src/lib/pricing.ts';
import { packages } from '../src/data/packages.ts';
import { addons } from '../src/data/addons.ts';
const getPackage = (id: string) => packages.find(p => p.id === id)!;

test('separate Nikkah and Walima quotations total independently', () => {
  const result = estimateMultiple([
    { pkg: getPackage('essential'), sel: { drone: 1 } },
    { pkg: getPackage('signature'), sel: { 'extra-photographer': 2 } },
  ], addons);
  assert.equal(result.eventsCount, 2);
  assert.equal(result.pricedSubtotal, 210000);
  assert.equal(result.needsCustomQuote, false);
});
test('partially bespoke multi-event estimate is flagged as incomplete', () => {
  const result = estimateMultiple([{ pkg: getPackage('royal'), sel: { drone: 1 } }, { pkg: null, sel: { jib: 1 } }], addons);
  assert.equal(result.pricedSubtotal, 240000);
  assert.equal(result.needsCustomQuote, true);
});
test('three independent events do not introduce accidental bundled discounts', () => {
  const result = estimateMultiple([1,2,3].map(() => ({ pkg: getPackage('essential'), sel: {} })), addons);
  assert.equal(result.pricedSubtotal, 150000);
});
