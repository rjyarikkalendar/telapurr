
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

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
    <div className="fixed bottom-0 left-0 w-full bg-[#2A2A2A] text-white py-8">
      <div className="container mx-auto px-4">
        <Carousel className="max-w-xl mx-auto">
          <CarouselContent>
            {sections.map((section, index) => (
              <CarouselItem key={section.path}>
                <div 
                  className={cn(
                    "cursor-pointer p-6 rounded-lg transition-all",
                    section.color,
                    location.pathname === section.path && "ring-2 ring-tea-brown"
                  )}
                  onClick={() => navigate(section.path)}
                >
                  <h3 className="text-2xl font-light text-center">{section.title}</h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </Carousel>
        <div className="flex justify-center mt-4 gap-2">
          {sections.map((section, index) => (
            <button
              key={section.path}
              className={cn(
                "w-2 h-2 rounded-full",
                location.pathname === section.path ? "bg-tea-brown" : "bg-white/50"
              )}
              onClick={() => navigate(section.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
