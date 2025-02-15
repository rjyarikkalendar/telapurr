
import { Catalog } from "@/types/products";

export const catalogs: Record<string, Record<string, Catalog>> = {
  ru: {
    // Основные категории
    tea: { id: "tea", title: "Чай" },
    teaware: { id: "teaware", title: "Посуда" },
    sets: { id: "sets", title: "Наборы" },
    ceremony: { id: "ceremony", title: "Церемонии" },
    
    // Подкатегории чая
    sheng: { id: "sheng", title: "Шен пуэр", parentId: "tea" },
    shu: { id: "shu", title: "Шу пуэр", parentId: "tea" },
    oolong: { id: "oolong", title: "Улун", parentId: "tea" },
    white: { id: "white", title: "Белый чай", parentId: "tea" },
    flower: { id: "flower", title: "Цветочный чай", parentId: "tea" }
  },
  en: {
    // Main categories
    tea: { id: "tea", title: "Tea" },
    teaware: { id: "teaware", title: "Teaware" },
    sets: { id: "sets", title: "Sets" },
    ceremony: { id: "ceremony", title: "Ceremonies" },
    
    // Tea subcategories
    sheng: { id: "sheng", title: "Sheng Puerh", parentId: "tea" },
    shu: { id: "shu", title: "Shu Puerh", parentId: "tea" },
    oolong: { id: "oolong", title: "Oolong", parentId: "tea" },
    white: { id: "white", title: "White Tea", parentId: "tea" },
    flower: { id: "flower", title: "Flower Tea", parentId: "tea" }
  },
  es: {
    // Categorías principales
    tea: { id: "tea", title: "Té" },
    teaware: { id: "teaware", title: "Utensilios" },
    sets: { id: "sets", title: "Sets" },
    ceremony: { id: "ceremony", title: "Ceremonias" },
    
    // Subcategorías de té
    sheng: { id: "sheng", title: "Sheng Puerh", parentId: "tea" },
    shu: { id: "shu", title: "Shu Puerh", parentId: "tea" },
    oolong: { id: "oolong", title: "Oolong", parentId: "tea" },
    white: { id: "white", title: "Té Blanco", parentId: "tea" },
    flower: { id: "flower", title: "Té de Flores", parentId: "tea" }
  }
};
