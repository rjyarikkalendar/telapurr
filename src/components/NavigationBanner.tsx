
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const sections = [
  { path: "/tea", color: "bg-tea-brown/10" },
  { path: "/teaware", color: "bg-tea-brown/20" },
  { path: "/sets", color: "bg-tea-brown/30" },
  { path: "/ceremonies", color: "bg-tea-brown/40" },
];

export const NavigationBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const currentIndex = sections.findIndex(s => s.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Только если мы на главной странице, запускаем автоматическое переключение
    if (location.pathname === '/') {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % sections.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [location.pathname]);

  const getTitleByPath = (path: string) => {
    switch (path) {
      case '/tea':
        return t.categories.tea.title;
      case '/teaware':
        return t.categories.teaware.title;
      case '/sets':
        return t.categories.sets.title;
      case '/ceremonies':
        return t.ceremony.title;
      default:
        return '';
    }
  };

  return (
    <div className="bg-[#2A2A2A] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {sections.map((section, index) => (
            <div 
              key={section.path}
              className={`transition-opacity duration-300 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <div 
                className={`cursor-pointer p-6 rounded-lg transition-all ${section.color} ${
                  location.pathname === section.path && "ring-2 ring-tea-brown"
                }`}
                onClick={() => navigate(section.path)}
              >
                <h3 className="text-2xl font-light text-center">
                  {getTitleByPath(section.path)}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {sections.map((section, index) => (
            <button
              key={section.path}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? "bg-tea-brown" : "bg-white/50"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
