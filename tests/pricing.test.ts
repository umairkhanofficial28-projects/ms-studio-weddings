import test from 'node:test';
import assert from 'node:assert/strict';
import { estimate, toggleAddon, setQuantity } from '../src/lib/pricing.ts';
import { packages } from '../src/data/packages.ts';
import { addons } from '../src/data/addons.ts';
const pk = (id: string) => packages.find((p) => p.id === id)!;
const ad = (id: string) => addons.find((a) => a.id === id)!;

test('official package prices', () => {
  assert.equal(pk('essential').price, 50000); assert.equal(pk('signature').price, 100000); assert.equal(pk('royal').price, 185000);
});
test('royal does not charge drone twice', () => {
  const e = estimate(pk('royal'), addons, { drone: 1 });
  assert.equal(e.total, 185000); assert.deepEqual(e.alreadyIncluded, ['Drone Coverage']);
});
test('essential charges drone', () => assert.equal(estimate(pk('essential'), addons, { drone: 1 }).total, 70000));
test('quantity pricing', () => assert.equal(estimate(pk('signature'), addons, { 'extra-photographer': 2, 'album-sheet': 4 }).total, 100000 + 40000 + 12000));
test('exclusive pre-event options', () => {
  let s = toggleAddon({}, ad('pre-photo'), addons, true); s = toggleAddon(s, ad('pre-both'), addons, true);
  assert.deepEqual(Object.keys(s), ['pre-both']);
});
test('booth prints exclusive, 360 independent', () => {
  let s = toggleAddon({}, ad('booth-300'), addons, true); s = toggleAddon(s, ad('glam360'), addons, true); s = toggleAddon(s, ad('booth-100'), addons, true);
  assert.deepEqual(Object.keys(s).sort(), ['booth-100', 'glam360']);
});
test('bespoke needs custom quote and total is add-ons only', () => {
  const e = estimate(null, addons, { drone: 1, jib: 1 });
  assert.equal(e.customQuoteRequired, true); assert.equal(e.total, 75000);
});
test('quantity sanitised', () => assert.deepEqual(setQuantity({}, ad('album-story'), -3), {}));
