import  { createContext } from 'react';
import { LABELS_ES } from '../../constants/LABELS_ES';

/**
 * Represents the language context.
 * @typedef {Object} LanguageContext
 * @property {string} language - The current language.
 * @property {object} labels - The labels for the current language.
 */

export const LanguageContext = createContext({
  language: 'es',
  labels: LABELS_ES,
});




