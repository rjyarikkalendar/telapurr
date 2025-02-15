
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

interface CeremonySectionProps {
  t: {
    ceremony: {
      title: string;
      learnMore: string;
    };
  };
}

export const CeremonySection = ({ t }: CeremonySectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = ["openart-tea", "vDQRHmiV", "cJGAbcz", "bGO4w3zL"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((current) => (current + 1) % images.length);
        setIsTransitioning(false);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "drukljqft"
    }
  });

  const imageUrl = cld
    .image(images[currentImageIndex])
    .quality(auto())
    .resize(scale().width(1920))
    .toURL();

  return (
    <section className="relative z-20 py-20 bg-[#FEF7CD]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center text-tea-text mb-16 font-light font-playfair">
            {t.ceremony.title}
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Чайная церемония"
              className={`w-full h-full object-cover transition-all duration-1000 ${
                isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
              }}
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="/ceremonies"
                className="px-8 py-3 bg-white/90 text-tea-text rounded-full hover:bg-white transition-all duration-500 font-cormorant text-lg"
              >
                {t.ceremony.learnMore}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
