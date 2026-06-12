'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function CheckoutButton() {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.push('/checkout')} 
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-xl shadow-md transition-all"
    >
      Proceed to Checkout
    </Button>
  );
}
