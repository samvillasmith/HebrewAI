import { Gender, GenderedText } from '@/types/interactive-lesson'

/**
 * Resolves a GenderedText value to a string based on the selected gender.
 * If the text is already a string (gender-neutral), returns it as is.
 * If it's an object with male/female variants, returns the appropriate one.
 */
export function resolveGenderedText(text: GenderedText, gender: Gender): string {
  if (typeof text === 'string') {
    return text
  }
  return gender === 'male' ? text.male : text.female
}

/**
 * Resolves an array of GenderedText values
 */
export function resolveGenderedArray(texts: GenderedText[], gender: Gender): string[] {
  return texts.map(text => resolveGenderedText(text, gender))
}
