import React from "react";

export default function EuMapMock() {
  return (
    <div className="w-full flex justify-center items-center">
      <svg
        viewBox="0 0 400 260"
        width="100%"
        height="auto"
        className="max-w-xl aspect-[400/260] drop-shadow-sm rounded-xl bg-gradient-to-br from-sky-200/60 to-emerald-100/60"
        role="img"
        aria-labelledby="eu-map-title eu-map-desc"
      >
        <title id="eu-map-title">Mapa da União Europeia com ícones de casa</title>
        <desc id="eu-map-desc">Mapa simplificado da UE com pins de casa representando países membros.</desc>
        {/* Continente europeu simplificado */}
        <g>
          <ellipse cx="200" cy="130" rx="170" ry="90" fill="#e0f2fe" />
        </g>
        {/* Pins de casa por país (posições aproximadas) */}
        <g>
          {/* Portugal */}
          <g>
            <circle cx="60" cy="180" r="13" fill="#22c55e" />
            <text x="60" y="185" textAnchor="middle" fontSize="16" fill="#fff" aria-label="Portugal">🏠</text>
          </g>
          {/* Espanha */}
          <g>
            <circle cx="90" cy="170" r="13" fill="#0ea5e9" />
            <text x="90" y="175" textAnchor="middle" fontSize="16" fill="#fff" aria-label="Espanha">🏠</text>
          </g>
          {/* França */}
          <g>
            <circle cx="120" cy="120" r="13" fill="#22c55e" />
            <text x="120" y="125" textAnchor="middle" fontSize="16" fill="#fff" aria-label="França">🏠</text>
          </g>
          {/* Alemanha */}
          <g>
            <circle cx="180" cy="90" r="13" fill="#0ea5e9" />
            <text x="180" y="95" textAnchor="middle" fontSize="16" fill="#fff" aria-label="Alemanha">🏠</text>
          </g>
          {/* Itália */}
          <g>
            <circle cx="170" cy="170" r="13" fill="#22c55e" />
            <text x="170" y="175" textAnchor="middle" fontSize="16" fill="#fff" aria-label="Itália">🏠</text>
          </g>
          {/* Bélgica */}
          <g>
            <circle cx="140" cy="90" r="10" fill="#0ea5e9" />
            <text x="140" y="95" textAnchor="middle" fontSize="13" fill="#fff" aria-label="Bélgica">🏠</text>
          </g>
          {/* Países Baixos */}
          <g>
            <circle cx="150" cy="70" r="10" fill="#22c55e" />
            <text x="150" y="75" textAnchor="middle" fontSize="13" fill="#fff" aria-label="Países Baixos">🏠</text>
          </g>
          {/* Polónia */}
          <g>
            <circle cx="230" cy="80" r="13" fill="#0ea5e9" />
            <text x="230" y="85" textAnchor="middle" fontSize="16" fill="#fff" aria-label="Polónia">🏠</text>
          </g>
          {/* Suécia */}
          <g>
            <circle cx="270" cy="40" r="10" fill="#22c55e" />
            <text x="270" y="45" textAnchor="middle" fontSize="13" fill="#fff" aria-label="Suécia">🏠</text>
          </g>
          {/* Grécia */}
          <g>
            <circle cx="270" cy="200" r="10" fill="#0ea5e9" />
            <text x="270" y="205" textAnchor="middle" fontSize="13" fill="#fff" aria-label="Grécia">🏠</text>
          </g>
          {/* Roménia */}
          <g>
            <circle cx="300" cy="140" r="13" fill="#22c55e" />
            <text x="300" y="145" textAnchor="middle" fontSize="16" fill="#fff" aria-label="Roménia">🏠</text>
          </g>
          {/* Hungria */}
          <g>
            <circle cx="250" cy="130" r="10" fill="#0ea5e9" />
            <text x="250" y="135" textAnchor="middle" fontSize="13" fill="#fff" aria-label="Hungria">🏠</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
