
import { useRef } from "react";

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

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/tea-ceremony.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center bg-black/30">
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
