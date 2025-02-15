
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
    ceremonies: {
      title: 'Чайные церемонии',
      description: 'Откройте для себя традиционные чайные церемонии'
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
    ceremonies: {
      title: 'Tea Ceremonies',
      description: 'Discover traditional tea ceremonies'
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
    ceremonies: {
      title: 'Ceremonias de Té',
      description: 'Descubre las ceremonias tradicionales del té'
    }
  }
} as const;
