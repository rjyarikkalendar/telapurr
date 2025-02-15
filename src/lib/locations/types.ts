
export type Language = 'ru' | 'en' | 'es';
export type CountryId = string;
export type CityId = string;

export type LocationItem = {
  id: string;
  name: string;
};

export type CountriesByLang = {
  [key in Language]: LocationItem[];
};

export type CitiesByLang = {
  [key in Language]: {
    [countryId: CountryId]: LocationItem[];
  };
};
