
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
    }
  }
} as const;
