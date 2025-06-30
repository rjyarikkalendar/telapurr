
import { useLanguage } from "@/hooks/use-language";
import { BackButton } from "@/components/BackButton";

const TermsOfService = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-tea-bg">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-6">
          <h1 className="text-3xl font-playfair font-bold text-tea-text mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none text-tea-text space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Tea Ceremony's website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>attempt to decompile or reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Product Information</h2>
              <p>
                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions 
                or other content is accurate, complete, reliable, current, or error-free. If a product offered by Tea Ceremony is not 
                as described, your sole remedy is to return it in unused condition.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Order Acceptance and Pricing</h2>
              <p>
                We reserve the right to refuse or cancel any order for any reason at any time. We may require additional information 
                regarding your order. All prices are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
                to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall Tea Ceremony or its suppliers be liable for any damages (including, without limitation, damages 
                for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials 
                on Tea Ceremony's website, even if Tea Ceremony or its authorized representative has been notified orally or in writing 
                of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the European Union and you 
                irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at manager@tepurrfect.com
              </p>
            </section>

            <p className="text-sm text-gray-600 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
