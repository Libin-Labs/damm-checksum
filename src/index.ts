const quasigroup = [
  [0, 3, 1, 7, 5, 9, 8, 6, 4, 2],
  [7, 0, 9, 2, 1, 5, 4, 8, 6, 3],
  [4, 2, 0, 6, 8, 7, 1, 3, 5, 9],
  [1, 7, 5, 0, 9, 8, 3, 4, 2, 6],
  [6, 1, 2, 3, 0, 4, 5, 9, 7, 8],
  [3, 6, 7, 4, 2, 0, 9, 5, 8, 1],
  [5, 8, 6, 9, 7, 2, 0, 1, 3, 4],
  [8, 9, 4, 5, 3, 6, 2, 0, 1, 7],
  [9, 4, 3, 8, 6, 1, 7, 2, 0, 5],
  [2, 5, 8, 1, 4, 3, 6, 7, 9, 0],
] as const;
function state(value: string): number {
  let interim = 0;
  for (const digit of value) interim = quasigroup[interim]![Number(digit)]!;
  return interim;
}
export function dammDigit(payload: string): string {
  if (
    typeof payload !== 'string' ||
    payload.length < 1 ||
    payload.length > 4095 ||
    /[^0-9]/.test(payload)
  )
    throw new TypeError('Payload must contain 1..4095 ASCII digits.');
  return String(state(payload));
}
export function appendDamm(payload: string): string {
  return payload + dammDigit(payload);
}
export function validateDamm(value: string): boolean {
  if (typeof value !== 'string') throw new TypeError('Value must be a string.');
  return value.length >= 2 && value.length <= 4096 && !/[^0-9]/.test(value) && state(value) === 0;
}
