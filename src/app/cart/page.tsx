import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/auth";
import { CartService } from "@/services/cart.service";
import { redirect } from "next/navigation";
import Image from "next/image";
import { CheckoutButton } from "./CheckoutButton";
import { PrescriptionUpload } from "./PrescriptionUpload";
import { CartItemRow } from "@/components/cart/CartItemRow";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | CureCart",
  description: "Review and checkout your medicines.",
};

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const cart = await CartService.getCart(session.user.id);
  const items = cart.items || [];
  
  const subtotal = items.reduce((acc, item) => acc + (item.medicine.price * item.quantity), 0);

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
            <p className="text-gray-500 font-medium mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Link href="/" className="text-sm font-semibold text-zinc-900 hover:text-emerald-600 transition-colors flex items-center gap-1">
            ← Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-16 text-center rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-zinc-50/30"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-12 w-12 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-zinc-900 mb-3">Your cart is empty</h2>
              <p className="text-zinc-500 font-medium max-w-sm mx-auto mb-8">Looks like you haven&apos;t added any medicines yet. Browse our catalog to find what you need.</p>
              <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-sm transition-colors">
                Browse Medicines →
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </ul>
              </div>

              <PrescriptionUpload />
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sticky top-32">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-sm mb-8">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="text-gray-900 font-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold">Free</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                    <span className="text-lg font-black text-gray-900">Total</span>
                    <span className="text-2xl font-black text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <CheckoutButton />
                
                <p className="text-xs text-gray-400 text-center mt-4 font-medium">Tax calculated at checkout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
