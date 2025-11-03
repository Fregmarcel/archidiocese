export function normalizeText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[’'`´]/g, '-')
    .replace(/[^\p{L}\p{N}\s\-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function slugify(input: string): string {
  const n = normalizeText(input);
  return n.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
}

export function codeify(input: string, { prefix }: { prefix?: string } = {}): string {
  const n = normalizeText(input).toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/-+/g, '-');
  return [prefix, n].filter(Boolean).join('-');
}
