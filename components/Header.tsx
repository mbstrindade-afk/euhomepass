'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { FiHelpCircle, FiMessageCircle } from 'react-icons/fi';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { unreadCount } = useChat();
  
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <img src="/loguinho.png" alt="HomePass logo" className="w-40 h-auto rounded" />
              </Link>
            </div>
            {/* Centered navigation (hidden on small screens) */}
            <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-8 text-sm flex-1 justify-center">
              <Link href="/#how-it-works" className="hover:text-sky-700">How it works</Link>
              <Link href="/#pricing" className="hover:text-sky-700">Prices</Link>
              <Link href="/#insurance" className="hover:text-sky-700">Insurance</Link>
              <Link href="/#community" className="hover:text-sky-700">Community</Link>
              <Link href="/#rules" id="nav-rules" className="hover:text-sky-700">Rules</Link>
              <Link href="/#faq" className="hover:text-sky-700">FAQ</Link>
            </nav>
            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Help Icon */}
              <Link 
                href="/legal" 
                className="flex items-center gap-1 px-3 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-sm"
                aria-label="Help and Legal Information"
              >
                <FiHelpCircle className="w-4 h-4" />
                <span>Help</span>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-sm">
                    Dashboard
                  </Link>
                  <Link href="/listing" className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-sm">
                    Listing
                  </Link>
                  <Link 
                    href="/messages" 
                    className="relative px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-sm flex items-center gap-1"
                  >
                    <FiMessageCircle className="w-4 h-4" />
                    <span>Messages</span>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-sm">
                    Login
                  </Link>
                  <Link href="/register" className="px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition-colors text-sm">
                    Create account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>



    </>
  );
}
