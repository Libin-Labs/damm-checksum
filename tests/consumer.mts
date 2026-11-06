import { dammDigit, appendDamm, validateDamm } from '@lp-labs/damm-checksum';
const digit: string = dammDigit('572');
const value: string = appendDamm('572');
const valid: boolean = validateDamm(value);
digit.toUpperCase();
valid.valueOf();
// @ts-expect-error exact string input required
dammDigit(572);
// @ts-expect-error no options overload
validateDamm(value, {});
// @ts-expect-error cannot append to null
appendDamm(null);
