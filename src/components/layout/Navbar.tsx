"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';

export function Navbar() {
  const { data: session, status } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCart = () => {
      if (status === 'authenticated') {
        fetch('/api/cart')
          .then(res => res.json())
          .then(data => {
            if (data && data.items) setCartCount(data.items.length);
          })
          .catch(err => console.error(err));
      } else {
        setCartCount(0);
      }
    };
    fetchCart();
    window.addEventListener('cartUpdated', fetchCart);
    return () => window.removeEventListener('cartUpdated', fetchCart);
  }, [status]);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
      scrolled ? 'bg-white/80 backdrop-blur-xl border-gray-200 shadow-sm py-3' : 'bg-white border-transparent py-4'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-black group-hover:bg-emerald-600 transition-colors">
            C
          </div>
          <span className="text-xl font-black text-zinc-900 tracking-tight">
            CureCart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
            Medicines
          </Link>
          <Link href="/consult" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
            Consult Doctor
          </Link>
          <Link href="/lab-tests" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
            Lab Tests
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <Link href="/search" className="text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </Link>
          
          <Link href="/cart" className="relative text-zinc-500 hover:text-zinc-900 transition-colors group">
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-emerald-600 rounded-full shadow-sm ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="h-5 w-px bg-gray-200 mx-2 hidden sm:block"></div>

          {status === 'loading' ? (
            <div className="h-9 w-24 bg-gray-100 animate-pulse rounded-full"></div>
          ) : session ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-emerald-600 transition-colors">
                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                  <User className="w-4 h-4 text-zinc-500" />
                </div>
                <span className="hidden sm:block">{session.user?.name?.split(' ')[0]}</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="hidden md:block text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-bold bg-zinc-900 text-white px-5 py-2.5 rounded-full hover:bg-emerald-600 transition-colors shadow-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
