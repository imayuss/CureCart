import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConsultPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Stethoscope className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Online Consultations</h1>
        <p className="text-gray-500 font-medium text-lg leading-relaxed">
          Connect with top verified doctors instantly via video call. Our online consultation platform is currently undergoing maintenance and will be back online soon.
        </p>
        <Link href="/" className="inline-block">
          <Button className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 py-6 px-8 h-auto">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
