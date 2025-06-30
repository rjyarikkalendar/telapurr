import { useLanguage } from "@/hooks/use-language";
import { BackButton } from "@/components/BackButton";

const RefundPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-tea-bg">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-6">
          <h1 className="text-3xl font-playfair font-bold text-tea-text mb-8">
            Refund Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-tea-text space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. EU Consumer Rights</h2>
              <p>
                In accordance with EU Consumer Rights Directive, you have the right to cancel your order within 14 days 
                of receiving your goods without giving any reason. This applies to all products except those specifically 
                excluded below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Right of Withdrawal</h2>
              <p>
                You have 14 calendar days to withdraw from your purchase. The withdrawal period expires 14 days after:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>The day you (or a third party designated by you) receive the goods</li>
                <li>For multiple items ordered together but delivered separately: the day you receive the last item</li>
                <li>For goods consisting of multiple lots: the day you receive the last lot</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. How to Exercise Your Right of Withdrawal</h2>
              <p>
                To exercise your right of withdrawal, you must inform us of your decision by sending a clear statement to:
              </p>
              <p>
                Email: manager@tepurrfect.com<br/>
                Phone: +34641959330
              </p>
              <p>
                You may use the withdrawal form template below, but it is not obligatory.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Effects of Withdrawal</h2>
              <p>
                If you withdraw from the contract, we will reimburse all payments received from you, including delivery costs 
                (except for supplementary costs arising from your choice of a type of delivery other than the least expensive 
                standard delivery we offer), without undue delay and in any event not later than 14 days from the day we are 
                informed of your decision to withdraw.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Return Conditions</h2>
              <p>
                You must return the goods to us without undue delay and in any event not later than 14 days from the day 
                you communicate your withdrawal. The goods must be:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>In their original condition and packaging</li>
                <li>Unused and in the same condition as received</li>
                <li>Complete with all accessories and documentation</li>
                <li>Accompanied by proof of purchase</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Return Costs</h2>
              <p>
                You will bear the direct cost of returning the goods unless:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>The goods are defective or not as described</li>
                <li>We failed to provide adequate information about return costs</li>
                <li>We agree to cover the return costs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Excluded Products</h2>
              <p>
                The right of withdrawal does not apply to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Goods that are personalized or made to order</li>
                <li>Perishable goods</li>
                <li>Goods that have been opened and cannot be returned for hygiene reasons</li>
                <li>Digital content if performance has begun with your consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Refund Processing</h2>
              <p>
                We will process your refund using the same payment method you used for the original transaction, 
                unless you expressly agree otherwise. You will not incur any fees for such reimbursement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Damaged or Defective Products</h2>
              <p>
                If you receive a damaged or defective product, please contact us immediately. We will arrange for 
                collection and provide a full refund or replacement. You have up to 2 years to report defects 
                under EU warranty laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">10. Withdrawal Form Template</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">To: Tea Ceremony</p>
                <p>I hereby give notice that I withdraw from my contract of sale for the following goods:</p>
                <p>Order number: _______________</p>
                <p>Ordered on: _______________</p>
                <p>Received on: _______________</p>
                <p>Name of consumer: _______________</p>
                <p>Address of consumer: _______________</p>
                <p>Signature (if on paper): _______________</p>
                <p>Date: _______________</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">11. Contact Information</h2>
              <p>
                For any questions about returns or refunds, please contact us at:
              </p>
              <p>
                Email: manager@tepurrfect.com<br/>
                Phone: +34641959330<br/>
                Business hours: Monday-Friday 9:00-17:00 CET
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

export default RefundPolicy;
