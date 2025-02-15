
export * from './types';
export { countries } from './countries';
import { westernEuropeCities } from './cities/western-europe';
import { southernEuropeCities } from './cities/southern-europe';
import { CitiesByLang } from './types';

export const cities: CitiesByLang = {
  ru: {
    ...westernEuropeCities.ru,
    ...southernEuropeCities.ru,
  },
  en: {
    ...westernEuropeCities.en,
    ...southernEuropeCities.en,
  },
  es: {
    ...westernEuropeCities.es,
    ...southernEuropeCities.es,
  }
};
