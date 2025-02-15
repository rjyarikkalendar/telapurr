
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
      { id: "mun", name: "Мюнхен" },
      { id: "ham", name: "Гамбург" },
      { id: "fra", name: "Франкфурт" },
      { id: "col", name: "Кёльн" },
      { id: "stu", name: "Штутгарт" },
      { id: "dus", name: "Дюссельдорф" },
      { id: "dre", name: "Дрезден" },
      { id: "lei", name: "Лейпциг" },
      { id: "han", name: "Ганновер" }
    ],
    fr: [
      { id: "par", name: "Париж" },
      { id: "lyo", name: "Лион" },
      { id: "mar", name: "Марсель" },
      { id: "bor", name: "Бордо" },
      { id: "tls", name: "Тулуза" },
      { id: "lil", name: "Лилль" },
      { id: "nic", name: "Ницца" },
      { id: "nan", name: "Нант" },
      { id: "str", name: "Страсбург" },
      { id: "ren", name: "Ренн" }
    ],
    it: [
      { id: "rom", name: "Рим" },
      { id: "mil", name: "Милан" },
      { id: "nap", name: "Неаполь" },
      { id: "tur", name: "Турин" },
      { id: "pal", name: "Палермо" },
      { id: "bol", name: "Болонья" },
      { id: "flo", name: "Флоренция" },
      { id: "cat", name: "Катания" },
      { id: "ven", name: "Венеция" },
      { id: "ver", name: "Верона" }
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
    // Аналогичная структура для английского языка
    de: [
      { id: "ber", name: "Berlin" },
      { id: "mun", name: "Munich" },
      { id: "ham", name: "Hamburg" },
      { id: "fra", name: "Frankfurt" },
      { id: "col", name: "Cologne" },
      { id: "stu", name: "Stuttgart" },
      { id: "dus", name: "Düsseldorf" },
      { id: "dre", name: "Dresden" },
      { id: "lei", name: "Leipzig" },
      { id: "han", name: "Hannover" }
    ],
    // ... остальные страны для английского языка
  },
  es: {
    // Аналогичная структура для испанского языка
    de: [
      { id: "ber", name: "Berlín" },
      { id: "mun", name: "Múnich" },
      { id: "ham", name: "Hamburgo" },
      { id: "fra", name: "Fráncfort" },
      { id: "col", name: "Colonia" },
      { id: "stu", name: "Stuttgart" },
      { id: "dus", name: "Düsseldorf" },
      { id: "dre", name: "Dresde" },
      { id: "lei", name: "Leipzig" },
      { id: "han", name: "Hannover" }
    ],
    // ... остальные страны для испанского языка
  }
} as const;
