
interface CeremonySectionProps {
  t: {
    ceremony: {
      title: string;
      learnMore: string;
    };
  };
}

export const CeremonySection = ({ t }: CeremonySectionProps) => {
  return (
    <section className="bg-[#B8A99B] relative">
      <div className="container mx-auto px-4">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <img 
            src="/ceremony-banner.jpg" 
            alt="Tea Ceremony" 
            className="w-full h-full object-cover"
          />
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
