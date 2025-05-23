
import React from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const Partnership = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-tea-bg">
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
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
            <Card className="bg-white/50 shadow-sm overflow-hidden">
              <div className="flex flex-col items-center p-6">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                  <img 
                    src="/lovable-uploads/9347f81b-36ca-461e-ab6e-cf6838eb6dc5.png" 
                    alt={t.partnership.team.person1.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                  {t.partnership.team.person1.name}
                </h3>
                <p className="text-tea-text/80 text-center">
                  {t.partnership.team.person1.description}
                </p>
              </div>
            </Card>
            <Card className="bg-white/50 shadow-sm overflow-hidden">
              <div className="flex flex-col items-center p-6">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                  <img 
                    src="/lovable-uploads/af522d7f-1156-4d42-a136-f13eca6d7297.png" 
                    alt={t.partnership.team.person2.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                  {t.partnership.team.person2.name}
                </h3>
                <p className="text-tea-text/80 text-center">
                  {t.partnership.team.person2.description}
                </p>
              </div>
            </Card>
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
              <div className="mb-4 h-48 overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/f97ef576-e95d-4a95-ae12-4453470a49fd.png" 
                  alt={t.partnership.products.product1.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2 font-playfair text-tea-text">
                {t.partnership.products.product1.name}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.products.product1.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <div className="mb-4 h-48 overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/8a97ac59-43cb-43b7-8728-f9dc3c8fc653.png" 
                  alt={t.partnership.products.product2.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2 font-playfair text-tea-text">
                {t.partnership.products.product2.name}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.products.product2.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <div className="mb-4 h-48 overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/2f3df9e9-de0e-4b10-b51b-9aa99f987b7e.png" 
                  alt={t.partnership.products.product3.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2 font-playfair text-tea-text">
                {t.partnership.products.product3.name}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.products.product3.description}
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg shadow-sm">
              <div className="mb-4 h-48 overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/20702705-9983-42c2-bd80-ea93ee93a103.png" 
                  alt={t.partnership.products.product4.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2 font-playfair text-tea-text">
                {t.partnership.products.product4.name}
              </h3>
              <p className="text-tea-text/80">
                {t.partnership.products.product4.description}
              </p>
            </div>
          </div>
        </section>

        <section 
          className="mb-16 max-w-4xl mx-auto relative"
          style={{
            backgroundImage: `url('/lovable-uploads/10e6c719-3f6f-4091-ba8b-9f9d385bc724.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="bg-white/30 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
              {t.partnership.integration.title}
            </h2>
            <div className="space-y-8">
              <div className="bg-white/80 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                  {t.partnership.integration.step1.title}
                </h3>
                <p className="text-tea-text/80">
                  {t.partnership.integration.step1.description}
                </p>
              </div>
              <div className="bg-white/80 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                  {t.partnership.integration.step2.title}
                </h3>
                <p className="text-tea-text/80">
                  {t.partnership.integration.step2.description}
                </p>
              </div>
              <div className="bg-white/80 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                  {t.partnership.integration.step3.title}
                </h3>
                <p className="text-tea-text/80">
                  {t.partnership.integration.step3.description}
                </p>
              </div>
              <div className="bg-white/80 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 font-playfair text-tea-text">
                  {t.partnership.integration.step4.title}
                </h3>
                <p className="text-tea-text/80">
                  {t.partnership.integration.step4.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section 
          className="mb-16 max-w-4xl mx-auto relative"
          style={{
            backgroundImage: `url('/lovable-uploads/3efb7d91-3fff-483e-bfe6-76973bc18040.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="bg-white/30 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
              {t.partnership.agreement.title}
            </h2>
            <div className="bg-white/80 p-6 rounded-lg shadow-sm mb-8">
              <p className="text-tea-text/80">
                {t.partnership.agreement.description}
              </p>
            </div>

            <h2 className="text-3xl font-light mb-6 font-playfair text-tea-text">
              {t.partnership.sales.title}
            </h2>
            <p className="mb-4 text-tea-text/90">
              {t.partnership.sales.description}
            </p>
            <div className="bg-white/80 p-6 rounded-lg shadow-sm mb-6">
              <ul className="list-disc pl-5 space-y-2 text-tea-text/80">
                {t.partnership.sales.marketingPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
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
