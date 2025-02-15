
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  t: {
    hero: {
      title: string;
      subtitle: string;
    };
  };
}

export const HeroSection = ({ t }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current && sectionRef.current) {
        const scrollPosition = window.scrollY;
        const sectionHeight = sectionRef.current.offsetHeight;
        const opacity = 1 - (scrollPosition / sectionHeight);
        videoRef.current.style.opacity = Math.max(opacity, 0).toString();
        videoRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform"
        style={{ willChange: 'transform' }}
      >
        <source src="/tea-ceremony.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl md:text-6xl font-light mb-4 font-playfair">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-2xl">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  );
};
