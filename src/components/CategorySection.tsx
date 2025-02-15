
import { CupSoda, Leaf, Package } from "lucide-react";

interface CategorySectionProps {
  t: {
    categories: {
      discover: string;
      tea: { title: string; description: string };
      teaware: { title: string; description: string };
      sets: { title: string; description: string };
    };
  };
}

export const CategorySection = ({ t }: CategorySectionProps) => {
  const categories = [
    {
      title: t.categories.tea.title,
      description: t.categories.tea.description,
      icon: Leaf,
      link: "/tea",
      iconClassName: "group-hover:animate-leaf-fall",
    },
    {
      title: t.categories.teaware.title,
      description: t.categories.teaware.description,
      icon: CupSoda,
      link: "/teaware",
      iconClassName: "group-hover:animate-liquid-wave",
    },
    {
      title: t.categories.sets.title,
      description: t.categories.sets.description,
      icon: Package,
      link: "/sets",
      iconClassName: "group-hover:animate-package-open",
    },
  ];

  return (
    <section className="relative z-10 py-20 bg-[#E8F4F2]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center text-tea-text mb-16 font-light font-playfair">
          {t.categories.discover}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <a
              key={category.title}
              href={category.link}
              className="group p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 text-tea-brown">
                  <category.icon
                    size={64}
                    strokeWidth={1}
                    className={category.iconClassName}
                  />
                </div>
                <h3 className="text-2xl font-light text-tea-text mb-2 font-playfair">
                  {category.title}
                </h3>
                <p className="text-gray-600 font-cormorant text-lg">
                  {category.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
