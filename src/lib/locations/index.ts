
export * from './types';
export { countries } from './countries';
import { westernEuropeCities } from './cities/western-europe';
import { southernEuropeCities } from './cities/southern-europe';
import { easternEuropeCities } from './cities/eastern-europe';
import { CitiesByLang } from './types';

export const cities: CitiesByLang = {
  ru: {
    ...westernEuropeCities.ru,
    ...southernEuropeCities.ru,
    ...easternEuropeCities.ru
  },
  en: {
    ...westernEuropeCities.en,
    ...southernEuropeCities.en,
    ...easternEuropeCities.en
  },
  es: {
    ...westernEuropeCities.es,
    ...southernEuropeCities.es,
    ...easternEuropeCities.es
  }
};
