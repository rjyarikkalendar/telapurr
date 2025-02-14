
import { useEffect, useRef } from "react";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

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
          src="https://www.veed.io/embed/a7a79eb3-3d1f-4368-9529-f9a8c22ce4fc"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/40" /> {/* Увеличили затемнение с 30% до 40% */}
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
