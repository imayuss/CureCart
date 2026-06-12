import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/config/db";
import Link from "next/link";
import { MapPin, Phone, Edit2, AlertCircle } from "lucide-react";
import { PaymentButton } from "./PaymentButton";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      carts: {
        include: {
          items: {
            include: { medicine: true }
          }
        }
      }
    }
  });

  if (!user) redirect("/login");

  const activeCart = user.carts[0];

  if (!activeCart || activeCart.items.length === 0) {
    redirect("/cart");
  }

  const subtotal = activeCart.items.reduce((total, item) => total + (item.medicine.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% GST
  const totalAmount = subtotal + tax;

  const fullAddress = [user.address, user.city, user.state, user.zipCode].filter(Boolean).join(", ");
  const isProfileComplete = Boolean(user.phone && user.address && user.city && user.state && user.zipCode);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Shipping & Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">1. Shipping Details</h2>
                <Link href="/profile/edit" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <Edit2 className="w-4 h-4" /> Edit
                </Link>
              </div>

              {isProfileComplete ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border border-blue-100 bg-blue-50/50 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {user.address}<br/>
                        {user.city}, {user.state} {user.zipCode}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-700">{user.phone}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 flex flex-col items-center text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="font-semibold text-red-900">Incomplete Shipping Profile</h3>
                    <p className="text-sm mt-1">You must provide a valid shipping address and phone number before you can proceed to payment.</p>
                  </div>
                  <Link href="/profile/edit" className="mt-2 bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                    Add Shipping Details
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">2. Order Items</h2>
              <div className="space-y-4 divide-y divide-gray-100">
                {activeCart.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pt-4 first:pt-0">
                    <div className="flex items-center gap-4">
                      {item.medicine.image ? (
                        <img src={item.medicine.image} alt={item.medicine.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">{item.medicine.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">₹{(item.medicine.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                
                <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {isProfileComplete ? (
                <PaymentButton />
              ) : (
                <button disabled className="w-full bg-gray-200 text-gray-500 font-semibold py-4 rounded-xl cursor-not-allowed">
                  Complete Profile to Pay
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
