
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sections = [
  { title: "Чай", path: "/tea", color: "bg-tea-brown/10" },
  { title: "Посуда", path: "/teaware", color: "bg-tea-brown/20" },
  { title: "Наборы", path: "/sets", color: "bg-tea-brown/30" },
  { title: "Чайные церемонии", path: "/ceremonies", color: "bg-tea-brown/40" },
];

export const NavigationBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const currentIndex = sections.findIndex(s => s.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  return (
    <div className="bg-[#2A2A2A] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {sections.map((section, index) => (
            <div 
              key={section.path}
              className={`${index === activeIndex ? 'block' : 'hidden'}`}
            >
              <div 
                className={`cursor-pointer p-6 rounded-lg transition-all ${section.color} ${
                  location.pathname === section.path && "ring-2 ring-tea-brown"
                }`}
                onClick={() => navigate(section.path)}
              >
                <h3 className="text-2xl font-light text-center">{section.title}</h3>
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
