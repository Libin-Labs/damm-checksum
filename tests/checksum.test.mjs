import test from 'node:test';
import assert from 'node:assert/strict';
import { dammDigit, appendDamm, validateDamm } from '../dist/esm/index.js';
// An independently transcribed row-string oracle for the published Damm quasigroup.
const rows = [
  '0317598642',
  '7092154863',
  '4206871359',
  '1750983426',
  '6123045978',
  '3674209581',
  '5869720134',
  '8945362017',
  '9438617205',
  '2581436790',
];
const oracle = (text) => [...text].reduce((s, c) => Number(rows[s][Number(c)]), 0) === 0;
test('published Damm example', () => {
  assert.equal(dammDigit('572'), '4');
  assert.equal(appendDamm('572'), '5724');
  assert.equal(validateDamm('5724'), true);
});
test('oracle uniqueness exhaustively for three-digit payloads', () => {
  for (let n = 0; n < 1000; n++) {
    const payload = String(n).padStart(3, '0');
    assert.deepEqual(Array.from({ length: 10 }, (_, d) => payload + d).filter(oracle), [
      appendDamm(payload),
    ]);
  }
});
test('every adjacent single swap for every two-digit payload', () => {
  for (let a = 0; a < 10; a++)
    for (let b = 0; b < 10; b++) {
      const s = appendDamm(`${a}${b}`);
      for (let i = 0; i < s.length - 1; i++) {
        const swapped = s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2);
        assert.equal(validateDamm(swapped), oracle(swapped));
        if (s[i] !== s[i + 1]) assert.equal(validateDamm(swapped), false);
      }
    }
});
test('all single substitutions and arbitrary swaps agree with oracle', () => {
  const s = appendDamm('0123456789');
  for (let i = 0; i < s.length; i++) {
    for (let d = 0; d < 10; d++)
      if (String(d) !== s[i]) assert.equal(validateDamm(s.slice(0, i) + d + s.slice(i + 1)), false);
    for (let j = i + 1; j < s.length; j++) {
      const chars = [...s];
      [chars[i], chars[j]] = [chars[j], chars[i]];
      assert.equal(validateDamm(chars.join('')), oracle(chars.join('')));
    }
  }
});
test('leading zeroes and bounded long input', () => {
  assert.equal(appendDamm('000'), '0000');
  assert.equal(validateDamm(appendDamm('1234567890'.repeat(100))), true);
  assert.equal(appendDamm('1'.repeat(4095)).length, 4096);
  assert.throws(() => dammDigit('1'.repeat(4096)), TypeError);
});
test('malformed controls decimal and types', () => {
  for (const s of ['', '0', '12\n', '１２', '1 2']) assert.equal(validateDamm(s), false);
  for (const s of ['', null, '1\n']) assert.throws(() => dammDigit(s), TypeError);
  assert.throws(() => validateDamm(123), TypeError);
});
