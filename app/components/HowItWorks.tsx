"use client";

import Image from "next/image";

const steps = [
  {
    image: "/4-removebg-preview.png",
    title: "List",
    description: "Verifica a tua identidade, adiciona a tua casa e abre disponibilidade (módulo de 3 meses, podes usar 1 mês)."
  },
  {
    image: "/5-removebg-preview.png", 
    title: "Book",
    description: "Reserva outra casa verificada noutro país da UE. Sem renda. Seguro incluído."
  },
  {
    image: "/6-removebg-preview.png",
    title: "Live Anywhere", 
    description: "Descobre novos lugares, conecta-te com pessoas incríveis e constrói memórias inesquecíveis enquanto exploras a União Europeia."
  }
];

export default function HowItWorks() {
  return (
    <section id="como" className="mt-10">
      <h2 className="text-2xl font-bold mb-2">Como funciona</h2>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 bg-white rounded-xl shadow p-5 flex flex-col items-center">
            <Image 
              src={step.image} 
              alt={step.title} 
              width={112} 
              height={128} 
              className="mb-2 object-contain mx-auto" 
              style={{minWidth: '4cm', width: '7rem', maxHeight: '8rem'}} 
            />
            <h3 className="font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600 text-center">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
