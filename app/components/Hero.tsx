"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white rounded-2xl shadow max-w-2xl mx-auto mt-8 p-6 md:p-10 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3 font-[Quicksand,sans-serif]">
            <span className="block text-sky-700">Vive em qualquer lugar.</span>
            <span className="block text-emerald-600">Partilha em todo o lado</span>
          </h1>
          <p className="text-slate-700 mb-6">
            Troque de casa com residentes da UE — sem renda, só partilha
          </p>
          <a 
            href="#" 
            className="inline-block px-5 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition-colors"
          >
            Criar conta
          </a>
        </div>
        <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
          <Image 
            src="/ChatGPT Image Sep 9, 2025, 01_36_41 AM.png" 
            alt="Mapa da Europa com casas HomePass" 
            width={256} 
            height={256} 
            className="w-48 h-48 md:w-64 md:h-64 object-contain" 
            priority
          />
        </div>
      </div>
      
      {/* Badges */}
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <span className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">
          Só cidadãos UE
        </span>
        <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
          <span className="text-lg">✅</span> Membros verificados
        </span>
        <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
          <span className="text-lg">🛡️</span> Seguro incluído
        </span>
      </div>
    </section>
  );
}
