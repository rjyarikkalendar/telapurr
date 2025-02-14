
export const CeremonySection = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center text-tea-text mb-16 font-light animate-fade-up">
            Чайные церемонии
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden animate-fade-up">
            <img
              src="https://images.unsplash.com/photo-1577089907583-991f03697397?auto=format&fit=crop&q=80"
              alt="Чайная церемония"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="/ceremonies"
                className="px-8 py-3 bg-white/90 text-tea-text rounded-full hover:bg-white transition-colors duration-300"
              >
                Узнать больше
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
