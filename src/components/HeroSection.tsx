
import { useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'drukljqft'
  }
});

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
  const videoUrl = cld.video('qujb4nfgqjbhkbrfcegf').toURL();

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-light mb-4 font-playfair text-white">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl text-white">
            {t.hero.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
