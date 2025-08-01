// Input sanitization helpers

export function sanitizeKeywords(input: unknown): string[] {
  if (typeof input !== 'string' || !input) return [];
  return input
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0);
}

export function sanitizeGeo(input: unknown): string {
  if (typeof input !== 'string' || !input) return 'WORLDWIDE';
  const geo = input.trim().toUpperCase();
  return geo.length <= 3 ? geo : 'WORLDWIDE';
}

export function sanitizeTimeframe(input: unknown): string {
  const allowed = ['today 12-m', 'now 7-d', 'now 1-d', 'today 3-m'];
  if (typeof input !== 'string') return 'today 12-m';
  const val = input.trim().toLowerCase();
  return allowed.includes(val) ? val : 'today 12-m';
}

export function sanitizeTopFeatures(input: unknown): number {
  const n = Number(input);
  if (!Number.isInteger(n) || n < 1 || n > 20) return 5;
  return n;
}
