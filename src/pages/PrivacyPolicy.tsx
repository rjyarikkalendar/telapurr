import { useLanguage } from "@/hooks/use-language";
import { BackButton } from "@/components/BackButton";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-tea-bg">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-6">
          <h1 className="text-3xl font-playfair font-bold text-tea-text mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-tea-text space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Tea Ceremony ("we", "our", or "us") is committed to protecting and respecting your privacy. 
                This policy explains how we collect, use, and protect your personal information in accordance with 
                the General Data Protection Regulation (GDPR) and other applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
              <p>We may collect and process the following data about you:</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address</li>
                <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely by our payment processor)</li>
                <li><strong>Order Information:</strong> Purchase history, preferences, reviews</li>
                <li><strong>Technical Information:</strong> IP address, browser type, device information, cookies</li>
                <li><strong>Usage Information:</strong> How you use our website, pages visited, time spent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Legal Basis for Processing</h2>
              <p>We process your personal data based on:</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Contract:</strong> To fulfill orders and provide services</li>
                <li><strong>Legitimate Interest:</strong> To improve our services and website functionality</li>
                <li><strong>Consent:</strong> For marketing communications (which you can withdraw at any time)</li>
                <li><strong>Legal Obligation:</strong> To comply with tax and accounting requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders</li>
                <li>Improve our products and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
                <li>Detect and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Data Sharing</h2>
              <p>
                We do not sell your personal data. We may share your information with:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Shipping partners to deliver your orders</li>
                <li>Payment processors to handle transactions</li>
                <li>Service providers who help us operate our business</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Your Rights Under GDPR</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> For processing based on consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted 
                using SSL technology.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Data Retention</h2>
              <p>
                We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, 
                comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience. You can control cookie settings through 
                your browser preferences. Some features may not function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                For any privacy-related questions or to exercise your rights, please contact our Data Protection Officer at:
              </p>
              <p>
                Email: manager@tepurrfect.com<br/>
                Phone: +34641959330
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

export default PrivacyPolicy;
