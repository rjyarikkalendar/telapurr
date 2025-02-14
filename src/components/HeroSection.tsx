
import { useEffect, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "drukljqft"
    }
  });

  // Создаем URL для видео с оптимизацией
  const videoUrl = cld
    .video("qujb4nfgqjbhkbrfcegf")
    .quality(auto())
    .resize(scale().width(1920))
    .toURL();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-light mb-6 animate-fade-up">
          Искусство чайной церемонии
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Погрузитесь в мир традиционной китайской чайной культуры
        </p>
      </div>
    </div>
  );
};
