"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-dot-pattern-white opacity-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center space-y-8 max-w-md">
          <Link href="/" className="inline-block">
            <h1 className="text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-zinc-900">
                C
              </div>
              CureCart
            </h1>
          </Link>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            Join thousands of users who trust CureCart for fast, safe, and AI-verified medicine delivery.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { icon: "🔬", label: "AI Verified" },
              { icon: "🚀", label: "Fast Delivery" },
              { icon: "🛡️", label: "100% Secure" },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-zinc-700/50">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-xs text-zinc-300 font-bold mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="flex justify-center items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-black">
                C
              </div>
              <span className="text-3xl font-black text-zinc-900">CureCart</span>
            </Link>
          </div>

          <div className="space-y-2 mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Create an account</h2>
            <p className="text-gray-500 font-medium">
              Join CureCart for a seamless medical experience
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium mb-6 border border-red-100 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold shadow-sm"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-zinc-700">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold shadow-sm"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-zinc-700">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-zinc-900 hover:bg-emerald-600 px-5 py-4 text-sm font-bold text-white shadow-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-50/50 px-4 text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            <GoogleSignInButton title="Google" />
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-zinc-900 hover:text-emerald-600 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
