import React from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";

const Partnership = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-tea-bg">
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center mt-20">
          <h1 className="text-4xl md:text-6xl font-light mb-4 font-playfair text-tea-text">
            {t.partnership.title}
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-tea-text/80">
            {t.partnership.subtitle}
          </p>
        </section>

        <section className="mb-12 max-w-4xl mx-auto">
          <p className="text-lg mb-8 text-tea-text/90">
            {t.partnership.intro}
          </p>
        </section>

        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
            {t.partnership.team.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                {t.partnership.team.person1.name}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.team.person1.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                {t.partnership.team.person2.name}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.team.person2.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
            {t.partnership.products.title}
          </h2>
          <p className="mb-6 text-tea-text/90">
            {t.partnership.products.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2 font-playfair text-tea-text">
                {t.partnership.products.product1.name}
              </h3>
              <div className="text-tea-brown font-medium mb-3">
                {t.partnership.products.product1.price}
              </div>
              <p className="text-tea-text/80">
                {t.partnership.products.product1.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2 font-playfair text-tea-text">
                {t.partnership.products.product2.name}
              </h3>
              <div className="text-tea-brown font-medium mb-3">
                {t.partnership.products.product2.price}
              </div>
              <p className="text-tea-text/80">
                {t.partnership.products.product2.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2 font-playfair text-tea-text">
                {t.partnership.products.product3.name}
              </h3>
              <div className="text-tea-brown font-medium mb-3">
                {t.partnership.products.product3.price}
              </div>
              <p className="text-tea-text/80">
                {t.partnership.products.product3.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2 font-playfair text-tea-text">
                {t.partnership.products.product4.name}
              </h3>
              <div className="text-tea-brown font-medium mb-3">
                {t.partnership.products.product4.price}
              </div>
              <p className="text-tea-text/80">
                {t.partnership.products.product4.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
            {t.partnership.integration.title}
          </h2>
          <div className="space-y-8">
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                {t.partnership.integration.step1.title}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.integration.step1.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                {t.partnership.integration.step2.title}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.integration.step2.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                {t.partnership.integration.step3.title}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.integration.step3.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                {t.partnership.integration.step4.title}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.integration.step4.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
            {t.partnership.agreement.title}
          </h2>
          <div className="bg-white/50 p-6 rounded-lg shadow-sm">
            <p className="text-tea-text/80">
              {t.partnership.agreement.description}
            </p>
          </div>
        </section>

        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
            {t.partnership.sales.title}
          </h2>
          <p className="mb-4 text-tea-text/90">
            {t.partnership.sales.description}
          </p>
          <div className="bg-white/50 p-6 rounded-lg shadow-sm mb-6">
            <p className="text-tea-text/80 mb-4 font-medium">
              {t.partnership.sales.targetAudience}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-tea-text/80">
              {t.partnership.sales.marketingPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
            {t.partnership.contacts.title}
          </h2>
          <div className="bg-white/50 p-6 rounded-lg shadow-sm">
            <p className="mb-2 text-tea-text/90">{t.partnership.contacts.phone}</p>
            <p className="mb-2 text-tea-text/90">{t.partnership.contacts.instagram}</p>
            <p className="text-tea-text/90">{t.partnership.contacts.email}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Partnership;
