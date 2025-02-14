
import { Cup, Leaf, Package } from "lucide-react";

const categories = [
  {
    title: "Чай",
    description: "Коллекция изысканных сортов чая",
    icon: Leaf,
    link: "/tea",
  },
  {
    title: "Посуда",
    description: "Традиционная чайная посуда",
    icon: Cup,
    link: "/teaware",
  },
  {
    title: "Наборы",
    description: "Наборы для чайной церемонии",
    icon: Package,
    link: "/sets",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-20 bg-tea-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center text-tea-text mb-16 font-light">
          Откройте для себя
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <a
              key={category.title}
              href={category.link}
              className="group p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 text-tea-brown group-hover:animate-float">
                  <category.icon size={64} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-light text-tea-text mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
