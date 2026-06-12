'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PaymentButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) throw new Error('Razorpay SDK failed to load. Are you online?');

      const response = await fetch('/api/checkout', { method: 'POST' });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Checkout failed');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder", 
        amount: data.order.totalAmount * 100,
        currency: "INR",
        name: "CureCart",
        description: "Medical Order Transaction",
        order_id: data.razorpayOrderId,
        handler: function (response: any) {
          // Success! Redirect to the new order confirmation page
          router.push(`/orders/${data.order.id}`);
          router.refresh();
        },
        theme: {
          color: "#2563eb",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      
    } catch (error: any) {
      alert(`Payment Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-xl shadow-md transition-all"
    >
      {loading ? 'Processing Secure Transaction...' : 'Pay with Razorpay'}
    </Button>
  );
}
