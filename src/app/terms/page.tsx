import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Terms of Service</h1>
        <p className="text-gray-500 font-medium text-lg mb-12">Last updated: June 2026</p>
        
        <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-sm space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing or using CureCart, you agree to be bound by these Terms of Service. If you do not agree, you may not use our platform.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Prescription Verification</h2>
            <p className="mb-4">CureCart reserves the right to reject any order if a prescription is deemed invalid, expired, or tampered with by our AI verification systems or licensed pharmacists.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Medical Disclaimer</h2>
            <p className="mb-4">Our AI Health Assistant provides information based on verified medical sources but does not replace professional medical advice. Always consult your doctor for medical decisions.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
