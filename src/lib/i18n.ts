
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const defaultNS = 'common';

export type Language = 'ru' | 'en' | 'es' | 'zh';

export const languages: Record<Language, string> = {
  ru: 'Русский',
  en: 'English', 
  es: 'Español',
  zh: '中文'
};

export const resources = {
  ru: {
    "home": "Главная",
    "about": "О нас",
    "products": "Продукты",
    "contact": "Контакты",
    "welcome": "Добро пожаловать",
    "nav": {
      "login": "Войти",
      "logout": "Выйти",
      "profile": "Профиль",
    },
    "product": {
      "addToCart": "Добавить в корзину",
      "description": "Описание",
      "details": "Детали",
      "kind": "Вид",
      "type": "Тип",
      "age": "Возраст",
      "yearbirth": "Год рождения",
      "weight": "Вес",
      "price": "Цена",
      "inStock": "В наличии",
    },
    "profile": {
      "title": "Профиль",
      "personalInfo": "Личная информация",
      "firstName": "Имя",
      "lastName": "Фамилия",
      "middleName": "Отчество",
      "email": "Email",
      "phone": "Телефон",
      "changePhoto": "Изменить фото",
      "save": "Сохранить",
      "saving": "Сохранение...",
      "success": "Профиль успешно обновлен!",
      "error": "Ошибка обновления профиля",
      "edit": "Редактировать",
      "cancel": "Отменить",
      "phoneBonus": "Укажите номер телефона и получите +3% кэшбека на первый заказ!",
      "loyalty": {
        "title": "Программа лояльности",
        "currentCashback": "Ваш текущий кэшбек",
        "totalPurchases": "Сумма покупок",
        "pointsBalance": "Баланс баллов",
        "levels": "Уровни лояльности",
        "levelDescriptions": {
          "silver": "Начальный уровень для всех новых пользователей",
          "pearl": "Пригласите друга и получите этот уровень",
          "sapphire": "Достигните этой отметки по сумме покупок, чтобы получить этот уровень",
          "emerald": "Достигните этой отметки по сумме покупок, чтобы получить этот уровень",
          "gold": "Достигните этой отметки по сумме покупок, чтобы получить этот уровень",
          "platinum": "Достигните этой отметки по сумме покупок, чтобы получить этот уровень",
          "diamond": "Достигните этой отметки по сумме покупок, чтобы получить этот уровень",
        },
        "pearlRequired": "Для получения жемчужного уровня необходимо:",
        "completeProfile": "Заполнить профиль",
        "inviteFriend": "Пригласить {count} друга",
      },
      "referral": {
        "title": "Реферальная программа",
        "bonus": "+5% кэшбека за каждого друга!",
        "description": "Поделитесь своим реферальным кодом с друзьями и получайте бонусы!",
        "code": "Реферальный код",
        "codeHint": "Поделитесь этим кодом с друзьями",
        "copied": "Код скопирован!",
        "codeDescription": "Теперь поделитесь им с друзьями",
        "invited": "Приглашено друзей",
        "howItWorks": "Как это работает?",
        "step1": "Поделитесь своим реферальным кодом с другом.",
        "step2": "Друг регистрируется, используя ваш код.",
        "step3": "Вы оба получаете +5% кэшбека на следующие покупки!",
      },
      "coupons": {
        "title": "Купоны и скидки",
        "active": "Активных купонов",
        "none": "У вас пока нет активных купонов.",
      },
    },
    "categories": {
      "discover": "Откройте для себя наши категории",
      "tea": {
        "title": "Чай",
        "description": "Высококачественные чаи со всего мира"
      },
      "teaware": {
        "title": "Посуда для чая",
        "description": "Традиционная и современная посуда для чаепития"
      },
      "sets": {
        "title": "Наборы",
        "description": "Готовые наборы для идеального чаепития"
      }
    },
    "cart": {
      "addToCart": "Добавить в корзину",
      "addedToCart": "Добавлено в корзину",
      "cancel": "Отменить",
      "selectSize": "Выберите размер",
      "outOfStock": "Нет в наличии"
    },
    "partnership": {
      "buttonText": "Партнерство",
      "title": "Партнерская программа",
      "subtitle": "Присоединяйтесь к нашей партнерской программе",
      "description": "Станьте нашим партнером и получайте прибыль от продаж качественного чая",
      "benefits": "Преимущества партнерства",
      "benefit1": "Высокие комиссионные",
      "benefit2": "Маркетинговая поддержка",
      "benefit3": "Обучение и поддержка",
      "intro": "Мы приглашаем вас стать частью нашей команды и развивать культуру чаепития вместе с нами.",
      "team": {
        "title": "Наша команда",
        "person1": {
          "name": "Анна Иванова",
          "description": "Основатель компании, эксперт по чаю с 15-летним опытом"
        },
        "person2": {
          "name": "Михаил Петров",
          "description": "Директор по развитию, специалист по партнерским программам"
        }
      },
      "products": {
        "title": "Наша продукция",
        "description": "Мы предлагаем широкий ассортимент высококачественных чаев и аксессуаров:",
        "product1": {
          "name": "Элитные чаи",
          "description": "Коллекция редких и эксклюзивных сортов чая"
        },
        "product2": {
          "name": "Чайная посуда",
          "description": "Традиционная и современная посуда для чаепития"
        },
        "product3": {
          "name": "Подарочные наборы",
          "description": "Готовые наборы для идеального подарка"
        },
        "product4": {
          "name": "Аксессуары",
          "description": "Все необходимое для правильного заваривания чая"
        }
      },
      "integration": {
        "title": "Этапы интеграции",
        "step1": {
          "title": "Знакомство",
          "description": "Изучаем ваши потребности и возможности"
        },
        "step2": {
          "title": "Обучение",
          "description": "Предоставляем полную информацию о продукции"
        },
        "step3": {
          "title": "Запуск",
          "description": "Начинаем совместную работу с поддержкой"
        },
        "step4": {
          "title": "Развитие",
          "description": "Постоянно развиваем партнерские отношения"
        }
      },
      "agreement": {
        "title": "Соглашение о партнерстве",
        "description": "Мы предлагаем выгодные условия сотрудничества с гибкой системой комиссий и полной поддержкой наших партнеров."
      },
      "sales": {
        "title": "Продажи и маркетинг",
        "description": "Мы предоставляем все необходимые материалы для успешных продаж:",
        "marketingPoints": [
          "Рекламные материалы и каталоги",
          "Обучающие программы для продавцов",
          "Маркетинговая поддержка в социальных сетях",
          "Участие в выставках и мероприятиях",
          "Система скидок и бонусов"
        ]
      },
      "contacts": {
        "title": "Контакты для партнеров",
        "phone": "Телефон: +7 (495) 123-45-67",
        "instagram": "Instagram: @teapartnership",
        "email": "Email: partners@teatime.ru"
      }
    },
    "tea": {
      "filters": {
        "search": "Поиск по названию...",
        "sortBy": {
          "newest": "Новые первыми",
          "oldest": "Старые первыми",
          "priceAsc": "Цена по возрастанию",
          "priceDesc": "Цена по убыванию",
          "alphabetical": "По алфавиту"
        },
        "inStock": "В наличии",
        "outOfStock": "Нет в наличии"
      },
      "details": "Подробнее",
      "error": "Ошибка загрузки данных",
      "pagination": {
        "prev": "Предыдущая",
        "next": "Следующая",
        "page": "Страница",
        "of": "из",
        "total": "всего",
        "records": "записей"
      }
    },
    "hero": {
      "title": "Добро пожаловать в мир чая",
      "subtitle": "Откройте для себя лучшие сорта чая со всего мира"
    },
    "checkout": {
      title: "Оформление заказа",
      yourOrder: "Ваш заказ",
      recipientInfo: "Информация о получателе",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Email",
      phone: "Телефон",
      country: "Страна",
      city: "Город",
      address: "Адрес",
      postalCode: "Почтовый индекс",
      selectCountry: "Выберите страну",
      selectCity: "Выберите город",
      addressPlaceholder: "Улица, дом, квартира",
      quantity: "Количество",
      orderTotal: "Итого",
      pay: "Оплатить",
      yearsOld: "лет"
    },
    "auth": {
      "welcome": "Добро пожаловать!",
      "successLogin": "Вы успешно вошли в систему",
      "loginError": "Ошибка входа",
      "invalidCredentials": "Неверный email или пароль",
      "registrationSuccess": "Регистрация успешна!",
      "registrationError": "Ошибка регистрации",
      "registrationErrorGeneric": "Произошла ошибка при регистрации",
      "emailNotVerified": "Email не подтвержден",
      "checkEmailMessage": "Проверьте email для подтверждения аккаунта",
      "emailVerified": "Email подтвержден!",
      "emailVerificationSuccess": "Ваш email успешно подтвержден. Теперь вы можете войти в систему.",
      "emailVerificationError": "Ошибка подтверждения email",
      "invalidToken": "Неверный или истекший токен подтверждения",
    },
  },
  en: {
    "home": "Home",
    "about": "About",
    "products": "Products",
    "contact": "Contact",
    "welcome": "Welcome",
    "nav": {
      "login": "Login",
      "logout": "Logout",
      "profile": "Profile",
    },
    "product": {
      "addToCart": "Add to cart",
      "description": "Description",
      "details": "Details",
      "kind": "Kind",
      "type": "Type",
      "age": "Age",
      "yearbirth": "Year of birth",
      "weight": "Weight",
      "price": "Price",
      "inStock": "In stock",
    },
    "profile": {
      "title": "Profile",
      "personalInfo": "Personal Information",
      "firstName": "First Name",
      "lastName": "Last Name",
      "middleName": "Middle Name",
      "email": "Email",
      "phone": "Phone",
      "changePhoto": "Change photo",
      "save": "Save",
      "saving": "Saving...",
      "success": "Profile updated successfully!",
      "error": "Error updating profile",
      "edit": "Edit",
      "cancel": "Cancel",
      "phoneBonus": "Enter your phone number and get +3% cashback on your first order!",
      "loyalty": {
        "title": "Loyalty Program",
        "currentCashback": "Your current cashback",
        "totalPurchases": "Total purchases",
        "pointsBalance": "Points balance",
        "levels": "Loyalty Levels",
        "levelDescriptions": {
          "silver": "Starting level for all new users",
          "pearl": "Invite a friend and get this level",
          "sapphire": "Reach this mark on the amount of purchases to get this level",
          "emerald": "Reach this mark on the amount of purchases to get this level",
          "gold": "Reach this mark on the amount of purchases to get this level",
          "platinum": "Reach this mark on the amount of purchases to get this level",
          "diamond": "Reach this mark on the amount of purchases to get this level",
        },
        "pearlRequired": "To get the pearl level you need:",
        "completeProfile": "Complete profile",
        "inviteFriend": "Invite {count} friend",
      },
      "referral": {
        "title": "Referral Program",
        "bonus": "+5% cashback for every friend!",
        "description": "Share your referral code with friends and get bonuses!",
        "code": "Referral code",
        "codeHint": "Share this code with friends",
        "copied": "Code copied!",
        "codeDescription": "Now share it with your friends",
        "invited": "Invited friends",
        "howItWorks": "How it works?",
        "step1": "Share your referral code with a friend.",
        "step2": "A friend signs up using your code.",
        "step3": "You both get +5% cashback on your next purchases!",
      },
      "coupons": {
        "title": "Coupons and discounts",
        "active": "Active coupons",
        "none": "You don't have any active coupons yet.",
      },
    },
    "categories": {
      "discover": "Discover our categories",
      "tea": {
        "title": "Tea",
        "description": "High-quality teas from around the world"
      },
      "teaware": {
        "title": "Teaware",
        "description": "Traditional and modern tea accessories"
      },
      "sets": {
        "title": "Sets",
        "description": "Curated sets for the perfect tea experience"
      }
    },
    "cart": {
      "addToCart": "Add to cart",
      "addedToCart": "Added to cart",
      "cancel": "Cancel",
      "selectSize": "Select size",
      "outOfStock": "Out of stock"
    },
    "partnership": {
      "buttonText": "Partnership",
      "title": "Partnership Program",
      "subtitle": "Join our partnership program",
      "description": "Become our partner and earn profits from selling quality tea",
      "benefits": "Partnership Benefits",
      "benefit1": "High commissions",
      "benefit2": "Marketing support",
      "benefit3": "Training and support",
      "intro": "We invite you to become part of our team and develop tea culture together with us.",
      "team": {
        "title": "Our Team",
        "person1": {
          "name": "Anna Ivanova",
          "description": "Company founder, tea expert with 15 years of experience"
        },
        "person2": {
          "name": "Mikhail Petrov",
          "description": "Development Director, partnership program specialist"
        }
      },
      "products": {
        "title": "Our Products",
        "description": "We offer a wide range of high-quality teas and accessories:",
        "product1": {
          "name": "Elite Teas",
          "description": "Collection of rare and exclusive tea varieties"
        },
        "product2": {
          "name": "Tea Ware",
          "description": "Traditional and modern tea accessories"
        },
        "product3": {
          "name": "Gift Sets",
          "description": "Ready-made sets for the perfect gift"
        },
        "product4": {
          "name": "Accessories",
          "description": "Everything needed for proper tea brewing"
        }
      },
      "integration": {
        "title": "Integration Steps",
        "step1": {
          "title": "Getting Acquainted",
          "description": "We study your needs and capabilities"
        },
        "step2": {
          "title": "Training",
          "description": "We provide complete information about our products"
        },
        "step3": {
          "title": "Launch",
          "description": "We start working together with full support"
        },
        "step4": {
          "title": "Development",
          "description": "We continuously develop our partnership"
        }
      },
      "agreement": {
        "title": "Partnership Agreement",
        "description": "We offer favorable cooperation terms with a flexible commission system and full support for our partners."
      },
      "sales": {
        "title": "Sales and Marketing",
        "description": "We provide all necessary materials for successful sales:",
        "marketingPoints": [
          "Advertising materials and catalogs",
          "Training programs for sales staff",
          "Social media marketing support",
          "Participation in exhibitions and events",
          "Discount and bonus system"
        ]
      },
      "contacts": {
        "title": "Partner Contacts",
        "phone": "Phone: +7 (495) 123-45-67",
        "instagram": "Instagram: @teapartnership",
        "email": "Email: partners@teatime.com"
      }
    },
    "tea": {
      "filters": {
        "search": "Search by title...",
        "sortBy": {
          "newest": "Newest first",
          "oldest": "Oldest first",
          "priceAsc": "Price ascending",
          "priceDesc": "Price descending",
          "alphabetical": "Alphabetical"
        },
        "inStock": "In stock",
        "outOfStock": "Out of stock"
      },
      "details": "Details",
      "error": "Error loading data",
      "pagination": {
        "prev": "Previous",
        "next": "Next",
        "page": "Page",
        "of": "of",
        "total": "total",
        "records": "records"
      }
    },
    "hero": {
      "title": "Welcome to the World of Tea",
      "subtitle": "Discover the finest teas from around the globe"
    },
    "checkout": {
      title: "Checkout",
      yourOrder: "Your Order",
      recipientInfo: "Recipient Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      country: "Country",
      city: "City",
      address: "Address",
      postalCode: "Postal Code",
      selectCountry: "Select country",
      selectCity: "Select city",
      addressPlaceholder: "Street, house, apartment",
      quantity: "Quantity",
      orderTotal: "Total",
      pay: "Pay",
      yearsOld: "years old"
    },
    "auth": {
      "welcome": "Welcome!",
      "successLogin": "Successfully logged in",
      "loginError": "Login error",
      "invalidCredentials": "Invalid email or password",
      "registrationSuccess": "Registration successful!",
      "registrationError": "Registration error",
      "registrationErrorGeneric": "An error occurred during registration",
      "emailNotVerified": "Email not verified",
      "checkEmailMessage": "Check your email to confirm your account",
      "emailVerified": "Email verified!",
      "emailVerificationSuccess": "Your email has been successfully verified. You can now log in.",
      "emailVerificationError": "Email verification error",
      "invalidToken": "Invalid or expired verification token",
    },
  },
  es: {
    "home": "Inicio",
    "about": "Acerca de",
    "products": "Productos",
    "contact": "Contacto",
    "welcome": "Bienvenido",
    "nav": {
      "login": "Acceder",
      "logout": "Cerrar sesión",
      "profile": "Perfil",
    },
    "product": {
      "addToCart": "Añadir al carrito",
      "description": "Descripción",
      "details": "Detalles",
      "kind": "Tipo",
      "type": "Categoría",
      "age": "Años",
      "yearbirth": "Año de nacimiento",
      "weight": "Peso",
      "price": "Precio",
      "inStock": "En stock",
    },
    "profile": {
      "title": "Perfil",
      "personalInfo": "Información personal",
      "firstName": "Nombre",
      "lastName": "Apellido",
      "middleName": "Segundo Nombre",
      "email": "Email",
      "phone": "Teléfono",
      "changePhoto": "Cambiar foto",
      "save": "Guardar",
      "saving": "Guardando...",
      "success": "¡Perfil actualizado exitosamente!",
      "error": "Error al actualizar el perfil",
      "edit": "Editar",
      "cancel": "Cancelar",
      "phoneBonus": "¡Ingrese su número de teléfono y obtenga +3% de reembolso en su primer pedido!",
      "loyalty": {
        "title": "Programa de Lealtad",
        "currentCashback": "Su reembolso actual",
        "totalPurchases": "Compras totales",
        "pointsBalance": "Balance de puntos",
        "levels": "Niveles de Lealtad",
        "levelDescriptions": {
          "silver": "Nivel de inicio para todos los usuarios nuevos",
          "pearl": "Invita a un amigo y obtén este nivel",
          "sapphire": "Alcanza esta marca en la cantidad de compras para obtener este nivel",
          "emerald": "Alcanza esta marca en la cantidad de compras para obtener este nivel",
          "gold": "Alcanza esta marca en la cantidad de compras para obtener este nivel",
          "platinum": "Alcanza esta marca en la cantidad de compras para obtener este nivel",
          "diamond": "Alcanza esta marca en la cantidad de compras para obtener este nivel",
        },
        "pearlRequired": "Para obtener el nivel perla necesitas:",
        "completeProfile": "Completar perfil",
        "inviteFriend": "Invitar a {count} amigo",
      },
      "referral": {
        "title": "Programa de Referidos",
        "bonus": "¡+5% de reembolso por cada amigo!",
        "description": "¡Comparte tu código de referido con amigos y obtén bonificaciones!",
        "code": "Código de referido",
        "codeHint": "Comparte este código con amigos",
        "copied": "¡Código copiado!",
        "codeDescription": "Ahora compártelo con tus amigos",
        "invited": "Amigos invitados",
        "howItWorks": "¿Cómo funciona?",
        "step1": "Comparte tu código de referido con un amigo.",
        "step2": "Un amigo se registra usando tu código.",
        "step3": "¡Ambos obtienen +5% de reembolso en sus próximas compras!",
      },
      "coupons": {
        "title": "Cupones y descuentos",
        "active": "Cupones activos",
        "none": "Aún no tienes cupones activos.",
      },
    },
    "categories": {
      "discover": "Descubra nuestras categorías",
      "tea": {
        "title": "Té",
        "description": "Tés de alta calidad de todo el mundo"
      },
      "teaware": {
        "title": "Utensilios para té",
        "description": "Accesorios tradicionales y modernos para el té"
      },
      "sets": {
        "title": "Conjuntos",
        "description": "Conjuntos curados para la experiencia perfecta del té"
      }
    },
    "cart": {
      "addToCart": "Añadir al carrito",
      "addedToCart": "Añadido al carrito",
      "cancel": "Cancelar",
      "selectSize": "Seleccionar tamaño",
      "outOfStock": "Agotado"
    },
    "partnership": {
      "buttonText": "Sociedad",
      "title": "Programa de Socios",
      "subtitle": "Únase a nuestro programa de socios",
      "description": "Conviértase en nuestro socio y gane ganancias vendiendo té de calidad",
      "benefits": "Beneficios de la Sociedad",
      "benefit1": "Altas comisiones",
      "benefit2": "Apoyo de marketing",
      "benefit3": "Entrenamiento y apoyo",
      "intro": "Te invitamos a formar parte de nuestro equipo y desarrollar la cultura del té junto con nosotros.",
      "team": {
        "title": "Nuestro Equipo",
        "person1": {
          "name": "Anna Ivanova",
          "description": "Fundadora de la empresa, experta en té con 15 años de experiencia"
        },
        "person2": {
          "name": "Mikhail Petrov",
          "description": "Director de Desarrollo, especialista en programas de socios"
        }
      },
      "products": {
        "title": "Nuestros Productos",
        "description": "Ofrecemos una amplia gama de tés y accesorios de alta calidad:",
        "product1": {
          "name": "Tés Elite",
          "description": "Colección de variedades de té raras y exclusivas"
        },
        "product2": {
          "name": "Utensilios de Té",
          "description": "Accesorios tradicionales y modernos para el té"
        },
        "product3": {
          "name": "Conjuntos de Regalo",
          "description": "Conjuntos listos para el regalo perfecto"
        },
        "product4": {
          "name": "Accesorios",
          "description": "Todo lo necesario para preparar té correctamente"
        }
      },
      "integration": {
        "title": "Pasos de Integración",
        "step1": {
          "title": "Conocerse",
          "description": "Estudiamos sus necesidades y capacidades"
        },
        "step2": {
          "title": "Entrenamiento",
          "description": "Proporcionamos información completa sobre nuestros productos"
        },
        "step3": {
          "title": "Lanzamiento",
          "description": "Comenzamos a trabajar juntos con apoyo completo"
        },
        "step4": {
          "title": "Desarrollo",
          "description": "Desarrollamos continuamente nuestra asociación"
        }
      },
      "agreement": {
        "title": "Acuerdo de Sociedad",
        "description": "Ofrecemos términos de cooperación favorables con un sistema de comisiones flexible y apoyo completo para nuestros socios."
      },
      "sales": {
        "title": "Ventas y Marketing",
        "description": "Proporcionamos todos los materiales necesarios para ventas exitosas:",
        "marketingPoints": [
          "Materiales publicitarios y catálogos",
          "Programas de entrenamiento para personal de ventas",
          "Apoyo de marketing en redes sociales",
          "Participación en exposiciones y eventos",
          "Sistema de descuentos y bonificaciones"
        ]
      },
      "contacts": {
        "title": "Contactos de Socios",
        "phone": "Teléfono: +7 (495) 123-45-67",
        "instagram": "Instagram: @teapartnership",
        "email": "Email: partners@teatime.es"
      }
    },
    "tea": {
      "filters": {
        "search": "Buscar por título...",
        "sortBy": {
          "newest": "Más nuevos primero",
          "oldest": "Más antiguos primero",
          "priceAsc": "Precio ascendente",
          "priceDesc": "Precio descendente",
          "alphabetical": "Alfabético"
        },
        "inStock": "En stock",
        "outOfStock": "Agotado"
      },
      "details": "Detalles",
      "error": "Error al cargar datos",
      "pagination": {
        "prev": "Anterior",
        "next": "Siguiente",
        "page": "Página",
        "of": "de",
        "total": "total",
        "records": "registros"
      }
    },
    "hero": {
      "title": "Bienvenido al Mundo del Té",
      "subtitle": "Descubre los mejores tés de todo el mundo"
    },
    "checkout": {
      title: "Finalizar Compra",
      yourOrder: "Su Pedido",
      recipientInfo: "Información del Destinatario",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Email",
      phone: "Teléfono",
      country: "País",
      city: "Ciudad",
      address: "Dirección",
      postalCode: "Código Postal",
      selectCountry: "Seleccionar país",
      selectCity: "Seleccionar ciudad",
      addressPlaceholder: "Calle, casa, apartamento",
      quantity: "Cantidad",
      orderTotal: "Total",
      pay: "Pagar",
      yearsOld: "años"
    },
    "auth": {
      "welcome": "¡Bienvenido!",
      "successLogin": "Sesión iniciada exitosamente",
      "loginError": "Error de inicio de sesión",
      "invalidCredentials": "Email o contraseña incorrectos",
      "registrationSuccess": "¡Registro exitoso!",
      "registrationError": "Error de registro",
      "registrationErrorGeneric": "Ocurrió un error durante el registro",
      "emailNotVerified": "Email no verificado",
      "checkEmailMessage": "Revisa tu email para confirmar tu cuenta",
      "emailVerified": "¡Email verificado!",
      "emailVerificationSuccess": "Tu email ha sido verificado exitosamente. Ahora puedes iniciar sesión.",
      "emailVerificationError": "Error de verificación de email",
      "invalidToken": "Token de verificación inválido o expirado",
    },
  },
  zh: {
    "home": "主页",
    "about": "关于我们",
    "products": "产品",
    "contact": "联系方式",
    "welcome": "欢迎",
    "nav": {
      "login": "登录",
      "logout": "登出",
      "profile": "个人资料",
    },
    "product": {
      "addToCart": "添加到购物车",
      "description": "描述",
      "details": "详情",
      "kind": "种类",
      "type": "类型",
      "age": "年份",
      "yearbirth": "出生年份",
      "weight": "重量",
      "price": "价格",
      "inStock": "有库存",
    },
    "profile": {
      "title": "个人资料",
      "personalInfo": "个人信息",
      "firstName": "名字",
      "lastName": "姓氏",
      "middleName": "中间名",
      "email": "电子邮件",
      "phone": "电话",
      "changePhoto": "更改照片",
      "save": "保存",
      "saving": "保存中...",
      "success": "个人资料更新成功！",
      "error": "更新个人资料出错",
      "edit": "编辑",
      "cancel": "取消",
      "phoneBonus": "输入您的电话号码，首次订购可获得 +3% 的返现！",
      "loyalty": {
        "title": "忠诚度计划",
        "currentCashback": "您当前的返现",
        "totalPurchases": "总购买金额",
        "pointsBalance": "积分余额",
        "levels": "忠诚度等级",
        "levelDescriptions": {
          "silver": "所有新用户的起始等级",
          "pearl": "邀请一位朋友并获得此等级",
          "sapphire": "在此购买金额上达到此标记即可获得此等级",
          "emerald": "在此购买金额上达到此标记即可获得此等级",
          "gold": "在此购买金额上达到此标记即可获得此等级",
          "platinum": "在此购买金额上达到此标记即可获得此等级",
          "diamond": "在此购买金额上达到此标记即可获得此等级",
        },
        "pearlRequired": "要获得珍珠等级，您需要：",
        "completeProfile": "完善个人资料",
        "inviteFriend": "邀请 {count} 位朋友",
      },
      "referral": {
        "title": "推荐计划",
        "bonus": "每位朋友 +5% 返现！",
        "description": "与朋友分享您的推荐代码并获得奖励！",
        "code": "推荐代码",
        "codeHint": "与朋友分享此代码",
        "copied": "代码已复制！",
        "codeDescription": "现在与您的朋友分享",
        "invited": "邀请的朋友",
        "howItWorks": "这个怎么运作？",
        "step1": "与朋友分享您的推荐代码。",
        "step2": "朋友使用您的代码注册。",
        "step3": "您都可以在下次购买时获得 +5% 的返现！",
      },
      "coupons": {
        "title": "优惠券和折扣",
        "active": "活动优惠券",
        "none": "您还没有任何有效的优惠券。",
      },
    },
    "categories": {
      "discover": "发现我们的分类",
      "tea": {
        "title": "茶",
        "description": "来自世界各地的高品质茶叶"
      },
      "teaware": {
        "title": "茶具",
        "description": "传统和现代茶具配件"
      },
      "sets": {
        "title": "套装",
        "description": "为完美茶体验精心策划的套装"
      }
    },
    "cart": {
      "addToCart": "添加到购物车",
      "addedToCart": "已添加到购物车",
      "cancel": "取消",
      "selectSize": "选择尺寸",
      "outOfStock": "缺货"
    },
    "partnership": {
      "buttonText": "合作伙伴",
      "title": "合作伙伴计划",
      "subtitle": "加入我们的合作伙伴计划",
      "description": "成为我们的合作伙伴，通过销售优质茶叶获得利润",
      "benefits": "合作伙伴优势",
      "benefit1": "高佣金",
      "benefit2": "营销支持",
      "benefit3": "培训和支持",
      "intro": "我们邀请您成为我们团队的一部分，与我们一起发展茶文化。",
      "team": {
        "title": "我们的团队",
        "person1": {
          "name": "安娜·伊万诺娃",
          "description": "公司创始人，拥有15年经验的茶叶专家"
        },
        "person2": {
          "name": "米哈伊尔·彼得罗夫",
          "description": "发展总监，合作伙伴计划专家"
        }
      },
      "products": {
        "title": "我们的产品",
        "description": "我们提供广泛的高品质茶叶和配件：",
        "product1": {
          "name": "精英茶叶",
          "description": "稀有和独家茶叶品种的收藏"
        },
        "product2": {
          "name": "茶具",
          "description": "传统和现代茶具配件"
        },
        "product3": {
          "name": "礼品套装",
          "description": "完美礼品的现成套装"
        },
        "product4": {
          "name": "配件",
          "description": "正确泡茶所需的一切"
        }
      },
      "integration": {
        "title": "整合步骤",
        "step1": {
          "title": "相互了解",
          "description": "我们研究您的需求和能力"
        },
        "step2": {
          "title": "培训",
          "description": "我们提供有关我们产品的完整信息"
        },
        "step3": {
          "title": "启动",
          "description": "我们开始合作并提供全面支持"
        },
        "step4": {
          "title": "发展",
          "description": "我们持续发展我们的合作伙伴关系"
        }
      },
      "agreement": {
        "title": "合作伙伴协议",
        "description": "我们提供有利的合作条件，灵活的佣金制度和对我们合作伙伴的全面支持。"
      },
      "sales": {
        "title": "销售和营销",
        "description": "我们提供成功销售所需的所有材料：",
        "marketingPoints": [
          "广告材料和目录",
          "销售人员培训计划",
          "社交媒体营销支持",
          "参加展览和活动",
          "折扣和奖金制度"
        ]
      },
      "contacts": {
        "title": "合作伙伴联系方式",
        "phone": "电话：+7 (495) 123-45-67",
        "instagram": "Instagram: @teapartnership",
        "email": "电子邮件：partners@teatime.cn"
      }
    },
    "tea": {
      "filters": {
        "search": "按标题搜索...",
        "sortBy": {
          "newest": "最新优先",
          "oldest": "最旧优先",
          "priceAsc": "价格升序",
          "priceDesc": "价格降序",
          "alphabetical": "按字母顺序"
        },
        "inStock": "有库存",
        "outOfStock": "缺货"
      },
      "details": "详情",
      "error": "加载数据错误",
      "pagination": {
        "prev": "上一页",
        "next": "下一页",
        "page": "页面",
        "of": "的",
        "total": "总计",
        "records": "记录"
      }
    },
    "hero": {
      "title": "欢迎来到茶的世界",
      "subtitle": "发现来自全球的顶级茶叶"
    },
    "checkout": {
      title: "结账",
      yourOrder: "您的订单",
      recipientInfo: "收件人信息",
      firstName: "名字",
      lastName: "姓氏",
      email: "电子邮件",
      phone: "电话",
      country: "国家",
      city: "城市",
      address: "地址",
      postalCode: "邮政编码",
      selectCountry: "选择国家",
      selectCity: "选择城市",
      addressPlaceholder: "街道，房屋，公寓",
      quantity: "数量",
      orderTotal: "总计",
      pay: "支付",
      yearsOld: "岁"
    },
    "auth": {
      "welcome": "欢迎！",
      "successLogin": "登录成功",
      "loginError": "登录错误",
      "invalidCredentials": "邮箱或密码错误",
      "registrationSuccess": "注册成功！",
      "registrationError": "注册错误",
      "registrationErrorGeneric": "注册过程中发生错误",
      "emailNotVerified": "邮箱未验证",
      "checkEmailMessage": "请检查您的邮箱以确认账户",
      "emailVerified": "邮箱已验证！",
      "emailVerificationSuccess": "您的邮箱已成功验证。现在您可以登录了。",
      "emailVerificationError": "邮箱验证错误",
      "invalidToken": "验证令牌无效或已过期",
    },
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'ru',
    defaultNS,
    resources,
  });

export const t = i18n.t.bind(i18n);

export default i18n;
