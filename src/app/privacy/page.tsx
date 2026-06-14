import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-gray-500 font-medium text-lg mb-12">Last updated: June 2026</p>
        
        <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-sm space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Security & HIPAA Compliance</h2>
            <p className="mb-4">At CureCart, your privacy is our highest priority. All medical records, prescriptions, and health queries are encrypted end-to-end. We strictly adhere to HIPAA regulations and local data protection laws.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Data</h2>
            <p className="mb-4">Your data is only used to fulfill your orders, verify prescriptions via our AI engine, and provide accurate medical guidance through our AI Health Assistant. We never sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. AI Processing</h2>
            <p className="mb-4">When you interact with our AI Assistant, your queries are processed securely. Personally identifiable information is scrubbed before processing to ensure anonymity and maximum safety.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
