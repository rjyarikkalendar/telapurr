
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'drukljqft'
  }
});

interface CeremonySectionProps {
  t: {
    ceremony: {
      title: string;
      learnMore: string;
    };
  };
}

export const CeremonySection = ({ t }: CeremonySectionProps) => {
  const bannerImages = [
    "openart-tea",
    "vDQRHmiV",
    "cJGAbcz",
    "bGO4w3zL"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Смена изображения каждые 5 секунд

    return () => clearInterval(timer);
  }, []);

  const currentImage = cld.image(bannerImages[currentImageIndex])
    .resize(scale().width(1920))
    .toURL();

  return (
    <section className="py-16 bg-[#B8A99B]">
      <div className="container mx-auto px-4">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          {bannerImages.map((image, index) => (
            <img 
              key={image}
              src={cld.image(image).resize(scale().width(1920)).toURL()}
              alt={`Tea Ceremony ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl text-white mb-8 font-light font-playfair">
              {t.ceremony.title}
            </h2>
            <a 
              href="/ceremonies" 
              className="inline-flex items-center px-6 py-3 text-lg bg-tea-brown text-white rounded-lg hover:bg-tea-brown/90 transition-colors"
            >
              {t.ceremony.learnMore}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
