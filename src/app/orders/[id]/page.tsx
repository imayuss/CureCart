import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/config/db";
import Link from "next/link";
import { CheckCircle2, Package, MapPin, Phone } from "lucide-react";

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const orderId = params.id;

  const order = await prisma.order.findUnique({
    where: { 
      id: orderId,
      userId: session.user.id // Security check to ensure they own the order
    },
    include: {
      items: {
        include: { medicine: true }
      }
    }
  });

  if (!order) {
    redirect("/"); // Or a custom 404 page
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
          
          <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200">
            <Package className="w-4 h-4" />
            Order ID: {order.id}
          </div>
        </div>

        {/* Shipping & Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 leading-relaxed">
                    {order.shippingAddress || "No shipping address provided."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">{order.contactPhone || "No phone provided."}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center border border-gray-200 overflow-hidden">
                      {item.medicine.image ? (
                        <img src={item.medicine.image} alt={item.medicine.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.medicine.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">₹{(item.priceAtBuy * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center font-bold text-gray-900">
              <span className="text-lg">Total Paid</span>
              <span className="text-xl text-blue-600">₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link href="/orders" className="text-blue-600 font-medium hover:text-blue-700 hover:underline">
            View All Orders
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-blue-600 font-medium hover:text-blue-700 hover:underline">
            Continue Shopping
          </Link>
        </div>

      </div>
    </main>
  );
}
