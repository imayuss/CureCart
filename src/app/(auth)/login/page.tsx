"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
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
            Your AI-powered digital pharmacy. Get medicines delivered to your door with AI-verified prescriptions.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-white text-xs font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-sm font-medium">Trusted by 10,000+ users</p>
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
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 font-medium">
              Sign in to your CureCart account
            </p>
          </div>

          {registered && (
            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm font-medium mb-6 border border-emerald-100 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Registration successful! Please sign in.
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium mb-6 border border-red-100 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email address</label>
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
              {isLoading ? "Signing in..." : "Sign in"}
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
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-zinc-900 hover:text-emerald-600 transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <LoginForm />
    </Suspense>
  );
}
