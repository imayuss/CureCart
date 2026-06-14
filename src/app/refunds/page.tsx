import { RefreshCcw } from "lucide-react";

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
          <RefreshCcw className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Refund Policy</h1>
        <p className="text-gray-500 font-medium text-lg mb-12">Learn about our hassle-free returns and refunds.</p>
        
        <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-sm space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Medicine Returns</h2>
            <p className="mb-4">For safety reasons, prescription medicines cannot be returned once they have been delivered. OTC products can be returned within 7 days if unsealed and in original packaging.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Damaged or Incorrect Items</h2>
            <p className="mb-4">If you receive a damaged product or an incorrect order, please contact support within 24 hours. We will initiate an instant replacement or full refund to your original payment method.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Order Cancellations</h2>
            <p className="mb-4">You may cancel your order for a full refund within 30 minutes of placement, provided it has not already been dispatched by our local fulfillment center.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
