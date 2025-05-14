export type Language = 'ru' | 'en' | 'es';

export const languages: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
  es: 'Español'
};

export const translations = {
  ru: {
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
    ceremony: {
      title: 'Чайные церемонии',
      learnMore: 'Узнать больше'
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
    partnership: {
      title: 'Партнерство с нами',
      subtitle: 'Предлагаем возможность создать дополнительный источник дохода',
      intro: 'Мы предлагаем вам возможность создать дополнительный источник дохода для вашего клуба и добавить уютную атмосферу, предлагая горячие и холодные напитки на основе чая, упакованные для потребителя, и продукты, которые не требуют дополнительной работы персонала клуба.',
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
          price: '4 евро',
          description: '5 минут на приготовление 1 литра чая у барной стойки, разливаем в термос для удобного перемещения по клубу.'
        },
        product2: {
          name: 'Чай, приготовленный через сифон',
          price: '8 евро',
          description: 'Выглядит как 10-минутное шоу, дает 250 мл очень питкого чая.'
        },
        product3: {
          name: 'Освежающий чайный коктейль',
          price: '5 евро',
          description: 'Готовьте освежающие тонизирующие чайные коктейли с травами и фруктами за барной стойкой, не теряя ни минуты.'
        },
        product4: {
          name: 'Освежающий чай в бутылке',
          price: '2 евро - бутылка 0,5 мл',
          description: 'Для любителей освежающих напитков без сахара, содержащих только чай и воду, приготовленных по технике холодного заваривания для получения мягкого вкуса и тонизирующего эффекта.'
        }
      },
      integration: {
        title: 'Интеграция продуктов в ваше заведение',
        step1: {
          title: 'Скажите "Хорошо, сделка заключена" и выберите варианты продукта',
          description: 'Вы выбираете, какие коктейли/чаи/бутылки с чаем вы хотели бы видеть в своем социальном клубе. После пробного месяца вы можете добавить больше оговоренных вариантов в свое летнее меню или акции.'
        },
        step2: {
          title: 'Интеграция оборудования (1 месяц)',
          description: 'Мы предоставляем оборудование, маркетинговые материалы для размещения в клубе и для социальных сетей или вашего веб-сайта. И мы сами скоординируем размеры с вами, подстроим фон и стиль под ваш клуб, даже распечатаем и доставим вам.'
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
        description: 'Если пос��е первого месяца вы и мы удовлетворены, вам нужно будет оплатить только расходные материалы за первый месяц, сохранить оборудование, рецепты и маркетинговые материалы. В дальнейшем мы будем поставлять вам чай, ингредиенты для коктейлей и бутылки с чаем. Также мы продолжим оказывать маркетинговую поддержку, обновлять рецепты, создавать новые продукты и поставлять расходные материалы.',
        unsatisfied: 'Если кто-то не удовлетворен результатом сотрудничества, вам также придется оплатить только расходные материалы, и на этом наше сотрудничество заканчивается.'
      },
      sales: {
        title: 'Продажи',
        description: 'Все маркетинговые материалы будут предоставлены нами.',
        targetAudience: 'Целевая аудитория: Испанцы и латиноамериканцы (только холодные напитки), все люди из бывшего Советского Союза, стран Восточной Европы и Африки, стран Азии, Северной и Восточной Европы, британцы и французы (все, кто любит горячий чай, а также пьют холодные напитки), те, кто любит курить каннабис, а затем наслаждаться опьяняющим эффектом китайского чая.',
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
    ceremony: {
      title: 'Tea Ceremonies',
      learnMore: 'Learn More'
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
    partnership: {
      title: 'Partnership with us',
      subtitle: 'We offer the opportunity to create an additional source of income',
      intro: 'We offer you the opportunity to create an additional source of income for your club and add a cozy atmosphere by offering hot and cold tea-based drinks, packaged for the consumer, and products that do not require extra work from the club staff.',
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
          price: '4 euros',
          description: '5 minutes to prepare 1 liter of tea at the bar, pour it into a thermos for convenient movement around the club.'
        },
        product2: {
          name: 'Tea prepared with a siphon',
          price: '8 euros',
          description: 'Looks like a 10-minute show, makes 250 ml of very drinkable tea.'
        },
        product3: {
          name: 'Refreshing tea cocktail',
          price: '5 euros',
          description: 'Prepare refreshing tonic tea cocktails with herbs and fruits behind the bar, without losing a minute.'
        },
        product4: {
          name: 'Refreshing tea in a bottle',
          price: '2 euros - 0.5 ml bottle',
          description: 'For lovers of refreshing sugar-free drinks that contain only tea and water, made with a cold brewing technique to achieve a mild taste and tonic effect.'
        }
      },
      integration: {
        title: 'Integrating Products into Your Venue',
        step1: {
          title: 'Say, "Okay, deal done" and choose product options',
          description: 'You choose which cocktails/tea/bottled tea you would like to see in your social club. After the trial month, you can add more stipulated variants to your summer menu or promotions.'
        },
        step2: {
          title: 'Equipment Integration (1 month)',
          description: 'We provide equipment, product marketing materials for placement in the club premises and for social networks or your website. And we ourselves will coordinate the dimensions with you, adjust the background and style for your club, even print it out and bring it to you.'
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
        description: 'If after the first month you and we are satisfied, you will only have to pay for the consumables for the first month, keep the equipment, recipes, and marketing materials. Subsequently, we will supply you with tea, cocktail ingredients, and bottles of tea. We will also continue to provide marketing support, update recipes, create new products, and supply consumables.',
        unsatisfied: 'If someone is not satisfied with the result of the collaboration, you will also have to pay only for the consumables, and here our collaboration ends.'
      },
      sales: {
        title: 'Sales',
        description: 'All marketing materials will be provided by us.',
        targetAudience: 'Target audience: Spaniards and Latin Americans (cold drinks only), all people from the former Soviet Union, Eastern Europe and Africa, Asian countries, Northern and Eastern Europe, British and French (all those who like hot tea and also drink cold drinks), those who like to smoke cannabis and then enjoy the intoxicating effect of Chinese tea.',
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
    hero: {
      title: 'El Arte de la Ceremonia del Té',
      subtitle: 'Sumérgete en el mundo de la cultura tradicional china del té',
      cta: 'Comenzar el Viaje'
    },
    categories: {
      discover: 'Descubre',
      tea: {
        title: 'Té',
        description: 'Colección de exquisitas variedades de té'
      },
      teaware: {
        title: 'Utensilios',
        description: 'Utensilios tradicionales para el té'
      },
      sets: {
        title: 'Sets',
        description: 'Sets para la ceremonia del té'
      }
    },
    ceremony: {
      title: 'Ceremonias de Té',
      learnMore: 'Más Información'
    },
    checkout: {
      title: 'Finalizar Compra',
      recipientInfo: 'Información del Destinatario',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electrónico',
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
    partnership: {
      title: 'Colaboración con nosotros',
      subtitle: 'Le ofrecemos la oportunidad de crear una fuente adicional de ingresos',
      intro: 'Le ofrecemos la oportunidad de crear una fuente adicional de ingresos para su club y agregar un ambiente acogedor ofreciendo bebidas frías y calientes a base de té, envasadas para el consumidor, y productos que no requieren trabajo extra del personal del club.',
      team: {
        title: 'Nuestro Equipo',
        person1: {
          name: 'Raspopov Yaroslav (27 años)',
          description: 'El tipo que sabe mucho de ventas e ingeniería de productos online/offline. Responsable de ventas, envasado, cálculos, normativa. Interesado en el té. 4 años en ventas y marketing; 5 años en TI, desarrollando y alineando proyectos con el negocio y el desarrollo.'
        },
        person2: {
          name: 'Khairulina Milen (26 años)',
          description: 'Gatita no identificada que está profundamente inmersa en los tés y hierbas asiáticos, así como en los productos del té. Responsable de tés, productos de té y preparación de materiales para socios. Pasó 5 años viajando y estudiando la cultura asiática e india, los tés, las hierbas y las costumbres; 1 año diseñando para los materiales de marketing de Soshal Clubs.'
        }
      },
      products: {
        title: 'Nuestros Productos',
        description: 'El cliente elige el té del catálogo para el sifón y el termo.',
        product1: {
          name: 'Termo de té con taza',
          price: '4 euros',
          description: '5 minutos para preparar 1 litro de té en el bar, verterlo en un termo para facilitar su traslado por el club.'
        },
        product2: {
          name: 'Preparación de té con sifón',
          price: '8 euros',
          description: 'Parece un espectáculo de 10 minutos, hace 250 ml de té muy bebible.'
        },
        product3: {
          name: 'Cóctel refrescante de té',
          price: '5 euros',
          description: 'Prepare refrescantes cócteles de té tónico con hierbas y frutas detrás de la barra, sin perder ni un minuto.'
        },
        product4: {
          name: 'Té refrescante en botella',
          price: '2 euros - botella de 0,5 ml',
          description: 'Para los amantes de las bebidas refrescantes sin azúcar, que sólo contienen té y agua, elaboradas con una técnica de infusión en frío para conseguir un sabor suave y un efecto tonificante.'
        }
      },
      integration: {
        title: 'Integrar productos en su local',
        step1: {
          title: 'Diga, "Vale, trato hecho" , y elija las opciones de producto',
          description: 'Tú eliges qué cócteles/té/botellas de té te gustaría ver en tu club social. Después del mes de prueba, puedes añadir más variantes estipuladas a tu menú de verano o promociones.'
        },
        step2: {
          title: 'Integración de equipos (1 mes)',
          description: 'Proporcionamos equipos, materiales de marketing de productos para colocar en la sede del club y para las redes sociales o su sitio web. Y nosotros mismos coordinaremos las dimensiones contigo, ajustaremos el fondo y el estilo para tu club, incluso lo imprimiremos y te lo llevaremos.'
        },
        step3: {
          title: 'Preparando un cóctel',
          description: 'Le proporcionaremos mezclas para cócteles. Y estaremos listos para enseñarle cómo hacer una jarra de cócteles en 10 minutos usando las mezclas para cócteles. Con 1 jarra se pueden servir 4 cócteles listos, sólo quedará añadir hielo al vaso.'
        },
        step4: {
          title: 'Análisis',
          description: 'Tras el primer mes de integración y prueba de los productos de té en su establecimiento, le proporcionaremos análisis sobre qué productos se vendieron bien durante ese mes y cuántos recursos se gastaron y cuánto se ganó con el té.'
        }
      },
      agreement: {
        title: 'Final agreement',
        description: 'Si después del primer mes usted y nosotros estamos satisfechos, solo tendrá que pagar los consumibles del primer mes, conservar el equipo, las recetas y el material de marketing. Posteriormente, le proporcionaremos té, ingredientes para cócteles y botellas de té. También seguiremos brindándole apoyo de marketing, actualizando recetas, creando nuevos productos y suministrando consumibles.',
        unsatisfied: 'Si alguien no está satisfecho con el resultado de la colaboración, también tendrá que pagar solo los consumibles, y aquí termina nuestra colaboración.'
      },
      sales: {
        title: 'Ventas',
        description: 'Todos los materiales de marketing serán proporcionados por nosotros.',
        targetAudience: 'Público objetivo: Españoles y latinoamericanos (sólo bebidas frías), todas las personas de la ex Unión Soviética, países del Este y África, países de Asia, Europa del Norte y del Este, británicos y franceses (todos aquellos que les gusta el té caliente y también toman bebidas frías), aquellos a los que les gusta fumar cannabis y luego disfrutar del efecto embriagador del té chino.',
        marketingPoints: [
          'Mini-menú en la barra, en las mesas, en las redes sociales y en la web;',
          'Catas de té y métodos de preparación;',
          'El efecto sorpresa del té en un sifón y la embriaguez del té;',
          'Un menú separado para té helado de verano y bebidas a base de frutas, así como cócteles de temporada;',
          'En verano vendemos cócteles con hielo para aquellos a los que no les gusta la cola y similares;',
          'Para atraer a clientes preocupados por la salud que buscan alternativas sofisticadas;',
          'Para quienes prefieren bebidas sin azúcar, ofrecemos té embotellado.'
        ]
      },
      contacts: {
        title: 'Contactos',
        phone: '+34 641 959 330 or +7 707 903 3663 - WhatsApp',
        instagram: 'telapurr - Instagram',
        email: 'telapurr@gmail.com'
      },
      buttonText: 'Colaboración con nosotros'
    }
  }
} as const;
