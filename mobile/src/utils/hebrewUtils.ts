/**
 * Remove niqqud (vowel points) from Hebrew text for comparison
 */
export function removeNiqqud(text: string): string {
  // Unicode range for Hebrew niqqud is U+0591 to U+05C7
  return text.replace(/[\u0591-\u05C7]/g, '');
}

/**
 * Compare Hebrew text ignoring niqqud
 */
export function compareHebrewText(text1: string, text2: string): boolean {
  const normalized1 = removeNiqqud(text1.trim());
  const normalized2 = removeNiqqud(text2.trim());
  return normalized1 === normalized2;
}

/**
 * Resolve gendered text based on selected gender
 */
export function resolveGenderedText(
  text: string | { male: string; female: string },
  gender: 'male' | 'female'
): string {
  if (typeof text === 'string') return text;
  return text[gender];
}
