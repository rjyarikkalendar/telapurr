
import { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { useIsMobile } from "@/hooks/use-mobile";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";

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
  const [isMuted, setIsMuted] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "drukljqft"
    }
  });

  const videoUrl = cld
    .video(isMobile ? "refcb34z0130viqbvkh3" : "qujb4nfgqjbhkbrfcegf")
    .quality(auto())
    .resize(scale().width(1920))
    .toURL();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover scale-125"
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-4 right-4 z-20 bg-white/20 hover:bg-white/30"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 text-white" />
        ) : (
          <Volume2 className="h-4 w-4 text-white" />
        )}
      </Button>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-light mb-6 animate-fade-up">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {t.hero.subtitle}
        </p>
      </div>
    </div>
  );
};
