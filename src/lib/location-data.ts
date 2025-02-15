type CityData = { id: string; name: string; }[];
type CitiesType = {
  [key in 'ru' | 'en' | 'es']: {
    [countryId: string]: CityData;
  };
};

export const countries = {
  ru: [
    { id: "de", name: "Германия" },
    { id: "fr", name: "Франция" },
    { id: "it", name: "Италия" },
    { id: "es", name: "Испания" },
    { id: "nl", name: "Нидерланды" },
    { id: "be", name: "Бельгия" },
    { id: "pt", name: "Португалия" },
    { id: "at", name: "Австрия" },
    { id: "pl", name: "Польша" },
    { id: "dk", name: "Дания" },
    { id: "se", name: "Швеция" },
    { id: "fi", name: "Финляндия" },
    { id: "ie", name: "Ирландия" },
    { id: "gr", name: "Греция" },
    { id: "cz", name: "Чехия" },
    { id: "hu", name: "Венгрия" },
    { id: "ro", name: "Румыния" },
    { id: "bg", name: "Болгария" },
    { id: "hr", name: "Хорватия" },
    { id: "sk", name: "Словакия" }
  ],
  en: [
    { id: "de", name: "Germany" },
    { id: "fr", name: "France" },
    { id: "it", name: "Italy" },
    { id: "es", name: "Spain" },
    { id: "nl", name: "Netherlands" },
    { id: "be", name: "Belgium" },
    { id: "pt", name: "Portugal" },
    { id: "at", name: "Austria" },
    { id: "pl", name: "Poland" },
    { id: "dk", name: "Denmark" },
    { id: "se", name: "Sweden" },
    { id: "fi", name: "Finland" },
    { id: "ie", name: "Ireland" },
    { id: "gr", name: "Greece" },
    { id: "cz", name: "Czech Republic" },
    { id: "hu", name: "Hungary" },
    { id: "ro", name: "Romania" },
    { id: "bg", name: "Bulgaria" },
    { id: "hr", name: "Croatia" },
    { id: "sk", name: "Slovakia" }
  ],
  es: [
    { id: "de", name: "Alemania" },
    { id: "fr", name: "Francia" },
    { id: "it", name: "Italia" },
    { id: "es", name: "España" },
    { id: "nl", name: "Países Bajos" },
    { id: "be", name: "Bélgica" },
    { id: "pt", name: "Portugal" },
    { id: "at", name: "Austria" },
    { id: "pl", name: "Polonia" },
    { id: "dk", name: "Dinamarca" },
    { id: "se", name: "Suecia" },
    { id: "fi", name: "Finlandia" },
    { id: "ie", name: "Irlanda" },
    { id: "gr", name: "Grecia" },
    { id: "cz", name: "República Checa" },
    { id: "hu", name: "Hungría" },
    { id: "ro", name: "Rumanía" },
    { id: "bg", name: "Bulgaria" },
    { id: "hr", name: "Croacia" },
    { id: "sk", name: "Eslovaquia" }
  ]
};

export const cities: CitiesType = {
  ru: {
    de: [
      { id: "ber", name: "Берлин" },
      { id: "ham", name: "Гамбург" },
      { id: "mun", name: "Мюнхен" },
      { id: "col", name: "Кёльн" },
      { id: "fra", name: "Франкфурт-на-Майне" },
      { id: "stu", name: "Штутгарт" },
      { id: "dus", name: "Дюссельдорф" },
      { id: "dor", name: "Дортмунд" },
      { id: "ess", name: "Эссен" },
      { id: "lei", name: "Лейпциг" },
      { id: "bre", name: "Бремен" },
      { id: "dre", name: "Дрезден" },
      { id: "han", name: "Ганновер" },
      { id: "nur", name: "Нюрнберг" },
      { id: "boc", name: "Бохум" }
    ],
    fr: [
      { id: "par", name: "Париж" },
      { id: "mar", name: "Марсель" },
      { id: "lyo", name: "Лион" },
      { id: "tou", name: "Тулуза" },
      { id: "nic", name: "Ницца" },
      { id: "nan", name: "Нант" },
      { id: "str", name: "Страсбург" },
      { id: "mon", name: "Монпелье" },
      { id: "bor", name: "Бордо" },
      { id: "lil", name: "Лилль" },
      { id: "ren", name: "Ренн" },
      { id: "rei", name: "Реймс" },
      { id: "hav", name: "Гавр" },
      { id: "sai", name: "Сент-Этьен" },
      { id: "tou", name: "Тулон" }
    ],
    it: [
      { id: "rom", name: "Рим" },
      { id: "mil", name: "Милан" },
      { id: "nap", name: "Неаполь" },
      { id: "tur", name: "Турин" },
      { id: "pal", name: "Палермо" },
      { id: "gen", name: "Генуя" },
      { id: "bol", name: "Болонья" },
      { id: "flo", name: "Флоренция" },
      { id: "bar", name: "Бари" },
      { id: "cat", name: "Катания" },
      { id: "ven", name: "Венеция" },
      { id: "ver", name: "Верона" },
      { id: "mes", name: "Мессина" },
      { id: "pad", name: "Падуя" },
      { id: "tri", name: "Триест" }
    ],
    es: [
      { id: "mad", name: "Мадрид" },
      { id: "bcn", name: "Барселона" },
      { id: "val", name: "Валенсия" },
      { id: "sev", name: "Севилья" },
      { id: "zar", name: "Сарагоса" },
      { id: "mal", name: "Малага" },
      { id: "mur", name: "Мурсия" },
      { id: "pma", name: "Пальма" },
      { id: "lpa", name: "Лас-Пальмас" },
      { id: "bil", name: "Бильбао" }
    ],
    nl: [
      { id: "ams", name: "Амстердам" },
      { id: "rot", name: "Роттердам" },
      { id: "hag", name: "Гаага" },
      { id: "utr", name: "Утрехт" },
      { id: "ein", name: "Эйндховен" }
    ],
    be: [
      { id: "bru", name: "Брюссель" },
      { id: "ant", name: "Антверпен" },
      { id: "gnt", name: "Гент" },
      { id: "lie", name: "Льеж" },
      { id: "bru", name: "Брюгге" }
    ],
    pt: [
      { id: "lis", name: "Лиссабон" },
      { id: "por", name: "Порту" },
      { id: "far", name: "Фару" },
      { id: "coi", name: "Коимбра" },
      { id: "bra", name: "Брага" }
    ],
    at: [
      { id: "vie", name: "Вена" },
      { id: "grz", name: "Грац" },
      { id: "lin", name: "Линц" },
      { id: "sal", name: "Зальцбург" },
      { id: "inn", name: "Инсбрук" }
    ],
    pl: [
      { id: "war", name: "Варшава" },
      { id: "kra", name: "Краков" },
      { id: "wro", name: "Вроцлав" },
      { id: "poz", name: "Познань" },
      { id: "gdansk", name: "Гданьск" }
    ],
    dk: [
      { id: "cop", name: "Копенгаген" },
      { id: "aar", name: "Орхус" },
      { id: "ode", name: "Оденсе" },
      { id: "aal", name: "Ольборг" },
      { id: "esbj", name: "Эсбьерг" }
    ],
    se: [
      { id: "sto", name: "Стокгольм" },
      { id: "got", name: "Гётеборг" },
      { id: "mal", name: "Мальмё" },
      { id: "upp", name: "Уппсала" },
      { id: "vas", name: "Вестерос" }
    ],
    fi: [
      { id: "hel", name: "Хельсинки" },
      { id: "esp", name: "Эспоо" },
      { id: "tam", name: "Тампере" },
      { id: "van", name: "Вантаа" },
      { id: "tur", name: "Турку" }
    ],
    ie: [
      { id: "dub", name: "Дублин" },
      { id: "cor", name: "Корк" },
      { id: "gal", name: "Голуэй" },
      { id: "lim", name: "Лимерик" },
      { id: "wat", name: "Уотерфорд" }
    ],
    gr: [
      { id: "ath", name: "Афины" },
      { id: "the", name: "Салоники" },
      { id: "pat", name: "Патры" },
      { id: "her", name: "Ираклион" },
      { id: "lar", name: "Лариса" }
    ],
    cz: [
      { id: "pra", name: "Прага" },
      { id: "brn", name: "Брно" },
      { id: "ost", name: "Острава" },
      { id: "pls", name: "Пльзень" },
      { id: "lib", name: "Либерец" }
    ],
    hu: [
      { id: "bud", name: "Будапешт" },
      { id: "deb", name: "Дебрецен" },
      { id: "sze", name: "Сегед" },
      { id: "mis", name: "Мишкольц" },
      { id: "pec", name: "Печ" }
    ],
    ro: [
      { id: "buc", name: "Бухарест" },
      { id: "clu", name: "Клуж-Напока" },
      { id: "tim", name: "Тимишоара" },
      { id: "ias", name: "Яссы" },
      { id: "con", name: "Констанца" }
    ],
    bg: [
      { id: "sof", name: "София" },
      { id: "plo", name: "Пловдив" },
      { id: "var", name: "Варна" },
      { id: "bur", name: "Бургас" },
      { id: "rus", name: "Русе" }
    ],
    hr: [
      { id: "zag", name: "Загреб" },
      { id: "spl", name: "Сплит" },
      { id: "rij", name: "Риека" },
      { id: "osi", name: "Осиек" },
      { id: "zad", name: "Задар" }
    ],
    sk: [
      { id: "bra", name: "Братислава" },
      { id: "kos", name: "Кошице" },
      { id: "pre", name: "Прешов" },
      { id: "nit", name: "Нитра" },
      { id: "zil", name: "Жилина" }
    ]
  },
  en: {
    de: [
      { id: "ber", name: "Berlin" },
      { id: "ham", name: "Hamburg" },
      { id: "mun", name: "Munich" },
      { id: "col", name: "Cologne" },
      { id: "fra", name: "Frankfurt" },
      { id: "stu", name: "Stuttgart" },
      { id: "dus", name: "Düsseldorf" },
      { id: "dor", name: "Dortmund" },
      { id: "ess", name: "Essen" },
      { id: "lei", name: "Leipzig" },
      { id: "bre", name: "Bremen" },
      { id: "dre", name: "Dresden" },
      { id: "han", name: "Hanover" },
      { id: "nur", name: "Nuremberg" },
      { id: "boc", name: "Bochum" }
    ],
    fr: [
      { id: "par", name: "Paris" },
      { id: "mar", name: "Marseille" },
      { id: "lyo", name: "Lyon" },
      { id: "tou", name: "Toulouse" },
      { id: "nic", name: "Nice" },
      { id: "nan", name: "Nantes" },
      { id: "str", name: "Strasbourg" },
      { id: "mon", name: "Montpellier" },
      { id: "bor", name: "Bordeaux" },
      { id: "lil", name: "Lille" },
      { id: "ren", name: "Rennes" },
      { id: "rei", name: "Reims" },
      { id: "hav", name: "Le Havre" },
      { id: "sai", name: "Saint-Étienne" },
      { id: "tou", name: "Toulon" }
    ],
    it: [
      { id: "rom", name: "Rome" },
      { id: "mil", name: "Milan" },
      { id: "nap", name: "Naples" },
      { id: "tur", name: "Turin" },
      { id: "pal", name: "Palermo" },
      { id: "gen", name: "Genoa" },
      { id: "bol", name: "Bologna" },
      { id: "flo", name: "Florence" },
      { id: "bar", name: "Bari" },
      { id: "cat", name: "Catania" },
      { id: "ven", name: "Venice" },
      { id: "ver", name: "Verona" },
      { id: "mes", name: "Messina" },
      { id: "pad", name: "Padua" },
      { id: "tri", name: "Trieste" }
    ],
    es: [
      { id: "mad", name: "Madrid" },
      { id: "bcn", name: "Barcelona" },
      { id: "val", name: "Valencia" },
      { id: "sev", name: "Seville" },
      { id: "zar", name: "Zaragoza" },
      { id: "mal", name: "Málaga" },
      { id: "mur", name: "Murcia" },
      { id: "pma", name: "Palma" },
      { id: "lpa", name: "Las Palmas" },
      { id: "bil", name: "Bilbao" }
    ],
    nl: [
      { id: "ams", name: "Amsterdam" },
      { id: "rot", name: "Rotterdam" },
      { id: "hag", name: "The Hague" },
      { id: "utr", name: "Utrecht" },
      { id: "ein", name: "Eindhoven" }
    ],
    be: [
      { id: "bru", name: "Brussels" },
      { id: "ant", name: "Antwerp" },
      { id: "gnt", name: "Ghent" },
      { id: "lie", name: "Liège" },
      { id: "bru", name: "Bruges" }
    ],
    pt: [
      { id: "lis", name: "Lisbon" },
      { id: "por", name: "Porto" },
      { id: "far", name: "Faro" },
      { id: "coi", name: "Coimbra" },
      { id: "bra", name: "Braga" }
    ],
    at: [
      { id: "vie", name: "Vienna" },
      { id: "grz", name: "Graz" },
      { id: "lin", name: "Linz" },
      { id: "sal", name: "Salzburg" },
      { id: "inn", name: "Innsbruck" }
    ],
    pl: [
      { id: "war", name: "Warsaw" },
      { id: "kra", name: "Kraków" },
      { id: "wro", name: "Wrocław" },
      { id: "poz", name: "Poznań" },
      { id: "gdansk", name: "Gdańsk" }
    ],
    dk: [
      { id: "cop", name: "Copenhagen" },
      { id: "aar", name: "Aarhus" },
      { id: "ode", name: "Odense" },
      { id: "aal", name: "Aalborg" },
      { id: "esbj", name: "Esbjerg" }
    ],
    se: [
      { id: "sto", name: "Stockholm" },
      { id: "got", name: "Gothenburg" },
      { id: "mal", name: "Malmö" },
      { id: "upp", name: "Uppsala" },
      { id: "vas", name: "Västerås" }
    ],
    fi: [
      { id: "hel", name: "Helsinki" },
      { id: "esp", name: "Espoo" },
      { id: "tam", name: "Tampere" },
      { id: "van", name: "Vantaa" },
      { id: "tur", name: "Turku" }
    ],
    ie: [
      { id: "dub", name: "Dublin" },
      { id: "cor", name: "Cork" },
      { id: "gal", name: "Galway" },
      { id: "lim", name: "Limerick" },
      { id: "wat", name: "Waterford" }
    ],
    gr: [
      { id: "ath", name: "Athens" },
      { id: "the", name: "Thessaloniki" },
      { id: "pat", name: "Patras" },
      { id: "her", name: "Heraklion" },
      { id: "lar", name: "Larissa" }
    ],
    cz: [
      { id: "pra", name: "Prague" },
      { id: "brn", name: "Brno" },
      { id: "ost", name: "Ostrava" },
      { id: "pls", name: "Plzeň" },
      { id: "lib", name: "Liberec" }
    ],
    hu: [
      { id: "bud", name: "Budapest" },
      { id: "deb", name: "Debrecen" },
      { id: "sze", name: "Szeged" },
      { id: "mis", name: "Miskolc" },
      { id: "pec", name: "Pécs" }
    ],
    ro: [
      { id: "buc", name: "Bucharest" },
      { id: "clu", name: "Cluj-Napoca" },
      { id: "tim", name: "Timișoara" },
      { id: "ias", name: "Iași" },
      { id: "con", name: "Constanța" }
    ],
    bg: [
      { id: "sof", name: "Sofia" },
      { id: "plo", name: "Plovdiv" },
      { id: "var", name: "Varna" },
      { id: "bur", name: "Burgas" },
      { id: "rus", name: "Ruse" }
    ],
    hr: [
      { id: "zag", name: "Zagreb" },
      { id: "spl", name: "Split" },
      { id: "rij", name: "Rijeka" },
      { id: "osi", name: "Osijek" },
      { id: "zad", name: "Zadar" }
    ],
    sk: [
      { id: "bra", name: "Bratislava" },
      { id: "kos", name: "Košice" },
      { id: "pre", name: "Prešov" },
      { id: "nit", name: "Nitra" },
      { id: "zil", name: "Žilina" }
    ]
  },
  es: {
    de: [
      { id: "ber", name: "Berlín" },
      { id: "ham", name: "Hamburgo" },
      { id: "mun", name: "Múnich" },
      { id: "col", name: "Colonia" },
      { id: "fra", name: "Fráncfort" },
      { id: "stu", name: "Stuttgart" },
      { id: "dus", name: "Düsseldorf" },
      { id: "dor", name: "Dortmund" },
      { id: "ess", name: "Essen" },
      { id: "lei", name: "Leipzig" },
      { id: "bre", name: "Bremen" },
      { id: "dre", name: "Dresde" },
      { id: "han", name: "Hannover" },
      { id: "nur", name: "Núremberg" },
      { id: "boc", name: "Bochum" }
    ],
    fr: [
      { id: "par", name: "París" },
      { id: "mar", name: "Marsella" },
      { id: "lyo", name: "Lyon" },
      { id: "tou", name: "Toulouse" },
      { id: "nic", name: "Niza" },
      { id: "nan", name: "Nantes" },
      { id: "str", name: "Estrasburgo" },
      { id: "mon", name: "Montpellier" },
      { id: "bor", name: "Burdeos" },
      { id: "lil", name: "Lille" },
      { id: "ren", name: "Rennes" },
      { id: "rei", name: "Reims" },
      { id: "hav", name: "Le Havre" },
      { id: "sai", name: "Saint-Étienne" },
      { id: "tou", name: "Tolón" }
    ],
    it: [
      { id: "rom", name: "Roma" },
      { id: "mil", name: "Milán" },
      { id: "nap", name: "Nápoles" },
      { id: "tur", name: "Turín" },
      { id: "pal", name: "Palermo" },
      { id: "gen", name: "Génova" },
      { id: "bol", name: "Bolonia" },
      { id: "flo", name: "Florencia" },
      { id: "bar", name: "Bari" },
      { id: "cat", name: "Catania" },
      { id: "ven", name: "Venecia" },
      { id: "ver", name: "Verona" },
      { id: "mes", name: "Mesina" },
      { id: "pad", name: "Padua" },
      { id: "tri", name: "Trieste" }
    ],
    es: [
      { id: "mad", name: "Madrid" },
      { id: "bcn", name: "Barcelona" },
      { id: "val", name: "Valencia" },
      { id: "sev", name: "Sevilla" },
      { id: "zar", name: "Zaragoza" },
      { id: "mal", name: "Málaga" },
      { id: "mur", name: "Murcia" },
      { id: "pma", name: "Palma" },
      { id: "lpa", name: "Las Palmas" },
      { id: "bil", name: "Bilbao" }
    ],
    nl: [
      { id: "ams", name: "Ámsterdam" },
      { id: "rot", name: "Róterdam" },
      { id: "hag", name: "La Haya" },
      { id: "utr", name: "Utrecht" },
      { id: "ein", name: "Eindhoven" }
    ],
    be: [
      { id: "bru", name: "Bruselas" },
      { id: "ant", name: "Amberes" },
      { id: "gnt", name: "Gante" },
      { id: "lie", name: "Lieja" },
      { id: "bru", name: "Brujas" }
    ],
    pt: [
      { id: "lis", name: "Lisboa" },
      { id: "por", name: "Oporto" },
      { id: "far", name: "Faro" },
      { id: "coi", name: "Coímbra" },
      { id: "bra", name: "Braga" }
    ],
    at: [
      { id: "vie", name: "Viena" },
      { id: "grz", name: "Graz" },
      { id: "lin", name: "Linz" },
      { id: "sal", name: "Salzburgo" },
      { id: "inn", name: "Innsbruck" }
    ],
    pl: [
      { id: "war", name: "Varsovia" },
      { id: "kra", name: "Cracovia" },
      { id: "wro", name: "Breslavia" },
      { id: "poz", name: "Poznań" },
      { id: "gdansk", name: "Gdańsk" }
    ],
    dk: [
      { id: "cop", name: "Copenhague" },
      { id: "aar", name: "Aarhus" },
      { id: "ode", name: "Odense" },
      { id: "aal", name: "Aalborg" },
      { id: "esbj", name: "Esbjerg" }
    ],
    se: [
      { id: "sto", name: "Estocolmo" },
      { id: "got", name: "Gotemburgo" },
      { id: "mal", name: "Malmö" },
      { id: "upp", name: "Uppsala" },
      { id: "vas", name: "Västerås" }
    ],
    fi: [
      { id: "hel", name: "Helsinki" },
      { id: "esp", name: "Espoo" },
      { id: "tam", name: "Tampere" },
      { id: "van", name: "Vantaa" },
      { id: "tur", name: "Turku" }
    ],
    ie: [
      { id: "dub", name: "Dublín" },
      { id: "cor", name: "Cork" },
      { id: "gal", name: "Galway" },
      { id: "lim", name: "Limerick" },
      { id: "wat", name: "Waterford" }
    ],
    gr: [
      { id: "ath", name: "Atenas" },
      { id: "the", name: "Tesalónica" },
      { id: "pat", name: "Patras" },
      { id: "her", name: "Heraklion" },
      { id: "lar", name: "Larisa" }
    ],
    cz: [
      { id: "pra", name: "Praga" },
      { id: "brn", name: "Brno" },
      { id: "ost", name: "Ostrava" },
      { id: "pls", name: "Pilsen" },
      { id: "lib", name: "Liberec" }
    ],
    hu: [
      { id: "bud", name: "Budapest" },
      { id: "deb", name: "Debrecen" },
      { id: "sze", name: "Szeged" },
      { id: "mis", name: "Miskolc" },
      { id: "pec", name: "Pécs" }
    ],
    ro: [
      { id: "buc", name: "Bucarest" },
      { id: "clu", name: "Cluj-Napoca" },
      { id: "tim", name: "Timișoara" },
      { id: "ias", name: "Iași" },
      { id: "con", name: "Constanța" }
    ],
    bg: [
      { id: "sof", name: "Sofía" },
      { id: "
