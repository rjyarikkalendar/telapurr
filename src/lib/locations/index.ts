
export * from './types';
export { countries } from './countries';
import { westernEuropeCities } from './cities/western-europe';
import { southernEuropeCities } from './cities/southern-europe';
import { easternEuropeCities } from './cities/eastern-europe';
import { northernEuropeCities } from './cities/northern-europe';
import { CitiesByLang } from './types';

export const cities: CitiesByLang = {
  ru: {
    ...westernEuropeCities.ru,
    ...southernEuropeCities.ru,
    ...easternEuropeCities.ru,
    ...northernEuropeCities.ru
  },
  en: {
    ...westernEuropeCities.en,
    ...southernEuropeCities.en,
    ...easternEuropeCities.en,
    ...northernEuropeCities.en
  },
  es: {
    ...westernEuropeCities.es,
    ...southernEuropeCities.es,
    ...easternEuropeCities.es,
    ...northernEuropeCities.es
  }
};
