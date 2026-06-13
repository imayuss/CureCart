"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Minus, Plus, ShoppingCart } from "lucide-react";

export function AddToCartForm({ medicineId, stock }: { medicineId: string, stock: number }) {
  const sessionObj = useSession();
  // In some Next.js 15/React 19 SSR edge cases, NextAuth v4 useSession() returns undefined instead of throwing
  const session = sessionObj?.data;
  const status = sessionObj?.status || "loading";

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const increment = () => {
    if (quantity < stock) setQuantity(q => q + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleAddToCart = async () => {
    if (status === "unauthenticated" || (!session && status !== "loading")) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineId, quantity }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add to cart");
      }

      window.dispatchEvent(new Event('cartUpdated'));

      // Redirect to cart page upon success
      router.push("/cart");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to add to cart. Please try again.");
      setLoading(false);
    }
  };

  if (stock === 0) {
    return (
      <div className="w-full text-center py-4 px-6 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100 text-sm">
        Out of Stock
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex items-center h-12 bg-gray-100 rounded-full overflow-hidden shrink-0">
        <button 
          type="button"
          onClick={decrement}
          disabled={quantity <= 1 || loading}
          className="w-11 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-12 h-full flex items-center justify-center font-bold text-sm text-gray-900">
          {quantity}
        </div>
        <button 
          type="button"
          onClick={increment}
          disabled={quantity >= stock || loading}
          className="w-11 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <Button 
        onClick={handleAddToCart} 
        disabled={loading}
        className="flex-1 bg-zinc-900 hover:bg-emerald-600 text-white transition-colors duration-300 h-12 text-sm font-bold rounded-xl shadow-sm border-0 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
}
