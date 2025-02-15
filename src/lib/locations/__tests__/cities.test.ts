
const cities = {
  westernEuropeCities: {
    ru: { de: [], fr: [], nl: [], be: [] },
    en: { de: [], fr: [], nl: [], be: [] },
    es: { de: [], fr: [], nl: [], be: [] }
  },
  southernEuropeCities: {
    ru: { it: [], es: [], pt: [], gr: [] },
    en: { it: [], es: [], pt: [], gr: [] },
    es: { it: [], es: [], pt: [], gr: [] }
  },
  easternEuropeCities: {
    ru: { bg: [], hr: [], sk: [], ro: [], hu: [], cz: [] },
    en: { bg: [], hr: [], sk: [], ro: [], hu: [], cz: [] },
    es: { bg: [], hr: [], sk: [], ro: [], hu: [], cz: [] }
  }
};

describe('Cities data validation', () => {
  const MIN_CITIES = 20;
  const languages = ['ru', 'en', 'es'] as const;
  
  describe('Western Europe cities', () => {
    const countries = ['de', 'fr', 'nl', 'be'] as const;
    
    test.each(languages)('should have at least 20 cities for each country in %s language', (lang) => {
      countries.forEach(country => {
        const citiesForCountry = cities.westernEuropeCities[lang][country];
        expect(citiesForCountry.length).toBeGreaterThanOrEqual(MIN_CITIES);
        
        // Check for duplicate IDs
        const ids = citiesForCountry.map(city => city.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
      });
    });
  });

  describe('Southern Europe cities', () => {
    const countries = ['it', 'es', 'pt', 'gr'] as const;
    
    test.each(languages)('should have at least 20 cities for each country in %s language', (lang) => {
      countries.forEach(country => {
        const citiesForCountry = cities.southernEuropeCities[lang][country];
        expect(citiesForCountry.length).toBeGreaterThanOrEqual(MIN_CITIES);
        
        // Check for duplicate IDs
        const ids = citiesForCountry.map(city => city.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
      });
    });
  });

  describe('Eastern Europe cities', () => {
    const countries = ['bg', 'hr', 'sk', 'ro', 'hu', 'cz'] as const;
    
    test.each(languages)('should have at least 20 cities for each country in %s language', (lang) => {
      countries.forEach(country => {
        const citiesForCountry = cities.easternEuropeCities[lang][country];
        expect(citiesForCountry.length).toBeGreaterThanOrEqual(MIN_CITIES);
        
        // Check for duplicate IDs
        const ids = citiesForCountry.map(city => city.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
      });
    });
  });
});
