"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image 
            src="/next.svg" 
            alt="HomePass logo" 
            width={28} 
            height={28} 
            className="rounded" 
          />
          <span className="font-bold text-lg tracking-tight">HomePass</span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          <a href="#como" className="hover:text-sky-700 transition-colors">
            Como Funciona
          </a>
          <a href="#precos" className="hover:text-sky-700 transition-colors">
            Preços
          </a>
          <a href="#seguro" className="hover:text-sky-700 transition-colors">
            Seguro
          </a>
          <a href="#faq" className="hover:text-sky-700 transition-colors">
            FAQ
          </a>
        </nav>
        <Link 
          href="#" 
          className="ml-4 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 text-sm transition-colors"
        >
          Criar conta
        </Link>
      </div>
    </header>
  );
}
