# @lp-labs/damm-checksum

Actual Damm quasigroup decimal check digits with substitution and swap-oracle tests. Catalog identity 427; standalone package version 0.1.0.
No runtime, peer, or sibling dependencies. Node >=18, ESM and CommonJS with declarations.

## Install

```sh
npm install @lp-labs/damm-checksum
```

## Quickstart (runnable JavaScript)

```js
import assert from 'node:assert/strict';
import { dammDigit, appendDamm, validateDamm } from '@lp-labs/damm-checksum';
assert.equal(dammDigit('572'), '4');
assert.equal(appendDamm('572'), '5724');
assert.equal(validateDamm('5724'), true);
assert.equal(validateDamm('5274'), false);
```

## Customization and errors

Generate a single decimal digit or append it to the payload. Pass the complete value to validateDamm. No formatting normalization is performed; leading zeroes are retained. Generation requires 1..4095 ASCII digits and throws TypeError for malformed/oversized payloads. Complete malformed strings return false; non-string arguments throw TypeError.

## Complete public declarations

Every runtime export and public type is shown below. This is the complete emitted declaration surface.

```ts
export declare function dammDigit(payload: string): string;
export declare function appendDamm(payload: string): string;
export declare function validateDamm(value: string): boolean;
```

## Performance, boundaries and limitations

O(n) time and O(1) checksum workspace, complete strings 2..4096 digits. Uses a published weakly totally anti-symmetric quasigroup, not a weighted-sum substitute. Tests exhaustively check digit uniqueness for three-digit payloads, all adjacent swaps for all two-digit payloads, substitutions, and an independent row-string oracle for arbitrary swaps. Adjacent unequal transpositions are detectable, arbitrary distant swaps are not guaranteed. Not authentication, account validation or cryptography.

## Development

```sh
npm ci --offline
npm run build
npm run typecheck
npm test
npm run format:check
```

The offline install requires the locked development dependencies already in the npm cache.
Build emits separate ESM/CJS and declarations; type checks include bare-package .mts/.cts consumers with negative cases.
Runtime tests import only the single-quoted standalone dist entry and also run against installed offline tarballs.
No build artifacts or development dependencies are required at runtime.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
