
import { westernEuropeCities } from '../cities/western-europe';
import { southernEuropeCities } from '../cities/southern-europe';

describe('Cities data validation', () => {
  const MIN_CITIES = 20;
  const languages = ['ru', 'en', 'es'] as const;
  
  describe('Western Europe cities', () => {
    const countries = ['de', 'fr', 'nl', 'be'] as const;
    
    test.each(languages)('should have at least 20 cities for each country in %s language', (lang) => {
      countries.forEach(country => {
        const cities = westernEuropeCities[lang][country];
        expect(cities.length).toBeGreaterThanOrEqual(MIN_CITIES);
        
        // Check for duplicate IDs
        const ids = cities.map(city => city.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
      });
    });
  });

  describe('Southern Europe cities', () => {
    const countries = ['it', 'es', 'pt', 'gr'] as const;
    
    test.each(languages)('should have at least 20 cities for each country in %s language', (lang) => {
      countries.forEach(country => {
        const cities = southernEuropeCities[lang][country];
        expect(cities.length).toBeGreaterThanOrEqual(MIN_CITIES);
        
        // Check for duplicate IDs
        const ids = cities.map(city => city.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
      });
    });
  });
});
