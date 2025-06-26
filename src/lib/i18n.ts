export type Language = 'ru' | 'en' | 'es' | 'zh';

export const languages: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
  es: 'Español',
  zh: '中文'
};

export const translations = {
  ru: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      contact: 'Контакты',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти'
    },
    hero: {
      title: 'Искусство чайной церемонии',
      subtitle: 'Погрузитесь в мир традиционной китайской чайной культуры',
      cta: 'Начать путешествие'
    },
    categories: {
      discover: 'Откройте для себя',
      tea: {
        title: 'Чай',
        description: 'Коллекция изысканных сортов чая'
      },
      teaware: {
        title: 'Посуда',
        description: 'Традиционная чайная посуда'
      },
      sets: {
        title: 'Наборы',
        description: 'Наборы для чайной церемонии'
      }
    },
    tea: {
      categories: {
        all: 'Все чаи',
        shen: 'Шен Пуэр',
        shu: 'Шу Пуэр',
        white: 'Белый',
        gabba: 'Габба',
        red: 'Красные улуны',
        green: 'Зеленые улуны'
      },
      filters: {
        title: 'Фильтры',
        kind: 'Вид',
        allKinds: 'Все виды',
        aged: 'Выдержанный',
        young: 'Молодой',
        premium: 'Премиум',
        age: 'Возраст (лет)',
        from: 'От',
        to: 'До',
        sort: 'Сортировка',
        sortBy: {
          newest: 'Новые первыми',
          oldest: 'Старые первыми',
          priceAsc: 'Цена по возрастанию',
          priceDesc: 'Цена по убыванию',
          alphabetical: 'По алфавиту'
        },
        search: 'Поиск по названию...',
        inStock: 'В наличии',
        outOfStock: 'Нет в наличии'
      },
      pagination: {
        prev: 'Предыдущая',
        next: 'Следующая',
        page: 'Страница',
        of: 'из',
        total: 'всего',
        records: 'записей'
      },
      details: 'Подробнее',
      error: 'Ошибка загрузки данных'
    },
    teaware: {
      filters: {
        title: 'Фильтры',
        type: 'Тип',
        material: 'Материал',
        inStock: 'В наличии'
      },
      types: {
        all: 'Все',
        chabu: 'Чабань',
        set: 'Набор посуды',
        cups: 'Пиалы',
        teapots: 'Типоды и чайники',
        gaiwan: 'Гайвань',
        pets: 'Питомцы и чайные игрушки',
        siphon: 'Сифон',
        fairnessCups: 'Чаши справедливости',
        thermos: 'Термосы',
        other: 'Другое'
      },
      materials: {
        all: 'Все',
        ceramic: 'Керамика',
        porcelain: 'Фарфор',
        glass: 'Стекло',
        clay: 'Глина',
        wood: 'Дерево',
        bamboo: 'Бамбук',
        metal: 'Металл'
      }
    },
    sets: {
      filters: {
        title: 'Фильтры',
        people: 'Людей',
        anyAmount: 'Все',
        giftPackaging: 'Подарочная упаковка',
        inStock: 'В наличии'
      }
    },
    cart: {
      addToCart: 'В корзину',
      outOfStock: 'Нет в наличии',
      addedToCart: 'Товар добавлен в корзину',
      cancel: 'Отменить',
      selectSize: 'Выберите размер упаковки',
      yearsOld: 'лет'
    },
    checkout: {
      title: 'Оформление заказа',
      recipientInfo: 'Информация о получателе',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      country: 'Страна',
      city: 'Город',
      address: 'Адрес',
      postalCode: 'Индекс',
      selectCountry: 'Выберите страну',
      selectCity: 'Выберите город',
      addressPlaceholder: 'Улица, дом, квартира',
      pay: 'Оплатить',
      orderTotal: 'Итого',
      yourOrder: 'Ваш заказ',
      quantity: 'Количество'
    },
    profile: {
      title: 'Профиль',
      personalInfo: 'Личные данные',
      firstName: 'Имя',
      lastName: 'Фамилия',
      middleName: 'Отчество',
      email: 'Email',
      phone: 'Телефон',
      phoneBonus: '💡 При добавлении телефона вы получите скидку 15% на следующий заказ!',
      save: 'Сохранить',
      saving: 'Сохранение...',
      loyalty: {
        title: 'Программа лояльности',
        currentCashback: 'Текущий кешбек',
        totalPurchases: 'Общие покупки',
        pointsBalance: 'Баланс баллов',
        nextLevel: 'До следующего уровня',
        need: 'Нужно еще',
        levels: 'Уровни лояльности',
        levelDescriptions: {
          silver: 'Регистрация',
          pearl: 'Полный профиль + 1 друг',
          sapphire: 'Покупки на 500€',
          emerald: 'Покупки на 1000€',
          gold: 'Покупки на 3000€',
          platinum: 'Покупки на 6000€',
          diamond: 'Покупки на 10000€'
        }
      },
      referral: {
        title: 'Реферальная программа',
        bonus: '20€ за друга!',
        description: 'Приглашайте друзей и получайте по 20€',
        link: 'Ваша реферальная ссылка:',
        copy: 'Копировать',
        invited: 'Приглашено друзей:',
        howItWorks: 'Как это работает:',
        step1: '1. Друг регистрируется по вашей ссылке и получает 20€ для первого заказа',
        step2: '2. После первого заказа друга вы получаете 20€ на свой счет',
        step3: '3. Бонусы можно использовать для будущих покупок'
      },
      coupons: {
        title: 'Мои купоны',
        active: 'Активных купонов:',
        none: 'У вас пока нет активных купонов'
      },
      success: 'Профиль обновлен',
      error: 'Не удалось обновить профиль'
    },
    partnership: {
      title: 'Партнерство с нами',
      subtitle: 'Предлагаем возможность создать дополнительный источник дохода',
      intro: 'Мы предлагаем вам возможность создать дополнительный источник дохода для вашего места продаж и добавить уютную атмосферу, предлагая горячие и холодные напитки на основе чая, упакованные для потребителя, и продукты, которые не требуют дополнительной работы персонала вашего места продаж.',
      team: {
        title: 'Наша команда',
        person1: {
          name: 'Распопов Ярослав (27 лет)',
          description: 'Человек, который очень хорошо разбирается в продажах и разработке продуктов онлайн/офлайн. Отвечает за продажи, упаковку, расчеты, нормативные документы. Интересуется чаем. 4 года в продажах и маркетинге; 5 лет в IT, разрабатывает и согласовывает проекты с бизнесом и разработкой.'
        },
        person2: {
          name: 'Хайрулина Милен (26 лет)',
          description: 'Неопознанная кошечка, глубоко погруженная в азиатские чаи и травы, а также чайные продукты. Отвечает за чаи, чайные продукты и подготовку материалов для партнеров. Провела 5 лет в путешествиях и изучении азиатской и индийской культуры, чаев, трав и обычаев; 1 год дизайна для маркетинговых материалов Soshal Clubs.'
        }
      },
      products: {
        title: 'Наши продукты',
        description: 'Клиент выбирает чай из каталога для сифона и термоса.',
        product1: {
          name: 'Чай в термосе с чашкой',
          description: '5 минут на приготовление 1 литра чая у барной стойки, разливаем в термос для удобного перемещения по вашему месту продаж.'
        },
        product2: {
          name: 'Чай, приготовленный через сифон',
          description: 'Выглядит как 10-минутное шоу, дает 250 мл очень питкого чая.'
        },
        product3: {
          name: 'Освежающий чайный коктейль',
          description: 'Готовьте освежающие тонизирующие чайные коктейли с травами и фруктами за барной стойкой, не теряя ни минуты.'
        },
        product4: {
          name: 'Освежающий чай в бутылке',
          description: 'Для любителей освежающих напитков без сахара, содержащих только чай и воду, приготовленных по технике холодного заваривания для получения мягкого вкуса и тонизирующего эффекта.'
        }
      },
      integration: {
        title: 'Интеграция продуктов в ваше заведение',
        step1: {
          title: 'Скажите "Хорошо, сделка заключена" и выберите варианты продукта',
          description: 'Вы выбираете, какие коктейли/чаи/бутылки с чаем вы хотели бы видеть в вашем месте продаж. После пробного месяца вы можете добавить больше оговоренных вариантов в свое летнее меню или акции.'
        },
        step2: {
          title: 'Интеграция оборудования (1 неделя)',
          description: 'Мы предоставляем оборудование, маркетинговые материалы для размещения в вашем месте продаж и для социальных сетей или вашего веб-сайта. И мы сами скоординируем размеры с вами, подстроим фон и стиль под ваше место продаж, даже распечатаем и доставим вам.'
        },
        step3: {
          title: 'Приготовление коктейля',
          description: 'Мы предоставим вам заготовки для коктейлей. И мы будем готовы научить вас, как приготовить графин коктейлей за 10 минут, используя заготовки для коктейлей. Из 1 графина можно разлить 4 готовых коктейля, останется только добавить лед в стакан.'
        },
        step4: {
          title: 'Анализ',
          description: 'После первого месяца интеграции и тестирования чайных продуктов в вашем заведении, мы предоставим вам аналитику о том, какие продукты хорошо продавались за этот месяц, сколько ресурсов было потрачено и сколько было заработано на чае.'
        }
      },
      agreement: {
        title: 'Финальное соглашение',
        description: 'Первый месяц - это проба для обеих сторон, по итогам которой мы решаем, продолжаем мы сотрудничество или нет. В течение этого месяца мы предоставим вам маркетинговые материалы, оборудование, чай, заготовки для коктейлей, обучение и сделаем все возможное, чтобы максимизировать ваши продажи чайных продуктов. Вам нужно будет оплатить только стоимость расходных материалов для приготовления напитка, что означает, что в конце месяца вы оплатите только затраты, и только если вы продаете напиток в заведении.'
      },
      sales: {
        title: 'Продажи',
        description: 'Все маркетинговые материалы будут предоставлены нами.',
        marketingPoints: [
          'Мини-меню в баре, на столах, в социальных сетях и на веб-сайте;',
          'Дегустации чая и методы приготовления;',
          'Эффект сюрприза от чая в сифоне и опьянение от чая;',
          'Отдельное меню для летнего холодного чая и фруктовых напитков, а также сезонных коктейлей;',
          'Летом продаем коктейли со льдом для тех, кто не любит колу и подобное;',
          'Для привлечения клиентов, заботящихся о здоровье и ищущих изысканные альтернативы;',
          'Для тех, кто предпочитает напитки без сахара, мы предлагаем бутилированный чай.'
        ]
      },
      contacts: {
        title: 'Контакты',
        phone: '+34 641 959 330 или +7 707 903 3663 - WhatsApp',
        instagram: 'telapurr - Instagram',
        email: 'telapurr@gmail.com'
      },
      buttonText: 'Партнерство с нами'
    }
  },
  
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      logout: 'Logout'
    },
    hero: {
      title: 'The Art of Tea Ceremony',
      subtitle: 'Immerse yourself in the world of traditional Chinese tea culture',
      cta: 'Start the Journey'
    },
    categories: {
      discover: 'Discover',
      tea: {
        title: 'Tea',
        description: 'Collection of exquisite tea varieties'
      },
      teaware: {
        title: 'Teaware',
        description: 'Traditional tea utensils'
      },
      sets: {
        title: 'Sets',
        description: 'Tea ceremony sets'
      }
    },
    tea: {
      categories: {
        all: 'All Teas',
        shen: 'Sheng Pu\'er',
        shu: 'Shu Pu\'er',
        white: 'White',
        gabba: 'Gabba',
        red: 'Red Oolongs',
        green: 'Green Oolongs'
      },
      filters: {
        title: 'Filters',
        kind: 'Kind',
        allKinds: 'All kinds',
        aged: 'Aged',
        young: 'Young',
        premium: 'Premium',
        age: 'Age (years)',
        from: 'From',
        to: 'To',
        sort: 'Sort',
        sortBy: {
          newest: 'Newest first',
          oldest: 'Oldest first',
          priceAsc: 'Price low to high',
          priceDesc: 'Price high to low',
          alphabetical: 'Alphabetical'
        },
        search: 'Search by title...',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock'
      },
      pagination: {
        prev: 'Previous',
        next: 'Next',
        page: 'Page',
        of: 'of',
        total: 'total',
        records: 'records'
      },
      details: 'Details',
      error: 'Data loading error'
    },
    teaware: {
      filters: {
        title: 'Filters',
        type: 'Type',
        material: 'Material',
        inStock: 'In Stock'
      },
      types: {
        all: 'All',
        chabu: 'Chabu',
        set: 'Teaware Set',
        cups: 'Cups',
        teapots: 'Teapots',
        gaiwan: 'Gaiwan',
        pets: 'Tea Pets & Toys',
        siphon: 'Siphon',
        fairnessCups: 'Fairness Cups',
        thermos: 'Thermos',
        other: 'Other'
      },
      materials: {
        all: 'All',
        ceramic: 'Ceramic',
        porcelain: 'Porcelain',
        glass: 'Glass',
        clay: 'Clay',
        wood: 'Wood',
        bamboo: 'Bamboo',
        metal: 'Metal'
      }
    },
    sets: {
      filters: {
        title: 'Filters',
        people: 'People',
        anyAmount: 'Any amount',
        giftPackaging: 'Gift packaging',
        inStock: 'In Stock'
      }
    },
    cart: {
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      addedToCart: 'Item added to cart',
      cancel: 'Cancel',
      selectSize: 'Select package size',
      yearsOld: 'years old'
    },
    checkout: {
      title: 'Checkout',
      recipientInfo: 'Recipient Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      city: 'City',
      address: 'Address',
      postalCode: 'Postal Code',
      selectCountry: 'Select country',
      selectCity: 'Select city',
      addressPlaceholder: 'Street, house, apartment',
      pay: 'Pay',
      orderTotal: 'Total',
      yourOrder: 'Your Order',
      quantity: 'Quantity'
    },
    profile: {
      title: 'Profile',
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      middleName: 'Middle Name',
      email: 'Email',
      phone: 'Phone',
      phoneBonus: '💡 Adding a phone number gives you 15% off your next order!',
      save: 'Save',
      saving: 'Saving...',
      loyalty: {
        title: 'Loyalty Program',
        currentCashback: 'Current cashback',
        totalPurchases: 'Total purchases',
        pointsBalance: 'Points balance',
        nextLevel: 'To next level',
        need: 'Need',
        levels: 'Loyalty levels',
        levelDescriptions: {
          silver: 'Registration',
          pearl: 'Complete profile + 1 friend',
          sapphire: '€500 in purchases',
          emerald: '€1000 in purchases',
          gold: '€3000 in purchases',
          platinum: '€6000 in purchases',
          diamond: '€10000 in purchases'
        }
      },
      referral: {
        title: 'Referral Program',
        bonus: '€20 per friend!',
        description: 'Invite friends and earn €20 each',
        link: 'Your referral link:',
        copy: 'Copy',
        invited: 'Friends invited:',
        howItWorks: 'How it works:',
        step1: '1. Friend registers via your link and gets €20 for first order',
        step2: '2. After friend\'s first order, you get €20 to your account',
        step3: '3. Bonuses can be used for future purchases'
      },
      coupons: {
        title: 'My Coupons',
        active: 'Active coupons:',
        none: 'You don\'t have any active coupons yet'
      },
      success: 'Profile updated successfully',
      error: 'Failed to update profile'
    },
    partnership: {
      title: 'Partnership with us',
      subtitle: 'We offer the opportunity to create an additional source of income',
      intro: 'We offer you the opportunity to create an additional source of income for your sales venue and add a cozy atmosphere by offering hot and cold tea-based drinks, packaged for the consumer, and products that do not require extra work from the sales venue staff.',
      team: {
        title: 'Our Team',
        person1: {
          name: 'Raspopov Yaroslav (age 27)',
          description: 'The guy who knows a lot about sales and online/offline product engineering. Responsible for sales, packaging, calculations, regulatory. Interested in tea. 4 years in sales and marketing; 5 years in IT, developing and aligning projects with business and development.'
        },
        person2: {
          name: 'Khairulina Milen (age 26)',
          description: 'Unidentified kitty who is deeply immersed in Asian teas and herbs, as well as tea products. Responsible for teas, tea products, and preparation of materials for partners. Spent 5 years traveling and studying Asian and Indian culture, teas, herbs, and customs; 1 year designing for Soshal Clubs marketing materials.'
        }
      },
      products: {
        title: 'Our Products',
        description: 'The customer selects tea from the catalog for the siphon and thermos.',
        product1: {
          name: 'Tea in a thermos with a cup',
          description: '5 minutes to prepare 1 liter of tea at the bar, pour it into a thermos for convenient movement around your sales venue.'
        },
        product2: {
          name: 'Tea prepared with a siphon',
          description: 'Looks like a 10-minute show, makes 250 ml of very drinkable tea.'
        },
        product3: {
          name: 'Refreshing tea cocktail',
          description: 'Prepare refreshing tonic tea cocktails with herbs and fruits behind the bar, without losing a minute.'
        },
        product4: {
          name: 'Refreshing tea in a bottle',
          description: 'For lovers of refreshing sugar-free drinks that contain only tea and water, made with a cold brewing technique to achieve a mild taste and tonic effect.'
        }
      },
      integration: {
        title: 'Integrating Products into Your Venue',
        step1: {
          title: 'Say, "Okay, deal done" and choose product options',
          description: 'You choose which cocktails/tea/bottled tea you would like to see in your sales venue. After the trial month, you can add more stipulated variants to your summer menu or promotions.'
        },
        step2: {
          title: 'Equipment Integration (1 week)',
          description: 'We provide equipment, product marketing materials for placement in your sales venue premises and for social networks or your website. And we ourselves will coordinate the dimensions with you, adjust the background and style for your sales venue, even print it out and bring it to you.'
        },
        step3: {
          title: 'Preparing a Cocktail',
          description: 'We will provide you with cocktail blanks. And we\'ll be ready to teach you how to make a decanter of cocktails in 10 minutes using cocktail blanks. 1 decanter can be poured over 4 ready cocktails, all that will be left is to add ice to the glass.'
        },
        step4: {
          title: 'Analysis',
          description: 'After the first month of integration and testing of tea products in your establishment, we will provide you with analytics on which products sold well during that month and how many resources were spent and how much was earned from tea.'
        }
      },
      agreement: {
        title: 'Final Agreement',
        description: 'The first month is a trial for both parties, at the end of which we decide whether we continue our cooperation or not. During this month, we will provide you with marketing materials, equipment, tea, cocktail preparations, training, and we will do our best to maximize your sales of tea products. You will only have to pay the cost of consumables to prepare the drink, which means that at the end of the month you will only pay the costs, and only if you sell the drink in the venue.'
      },
      sales: {
        title: 'Sales',
        description: 'All marketing materials will be provided by us.',
        marketingPoints: [
          'Mini-menu at the bar, on tables, on social media, and on the web;',
          'Tea tastings and preparation methods;',
          'The surprise effect of tea in a siphon and the intoxication of tea;',
          'A separate menu for summer iced tea and fruit-based drinks, as well as seasonal cocktails;',
          'In summer, we sell cocktails with ice for those who don\'t like cola and the like;',
          'To attract health-conscious customers looking for sophisticated alternatives;',
          'For those who prefer sugar-free drinks, we offer bottled tea.'
        ]
      },
      contacts: {
        title: 'Contacts',
        phone: '+34 641 959 330 or +7 707 903 3663 - WhatsApp',
        instagram: 'telapurr - Instagram',
        email: 'telapurr@gmail.com'
      },
      buttonText: 'Partnership with us'
    }
  },
  
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      contact: 'Contacto',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión'
    },
    hero: {
      title: 'El Arte de la Ceremonia del Té',
      subtitle: 'Sumérgete en el mundo de la cultura tradicional china del té',
      cta: 'Comenzar el Viaje'
    },
    categories: {
      discover: 'Descubrir',
      tea: {
        title: 'Té',
        description: 'Colección de variedades exquisitas de té'
      },
      teaware: {
        title: 'Utensilios',
        description: 'Utensilios tradicionales de té'
      },
      sets: {
        title: 'Juegos',
        description: 'Juegos de ceremonia de té'
      }
    },
    tea: {
      categories: {
        all: 'Todos los Tés',
        shen: 'Sheng Pu\'er',
        shu: 'Shu Pu\'er',
        white: 'Blanco',
        gabba: 'Gabba',
        red: 'Oolongs Rojos',
        green: 'Oolongs Verdes'
      },
      filters: {
        title: 'Filtros',
        kind: 'Tipo',
        allKinds: 'Todos los tipos',
        aged: 'Añejado',
        young: 'Joven',
        premium: 'Premium',
        age: 'Edad (años)',
        from: 'Desde',
        to: 'Hasta',
        sort: 'Ordenar',
        sortBy: {
          newest: 'Más nuevo primero',
          oldest: 'Más viejo primero',
          priceAsc: 'Precio de menor a mayor',
          priceDesc: 'Precio de mayor a menor',
          alphabetical: 'Alfabético'
        },
        search: 'Buscar por título...',
        inStock: 'En Stock',
        outOfStock: 'Agotado'
      },
      pagination: {
        prev: 'Anterior',
        next: 'Siguiente',
        page: 'Página',
        of: 'de',
        total: 'total',
        records: 'registros'
      },
      details: 'Detalles',
      error: 'Error al cargar datos'
    },
    teaware: {
      filters: {
        title: 'Filtros',
        type: 'Tipo',
        material: 'Material',
        inStock: 'En Stock'
      },
      types: {
        all: 'Todos',
        chabu: 'Chabu',
        set: 'Juego de Utensilios',
        cups: 'Tazas',
        teapots: 'Teteras',
        gaiwan: 'Gaiwan',
        pets: 'Mascotas y Juguetes de Té',
        siphon: 'Sifón',
        fairnessCups: 'Tazas de Justicia',
        thermos: 'Termos',
        other: 'Otro'
      },
      materials: {
        all: 'Todos',
        ceramic: 'Cerámica',
        porcelain: 'Porcelana',
        glass: 'Vidrio',
        clay: 'Arcilla',
        wood: 'Madera',
        bamboo: 'Bambú',
        metal: 'Metal'
      }
    },
    sets: {
      filters: {
        title: 'Filtros',
        people: 'Personas',
        anyAmount: 'Cualquier cantidad',
        giftPackaging: 'Empaque de regalo',
        inStock: 'En Stock'
      }
    },
    cart: {
      addToCart: 'Añadir al Carrito',
      outOfStock: 'Agotado',
      addedToCart: 'Artículo añadido al carrito',
      cancel: 'Cancelar',
      selectSize: 'Seleccionar tamaño del paquete',
      yearsOld: 'años'
    },
    checkout: {
      title: 'Finalizar Compra',
      recipientInfo: 'Información del Destinatario',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Email',
      phone: 'Teléfono',
      country: 'País',
      city: 'Ciudad',
      address: 'Dirección',
      postalCode: 'Código Postal',
      selectCountry: 'Seleccionar país',
      selectCity: 'Seleccionar ciudad',
      addressPlaceholder: 'Calle, número, apartamento',
      pay: 'Pagar',
      orderTotal: 'Total',
      yourOrder: 'Tu Pedido',
      quantity: 'Cantidad'
    },
    profile: {
      title: 'Perfil',
      personalInfo: 'Información Personal',
      firstName: 'Nombre',
      lastName: 'Apellido',
      middleName: 'Segundo Nombre',
      email: 'Email',
      phone: 'Teléfono',
      phoneBonus: '💡 ¡Agregar un teléfono te da 15% de descuento en tu próximo pedido!',
      save: 'Guardar',
      saving: 'Guardando...',
      loyalty: {
        title: 'Programa de Lealtad',
        currentCashback: 'Cashback actual',
        totalPurchases: 'Compras totales',
        pointsBalance: 'Balance de puntos',
        nextLevel: 'Al siguiente nivel',
        need: 'Necesitas',
        levels: 'Niveles de lealtad',
        levelDescriptions: {
          silver: 'Registro',
          pearl: 'Perfil completo + 1 amigo',
          sapphire: '€500 en compras',
          emerald: '€1000 en compras',
          gold: '€3000 en compras',
          platinum: '€6000 en compras',
          diamond: '€10000 en compras'
        }
      },
      referral: {
        title: 'Programa de Referencias',
        bonus: '¡€20 por amigo!',
        description: 'Invita amigos y gana €20 cada uno',
        link: 'Tu enlace de referencia:',
        copy: 'Copiar',
        invited: 'Amigos invitados:',
        howItWorks: 'Cómo funciona:',
        step1: '1. El amigo se registra a través de tu enlace y obtiene €20 para el primer pedido',
        step2: '2. Después del primer pedido del amigo, obtienes €20 en tu cuenta',
        step3: '3. Los bonos se pueden usar para compras futuras'
      },
      coupons: {
        title: 'Mis Cupones',
        active: 'Cupones activos:',
        none: 'Aún no tienes cupones activos'
      },
      success: 'Perfil actualizado exitosamente',
      error: 'Error al actualizar perfil'
    },
    partnership: {
      title: 'Asociación con nosotros',
      subtitle: 'Ofrecemos la oportunidad de crear una fuente adicional de ingresos',
      intro: 'Te ofrecemos la oportunidad de crear una fuente adicional de ingresos para tu punto de venta y agregar un ambiente acogedor ofreciendo bebidas calientes y frías a base de té, empaquetadas para el consumidor, y productos que no requieren trabajo extra del personal de tu punto de venta.',
      team: {
        title: 'Nuestro Equipo',
        person1: {
          name: 'Raspopov Yaroslav (27 años)',
          description: 'La persona que sabe mucho sobre ventas e ingeniería de productos en línea/fuera de línea. Responsable de ventas, empaque, cálculos, regulaciones. Interesado en té. 4 años en ventas y marketing; 5 años en IT, desarrollando y alineando proyectos con negocio y desarrollo.'
        },
        person2: {
          name: 'Khairulina Milen (26 años)',
          description: 'Gatita no identificada que está profundamente inmersa en tés y hierbas asiáticas, así como productos de té. Responsable de tés, productos de té y preparación de materiales para socios. Pasó 5 años viajando y estudiando cultura asiática e india, tés, hierbas y costumbres; 1 año diseñando para materiales de marketing de Soshal Clubs.'
        }
      },
      products: {
        title: 'Nuestros Productos',
        description: 'El cliente selecciona té del catálogo para el sifón y termo.',
        product1: {
          name: 'Té en termo con taza',
          description: '5 minutos para preparar 1 litro de té en la barra, verterlo en un termo para movimiento conveniente por tu punto de venta.'
        },
        product2: {
          name: 'Té preparado con sifón',
          description: 'Parece un show de 10 minutos, hace 250 ml de té muy bebible.'
        },
        product3: {
          name: 'Cóctel refrescante de té',
          description: 'Prepara cócteles tónicos refrescantes de té con hierbas y frutas detrás de la barra, sin perder un minuto.'
        },
        product4: {
          name: 'Té refrescante en botella',
          description: 'Para amantes de bebidas refrescantes sin azúcar que contienen solo té y agua, hechas con técnica de preparación en frío para lograr un sabor suave y efecto tónico.'
        }
      },
      integration: {
        title: 'Integrando Productos en tu Local',
        step1: {
          title: 'Di "Okay, trato hecho" y elige opciones de producto',
          description: 'Eliges qué cócteles/té/té embotellado te gustaría ver en tu punto de venta. Después del mes de prueba, puedes agregar más variantes estipuladas a tu menú de verano o promociones.'
        },
        step2: {
          title: 'Integración de Equipo (1 semana)',
          description: 'Proporcionamos equipo, materiales de marketing de producto para colocación en las instalaciones de tu punto de venta y para redes sociales o tu sitio web. Y nosotros mismos coordinaremos las dimensiones contigo, ajustaremos el fondo y estilo para tu punto de venta, incluso lo imprimiremos y te lo llevaremos.'
        },
        step3: {
          title: 'Preparando un Cóctel',
          description: 'Te proporcionaremos espacios en blanco para cócteles. Y estaremos listos para enseñarte cómo hacer una jarra de cócteles en 10 minutos usando espacios en blanco para cócteles. 1 jarra puede verterse en 4 cócteles listos, todo lo que quedará es agregar hielo al vaso.'
        },
        step4: {
          title: 'Análisis',
          description: 'Después del primer mes de integración y prueba de productos de té en tu establecimiento, te proporcionaremos análisis sobre qué productos se vendieron bien durante ese mes y cuántos recursos se gastaron y cuánto se ganó del té.'
        }
      },
      agreement: {
        title: 'Acuerdo Final',
        description: 'El primer mes es una prueba para ambas partes, al final del cual decidimos si continuamos nuestra cooperación o no. Durante este mes, te proporcionaremos materiales de marketing, equipo, té, preparaciones de cócteles, entrenamiento, y haremos todo lo posible para maximizar tus ventas de productos de té. Solo tendrás que pagar el costo de consumibles para preparar la bebida, lo que significa que al final del mes solo pagarás los costos, y solo si vendes la bebida en el local.'
      },
      sales: {
        title: 'Ventas',
        description: 'Todos los materiales de marketing serán proporcionados por nosotros.',
        marketingPoints: [
          'Mini-menú en la barra, en mesas, en redes sociales y en la web;',
          'Degustaciones de té y métodos de preparación;',
          'El efecto sorpresa del té en sifón y la intoxicación del té;',
          'Un menú separado para té helado de verano y bebidas a base de frutas, así como cócteles estacionales;',
          'En verano, vendemos cócteles con hielo para aquellos que no les gusta la cola y similares;',
          'Para atraer clientes conscientes de la salud que buscan alternativas sofisticadas;',
          'Para aquellos que prefieren bebidas sin azúcar, ofrecemos té embotellado.'
        ]
      },
      contacts: {
        title: 'Contactos',
        phone: '+34 641 959 330 o +7 707 903 3663 - WhatsApp',
        instagram: 'telapurr - Instagram',
        email: 'telapurr@gmail.com'
      },
      buttonText: 'Asociación con nosotros'
    }
  },
  
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      contact: '联系我们',
      login: '登录',
      register: '注册',
      logout: '退出'
    },
    hero: {
      title: '茶艺',
      subtitle: '沉浸于传统中国茶文化的海洋',
      cta: '开始旅程'
    },
    categories: {
      discover: '发现',
      tea: {
        title: '茶',
        description: '精选茶种的集合'
      },
      teaware: {
        title: '茶具',
        description: '传统茶具'
      },
      sets: {
        title: '套装',
        description: '茶艺套装'
      }
    },
    tea: {
      categories: {
        all: '所有茶',
        shen: '生普',
        shu: '熟普',
        white: '白茶',
        gabba: '加巴',
        red: '红茶',
        green: '绿茶'
      },
      filters: {
        title: '筛选',
        kind: '类型',
        allKinds: '所有类型',
        aged: '陈年',
        young: '年轻',
        premium: '高端',
        age: '年龄（年）',
        from: '从',
        to: '到',
        sort: '排序',
        sortBy: {
          newest: '最新',
          oldest: '最旧',
          priceAsc: '价格升序',
          priceDesc: '价格降序',
          alphabetical: '按字母排序'
        },
        search: '按标题搜索...',
        inStock: '有货',
        outOfStock: '无货'
      },
      pagination: {
        prev: '上一页',
        next: '下一页',
        page: '页',
        of: '共',
        total: '总数',
        records: '条记录'
      },
      details: '详情',
      error: '数据加载错误'
    },
    teaware: {
      filters: {
        title: '筛选',
        type: '类型',
        material: '材质',
        inStock: '有货'
      },
      types: {
        all: '全部',
        chabu: '茶盘',
        set: '茶具套装',
        cups: '茶杯',
        teapots: '茶壶',
        gaiwan: '盖碗',
        pets: '茶宠',
        siphon: '虹吸壶',
        fairnessCups: '公道杯',
        thermos: '保温杯',
        other: '其他'
      },
      materials: {
        all: '全部',
        ceramic: '陶瓷',
        porcelain: '瓷器',
        glass: '玻璃',
        clay: '紫砂',
        wood: '木质',
        bamboo: '竹质',
        metal: '金属'
      }
    },
    sets: {
      filters: {
        title: '筛选',
        people: '人',
        anyAmount: '任意数量',
        giftPackaging: '礼品包装',
        inStock: '有货'
      }
    },
    cart: {
      addToCart: '加入购物车',
      outOfStock: '缺货',
      addedToCart: '商品已加入购物车',
      cancel: '取消',
      selectSize: '选择包装规格',
      yearsOld: '年'
    },
    checkout: {
      title: '结账',
      recipientInfo: '收件人信息',
      firstName: '姓名',
      lastName: '姓氏',
      email: '邮箱',
      phone: '电话',
      country: '国家',
      city: '城市',
      address: '地址',
      postalCode: '邮政编码',
      selectCountry: '选择国家',
      selectCity: '选择城市',
      addressPlaceholder: '街道、号码、公寓',
      pay: '支付',
      orderTotal: '总价',
      yourOrder: '您的订单',
      quantity: '数量'
    },
    profile: {
      title: '个人资料',
      personalInfo: '个人信息',
      firstName: '名字',
      lastName: '姓氏',
      middleName: '中间名',
      email: '邮箱',
      phone: '电话',
      phoneBonus: '💡 添加电话号码可获得下次订单15%折扣！',
      save: '保存',
      saving: '保存中...',
      loyalty: {
        title: '忠诚计划',
        currentCashback: '当前返现',
        totalPurchases: '总购买额',
        pointsBalance: '积分余额',
        nextLevel: '到下一级',
        need: '需要',
        levels: '忠诚等级',
        levelDescriptions: {
          silver: '注册',
          pearl: '完整资料 + 1位朋友',
          sapphire: '购买€500',
          emerald: '购买€1000',
          gold: '购买€3000',
          platinum: '购买€6000',
          diamond: '购买€10000'
        }
      },
      referral: {
        title: '推荐计划',
        bonus: '每位朋友€20！',
        description: '邀请朋友，每人获得€20',
        link: '您的推荐链接：',
        copy: '复制',
        invited: '已邀请朋友：',
        howItWorks: '工作原理：',
        step1: '1. 朋友通过您的链接注册并获得首次订单€20',
        step2: '2. 朋友首次订单后，您的账户获得€20',
        step3: '3. 奖金可用于未来购买'
      },
      coupons: {
        title: '我的优惠券',
        active: '活跃优惠券：',
        none: '您还没有活跃的优惠券'
      },
      success: '资料更新成功',
      error: '更新资料失败'
    },
    partnership: {
      title: '与我们合作',
      subtitle: '我们提供创建额外收入来源的机会',
      intro: '我们为您提供创建额外收入来源的机会，为您的销售场所增添温馨的氛围，通过提供热饮和冷饮茶，以及不含额外人力成本的茶产品。',
      team: {
        title: '我们的团队',
        person1: {
          name: '拉斯波夫·雅罗斯拉夫（27岁）',
          description: '了解销售和在线/线下产品工程的人。负责销售、包装、计算、法规。对茶感兴趣。4年销售和营销；5年IT，开发和与业务和开发对项目进行对齐。'
        },
        person2: {
          name: '哈伊鲁林·米伦（26岁）',
          description: '一只未识别的猫，对亚洲茶和草本植物，以及茶产品有着深刻的理解。负责茶、茶产品和合作伙伴的材料准备。花了5年旅行和研究亚洲和印度文化、茶、草本植物和习俗；1年为Soshal Clubs的营销材料设计。'
        }
      },
      products: {
        title: '我们的产品',
        description: '客户从目录中选择用于siphon和thermos的茶。',
        product1: {
          name: '茶在thermos中带有茶杯',
          description: '在酒吧准备1升茶，将其倒入thermos以方便在您的销售场所移动。'
        },
        product2: {
          name: '通过siphon准备的茶',
          description: '看起来像10分钟的表演，制作250毫升非常可口的茶。'
        },
        product3: {
          name: '茶的清新鸡尾酒',
          description: '在酒吧后准备清新提神的茶鸡尾酒，不浪费任何时间。'
        },
        product4: {
          name: '茶的清新瓶装',
          description: '为喜欢无糖清新饮料的爱好者准备的茶，使用冷浸法制作，以获得温和的口感和提神效果。'
        }
      },
      integration: {
        title: '将产品集成到您的场所',
        step1: {
          title: '说"好，交易完成"并选择产品选项',
          description: '您选择在您的销售场所看到的茶、茶或茶瓶。在试用期结束后，您可以将更多指定的选项添加到您的夏季菜单或促销活动中。'
        },
        step2: {
          title: '设备集成（1周）',
          description: '我们提供设备、产品营销材料，放置在您的销售场所，以及社交媒体或您的网站。我们自己将与您协调尺寸，调整背景和风格，甚至打印并为您带来。'
        },
        step3: {
          title: '准备鸡尾酒',
          description: '我们将为您提供鸡尾酒模板。我们将准备好教您如何在10分钟内使用鸡尾酒模板制作鸡尾酒。1个模板可以装4个准备好的鸡尾酒，剩下的只是在杯子中添加冰。'
        },
        step4: {
          title: '分析',
          description: '在您的场所整合和测试茶产品后，我们将为您提供关于该月销售良好产品、花费了多少资源以及从茶中赚取了多少的分析。'
        }
      },
      agreement: {
        title: '最终协议',
        description: '第一个月是双方的试用期，试用结束后，我们将决定是否继续合作。在这一月，我们将为您提供营销材料、设备、茶、鸡尾酒准备、培训，并尽最大努力最大化您的茶产品销售。您只需支付准备饮料所需的消耗品的成本，这意味着在月底，您只需支付成本，只有在您的场所销售饮料时，您才会支付成本。'
      },
      sales: {
        title: '销售',
        description: '所有营销材料将由我们提供。',
        marketingPoints: [
          '酒吧、桌子、社交媒体和网站上的迷你菜单；',
          '茶品尝和准备方法；',
          '茶在siphon中的惊喜效果和茶的醉人效果；',
          '夏季提供凉茶和水果饮料的单独菜单，以及季节性鸡尾酒；',
          '夏天，我们提供带有冰的鸡尾酒，那些不喜欢可乐和类似的东西的人；',
          '吸引健康意识的客户，寻找高级替代品；',
          '那些喜欢无糖饮料的人，我们提供瓶装茶。'
        ]
      },
      contacts: {
        title: '联系方式',
        phone: '+34 641 959 330或+7 707 903 3663 - WhatsApp',
        instagram: 'telapurr - Instagram',
        email: 'telapurr@gmail.com'
      },
      buttonText: '与我们合作'
    }
  }
} as const;
