'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function CheckoutButton() {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.push('/checkout')} 
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 text-base rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all border-0 flex items-center justify-center gap-2"
    >
      Proceed to Checkout
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Button>
  );
}
