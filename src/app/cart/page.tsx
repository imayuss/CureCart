import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/auth";
import { CartService } from "@/services/cart.service";
import { redirect } from "next/navigation";
import Image from "next/image";
import { CheckoutButton } from "./CheckoutButton";
import { PrescriptionUpload } from "./PrescriptionUpload";
import { CartItemRow } from "@/components/cart/CartItemRow";

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
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Looks like you haven't added any medicines yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </ul>
            
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
              
              <PrescriptionUpload />
              
              <div className="mt-8">
                <CheckoutButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
