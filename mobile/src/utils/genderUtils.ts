type GenderedText = string | { male: string; female: string };
type Gender = 'male' | 'female';

export function resolveGenderedText(
  text: GenderedText,
  gender: Gender = 'male'
): string {
  if (typeof text === 'string') {
    return text;
  }
  return text[gender];
}
